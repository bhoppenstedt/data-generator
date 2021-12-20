import json,random,math
from numpy.random import normal
from time import sleep
from kafka import KafkaProducer


def serialize(signal):
    """Serialisierung des übergebenen Signals."""
    return json.dumps(signal).encode(('utf-8'))
   

class Random_signal_producer(object):

    def __init__(self,lowerBoundary,upperBoundary,transmissionFrequency): 
        self.producer= KafkaProducer(
        bootstrap_servers=['localhost:9092']
        ) 
        self.running=True
        self.lowerBoundary=lowerBoundary
        self.upperBoundary=upperBoundary
        self.transmissionFrequency=transmissionFrequency


    def sendRandomSignal(self):
        """Es wird eine Random-Zahl zwischen 'lowerBoundary' und 'upperBoundary' erstellt und diese an das Kafka Topic "Random Signal" geschickt. 
        'transmissionFrequency' beschreibt die Übertragungsrate des Signals.
        
        Args:
            lowerBoundary (int): Die untere Grenze des Signals        
            upperBoundary (int): Die obere Grenze des Signals
            transmissionFrequency(float): Pause zwischen den einzelnen Werten des Signals
        """
        while(self.running):
            random_number= int(random.randint(self.lowerBoundary,self.upperBoundary))
            print(f"Sending number {random_number}")
            self.producer.send('Random-Signal', value = serialize((random_number)))
            sleep(self.transmissionFrequency)

        
class Sinus_signal_producer(object): 

    def __init__(self,frequency,amplitude,transmissionFrequency): 
        self.producer= KafkaProducer(
        bootstrap_servers=['localhost:9092']
        )  
        self.running=True
        self.frequency=frequency
        self.amplitude=amplitude
        self.transmissionFrequency=transmissionFrequency   

    def sendPeriodicSinusSignal(self):
        """Es wird ein Sinus-Singal mit der übergebenen Frequenz und Amplitude erstellt und an das Kafka Topic "Periodic Signal" geschickt. 
        'transmissionFrequency' beschreibt die Übertragungsrate des Signals.

        Args:
            frequency (float): Die Frequenz des Signals
            amplitude (float): Die Amplitude des Signals
            transmissionFrequency(float): Pause zwischen den einzelnen Werten des Signals
        """
        while(self.running):
            for i in range(0,360):
                periodic_number= self.amplitude*math.sin(self.frequency*math.radians(i))
                print(f"Sending number {periodic_number}")
                self.producer.send('Periodic-Signal', value=serialize(periodic_number))
                sleep(self.transmissionFrequency)
                if(not self.running):
                    break
    
                

class Cosinus_signal_producer(object): 

    def __init__(self,frequency,amplitude,transmissionFrequency): 
        self.producer= KafkaProducer(
        bootstrap_servers=['localhost:9092']
        )  
        self.running=True
        self.frequency=frequency
        self.amplitude=amplitude
        self.transmissionFrequency=transmissionFrequency   

    def sendPeriodicCosinusSignal(self):
        """Es wird ein Sinus-Singal mit der übergebenen Frequenz und Amplitude erstellt und an das Kafka Topic "Periodic Signal" geschickt. 
        'transmissionFrequency' beschreibt die Übertragungsrate des Signals.

        Args:
            frequency (float): Die Frequenz des Signals
            amplitude (float): Die Amplitude des Signals
            transmissionFrequency(float): Pause zwischen den einzelnen Werten des Signals
        """
        while(self.running):
            for i in range(0,360):
                periodic_number= self.amplitude*math.cos(self.frequency*math.radians(i))
                print(f"Sending number {periodic_number}")
                self.producer.send('Periodic-Signal', value=serialize(periodic_number))
                sleep(self.transmissionFrequency)
                if(not self.running):
                    break
                
class Emphasized_signal_producer(object):

    def __init__(self,center,scale,transmissionFrequency):
        self.producer= KafkaProducer(
        bootstrap_servers=['localhost:9092']
        ) 
        self.running=True
        self.center=center
        self.scale=scale
        self.transmissionFrequency=transmissionFrequency

    def sendEmphasizedRandomSignal(self):
        """Es wird ein Signal, das einer Normalverteilung mit dem Erwartungswert 'center' und der Standardabweichung 'scale' folgt erstellt und an das Kafka Topic "Emphasised Signal"
        geschickt. 'transmissionFrequency' beschreibt die Übertragungsrate des Signals.

        Args:
            center (float): Der Erwartungswert der Normalverteilung
            scale (float): Die Standardabweichung der Normalverteilung
            transmissionFrequency(float): Pause zwischen den einzelnen Werten des Signals
        """    
        while(self.running):
            data = normal(loc=self.center, scale=self.scale, size=200)
            for i in data:
                emphasizedNumber = i
                print(f"Sending number {emphasizedNumber}")
                self.producer.send('Emphasized-Signal', value=serialize(emphasizedNumber))
                sleep(self.transmissionFrequency)
                if(not self.running):
                    break

class Spiked_signal_producer(object):

    def __init__(self,base,distance,propability,size,transmissionFrequency):
        self.producer= KafkaProducer(
        bootstrap_servers=['localhost:9092']
        ) 
        self.running=True
        self.base=base
        self.distance=distance
        self.propability=propability
        self.size=size
        self.transmissionFrequency=transmissionFrequency

    def sendSpikedSignal(self):
        """Es wird ein Signal mit der Basis 'base' erstellt, welches in Abständen 'distance' mit der Wahrscheinlichkeit 'propablity' einen Spike der Größe 'size' besitzt.
        'transmissionFrequency' beschreibt die Übertragungsrate des Signals.

        Args:
            base (float): Die Basis des Signals
            distance (float): Der Abstand in dem ein potentieller Spike entsteht
            propability (float): Die Wahrscheinlichkeit für einen Spike
            size (float): Die Größe der Spikes
            transmissionFrequency(float): Pause zwischen den einzelnen Werten des Signals
        """    
        i=0
        while(self.running):
            if i % self.distance == 0 and random.random() <= self.propability:
                spiked_number = self.base + self.size
                print(f"Sending number {spiked_number}")
            else:
                spiked_number = self.base 
                print(f"Sending number {spiked_number}")
            self.producer.send('Spiked-Signal', value=serialize(spiked_number))
            sleep(self.transmissionFrequency)
            i=i+1
    


