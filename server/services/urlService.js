const MD5 = require('crypto-js/md5');
const { connectDB } = require('../db');

const generateHash = (url) => {
    return MD5(url).toString().slice(0, 6);
};

const createShortUrl = async (url, userEmail = null) => {
    const db = await connectDB();

    // Check if URL already exists
    const existing = await db.collection('urls').findOne({ originalUrl: url });
    if (existing) {
        return existing.shortUrl;
    }

    // Generate short URL with collision handling
    let shortUrl = generateHash(url);
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
        const collision = await db.collection('urls').findOne({ shortUrl });
        if (!collision) break;
        shortUrl = generateHash(url + Math.random().toString());
        attempts++;
    }

    if (attempts === maxAttempts) {
        throw new Error('Could not generate unique short URL');
    }

    // Save to database
    const urlDoc = { originalUrl: url, shortUrl, createdAt: new Date() };
    if (userEmail) urlDoc.userEmail = userEmail;

    await db.collection('urls').insertOne(urlDoc);
    return shortUrl;
};

const getOriginalUrl = async (code) => {
    const db = await connectDB();
    const record = await db.collection('urls').findOne({ shortUrl: code });
    return record?.originalUrl || null;
};

module.exports = {
    createShortUrl,
    getOriginalUrl
};  