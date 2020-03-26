const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8081 });
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    // console.log('客户端返回', message);
    wss.clients.forEach(item=>{
       item.send(message)
    })

  });
});
