import random, math 
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
        self.lowerBoundary = sinus_args["frequency"]
        self.upperBoundary = sinus_args["amplitude"]
        self.transmissionFrequency = sinus_args["transmissionFrequency"]

    def cosinus_constructor(self,cosinus_args):
        self.lowerBoundary = cosinus_args["frequency"]
        self.upperBoundary = cosinus_args["amplitude"]
        self.transmissionFrequency = cosinus_args["transmissionFrequency"]

    def spiked_constructor(self,spiked_args):
        self.lowerBoundary = spiked_args["base"]
        self.upperBoundary = spiked_args["distance"]
        self.upperBoundary = spiked_args["propability"]
        self.upperBoundary = spiked_args["size"]
        self.transmissionFrequency = spiked_args["transmissionFrequency"]

    def emphaiszed_constructor(self,emphasized_args):
        self.lowerBoundary = emphasized_args["center"]
        self.upperBoundary = emphasized_args["scale"]
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
                self.send

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
        while(True):
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
        while(True):
            for i in range(0, 360) and self.running:
                periodic_number = self.amplitude * math.cos(self.frequency * math.radians(i))
                result = self.client.publish(self.topic, periodic_number)
                status = result[0]
                if status == 0:
                    print(f"Send `{periodic_number}` to topic `{self.topic}`")
                else:
                    print(f"Failed to send message to topic {self.topic}")
                sleep(self.transmissionFrequency)





        
#test = Random_signal_producer("fsdfsd",1,10,1)
#test.patch()