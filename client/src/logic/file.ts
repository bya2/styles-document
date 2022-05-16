export const fn_get__file_name_without_file_type = (filename: string) => {
  if (filename.trim() === "") return "untitled";

  const splited = filename.split(".");
  if (splited.length >= 2) {
    splited.pop();
    return splited.reduce((prev, curr) => prev + curr, "");
  }
  return filename;
};
