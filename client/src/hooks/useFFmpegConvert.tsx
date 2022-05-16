import { useMemo, useState, useCallback } from "react";
import { fn_get__file_name_without_file_type } from "@/logic/file";
import FFmpegService from "@/services/ffmpeg";

const ffmpegService = new FFmpegService();

export interface I_ffmpeg_conv_data_type {
  blob: Blob;
  mimeType: string;
  fileName: string;
  fileType: string;
}

export default function useFFmpegConvert(file: File | null) {
  const [s__error, set_s__error] = useState<Error | null>(null);
  const [s__converted_data, set_s__converted_data] = useState<I_ffmpeg_conv_data_type | null>(null);
  const [s__is_loading, set_s__is_loading] = useState(false);

  const m__is_error = useMemo(() => s__error !== null, [s__error]);
  const m__is_done = useMemo(
    () => s__error === null && s__converted_data !== null && s__is_loading === false,
    [s__error, s__converted_data, s__is_loading]
  );

  const fn_convert__file_data = async () => {
    if (file === null || s__is_loading) return;

    set_s__is_loading(true);
    set_s__error(null);

    try {
      const is_gif = file.type.indexOf("image/gif") > -1;

      const converted_type = is_gif ? "mp4" : "gif";
      const converted_MIME_type = is_gif ? "video/mp4" : "image/gif";
      const converted_name = `${fn_get__file_name_without_file_type(file.name)}.${converted_type}`;

      await ffmpegService.writeFile(encodeURI(file.name), file);
      await ffmpegService.ffmpeg.run("-i", encodeURI(file.name), encodeURI(converted_name));

      const data = ffmpegService.ffmpeg.FS("readFile", converted_name);
      ffmpegService.ffmpeg.FS("unlink", converted_name);

      set_s__converted_data({
        blob: new Blob([data.buffer], {
          type: converted_MIME_type,
        }),
        mimeType: converted_MIME_type,
        fileName: converted_name,
        fileType: converted_type,
      });
    } catch (err) {
      set_s__error(err);
    } finally {
      set_s__is_loading(true);
    }
  };

  return { s__is_loading, m__is_error, m__is_done, s__converted_data, fn_convert__file_data };
}
