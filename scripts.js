import {createServer} from 'http';
import staticHandler from 'serve-handler';
import ws, {WebSocketServer} from 'ws';

const server = createServer((req, res) => {
    return staticHandler(req,res,{public: 'public'})
});

const host = 'localhost';
const port = 8081;

const wss= new WebSocketServer({server});
wss.on('connection',(client) => {
    console.log('client connected!');
    client.on('message',(msg)=> {
        console.log(`Message: ${msg}`);
        broadcast(msg);
    })
})

function broadcast(msg){
    for(const client of wss.clients){
        if(client.readyState === ws.OPEN){
            client.send(msg);
        }
    }
}

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
