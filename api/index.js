module.exports = async (req, res) => {

    const API_KEY = process.env.AIRTABLE_API_KEY;
    const BASE_ID = process.env.AIRTABLE_BASE_ID;

    try {

        const siteRes = await fetch(
            `https://api.airtable.com/v0/${BASE_ID}/Site%20Settings`,
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`
                }
            }
        );

        const siteData = await siteRes.json();

        const webRes = await fetch(
            `https://api.airtable.com/v0/${BASE_ID}/Made%20Websites`,
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`
                }
            }
        );

        const webData = await webRes.json();

        res.status(200).json({
            site: siteData.records?.[0]?.fields || null,
            websites: webData.records || []
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};
