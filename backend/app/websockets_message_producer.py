#from test_client import SocketIOTestClient as socketio
from test_client import SocketIOTestClient

from flask import Flask
from flask_socketio import SocketIO

import random, math 
from time import sleep 
from numpy.random import normal





class Websockets_message_producer(object):

    def __init__(self, type, name, args, socketio):
    
        self.topic = name
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
            if self.type == 'random':
                self.sendRandomSignal()
            elif self.type =='sinus':
                self.sendSinusSignal()
            elif self.type == 'cosinus':
                self.sendCosinusSignal()
            elif self.type == 'emphasized':
                self.sendEmphasizedRandomSignal()
            elif self.type == 'spiked':
                self.sendSpikedSignal()



    def sendRandomSignal(self):
        """A random signal with the parameters of the corresponding object is created and sent through websocket for 'Random-Signal'.
        """
        while(self.running):
            random_number = random.uniform(self.lowerBoundary,self.upperBoundary)
            self.socketio.emit(self.topic, {'data': random_number})
            sleep(self.transmissionFrequency)

    def sendSinusSignal(self):
        """A sinus signal with the parameters of the corresponding object is created and sent through websocket for 'Sinus-Signal'.
        """
        while(self.running):
            for i in range(0, 360):
                periodic_number = self.amplitude * math.sin(self.frequency * math.radians(i))
                self.socketio.emit(self.topic, {'data': periodic_number})
                sleep(self.transmissionFrequency)
                if not self.running:
                    break
    
    def sendCosinusSignal(self):
        """A sinus signal with the parameters of the corresponding object is created and sent through websocket for 'Sinus-Signal'.
        """
        while(self.running):
            for i in range(0, 360):
                periodic_number = self.amplitude * math.cos(self.frequency * math.radians(i))
                self.socketio.emit(self.topic, {'data': periodic_number})
                sleep(self.transmissionFrequency)
                if not self.running:
                    break

    def sendEmphasizedRandomSignal(self):
        """A normally distributed signal with the parameters of the corresponding object is created and sent through websocket for 'Emphasized-Signal'.
        """
        while(self.running):
            data = normal(loc=self.center, scale=self.scale, size=200)
            for i in data:
                emphasized_number = i
                self.socketio.emit(self.topic, {'data': emphasized_number})
                sleep(self.transmissionFrequency)
                if not self.running:
                    break

    def sendSpikedSignal(self):
        """A spiked signal with the parameters of the corresponding object is created and sent through websocket for 'Spiked-Signal'.
        """
        i = 0
        while(self.running):
            if i % self.distance == 0 and random.random() <= self.propability:
                spiked_number = self.base + self.size
            else:
                spiked_number = self.base
            self.socketio.emit(self.topic, {'data': spiked_number})
            sleep(self.transmissionFrequency)
            i = i + 1


