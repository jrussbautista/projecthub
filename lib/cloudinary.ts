import axios from 'axios';

const fileUpload = async (file: Blob) => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', 'projecthub');
  data.append('folder', 'projecthub');
  data.append('cloud_name', `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}`);
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`,
    data
  );
  const mediaUrl = response.data.url;
  return mediaUrl;
};

export const Cloudinary = {
  fileUpload,
};
