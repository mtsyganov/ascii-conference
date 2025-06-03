var WebSocketServer = require('ws').Server,
  express = require('express'),
  http = require('http');

var app = express();
app.use(express.static(__dirname + '/public'));

var server = http.createServer(app);
var port = Number(process.env.PORT || 8080);
server.listen(port, function() {
  console.log("Listening on " + port);
});

var wss = new WebSocketServer({server: server});

wss.on('connection', function(ws) {
  console.log('started client', wss.clients.length);
  ws.id = wss.clients.indexOf(ws);
  wss.resend_ids();
  ws.on('message', function(message, flags) {
    //console.log('broadcasting: %s', message.length, wss.clients.length);
    for (var i in wss.clients) {
      if (wss.clients[i] !== ws) {
        wss.clients[i].send(JSON.stringify({type:"screen", user: ws.id, data: message}));
      }
    }
  });  
  ws.on('close', function() {
    console.log('stopping client', wss.clients.length);
    // resend clients new ids
    wss.resend_ids();
  })
});

wss.resend_ids = function(clients) {
  for (var i in this.clients) {
    this.clients[i].id = parseInt(i, 10);
    this.clients[i].send(JSON.stringify({type:"id", id: i}));
  }
}
