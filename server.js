const http = require("http");
const app = require("./App")
const port =  4900 ;
//process.env.port ||
const server = http.createServer(app);
module.exports = server;
app.listen(port);