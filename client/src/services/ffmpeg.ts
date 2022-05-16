import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import type { FFmpeg } from "@ffmpeg/ffmpeg";

class FFmpegService {
  ffmpeg: FFmpeg;

  constructor() {
    this.ffmpeg = createFFmpeg({ log: true });
  }

  get isSupported() {
    return window.SharedArrayBuffer !== undefined;
  }

  async init(cb?: () => void) {
    await this.ffmpeg.load();
    cb?.();
  }

  async writeFile(filename: string, file: File) {
    this.ffmpeg.FS("writeFile", filename, await fetchFile(file));
  }
}

export default FFmpegService;