const Url = require("../models/Url");
const shortid = require("shortid");

// Create Short URL
const shortenUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;

        const shortCode = shortid.generate();

        const newUrl = new Url({
            originalUrl,
            shortCode,
        });

        await newUrl.save();

        res.status(201).json({
            shortUrl: `http://localhost:5000/${shortCode}`,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Redirect to Original URL
const redirectUrl = async (req, res) => {
    try {
        const url = await Url.findOne({ shortCode: req.params.shortCode });

        if (!url) {
            return res.status(404).json({
                message: "URL Not Found",
            });
        }

        res.redirect(url.originalUrl);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    shortenUrl,
    redirectUrl,
};