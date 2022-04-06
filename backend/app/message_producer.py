import json, random , math 
from numpy.random import normal
from time import sleep
from kafka import KafkaProducer


bootstrap_servers=['localhost:9092']

def serialize(signal):
    """Serializing the signal."""
    return json.dumps(signal).encode(('utf-8'))


class Kafka_signal_producer(object):

    def __init__(self, type, name , args):
        """Called when an new signal of the corresponding type is created. Creats an object that has the parameters of the signal stored in its variables. Note that the signal
        is not intially running and has to be patched once at the start.

        Args:
            lowerBoundary (int): The lower boundary of the random signal
            upperBoundary (int): The upper boundary of the random signal
            transmissionFrequency(float): The pause in between ticks of the signal
        """
        print('reached3')
        self.producer = KafkaProducer(bootstrap_servers=bootstrap_servers)
        self.running = False
        self.type = type 
        
        if type == "random":
            self.random_constructor(args)
        elif type == "sinus":
            self.sinus_constructor(args)
        elif type == "cosinus":
            self.cosinus_constructor(args)
        elif type == "emphasized":
            self.emphasized_constructor(args)
        elif type == "spiked":
            self.spiked_constructor(args)

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

    def emphasized_constructor(self,emphasized_args):
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
        """A random signal with the parameters of the corresponding signal is created and sent to the kafka topic 'Random-Signal'.
        """
        while(self.running):
            random_number = int(random.randint(self.lowerBoundary,self.upperBoundary))
            print(f"Sending number {random_number}")
            self.producer.send('Random-Signal',value=serialize((random_number)))
            sleep(self.transmissionFrequency)

    def sendSinusSignal(self):
        """A sinus signal with the parameters of the corresponding object is created and sent to the kafka topic 'Sinus-Signal'.
        """
        while(True):
            for i in range(0, 360) and self.running:
                periodic_number = self.amplitude * math.sin(self.frequency * math.radians(i))
                print(f"Sending number {periodic_number}")
                self.producer.send('Sinus-Signal',value=serialize(periodic_number))
                sleep(self.transmissionFrequency)

    def sendCosinusSignal(self):
        """A cosinus signal with the parameters of the corresponding object is created and sent to the kafka topic 'Cosinus-Signal'.
        """

        while(True):
            for i in range(0, 360) and self.running:
                periodic_number = self.amplitude * math.cos(self.frequency * math.radians(i))
                print(f"Sending number {periodic_number}")
                self.producer.send('Cosinus-Signal',value=serialize(periodic_number))
                sleep(self.transmissionFrequency)

    def sendEmphasizedRandomSignal(self):
        """A normally distributed signal with the parameters of the corresponding object is created and sent to the kafka topic 'Emphasized-Signal'.
        """
        while(True):
            data = normal(loc=self.center, scale=self.scale, size=200)
            for i in data and self.running:
                emphasizedNumber = i
                print(f"Sending number {emphasizedNumber}")
                self.producer.send('Emphasized-Signal',value=serialize(emphasizedNumber))
                sleep(self.transmissionFrequency)
    
    def sendSpikedSignal(self):
        """A spiked signal with the parameters of the corresponding object is created and sent to the kafka topic 'Spiked-Signal'.
        """
        i = 0
        while(self.running):
            if i % self.distance == 0 and random.random() <= self.propability:
                spiked_number = self.base + self.size
                print(f"Sending number {spiked_number}")
            else:
                spiked_number = self.base
                print(f"Sending number {spiked_number}")
            self.producer.send('Spiked-Signal', value=serialize(spiked_number))
            sleep(self.transmissionFrequency)
            i = i + 1

