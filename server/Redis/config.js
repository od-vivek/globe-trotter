const redis = require('redis');


const client = redis.createClient({
    password: '37bwNcDRU93DhVpoyBTejoR7Ecc9NLHF',
    socket: {
        host: 'redis-12896.c301.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 12896
    }
});

client.connect();

client.on('connect', () => {
    console.log("Connected to Redis");
});

client.on("error", (err) => {
    console.log("Redis Error", err);

})


module.exports = client;

