import { storage } from "./firebase";
import { v4 as uuid } from "uuid";

const getNameAndExtension = (fileName: string) => {
  const name = fileName.replace(/\.[^.$]+$/, "");
  const ext = /.+\.(.+)$/.exec(fileName);
  const extension = ext ? ext[1] : null;
  return {
    name,
    extension,
  };
};

const uploadFile = (file: File, uid: string) => {
  const { extension, name } = getNameAndExtension(file.name);

  const fileName = `${uuid()}-${name}.${extension}`;

  const ref = storage.ref();

  return ref
    .child(`/${uid}/${fileName}`)
    .put(file)
    .then((snapshot) => {
      return snapshot.ref.getDownloadURL();
    })
    .then((downloadUrl) => {
      return {
        downloadUrl,
        fileName,
      };
    });
};

const deleteFile = (fileName: string) => {
  const ref = storage.ref();
  var fileRef = ref.child(`images/${fileName}`);
  return fileRef.delete();
};

export const FirebaseStorage = {
  uploadFile,
  deleteFile,
};
