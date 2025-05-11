var mongoose = require('mongoose');
var asyncHandler = require("../utils/asyncHandler.js");
var { makeLog } = require('../utils/logentries.js');

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.DB_URL);
    const { host, port } = conn.connection;
    await makeLog(
      `Database connected successfully at ${host}:${port}`,
      'Database',
      process.env.serverLogs
    );
    if(process.env.enableLogging == "true"){
      console.log("logging is enabled");
      console.log("the .logs folder contains logs");
    }
    else{
      console.log("loggins is disabled");
      console.log("check terminal for logs");
    }
    return conn;
  } catch (err) {
    console.error('Database connection error:', err);
    throw new Error('Database connection failed');
  }
}

module.exports = { connectDB };