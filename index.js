const Cluster = require('cluster');
const Http = require('http');
const CPUcount = require('os').cpus().length;
if (Cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < CPUcount; i++) {
    Cluster.fork();
  }
} else {
  
  Http.createServer((req, res) => {
    console.log("Worker " , process.pid, " handled the request");
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);
}