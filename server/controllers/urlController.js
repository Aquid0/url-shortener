const urlService = require('../services/urlService');

const shortenUrl = async (req, res, next) => {
    try {
        const { url } = req.body;
        const userEmail = req.user?.email || null;

        const shortUrl = await urlService.createShortUrl(url, userEmail);

        res.status(201).json({ shortUrl });
    } catch (error) {
        next(error);
    }
}

const redirectUrl = async (req, res, next) => {
    try {
        const originalUrl = await urlService.getOriginalUrl(req.params.code);

        if (originalUrl) {
            return res.redirect(originalUrl);
        }
        return res.redirect(`${process.env.FRONTEND_URL}/not-found`);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    shortenUrl,
    redirectUrl
}