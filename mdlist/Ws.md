# Ws 쏘캣

## server.js
### /blocks
```js
app.get("/version",(req,res)=>{
    res.send(bc.getVersion())
})
```
- 현재 네트워크 상의 블록을 가져오는 역활
### /version
```js
app.get("/version",(req,res)=>{
    res.send(bc.getVersion())
})
```
- 버전을 가져오는 역활
### /mineBlock
```js
app.post("/mineBlock",(req,res)=>{
    const data = req.body.data 
    const result = bc.mineBlock(data) // 
    if(result === null ) {
        res.status(400).send(`블럭추가에 오류가 발생되었습니다.`)
    } else {
        res.send(result)
    }
})
```
- 블록체인을 만드는 작업
### /peers
```js
app.get('/peers',(req,res)=>{
    res.send( ws.getSockets().map( socket => {
        return `${socket._socket.remoteAddress}:${socket._socket.remotePort}`;
    }) )
})
```
- 자신의 등록된 소켓들의 도메인을 가져오는 역활
### /addPeers 
```js
app.post('/addPeers',(req,res)=>{
    const peers = req.body.peers
    ws.connectionToPeers(peers)
    res.send('success')
})
```
- 웹소켓과 다른 웹소켓을 연결하는 포트
### /stop 
```js
app.get("/stop",(req,res)=>{
    res.send("Server Stop")
    process.exit(0)
})

```
- 서버 정지

## netsocket.js
