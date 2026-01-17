const MD5 = require('crypto-js/md5');

const shortenUrl = async (originalUrl, salt = 0) => {
    const hash = MD5(originalUrl + salt).toString().slice(0, 6); // Returns first 6 characters of MD5 hash
    return hash;
};

module.exports = {
    shortenUrl
};  