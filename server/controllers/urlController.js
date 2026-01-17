const urlService = require('../services/urlService');
const { connectDB } = require('../db');

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
        
        console.log("Generating short URL for:", url);

        // Generate short URL and check for collisions
        let shortUrl = await urlService.shortenUrl(url);
        let attempts = 0;
        const maxAttempts = 10;

        while (attempts < maxAttempts) {
            const collision = await db.collection('urls').findOne({ shortUrl: shortUrl });
            if (!collision) {
                break; // No collision, exit loop
            }
            shortUrl = await urlService.shortenUrl(url + Math.random().toString()); // Append salt to avoid collision
            attempts++;
        }

        if (attempts === maxAttempts) {
            return next({ status: 500, message: 'Could not generate unique short URL, please try again.' });
        }

        console.log("Generated short URL:", shortUrl);

        await db.collection('urls').insertOne({ originalUrl: url, shortUrl: shortUrl });
        res.status(201).json({ shortUrl });
    } catch (error) {
        next(error);
    }
}

const redirectUrl = async (req, res, next) => {
    const db = await connectDB();
    const { code } = req.params;

    try {
        const record = await db.collection('urls').findOne({ shortUrl: code });
        if (record) {
            return res.redirect(record.originalUrl);
        } else {
            return next({ status: 404, message: 'Short URL not found' });
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    shortenUrl,
    redirectUrl
}