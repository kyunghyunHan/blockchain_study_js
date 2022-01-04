const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const bodyParser = require('body-parser')
const bc = require('./blocks.js')
const ws = require('./network.js')
const wl = require('./wallet')

app.use(bodyParser.json())
//현재 네트워크 상의 블록을 가져오는 역활
app.get("/blocks",(req,res)=>{
    res.send(bc.getBlocks())
})
//버전을 가져오는 역활
app.get("/version",(req,res)=>{
    res.send(bc.getVersion())
})

//블록체인을 만드는 작업
app.post("/mineBlock",(req,res)=>{
    const data = req.body.data 
    const result = bc.mineBlock(data) // 
    if(result === null ) {
        res.status(400).send(`블럭추가에 오류가 발생되었습니다.`)
    } else {
        res.send(result)
    }
})
//자신의 등록된 소켓들의 도메인을 가져오는 역활
app.get('/peers',(req,res)=>{
    res.send( ws.getSockets().map( socket => {
        return `${socket._socket.remoteAddress}:${socket._socket.remotePort}`;
    }) )
})
//웹소켓과 다른 웹소켓을 연결하는 포트
app.post('/addPeers',(req,res)=>{
    const peers = req.body.peers
    ws.connectionToPeers(peers)
    res.send('success')
})
//서버 정지
app.get("/stop",(req,res)=>{
    res.send("Server Stop")
    process.exit(0)
})

ws.wsInit()
app.listen(port,()=>{
    console.log(`server start port ${port}`)
})

app.get('/address',(req,res)=>{
    const address = wl.getPublicFromWallet();
    res.send({"adress:": address })
});

wl.initWallet()