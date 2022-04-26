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
This application runs with docker compose and can be started by cloning this repository and running 'docker compose up'  
in the root directory. Note that the mqtt broker is not included in the docker setup of this project and needs to be  
configured manually. This can be done by installing the local [mosquitto broker](https://mosquitto.org/download/) that implements  
the mqtt message protocol. Alternatively an external broker can be used by simply changing the address that is stored in the broker 
variable at the start of the mqtt_message_producer module to the address of said broker. 


Usage 
------

* Kafka:  


