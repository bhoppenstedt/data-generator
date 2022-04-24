from paho.mqtt import client as mqtt_client
client = mqtt_client.Client('yuck')

client.connect('localhost',1883)
#client.loop_forever()
result = client.publish('self.topic', 3, qos=0)
status = result[0]
if status == 0:
    print(f"Send `3 to topic ")
else:
    print(f"Failed to send message to topic ")