import random, time
from paho.mqtt import client as mqtt_client
from matplotlib import pyplot as plt

numbers = []
counter = [1]

def on_message(client, userdata, message):
    print("message received " ,float(message.payload.decode("utf-8")))
    print("message topic=",message.topic)
    numbers.append(float(message.payload.decode("utf-8")))
    counter[0] = counter[0] + 1
    if counter[0]>20:
        plt.plot(numbers)
        plt.show()


client = mqtt_client.Client('testClient')
client.on_message = on_message


client.connect('localhost',1883)
#client.loop_forever()
client.subscribe(topic = 'mqtt/test', qos = 0 )
client.loop_forever()
