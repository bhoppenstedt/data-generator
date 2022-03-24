import random, math 
from time import sleep 
from paho.mqtt import client as mqtt_client
from numpy.random import normal

broker = 'localhost'
port=1883
#topic = "python/mqtt"
# generate client ID with pub prefix randomly
#client_id = f'python-mqtt-{random.randint(0, 1000)}'
# username = 'emqx'
# password = 'public'


def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
    client.subscribe("$SYS/#")

def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))

class MQTT_Signal_producer(object):
    
    def __init__(self,type,name,args):
       
        self.client = mqtt_client.Client(name)
        self.client.on_connect = on_connect
        self.topic = f"mqtt/{name}"
        self.running = False
        self.type = type

        if type == 'random':
            self.random_constructor(args)
        elif type == 'sinus':
            self.sinus_constructor(args)
        elif type == 'cosinus':
            self.cosinus_constructor(args)
        elif type == 'spiked':
            self.spiked_constructor(args)
        else:
            self.emphaiszed_constructor(args)


    def random_constructor(self,random_args):
        self.lowerBoundary = random_args["lowerBoundary"]
        self.upperBoundary = random_args["upperBoundary"]
        self.transmissionFrequency = random_args["transmissionFrequency"]

    def sinus_constructor(self,sinus_args):
        self.frequency = sinus_args["frequency"]
        self.amplitude = sinus_args["amplitude"]
        self.transmissionFrequency = sinus_args["transmissionFrequency"]

    def cosinus_constructor(self,cosinus_args):
        self.frequency = cosinus_args["frequency"]
        self.amplitude = cosinus_args["amplitude"]
        self.transmissionFrequency = cosinus_args["transmissionFrequency"]

    def spiked_constructor(self,spiked_args):
        self.base = spiked_args["base"]
        self.distance = spiked_args["distance"]
        self.propability = spiked_args["propability"]
        self.size = spiked_args["size"]
        self.transmissionFrequency = spiked_args["transmissionFrequency"]

    def emphaiszed_constructor(self,emphasized_args):
        self.center = emphasized_args["center"]
        self.scale = emphasized_args["scale"]
        self.transmissionFrequency = emphasized_args["transmissionFrequency"]



    def patch(self):
        """[Start/Pause the signal]

        Returns:
            [Bool]: [Returns true if successful. Note there's no Return when starting a signal]
        """
        self.running = not self.running
        
        if self.running:
            self.client.connect(broker,port)
            if self.type == 'random':
                self.sendRandomSignal()
            elif self.type =='sinus':
                self.sendSinusSignal()
            elif self.type == 'cosinus':
                self.sendCosinusSignal()
            elif self.type == 'emphasized':
                self.sendEmphasizedRandomSignal()
            else:
                self.sendSpikedSignal()

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

    def sendSinusSignal(self):
        """A sinus signal with the parameters of the corresponding object is created and sent to the kafka topic 'Sinus-Signal'.
        """
        while(self.running):
            for i in range(0, 360) and self.running:
                periodic_number = self.amplitude * math.sin(self.frequency * math.radians(i))
                result = self.client.publish(self.topic, periodic_number)
                status = result[0]
                if status == 0:
                    print(f"Send `{periodic_number}` to topic `{self.topic}`")
                else:
                    print(f"Failed to send message to topic {self.topic}")
                sleep(self.transmissionFrequency)
    
    def sendCosinusSignal(self):
        """A sinus signal with the parameters of the corresponding object is created and sent to the kafka topic 'Sinus-Signal'.
        """
        while(self.running):
            for i in range(0, 360):
                periodic_number = self.amplitude * math.cos(self.frequency * math.radians(i))
                result = self.client.publish(self.topic, periodic_number)
                status = result[0]
                if status == 0:
                    print(f"Send `{periodic_number}` to topic `{self.topic}`")
                else:
                    print(f"Failed to send message to topic {self.topic}")
                sleep(self.transmissionFrequency)

    def sendEmphasizedRandomSignal(self):
        """A normally distributed signal with the parameters of the corresponding object is created and sent to the kafka topic 'Emphasized-Signal'.
        """
        while(self.running):
            data = normal(loc=self.center, scale=self.scale, size=200)
            for i in data:
                emphasized_number = i
                result = self.client.publish(self.topic, emphasized_number)
                status = result[0]
                if status == 0:
                    print(f"Send `{emphasized_number}` to topic `{self.topic}`")
                else:
                    print(f"Failed to send message to topic {self.topic}")
                sleep(self.transmissionFrequency)

    def sendSpikedSignal(self):
        """A spiked signal with the parameters of the corresponding object is created and sent to the kafka topic 'Spiked-Signal'.
        """
        i = 0
        while(self.running):
            if i % self.distance == 0 and random.random() <= self.propability:
                spiked_number = self.base + self.size
            else:
                spiked_number = self.base
            result = self.client.publish(self.topic, spiked_number)
            status = result[0]
            if status == 0:
                print(f"Send `{spiked_number}` to topic `{self.topic}`")
            else:
                print(f"Failed to send message to topic {self.topic}")
            sleep(self.transmissionFrequency)
            i = i + 1





        
#client = mqtt_client.Client()
#client.on_connect = on_connect
#client.on_message = on_message
#client.connect('localhost', 1883, 60)
#client.loop_forever()
#client.publish('fdsfds', random.randint(10,20))