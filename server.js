const http = require("http");
const app = require("./App")
const port = process.env.port || 6500 ;
const server = http.createServer(app);
module.exports = server;
app.listen(port);