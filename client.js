var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://46.101.127.228:1883');


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