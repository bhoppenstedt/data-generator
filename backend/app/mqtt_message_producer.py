import random
from time import sleep 
from paho.mqtt import client as mqtt_client

broker = 'broker.emqx.io'
port=1883
#topic = "python/mqtt"
# generate client ID with pub prefix randomly
#client_id = f'python-mqtt-{random.randint(0, 1000)}'
# username = 'emqx'
# password = 'public'


def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to MQTT Broker!")
    else:
        print("Failed to connect, return code %d\n", rc)

class Random_signal_producer(object):
    
    def __init__(self, name, lowerBoundary, upperBoundary, transmissionFrequency):
        """Called when an new signal of the corresponding type is created. Creats an object that has the parameters of the signal stored in its variables. Note that the signal
        is not intially running and has to be patched once at the start.

        Args:
            lowerBoundary (int): The lower boundary of the random signal
            upperBoundary (int): The upper boundary of the random signal
            transmissionFrequency(float): The pause in between ticks of the signal
        """
        self.client = mqtt_client.Client(name)
        self.topic = f"random/{name}"
        self.client.on_connect = on_connect

        self.running = False
        self.lowerBoundary = lowerBoundary
        self.upperBoundary = upperBoundary
        self.transmissionFrequency = transmissionFrequency

    def patch(self):
        """[Start/Pause the signal]

        Returns:
            [Bool]: [Returns true if successful. Note there's no Return when starting a signal]
        """
        self.running = not self.running
        if self.running:
            self.client.connect(broker,port)
            self.sendRandomSignal()
        return True

    def sendRandomSignal(self):
        """A random signal with the parameters of the corresponding signal is created and sent to the kafka topic 'Random-Signal'.
        """
        while(self.running):
            random_number = int(random.randint(self.lowerBoundary,self.upperBoundary))
            result = self.client.publish(self.topic, random_number)
            status = result[0]
            if status == 0:
                print(f"Send `{random_number}` to topic `{self.topic}`")
            else:
                print(f"Failed to send message to topic {self.topic}")
            sleep(self.transmissionFrequency)




        
test = Random_signal_producer("fsdfsd",1,10,1)
test.patch()