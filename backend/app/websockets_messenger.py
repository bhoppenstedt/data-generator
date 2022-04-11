from test_client import SocketIOTestClient as socketio
import random, math 
from time import sleep 
from numpy.random import normal


# TODO: find out why always 0   
qos=0 
def on_connect (socketio, self, app ):
    print ("conneted", socketio)    
def on_message(socketio, message):
    print("recevied message" )

class Websockets_message_producer(object):

    def _init_(self, type, name, args, socketio):
        #self.socketio.on_connect = on_connect
        #self.socketio.on_message = on_message
        self.socketio = socketio
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

    def on_connect (socketio, self, app ):
        print ("conneted", socketio)  

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
    
    def sendRandomSignal(self):
        while(self.running):
            random_number = int(random.randint(self.lowerBoundary,self.upperBoundary))
            socketio.emit('test_event', {'data': random_number})
            sleep(self.transmissionFrequency)

    def sendSinusSignal(self):
        """A sinus signal with the parameters of the corresponding object is created and sent through websockets 'Sinus-Signal'.
        """
        while(self.running):
            for i in range(0, 360) and self.running:
                periodic_number = self.amplitude * math.sin(self.frequency * math.radians(i))
                result = self.socketio(self.socketio, periodic_number, qos=qos)
                status = result[0]
                if status == 0:
                    print(f"Send `{periodic_number}` to socketio `{self.socketio}`")
                else:
                    print(f"Failed to send the message  {self.socketio}")
                sleep(self.transmissionFrequency)
    
    def sendCosinusSignal(self):
        """A sinus signal with the parameters of the corresponding object is created and sent through the websockets 'Sinus-Signal'.
        """
        while(self.running):
            for i in range(0, 360):
                periodic_number = self.amplitude * math.cos(self.frequency * math.radians(i))
                result = self.socketio(self.socketio, periodic_number, qos=qos)
                status = result[0]
                if status == 0:
                    print(f"Send `{periodic_number}` to socketio `{self.socketio}`")
                else:
                    print(f"Failed to send message to socketio {self.socketio}")
                sleep(self.transmissionFrequency)

    def sendEmphasizedRandomSignal(self):
        """A normally distributed signal with the parameters of the corresponding object is created and sent through the Websocktes 'Emphasized-Signal'.
        """
        while(self.running):
            data = normal(loc=self.center, scale=self.scale, size=200)
            for i in data:
                emphasized_number = i
                result = self.socketio(self.socketio, emphasized_number, qos=qos)
                status = result[0]
                if status == 0:
                    print(f"Send `{emphasized_number}` to socketio `{self.socketio}`")
                else:
                    print(f"Failed to send the message {self.socketio}")
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
            result = self.socketio(self.socketio, spiked_number, qos=qos)
            status = result[0]
            if status == 0:
                print(f"Send `{spiked_number}` to topic `{self.topic}`")
            else:
                print(f"Failed to send the message {self.socketio}")
            sleep(self.transmissionFrequency)
            i = i + 1


