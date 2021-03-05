module.exports = {
  development: {
    bucketName: process.env.AWS_S3_DEV_BUCKET_NAME,
    awsId: process.env.AWS_S3_DEV_ID,
    awsSecret: process.env.AWS_S3_DEV_SECRET,
  },
  stage: {
    bucketName: process.env.AWS_S3_STAGE_BUCKET_NAME,
    awsId: process.env.AWS_S3_STAGE_ID,
    awsSecret: process.env.AWS_S3_STAGE_SECRET,
  },
}[process.env.NODE_ENV];

