const crypto = require('crypto');

const generateEncryptPassword = () => {
    const randomPassword = crypto.randomBytes(16).toString('hex');
    console.log('Random Password: ', randomPassword);
    return crypto.createHash('sha256').update(randomPassword).digest('hex');
};

module.exports = generateEncryptPassword;
