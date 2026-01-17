const urlService = require('../services/urlService');
const { connectDB, client } = require('./db');

const shortenUrl = async (req, res, next) => {
    // What if same URL has been shortened already?
    // 
    try {
        const db = await connectDB();
        const { url } = req.body;

        // Check if URL already exists
        const existing = await db.collection('urls').findOne({ originalUrl: url });
        if (existing) {
            return res.status(200).json({ shortUrl: existing.shortUrl });
        }
        
        // Generate short URL and check for collisions
        let shortUrl = await urlService.shortenUrl(url);
        let attempts = 0;
        const maxAttempts = 10;

        while (attempts < maxAttempts) {
            const collision = await db.collections('urls').findOne({ shortUrl: shortUrl });
            if (!collision) {
                break; // No collision, exit loop
            }
            shortUrl = await urlService.shortenUrl(url + Math.random().toString()); // Append salt to avoid collision
            attempts++;
        }

        if (attempts === maxAttempts) {
            return next({ status: 500, message: 'Could not generate unique short URL, please try again.' });
        }

        await db.collection('urls').insertOne({ originalUrl: url, shortUrl: shortUrl });
        res.status(201).json({ shortUrl });
    } catch (error) {
        next(error);
    }
}

const redirectUrl = async (req, res, next) => {
    // Implementation for redirecting to the original URL
}

module.exports = {
    shortenUrl,
    redirectUrl
}