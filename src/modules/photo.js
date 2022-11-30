const Aws = require('aws-sdk');

const s3 = new Aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-southeast-1',
});

const photoUpload = async (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer,
    ACL: 'public-read-write',
  };

  const url = await s3
    .upload(params)
    .promise()
    .then((data) => data.Location)
    .catch((error) => {
      throw new Error(error);
    });

  return url;
};

module.exports = {
  photoUpload,
};
