/**
 * Free Hugging Face Frame Interpolation (FILM / RIFE) Video Service
 * Uses public Hugging Face ZeroGPU spaces to generate 60fps videos
 * from Start Frame and End Frame completely for free with zero API credits.
 */

const fs = require('fs');
const path = require('path');
const { Client, handle_file } = require('@gradio/client');
const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

class FilmHuggingFaceService {
  constructor(spaceId = 'freealise/video_frame_interpolation') {
    this.spaceId = spaceId;
    this.fallbackSpaces = [
      'freealise/video_frame_interpolation',
      'meta-artem/frame-interpolation',
      'Upsampler/rife-frame-interpolation'
    ];
  }

  /**
   * Generates a free AI video from Start Frame to End Frame
   * 
   * @param {Object} options
   * @param {string} options.startImagePath - Path to Start Frame (0%)
   * @param {string} options.endImagePath - Path to End Frame (100%)
   * @param {string} options.outputPath - Destination MP4 path
   * @param {number} [options.interpolationSteps=2] - Number of recursive steps (2 = 4x frames, 3 = 8x frames)
   * @param {number} [options.fps=30] - Output framerate
   * @returns {Promise<{ success: boolean, source: string, videoPath: string }>}
   */
  async generateVideo({ startImagePath, endImagePath, outputPath, interpolationSteps = 2, fps = 30 }) {
    console.log(`[HF FILM SERVICE] Initiating free cloud frame interpolation via ${this.spaceId}...`);

    try {
      if (!fs.existsSync(startImagePath) || !fs.existsSync(endImagePath)) {
        throw new Error(`Input images not found: ${startImagePath}, ${endImagePath}`);
      }

      // 1. Connect to Hugging Face Space
      const client = await Client.connect(this.spaceId);
      console.log(`[HF FILM SERVICE] Connected to ${this.spaceId}`);

      console.log('[HF FILM SERVICE] Submitting frames to neural interpolation pipeline...');
      const result = await client.predict('/infer', {
        f_in: [handle_file(startImagePath), handle_file(endImagePath)],
        interpolation: interpolationSteps,
        fps_output: fps
      });

      // 3. Extract output video url or path
      const outputVideoData = result.data?.[0];
      const remoteVideoUrl = outputVideoData?.video?.url || outputVideoData?.url;

      if (!remoteVideoUrl) {
        throw new Error('Hugging Face space finished but returned no video URL');
      }

      console.log(`[HF FILM SERVICE] Video rendered successfully! Downloading from ${remoteVideoUrl}...`);
      const res = await fetch(remoteVideoUrl);
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, buffer);

      console.log(`[HF FILM SERVICE] Saved output video to ${outputPath}`);
      return { success: true, source: 'huggingface_film_space', videoPath: outputPath };

    } catch (err) {
      console.warn(`[HF FILM SERVICE] Cloud generation encountered issue (${err.message}). Activating high-speed local fallback...`);
      return await this.generateLocalFallback({ startImagePath, endImagePath, outputPath });
    }
  }

  /**
   * Local Motion-Compensated Optical Flow Engine (Zero-Cost & Offline)
   */
  async generateLocalFallback({ startImagePath, endImagePath, outputPath }) {
    console.log('[LOCAL FALLBACK] Generating 60fps motion-interpolated video via FFmpeg...');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    const cmd = `ffmpeg -y \
      -loop 1 -t 1.0 -i "${startImagePath}" \
      -loop 1 -t 1.0 -i "${endImagePath}" \
      -filter_complex "[0:v][1:v]xfade=transition=smoothleft:duration=1.2:offset=0.4,minterpolate='mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=60'" \
      -c:v libx264 -preset fast -crf 18 -pix_fmt yuv420p -movflags +faststart "${outputPath}"`;

    try {
      await execAsync(cmd);
      return { success: true, source: 'local_optical_flow', videoPath: outputPath };
    } catch (e) {
      console.error('[LOCAL FALLBACK] FFmpeg failed:', e.message);
      throw e;
    }
  }
}

module.exports = { FilmHuggingFaceService };
