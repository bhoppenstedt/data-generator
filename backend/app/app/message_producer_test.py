import json,random,math
from numpy.random import normal
from time import sleep
from kafka import KafkaProducer


def serialize(signal):
    """Serialisierung des übergebenen Signals."""
    return json.dumps(signal).encode(('utf-8'))

producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    api_version=(0,11,5)
    )    



def sendRandomSignal(lowerBoundary, upperBoundary,transmissionFrequency):
    """Es wird eine Random-Zahl zwischen 'lowerBoundary' und 'upperBoundary' erstellt und diese an das Kafka Topic "Random Signal" geschickt. 
    'transmissionFrequency' beschreibt die Übertragungsrate des Signals.
    
    Args:
        lowerBoundary (int): Die untere Grenze des Signals        
        upperBoundary (int): Die obere Grenze des Signals
        transmissionFrequency(float): Pause zwischen den einzelnen Werten des Signals
    """
    
    while(True):
        random_number= int(random.randint(lowerBoundary,upperBoundary))
        print(f"Sending number {random_number}")
        producer.send('Random-Signal', value=serialize((random_number)))
        sleep(transmissionFrequency)
        
        

def sendPeriodicSinusSignal(frequency,amplitude,transmissionFrequency):
    """Es wird ein Sinus-Singal mit der übergebenen Frequenz und Amplitude erstellt und an das Kafka Topic "Periodic Signal" geschickt. 
    'transmissionFrequency' beschreibt die Übertragungsrate des Signals.

    Args:
        frequency (float): Die Frequenz des Signals
        amplitude (float): Die Amplitude des Signals
        transmissionFrequency(float): Pause zwischen den einzelnen Werten des Signals
    """
    while(True):
        for i in range(0,360):
            periodic_number= amplitude*math.sin(frequency*math.radians(i))
            print(f"Sending number {periodic_number}")
            producer.send('Periodic-Signal', value=serialize(periodic_number))
            sleep(transmissionFrequency)
            

def sendPeriodicCosinusSignal(frequency,amplitude,transmissionFrequency):
    """Es wird ein Cosinus-Singal mit der übergebenen Frequenz und Amplitude erstellt und an das Kafka Topic "Periodic Signal" geschickt. 
    'transmissionFrequency' beschreibt die Übertragungsrate des Signals.

    Args:
        frequence (float): Die Frequenz des Signals
        amplitude (float): Die Amplitude des Signals
        transmissionFrequency(float): Pause zwischen den einzelnen Werten des Signals
    """
    while(True):
        for i in range(0,360):
            periodic_number = amplitude*math.cos(frequency*math.radians(i))
            print(f"Sending number {periodic_number}")
            producer.send('Periodic-Signal', value=serialize(periodic_number))
            sleep(transmissionFrequency)


def sendEmphasisedRandomSinal(center,scale,transmissionFrequency):
    """Es wird ein Signal, das einer Normalverteilung mit dem Erwartungswert 'center' und der Standardabweichung 'scale' folgt erstellt und an das Kafka Topic "Emphasised Signal"
    geschickt. 'transmissionFrequency' beschreibt die Übertragungsrate des Signals.

    Args:
        center (float): Der Erwartungswert der Normalverteilung
        scale (float): Die Standardabweichung der Normalverteilung
        transmissionFrequency(float): Pause zwischen den einzelnen Werten des Signals
    """    
    while(True):
        data = normal(loc=center, scale=scale, size=200)
        for i in data:
            emphasisedNumber = i
            print(f"Sending number {emphasisedNumber}")
            producer.send('Emphasised-Signal', value=serialize(emphasisedNumber))
            sleep(transmissionFrequency)


def sendSpikedSignal(base, distance, propability, size, transmissionFrequency):
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
    while(True):
        if i % distance == 0 and random.random() <= propability:
            spiked_number = base + size
            print(f"Sending number {spiked_number}")
        else:
            spiked_number = base 
            print(f"Sending number {spiked_number}")
        producer.send('Spiked-Signal', value=serialize(spiked_number))
        sleep(transmissionFrequency)
        i=i+1
    

       
        

#sendSpikedSignal(4,0.8,3.5,100)
#sendEmphasisedRandomSinal(100,8)
#sendPeriodicSinusSignal(5,30,.2)
#sendRandomSignal(1,100000,1)
        

