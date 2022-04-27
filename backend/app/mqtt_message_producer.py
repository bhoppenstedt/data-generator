import random, math 
from time import sleep 
from paho.mqtt import client as mqtt_client
from numpy.random import normal

# Specifiy the URL and port of the MQTT Broker
broker = 'host.docker.internal'
port=1883

# Specifiy the quality of service. With qos = 0 the client doesn't wait for acks from the broker which increases performance
qos=0 


class MQTT_Signal_producer(object):

    """
    This class handles all signals that are published through the mqtt message protocol.
    For each new signal an object of this class is created and saved into the dictionaries
    that are specified in main.py. URL and port of the used mqtt-broker are specified in the 
    broker and port variables at the start of this module. Note that host.docker.internal is 
    an alias for localhost which allows applications that are run inside of docker containers 
    to connect to the local network.
    Also note that the MQTT broker is not included in the docker setup of this project and needs
    to be configured manually. 

    """    
    
    def __init__(self,type,name,args):
        """
        Called when a new signal that uses the mqtt message protocol is created. 
        Creates an object that has the parameters of the signal stored in its variables.
        Note that signals are not initially running on creation and need to be patched
        once. Also note that the this object is polimorphic, which means that the args 
        dictionary contains different entries for different signal types.

        Args:
            type (String): Type of the signal. The following values are valid: 'random', 'sinus', 'cosinus', 'emphasized', 'spiked'
            name (String): Name of the signal.
            args (Dictionary): A dictionary that contains all parameters of the corresponding signal.
        """        
        # Create a client instance of the paho_mqtt client module
        self.client = mqtt_client.Client(name)
        
        # Set the topic to which the signal gets published to 
        self.topic = f"mqtt/{name}"

        # Type and state of the object are initially declared
        self.running = False
        self.type = type

        # Depending on the type of the new signal a coresponding function is called that stores the parameters into the objects variables.
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
        """Called when a new signal of the type 'random' is created.

        Args:
            random_args (Dictionary): A dictionary which contains the necessary parameters for a random signal which are: 

            lowerBoundary (float): The lower boundary of the random signal
            upperBoundary (float): The upper boundary of the random signal
            transmissionFrequency(float): The pause in between ticks of the signal

        """  
        self.lowerBoundary = random_args["lowerBoundary"]
        self.upperBoundary = random_args["upperBoundary"]
        self.transmissionFrequency = random_args["transmissionFrequency"]

    def sinus_constructor(self,sinus_args):
        """Called when a new signal of the type 'sinus' is created.

        Args:
            sinus_args (Dictionary): A dictionary which contains the necessary parameters for a random signal which are: 

            frequency (float): The frequency of the sinus signal 
            amplitude (float): The amplitude of the sinus signal 
            transmissionFrequency(float): The pause in between ticks of the signal

        """  
        self.frequency = sinus_args["frequency"]
        self.amplitude = sinus_args["amplitude"]
        self.transmissionFrequency = sinus_args["transmissionFrequency"]

    def cosinus_constructor(self,cosinus_args):
        """Called when a new signal of the type 'cosinus' is created.

        Args:
            cosinus_args (Dictionary): A dictionary which contains the necessary parameters for a random signal which are: 

            frequency (float): The frequency of the cosinus signal 
            amplitude (float): The amplitude of the cosinus signal 
            transmissionFrequency(float): The pause in between ticks of the signal

        """ 
        self.frequency = cosinus_args["frequency"]
        self.amplitude = cosinus_args["amplitude"]
        self.transmissionFrequency = cosinus_args["transmissionFrequency"]

    def spiked_constructor(self,spiked_args):
        """Called when a new signal of the type 'spiked' is created.

        Args:
            spiked_args (Dictionary): A dictionary which contains the necessary parameters for a spiked signal which are: 

            base (float): The signal's baseline
            distance (float): The amount of ticks in between potential spikes 
            probability (float): The probability that a spike occurs. Must be in range of 0-1
            size (float): The size of the spikes 
            transmissionFrequency(float): The pause in between ticks of the signal

        """ 
        self.base = spiked_args["base"]
        self.distance = spiked_args["distance"]
        self.propability = spiked_args["propability"]
        self.size = spiked_args["size"]
        self.transmissionFrequency = spiked_args["transmissionFrequency"]

    def emphaiszed_constructor(self,emphasized_args):
        """Called when a new signal of the type 'emphasized' is created.

        Args:
            emphasized_args (Dictionary): A dictionary which contains the necessary parameters for a random signal which are: 

            center (float): The center of the normally distributed signal 
            scale (float): The standard deviation of the normally distributed signal
            transmissionFrequency(float): The pause in between ticks of the signal

        """ 
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

            #Connect to the broker
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
        """A stream of random numbers between the specified boundaries that are stored in the object's variables is created and sent to the mqtt topic 'mqtt/{signal_name}'
        """
        while(self.running):
            random_number = random.uniform(self.lowerBoundary,self.upperBoundary)
            self.client.publish(topic = self.topic, payload = random_number, qos=qos)
            sleep(self.transmissionFrequency)

    def sendSinusSignal(self):
        """A datastream, which follows a sinus curve is created and set to the mqtt topic 'mqtt/{signal_name}'
        """
        while(self.running):
            for i in range(0, 360):
                if not self.running: 
                    break
                periodic_number = self.amplitude * math.sin(self.frequency * math.radians(i))
                self.client.publish(self.topic, payload = periodic_number, qos=qos)
                sleep(self.transmissionFrequency)
    
    def sendCosinusSignal(self):
        """A datastream, which follows a cosinus curve is created and set to the mqtt topic 'mqtt/{signal_name}'
        """
        while(self.running):
            for i in range(0, 360):
                if not self.running: 
                    break
                periodic_number = self.amplitude * math.cos(self.frequency * math.radians(i))
                self.client.publish(self.topic, payload = periodic_number, qos=qos)
                sleep(self.transmissionFrequency)

    def sendEmphasizedRandomSignal(self):
        """A datastream that follows a gaussian ditribution curve is created and sent to the mqtt topic 'mqtt/{signal_name}'
        """
        while(self.running):
            data = normal(loc=self.center, scale=self.scale, size=200)
            for i in data:
                if not self.running: 
                    break
                emphasized_number = i
                self.client.publish(self.topic, payload = emphasized_number, qos=qos)
                sleep(self.transmissionFrequency)

    def sendSpikedSignal(self):
        """A datastream with a specified baseline and potential spikes in regular intervals is created and sent to the mqtt topic 'mqtt/{signal_name}'
        """
        i = 0
        while(self.running):
            if i % self.distance == 0 and random.random() <= self.propability:
                spiked_number = self.base + self.size
            else:
                spiked_number = self.base
            self.client.publish(self.topic, payload = spiked_number, qos=qos)
            sleep(self.transmissionFrequency)
            i = i + 1





        