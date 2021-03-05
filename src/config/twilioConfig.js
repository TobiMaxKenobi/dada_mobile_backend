module.exports = {
  development: {
    accountSid: process.env.TWILIO_DEV_ACCOUNT_SID,
    accountToken: process.env.TWILIO_DEV_ACCOUNT_TOKEN,
    phone: process.env.TWILIO_DEV_PHONE,
    messageServiceName: process.env.TWILIO_DEV_MESSAGE_SERVICE_NAME,
    messageServiceSid: process.env.TWILIO_DEV_MESSAGE_SERVICE_SID,
  },
  stage: {
    accountSid: process.env.TWILIO_STAGE_ACCOUNT_SID,
    accountToken: process.env.TWILIO_STAGE_ACCOUNT_TOKEN,
    phone: process.env.TWILIO_STAGE_PHONE,
    messageServiceName: process.env.TWILIO_STAGE_MESSAGE_SERVICE_NAME,
    messageServiceSid: process.env.TWILIO_STAGE_MESSAGE_SERVICE_SID,
  },
}[process.env.NODE_ENV];
