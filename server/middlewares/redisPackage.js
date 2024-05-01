const client = require("../Redis/config");

async function cachedPackage(req, res, next) {
    try {
        const cachedData = await client.get("PackageDetails");

        if (cachedData) {
            console.log("Fetching Data From Redis");
            res.status(200).json({ success: true, blogs: JSON.parse(cachedData) });
        } else {
            next();
        }
    } catch (error) {
        console.error("Redis Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = cachedPackage;
