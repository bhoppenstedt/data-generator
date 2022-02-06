import paho.mqtt.client as mqtt

broker="localhost"
port = 1883

def on_publish(client,userdata,result):             #create function for callback
    print("data published \n")
    
client1= mqtt.Client("control1")                           #create client object
client1.on_publish = on_publish                          #assign function to callback
client1.connect(broker,port)                                 #establish connection
ret= client1.publish("house/bulb1","on")                   #publish