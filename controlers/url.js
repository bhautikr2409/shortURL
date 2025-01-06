const shortid = require("shortid");
const URL = require("../models/url");

async function genearteNewShortURL(req, res) {
    try {
        const body = req.body;
        console.log('Received request body:', body);

        if (!body.url) {
            console.log('URL missing in request');
            return res.status(400).json({ error: "url is required" });
        }

        const shortId = shortid.generate();  
        console.log('Generated shortId:', shortId);

        const newUrl = await URL.create({
            shortId: shortId,
            redirectURL: body.url,
            visitHistory: []
        });

        console.log('Created new URL:', newUrl);
        // return res.status(201).json({ id: shortId });

        return res.render('home' , { id: shortId })

        // return res.status(201).json({ 
        //     id: shortId,
        //     originalUrl: body.url,
        //     shortUrl: `https://localhost:8000/${shortId}`
        // });
        
    } catch (error) {
        console.error('Error in generateNewShortURL:', error);
        return res.status(500).json({ error: error.message });
    }
}


async function handleAnalytics(req , res) {
    const shortId = req.params.shortId;

     const result = await URL.findOne({shortId})
        return res.status(200).json({
            totalClicks : result.visitHistory.length ,
            analytics : result.visitHistory
        })
}

module.exports = {
    genearteNewShortURL,
    handleAnalytics
};
