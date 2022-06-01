var mosca = require('mosca')

const app = mosca()

const port = process.env.PORT || 3000

app.get('/', (req, res) => res.send('Merhaba Dünya!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


var backend = {
  type: 'redis',
  redis: require('redis'),
  db: 12,
  port: 6379,
  return_buffers: true, // to handle binary payloads
  host: "localhost"
};

var moscaSettings = {
  port: 1883,
  backend,
  persistence: {
    factory: mosca.persistence.Redis
  },
  http:{
      port: 3000,
  }
};

var server = new mosca.Server(moscaSettings);
server.on('ready', setup);

server.on('clientConnected', function(client) {
	console.log('client connected', client.id);		
});

// fired when a message is received
server.on('published', function(packet, client) {
  console.log('Published', packet.topic, packet.payload);
});

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running')
}