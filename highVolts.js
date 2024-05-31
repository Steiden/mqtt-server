var mqtt = require("mqtt");

function HighVolt(req, res) {
	try {
		// Connect to MQTT broker
		var client = mqtt.connect("mqtt://192.168.30.1");

		// Connect to DB
		client.on("connect", function () {
			client.subscribe("/devices/wb-map3e_69/controls/Urms L1", function (err, device) {});
		});

		client.on("message", function (topic, message) {
			// Get volts
			if (topic.toString() == "/devices/wb-map3e_69/controls/Urms L1") {
				if (parseFloat(message.toString()) < 207 || parseFloat(message.toString()) > 253) {
                    res.json({
                        warning: true,
                        message: "Замечен скачок напряжения"
                    }, 200);
				}
			}
		});
	} catch (err) {
		console.log(err);
	}
}

module.exports = {
    HighVolt
}