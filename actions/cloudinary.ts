'use server';
import { v2 as cloud, UploadApiOptions, UploadApiResponse } from 'cloudinary';
import { updateUser } from './updateUser';
import streamifier from 'streamifier';
// Refer https://www.youtube.com/watch?v=xsnZDtRSAYg

cloud.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadFileToCloud = async (
  file: File,
  options?: UploadApiOptions
): Promise<UploadApiResponse | undefined> => {

  if(file.size <= 0) return;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const stream = cloud.uploader.upload_stream(options, (error, result) => {

      if (error) return reject(error);
      resolve(result);
    });

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export const updateAvatar = async (id: string, formatData: FormData) => {
  const file = formatData.get('profile-image');

  if (file instanceof File) {
    const result = await uploadFileToCloud(file, {
      width: 300,
      height: 300,
      gravity: 'face',
      crop: 'fill',
    })
    const secureUrl = result?.secure_url;
    updateUser(id, { avatar: secureUrl })
  }
};

