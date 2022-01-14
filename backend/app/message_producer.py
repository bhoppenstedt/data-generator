import json
import random
import math
from numpy.random import normal
from time import sleep
from kafka import KafkaProducer


def serialize(signal):
    """Serializing the signal."""
    return json.dumps(signal).encode(('utf-8'))


class Random_signal_producer(object):

    def __init__(self, lowerBoundary, upperBoundary, transmissionFrequency):
        """Called when an new signal of the corresponding type is created. Creats an object that has the parameters of the signal stored in its variables. Note that the signal
        is not intially running and has to be patched once at the start.

        Args:
            lowerBoundary (int): The lower boundary of the random signal
            upperBoundary (int): The upper boundary of the random signal
            transmissionFrequency(float): The pause in between ticks of the signal
        """
        self.producer = KafkaProducer(
            bootstrap_servers=['kafka:9092']
        )
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
        self.sendRandomSignal()
        return True

    def sendRandomSignal(self):
        """A random signal with the parameters of the corresponding signal is created and sent to the kafka topic 'Random-Signal'.
        """
        while(self.running):
            random_number = int(
                random.randint(
                    self.lowerBoundary,
                    self.upperBoundary))
            print(f"Sending number {random_number}")
            self.producer.send(
                'Random-Signal',
                value=serialize(
                    (random_number)))
            sleep(self.transmissionFrequency)


class Sinus_signal_producer(object):

    def __init__(self, frequency, amplitude, transmissionFrequency):
        """Called when an new signal of the corresponding type is created. Creats an object that has the parameters of the signal stored in its variables. Note that the signal
        is not intially running and has to be patched once at the start.


        Args:
            frequency (float): The frequency of the sinus signal.
            amplitude (float): The amplitude of the sinus signal.
            transmissionFrequency(float): The pause in between ticks of the signal
        """
        self.producer = KafkaProducer(
            bootstrap_servers=['localhost:9092']
        )
        self.running = False
        self.frequency = frequency
        self.amplitude = amplitude
        self.transmissionFrequency = transmissionFrequency

    def patch(self):
        """[Start/Pause the signal]

        Returns:
            [Bool]: [Returns true if successful. Note there's no Return when starting a signal]
        """
        self.running = not self.running
        self.sendSinusSignal()
        return True

    def sendSinusSignal(self):
        """A sinus signal with the parameters of the corresponding object is created and sent to the kafka topic 'Sinus-Signal'.
        """
        while(self.running):
            for i in range(0, 360):
                periodic_number = self.amplitude * \
                    math.sin(self.frequency * math.radians(i))
                print(f"Sending number {periodic_number}")
                self.producer.send(
                    'Sinus-Signal',
                    value=serialize(periodic_number))
                sleep(self.transmissionFrequency)
                if(not self.running):
                    break


class Cosinus_signal_producer(object):

    def __init__(self, frequency, amplitude, transmissionFrequency):
        """Called when an new signal of the corresponding type is created. Creats an object that has the parameters of the signal stored in its variables. Note that the signal
        is not intially running and has to be patched once at the start.


        Args:
            frequency (float): The frequency of the sinus signal.
            amplitude (float): The amplitude of the sinus signal.
            transmissionFrequency(float): The pause in between ticks of the signal
        """

        self.producer = KafkaProducer(
            bootstrap_servers=['localhost:9092']
        )
        self.running = False
        self.frequency = frequency
        self.amplitude = amplitude
        self.transmissionFrequency = transmissionFrequency

    def patch(self):
        """[Start/Pause the signal]

        Returns:
            [Bool]: [Returns true if successful. Note there's no Return when starting a signal]
        """

        self.running = not self.running
        self.sendCosinusSignal()
        return True

    def sendCosinusSignal(self):
        """A cosinus signal with the parameters of the corresponding object is created and sent to the kafka topic 'Cosinus-Signal'.
        """

        while(self.running):
            for i in range(0, 360):
                periodic_number = self.amplitude * \
                    math.cos(self.frequency * math.radians(i))
                print(f"Sending number {periodic_number}")
                self.producer.send(
                    'Cosinus-Signal',
                    value=serialize(periodic_number))
                sleep(self.transmissionFrequency)
                if(not self.running):
                    break


class Emphasized_signal_producer(object):

    def __init__(self, center, scale, transmissionFrequency):
        """Called when an new signal of the corresponding type is created. Creats an object that has the parameters of the signal stored in its variables. Note that the signal
        is not intially running and has to be patched once at the start.


        Args:
            center (float): The expected value of the normal distribution
            scale (float): The standard deviation of the normal distribution
            transmissionFrequency(float): The pause in between ticks of the signal
        """
        self.producer = KafkaProducer(
            bootstrap_servers=['localhost:9092']
        )
        self.running = False
        self.center = center
        self.scale = scale
        self.transmissionFrequency = transmissionFrequency

    def patch(self):
        """[Start/Pause the signal]

        Returns:
            [Bool]: [Returns true if successful. Note there's no Return when starting a signal]
        """
        self.running = not self.running
        self.sendEmphasizedRandomSignal()
        return True

    def sendEmphasizedRandomSignal(self):
        """A normally distributed signal with the parameters of the corresponding object is created and sent to the kafka topic 'Emphasized-Signal'.
        """
        while(self.running):
            data = normal(loc=self.center, scale=self.scale, size=200)
            for i in data:
                emphasizedNumber = i
                print(f"Sending number {emphasizedNumber}")
                self.producer.send(
                    'Emphasized-Signal',
                    value=serialize(emphasizedNumber))
                sleep(self.transmissionFrequency)
                if(not self.running):
                    break


class Spiked_signal_producer(object):

    def __init__(self,base,distance,propability,size,transmissionFrequency):
        """Called when an new signal of the corresponding type is created. Creats an object that has the parameters of the signal stored in its variables. Note that the signal
        is not intially running and has to be patched once at the start.


        Args:
            base (float): The signals base
            distance (float): The distance between potential spikes
            propability (float): The propability of a spike occuring
            size (float): The size of the spikes
            transmissionFrequency(float): The pause in between ticks of the signal
        """
        self.producer = KafkaProducer(
            bootstrap_servers=['localhost:9092']
        )
        self.running = False
        self.base = base
        self.distance = distance
        self.propability = propability
        self.size = size
        self.transmissionFrequency = transmissionFrequency

    def patch(self):
        """[Start/Pause the signal]

        Returns:
            [Bool]: [Returns true if successful. Note there's no Return when starting a signal]
        """
        self.running = not self.running
        self.sendSpikedSignal()
        return True

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
