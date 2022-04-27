from cProfile import run
import json
from flask import Flask, jsonify
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS 
from numpy import add
from message_producer import Kafka_signal_producer
from mqtt_message_producer import MQTT_Signal_producer
from flask_swagger_ui import get_swaggerui_blueprint
from flask_socketio import SocketIO
from test_client import SocketIOTestClient
from websockets_message_producer import Websockets_message_producer


# Initialize Server and API
app = Flask(__name__)
socketio = SocketIO(app)
api = Api(app)

test_client = SocketIOTestClient(app = app, socketio=socketio)
test_client.connect()


# Swagger Configuration

SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.json'
SWAGGER_BLUEPRINT = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config = {
        'app_name': "datastream generator"
    }
)

app.register_blueprint(SWAGGER_BLUEPRINT, url_prefix = SWAGGER_URL)


# Allow cross origin REST requests
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

# Create dictionary in which the objects of the created signals are stored
running_signal_objects = {}

# Create array in which the arguments of the created signals are stored
running_signal_args = []

# Add required arguments to each signal via the reqparse module 
random_arguments = reqparse.RequestParser()
random_arguments.add_argument("lowerBoundary", type=int, required=True)
random_arguments.add_argument("upperBoundary", type=int, required=True)
random_arguments.add_argument("transmissionFrequency",type=float,required=True)

sinus_arguments = reqparse.RequestParser()
sinus_arguments.add_argument("frequency", type=float, required=True)
sinus_arguments.add_argument("amplitude", type=float, required=True)
sinus_arguments.add_argument( "transmissionFrequency",type=float,required=True)

cosinus_arguments = reqparse.RequestParser()
cosinus_arguments.add_argument("frequency", type=float, required=True)
cosinus_arguments.add_argument("amplitude", type=float, required=True)
cosinus_arguments.add_argument("transmissionFrequency",type=float,required=True)

emphasized_arguments = reqparse.RequestParser()
emphasized_arguments.add_argument("center", type=float, required=True)
emphasized_arguments.add_argument("scale", type=float, required=True)
emphasized_arguments.add_argument("transmissionFrequency",type=float,required=True)

spiked_arguments = reqparse.RequestParser()
spiked_arguments.add_argument("base", type=float, required=True)
spiked_arguments.add_argument("distance", type=float, required=True)
spiked_arguments.add_argument("propability", type=float, required=True)
spiked_arguments.add_argument("size", type=float, required=True)
spiked_arguments.add_argument("transmissionFrequency",type=float,required=True)


class HandleSignals(Resource):
    def put(self, publisher, signal_type, signal_name):

        # Check if the the given name is already in use 
        for index in running_signal_args:
            if signal_name == index['name']:
                return "Signal name already in use"

        
        # Create args dictionary corresponding to the type 
        if(signal_type == 'random'):
            args2 = random_arguments.parse_args()
        elif(signal_type == 'sinus'):
            args2 = sinus_arguments.parse_args()
        elif(signal_type == 'cosinus'):
            args2 = cosinus_arguments.parse_args()
        elif(signal_type == 'emphasized'):
            args2 = emphasized_arguments.parse_args()        
        elif(signal_type == 'spiked'):
            args2 = spiked_arguments.parse_args()
        else:
            return "Invalid signal type "

        # Add type, name and running flag to another dictionary
        args1 = {}
        args1["name"]  = signal_name
        args1["type"] = signal_type
        args1["publisher"] = publisher
        args1["running"] = False

        # Combine the two args dictionaries
        args = {**args1, **args2}

        # Create an object of the selected publisher type 
        if publisher == "kafka":
            producer = Kafka_signal_producer(name=signal_name, args=args, type=signal_type)
        elif publisher == 'mqtt':
            producer = MQTT_Signal_producer(name=signal_name, args=args, type=signal_type)
        elif publisher == "websocket":
            producer = Websockets_message_producer(name=signal_name, args=args, type=signal_type, socketio = socketio)
        else:
            return "Invalid Publisher"

       
        # Add the signal object to the objects dictionary 
        running_signal_objects[signal_name] = producer 

        # Add the arguments of the signal to the args dictionary 
        running_signal_args.append(args)

        # Return all existing signals
        return json.dumps(running_signal_args)

    def patch(self, publisher ,signal_type,signal_name):
        
        # Check if a signal with the given name exists 
        if signal_name not in running_signal_objects: 
            return 'Signal name doesnt exist'

        # Check if the given signal type is correct
        for index in running_signal_args:
            if signal_name == index['name']:
                if signal_type != index['type']:
                    return 'Invalid request for this URL'

        # Adjust the running flag in args dictionary 
        for index in running_signal_args:
            if signal_name == index['name']:
                index['running'] = not index['running']
        
        # Start/Stop the signal
        running_signal_objects[signal_name].patch()

        # Return all existing signals
        return json.dumps(running_signal_args)

    def delete(self,publisher, signal_type, signal_name):
        
        # Check if a signal with the given name exists 
        if signal_name not in running_signal_objects: 
            return 'Signal name doesnt exist'
        
        # Check if the given signal type is correct
        for index in running_signal_args:
            if signal_name == index['name']:
                if signal_type != index['type']:
                    return 'Invalid request for this URL'

        # Stop signal
        running_signal_objects[signal_name].running = False

        # Delete the signal from the dictionaries
        del running_signal_objects[signal_name]

        for index in running_signal_args:
            if signal_name == index['name']:
                running_signal_args.remove(index)


        # Return all existing signals
        return json.dumps(running_signal_args)


class GetAllSignals(Resource):

    # Return all existing signals. Note that all signals, including paused ones are returned.
    def get(self):
        return json.dumps(running_signal_args)


class GetAllSignals2(Resource):
    
    # Return all existing signals. Note that all signals, including paused ones are returned.
    def get(self):
        return test_client.get_received()

# Add endpoint for GET requests
api.add_resource(GetAllSignals, '/api/signals/')

api.add_resource(GetAllSignals2, '/api/signals2/')

# Add endpoints for PUT, PATCH, DELETE requests
api.add_resource(HandleSignals,'/api/<string:publisher>/<string:signal_type>/<string:signal_name>/')





if __name__ == "__main__":
    socketio.run(app = app, debug=True, host="0.0.0.0", port=5000)
    #app.run(debug=True, host="0.0.0.0", port=5000)