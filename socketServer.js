const ws = require('ws');

let sockets = [];

const wss = new ws.Server({
    port:8081
})

wss.on('connection', (ws, req) => {
    const ip = req.socket.remoteAddress;
    ws.send('connected');
    sockets.push({socket: ws, ip: ip});
    console.log(`Client ${ip} has connected to the socket server`);

    ws.on('close', (code, reason) => {
        console.log(`${ip} has closed the connection`);
        let i = sockets.findIndex((e) => {
            return (e.ip == ip)
        })
        if(i !== -1){
            sockets.splice(i, 1);
        }
    })
})

function sendSensorData(data){
    console.log(dat);
    sockets.forEach(e => {
        e.socket.send(data);
    })
}

module.exports = {sendSensorData};