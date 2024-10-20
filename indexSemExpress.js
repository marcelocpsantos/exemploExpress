const http = require("node:http")

const server = http.createServer((req,res)=>{
    res.setHeader("Content-type","text/plain")
    res.end("Oi mundo.....")
})


server.listen(8080, "localhost", ()=>{
    console.log("\n\nServidor aguardando requisições na porta : 8080")
})