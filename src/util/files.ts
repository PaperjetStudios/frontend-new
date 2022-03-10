import imageCompression from "browser-image-compression";

const options = {
  maxSizeMB: 1, // (default: Number.POSITIVE_INFINITY)
  maxWidthOrHeight: 640, // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight (default: undefined)
  // but, automatically reduce the size to smaller than the maximum Canvas size supported by each browser.
  // Please check the Caveat part for details.
};

export const compressImage = async (file: File) => {
  return await imageCompression(file, options);
};

export const readImageFile = async (file: File) => {
  const promise = new Promise((resolve, reject) => {
    let fr = new FileReader();
    fr.onload = (x) => resolve(fr.result);
    fr.readAsDataURL(file);
  });
  return await promise.then((data) => data);
};
