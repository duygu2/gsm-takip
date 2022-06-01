const mqtt = require('mqtt');

if (!process.env.MOSQUITTO_SERVER) {
  throw Error('You should first fill the .env-example file and rename it to .env');
}

// Connection to MQTT server
const client = mqtt.connect(
  // Note: you can replace 'mqtts' per 'wss' to connect to Mosquitto using websockets (you need to activate the option on Stackhero console and to configure "Security shield" to allow your IPs).
  'mqtts://' + process.env.MOSQUITTO_SERVER,
  {
    username: process.env.MOSQUITTO_USERNAME,
    password: process.env.MOSQUITTO_PASSWORD,
    clean: true
  }
);

client.subscribe('location');

client.on('connect', function() {
	console.log('connected!');

	client.subscribe('new-user',function(){
        client.publish('new-user', 'Duygu-' + Math.ceil(Math.random() * 10),{
            retain: true,
        });   
    });
});

client.on('message', function(topic, message) {
	console.log(topic, ' : ', message.toString());
});