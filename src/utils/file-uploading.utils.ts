export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new Error('Solo se permiten archivos de imagen!'), false);
  }
  callback(null, true);
};