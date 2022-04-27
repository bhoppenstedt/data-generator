#from test_client import SocketIOTestClient as socketio
from test_client import SocketIOTestClient

from flask import Flask
from flask_socketio import SocketIO

import random, math 
from time import sleep 
from numpy.random import normal


class Websockets_message_producer(object):

    """
    This class handles all signals that are published through the websockets protocol.
    For each new signal an object of this class is created and saved into the dictionaries
    that are specified in main.py.
    """    


    def __init__(self, type, name, args, socketio):
        """
        This is called when a new signal that uses the mqtt message protocol is created.
        An object that contains the necessary parameters of a signal in its variables is created.
        It is to noted that signalstreams are not initially running on creation and need to be patched
        once. Also note that this object is polymorphic, which means that the args 
        dictionary contains different entries for different signal types.

        Args:
            type (String): The type of the signal. The following values are valid: 'random', 'sinus', 'cosinus', 'emphasized', 'spiked'.
            name (String): The name of the signal.
            args (Dictionary): A dictionary that contains all parameters of the corresponding signal.
        """
        # The topic to which the signal gets published to is set
        self.topic = name

        # Create a SocketIO instance
        self.socketio = socketio

        # Declaration of state and type of the signal
        self.running = False
        self.type = type 

        # Depending on the type of the new signal a corresponding function is called that 
        # stores the parameters into the objects variables.
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

        """
        Called when a new signal of the type 'random' is created.

        Args:
            random_args (Dictionary): A dictionary containing the necessary parameters for a random signal: 

            lowerBoundary (float): The lower boundary of the random signal value
            upperBoundary (float): The upper boundary of the random signal value
            transmissionFrequency(float): The pause in between random signal ticks
        """ 

        self.lowerBoundary = random_args["lowerBoundary"]
        self.upperBoundary = random_args["upperBoundary"]
        self.transmissionFrequency = random_args["transmissionFrequency"]

    def sinus_constructor(self,sinus_args):

        """
        Called when a new signal of the type 'sinus' is created.

        Args:
            sinus_args (Dictionary): A dictionary containing the necessary parameters for sinus signal: 

            frequency (float): The frequency of the sinus signal
            amplitude (float): The amplitude of the sinus signal value
            transmissionFrequency(float): The pause in between sinus signal ticks
        """ 

        self.frequency = sinus_args["frequency"]
        self.amplitude = sinus_args["amplitude"]
        self.transmissionFrequency = sinus_args["transmissionFrequency"]

    def cosinus_constructor(self,cosinus_args):

        """
        Called when a new signal of the type 'cosinus' is created.

        Args:
            cosinus_args (Dictionary): A dictionary containing the necessary parameters for a cosinus signal: 

            frequency (float): The frequency of the cosinus signal
            amplitude (float): The amplitude of the cosinus signal value
            transmissionFrequency(float): The pause in between cosinus signal ticks
        """ 

        self.frequency = cosinus_args["frequency"]
        self.amplitude = cosinus_args["amplitude"]
        self.transmissionFrequency = cosinus_args["transmissionFrequency"]

    def spiked_constructor(self,spiked_args):

        """
        Called when a new signal of the type 'spiked' is created.

        Args:
            spiked_args (Dictionary): A dictionary which contains the necessary parameters for a spiked signal which are: 

            base (float): The spiked signal's baseline
            distance (float): The amount of ticks in between potential spikes 
            probability (float): The probability that a spike occurs (must be in a range of 0-1)
            size (float): The size of the spikes 
            transmissionFrequency(float): The pause in between ticks of the spiked signal
        """ 

        self.base = spiked_args["base"]
        self.distance = spiked_args["distance"]
        self.propability = spiked_args["propability"]
        self.size = spiked_args["size"]
        self.transmissionFrequency = spiked_args["transmissionFrequency"]

    def emphaiszed_constructor(self,emphasized_args):

        """
        Called when a new signal of the type 'emphasized' (normally distributed) is created.

        Args:
            emphasized_args (Dictionary): A dictionary which contains the necessary parameters for an emphasized signal which are: 

            center (float): The center of the normally distributed signal 
            scale (float): The standard deviation of the normally distributed signal
            transmissionFrequency(float): The pause in between ticks of the emphasized signal
        """ 

        self.center = emphasized_args["center"]
        self.scale = emphasized_args["scale"]
        self.transmissionFrequency = emphasized_args["transmissionFrequency"]


    def patch(self):
        """
        [Start/Pause the signal]

        Returns:
            [Bool]: [Returns true if successful. Note that there is no Return when a signal is started]
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
        """
        A random signal with the parameters of the corresponding object is created
        and sent through websocket for 'Random-Signal' with emit.
        """
        while(self.running):
            random_number = random.uniform(self.lowerBoundary,self.upperBoundary)
            self.socketio.emit(self.topic, {'data': random_number})
            sleep(self.transmissionFrequency)

    def sendSinusSignal(self):
        """
        A sinus signal with the parameters of the corresponding object is created
        and sent through websocket for 'Sinus-Signal' with emit.
        """
        while(self.running):
            for i in range(0, 360):
                periodic_number = self.amplitude * math.sin(self.frequency * math.radians(i))
                self.socketio.emit(self.topic, {'data': periodic_number})
                sleep(self.transmissionFrequency)
                if not self.running:
                    break
    
    def sendCosinusSignal(self):
        """
        A sinus signal with the parameters of the corresponding object is created
        and sent through websocket for 'Sinus-Signal' with emit.
        """
        while(self.running):
            for i in range(0, 360):
                periodic_number = self.amplitude * math.cos(self.frequency * math.radians(i))
                self.socketio.emit(self.topic, {'data': periodic_number})
                sleep(self.transmissionFrequency)
                if not self.running:
                    break

    def sendEmphasizedRandomSignal(self):
        """
        A normally distributed signal with the parameters of the corresponding object is created
        and sent through websocket for 'Emphasized-Signal' with emit.
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
        """
        A spiked signal with the parameters of the corresponding object is created
        and sent through websocket for 'Spiked-Signal' with emit.
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


