import { unlink } from "fs";
import { resolve } from "path";
// actually deletes the file

export const deleteFile = (filePath) => {
  try {
    unlink(resolve(filePath), () => {
      console.log(filePath, "has been deleted");
    });
  } catch (error) {
    console.log(error);
  }
};

// check whether single file or array of files to be deleted
export const deleteUploadedFiles = (req) => {
  //single file
  if (req.file) {
    deleteFile(req.file.path);
  }
  if (req.files) {
    req.files.map((file) => deleteFile(file.path));
  }
};
