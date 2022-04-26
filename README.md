# Data-Generator #

Purpose
-----

This is a data generator, that generates data-streams which can be used for testing applications that work 
with real life data-streams. Type and parameters of the signals can be configured by the user through a GUI. 
Furthermore the message protocol through which the signal get published, can be selected. 
So far the event based protocols apache kafka and mqtt as well as communication through websockets are supported. 

Requirements
------------
* docker compose  
* mqtt broker (preferably local)


Getting started 
---------------
This application runs with docker compose and can be started by cloning this repository and running 'docker compose up' in the root directory.  
Note that the mqtt broker is not included in the docker setup of this project and needs to be configured manually. 
This can be done by installing the local [mosquitto broker](https://mosquitto.org/download/) that implements the mqtt message protocol. 
Alternatively an external broker can be used by simply changing the address that is stored in the broker variable at the start of the 
mqtt_message_producer module to the address of said broker. 


Usage 
------

* Kafka:  
Kafka and Zookeeper instances are included in the docker setup. Each Signal type has its own kafka topic to which it gets pulished to:  
random -> 'Random-Singal' sinus -> 'Sinus-Signal' cosinus -> 'Cosinus-Signal' normally-distributed -> 'Emphasized-Signal' spiked -> 'Spiked-Signal'

* MQTT:
As previously mentioned a seperate mqtt broker must be configured before using this event protocol. If the broker is running on 'localhost:1883' it can be
used immidiately (Note that the address 'host.docker.internal' specified in the mqtt_message_producer module is an alias for localhost). If the broker is 
running somewhere else the broker/port variables in said module must be adjusted.  
After configuring the broker this data generator can be used and the signals get published to the topic 'mqtt/<signal_name>'.

* Websockets

