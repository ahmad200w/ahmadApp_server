const http = require("http");
const app = require("./App")
const port = process.env.port || 8500;// local
const server = http.createServer(app);
module.exports = server;
app.listen(port);