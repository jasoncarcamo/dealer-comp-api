require("dotenv").config();

module.exports = {
    "migrationDirectory": "migrations",
    "driver": "pg",
    "host": process.env.DB_HOST || "localhost",
    "port": process.env.DB_PORT || 5432,
    "database": process.env.DB_NAME || "dealer_comp_api",
    "username": process.env.DB_USER || "jason",
    "password": process.env.DB_PASS || "carcamo11",
    "ssl": { 
        rejectUnauthorized: false 
    } 
};