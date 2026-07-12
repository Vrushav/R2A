const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = async () => {
    try {
        console.log("Using DNS servers:", dns.getServers());

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("✅ MongoDB Connected");

    } catch (err) {

        console.error("❌ MongoDB Connection Failed");
        console.error(err);

        process.exit(1);
    }
};

module.exports = connectDB;