declare module 'mp4box' {
  export interface MP4MediaHeader {
    timescale: number;
    duration: number;
  }

  export interface MP4Track {
    id: number;
    created?: Date;
    modified?: Date;
    volume?: number;
    track_width?: number;
    track_height?: number;
    timescale: number;
    duration: number;
    bitrate?: number;
    codec: string;
    video?: {
      width: number;
      height: number;
    };
    audio?: {
      sample_rate: number;
      channel_count: number;
      sample_size: number;
    };
  }

  export interface MP4Info {
    duration: number;
    timescale: number;
    isFragmented: boolean;
    isProgressive: boolean;
    hasIOD: boolean;
    brands: string[];
    created: Date;
    modified: Date;
    tracks: MP4Track[];
    videoTracks: MP4Track[];
    audioTracks: MP4Track[];
  }

  export interface MP4Sample {
    track_id: number;
    description: any;
    is_sync: boolean;
    is_leading?: number;
    depends_on?: number;
    is_depended_on?: number;
    has_redundancy?: number;
    degradation_priority?: number;
    data: Uint8Array;
    dts: number;
    cts: number;
    duration: number;
    timescale: number;
    size: number;
  }

  export interface MP4File {
    onReady?: (info: MP4Info) => void;
    onError?: (e: string) => void;
    onSamples?: (id: number, user: any, samples: MP4Sample[]) => void;
    appendBuffer(data: ArrayBuffer): number;
    flush(): void;
    setExtractionOptions(id: number, user?: any, options?: { nbSamples?: number }): void;
    start(): void;
    stop(): void;
    getTrackById(id: number): any;
  }

  export class DataStream {
    static BIG_ENDIAN: boolean;
    buffer: ArrayBuffer;
    constructor(buffer?: ArrayBuffer, byteOffset?: number, endianness?: boolean);
    writeUint8(val: number): void;
    writeUint16(val: number): void;
    writeUint32(val: number): void;
  }

  export function createFile(): MP4File;

  const mp4box: {
    createFile: () => MP4File;
    DataStream: typeof DataStream;
  };

  export default mp4box;
}
