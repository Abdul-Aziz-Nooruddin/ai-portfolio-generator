/**
 * 🏛️ Upload Validator & Security Guard (Phase 31)
 * Enforces strict client-side & server-side magic-byte content validation,
 * MIME type verification, file count, and payload size bounds.
 */

class UploadValidator {
  /**
   * Validates a PDF resume upload
   * @param {Buffer|Uint8Array} buffer 
   * @param {Object} metadata - { sizeBytes, originalName, mimeType }
   * @returns {{ valid: boolean, error?: string, pages?: number }}
   */
  static validatePdf(buffer, metadata = {}) {
    const MAX_PDF_SIZE = 10 * 1024 * 1024; // 10 MB

    if (!buffer || buffer.length === 0) {
      return { valid: false, error: 'Empty file payload received.' };
    }

    if (buffer.length > MAX_PDF_SIZE) {
      return { valid: false, error: 'PDF file exceeds maximum allowed limit of 10 MB.' };
    }

    // Magic bytes check: %PDF- (0x25 0x50 0x44 0x46 0x2D)
    if (buffer.length < 5 ||
        buffer[0] !== 0x25 || buffer[1] !== 0x50 ||
        buffer[2] !== 0x44 || buffer[3] !== 0x46 || buffer[4] !== 0x2D) {
      return { valid: false, error: 'Invalid file format. File does not have valid PDF magic headers.' };
    }

    // Basic page count estimate by counting /Type\s*\/Page tokens
    const textContent = buffer.toString('latin1');
    const pageMatches = textContent.match(/\/Type\s*\/Page\b/g);
    const estimatedPages = pageMatches ? pageMatches.length : 1;

    if (estimatedPages > 5) {
      return { valid: false, error: `Resume has too many pages (${estimatedPages} detected). Maximum 5 pages allowed.` };
    }

    return { valid: true, pages: estimatedPages, mimeType: 'application/pdf', fileType: 'pdf' };
  }

  /**
   * Validates a Resume file (PDF or Image scan)
   * @param {Buffer|Uint8Array} buffer 
   * @param {Object} metadata - { sizeBytes, originalName, mimeType }
   * @returns {{ valid: boolean, error?: string, fileType?: string, pages?: number }}
   */
  static validateResumeFile(buffer, metadata = {}) {
    const MAX_RESUME_SIZE = 10 * 1024 * 1024; // 10 MB

    if (!buffer || buffer.length === 0) {
      return { valid: false, error: 'Empty file payload received.' };
    }

    if (buffer.length > MAX_RESUME_SIZE) {
      return { valid: false, error: 'Resume file exceeds maximum allowed limit of 10 MB.' };
    }

    // Check PDF first
    const isPdf = buffer.length >= 5 &&
      buffer[0] === 0x25 && buffer[1] === 0x50 &&
      buffer[2] === 0x44 && buffer[3] === 0x46 && buffer[4] === 0x2D;

    if (isPdf) {
      return this.validatePdf(buffer, metadata);
    }

    // Check Image formats: JPEG, PNG, WebP
    const imgValidation = this.validateImage(buffer, metadata);
    if (imgValidation.valid) {
      return { valid: true, fileType: 'image', pages: 1, mimeType: `image/${imgValidation.format}`, format: imgValidation.format };
    }

    return { valid: false, error: 'Invalid file format. File does not have valid PDF magic headers or supported image formats (JPEG, PNG, WebP).' };
  }

  /**
   * Validates a Profile Photo or Supporting Image
   * @param {Buffer|Uint8Array} buffer 
   * @param {Object} metadata 
   * @returns {{ valid: boolean, error?: string, format?: string }}
   */
  static validateImage(buffer, metadata = {}) {
    const MAX_IMG_SIZE = 5 * 1024 * 1024; // 5 MB

    if (!buffer || buffer.length === 0) {
      return { valid: false, error: 'Empty image payload.' };
    }

    if (buffer.length > MAX_IMG_SIZE) {
      return { valid: false, error: 'Image exceeds maximum allowed size of 5 MB.' };
    }

    // Check Magic Bytes:
    // JPEG: 0xFF 0xD8 0xFF
    const isJpeg = buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF;
    // PNG: 0x89 0x50 0x4E 0x47 0x0D 0x0A 0x1A 0x0A
    const isPng = buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47;
    // WebP: RIFF ... WEBP (0x52 0x49 0x46 0x46 ... 0x57 0x45 0x42 0x50)
    const isWebp = buffer.length > 12 &&
      buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
      buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50;

    if (!isJpeg && !isPng && !isWebp) {
      return { valid: false, error: 'Invalid image format. Only JPEG, PNG, and WebP images are supported.' };
    }

    const format = isJpeg ? 'jpeg' : (isPng ? 'png' : 'webp');
    return { valid: true, format };
  }

  /**
   * Validates an array of supporting images
   * @param {Array<Buffer>} buffers
   * @returns {{ valid: boolean, error?: string }}
   */
  static validateSupportingImages(buffers = []) {
    if (!Array.isArray(buffers)) return { valid: true };
    if (buffers.length > 3) {
      return { valid: false, error: 'Maximum 3 supporting images allowed.' };
    }
    for (let i = 0; i < buffers.length; i++) {
      const res = this.validateImage(buffers[i]);
      if (!res.valid) {
        return { valid: false, error: `Supporting image #${i + 1} is invalid: ${res.error}` };
      }
    }
    return { valid: true };
  }
}

module.exports = { UploadValidator };
