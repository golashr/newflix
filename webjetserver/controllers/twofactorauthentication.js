const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

exports.twoFactorAuthentication = () => {
  const webjetserver = 'webjetserver';
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    let secret = speakeasy.generateSecret({ name: 'webjetserver', length: 20 });
    // eslint-disable-next-line camelcase
    secret.otpauth_url = `otpauth://totp/${webjetserver}?secret=${secret.base32}&issuer=${process.env.WEBSITE_NAME}`;
    QRCode.toDataURL(secret.otpauth_url).then(imageURI => {
      console.log(imageURI);
      resolve({
        secret,
        imageURI
      });
    });
  });
};

exports.verifyQR = (secret, token) => {
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    const verified = speakeasy.totp.verify({
      secret: 'PUQUIV3SHJ3XARDUOZKCM3JJLBBFUMB2',
      encoding: 'base32',
      window: 1,
      token: token
    });
    resolve(verified);
  });
};

// module.exports = twoFactorAuthentication, verify;
