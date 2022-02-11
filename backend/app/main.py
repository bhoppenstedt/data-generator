# Import installed packages
from cProfile import run
import json
from flask import Flask, jsonify
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS 
from numpy import add
from message_producer import Random_signal_producer, Sinus_signal_producer, Cosinus_signal_producer, Spiked_signal_producer, Emphasized_signal_producer

# Initialize Server and API
app = Flask(__name__)
api = Api(app)
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
    def put(self, signal_type, signal_name):

        # Check if the the given name is already in use 
        for index in running_signal_args:
            if signal_name == index['name']:
                return "Signal name already in use"

        # Add the arguments of the signal to the args dictionary and create the correct producer object 
        if(signal_type == "random"):
            args = random_arguments.parse_args()
            args["type"] = "random"
            args["running"] = False
            args["name"] = signal_name

            producer = Random_signal_producer(args["lowerBoundary"],args["upperBoundary"],args["transmissionFrequency"])

        elif(signal_type == "sinus"):
            args = sinus_arguments.parse_args()
            args["type"] = "sinus"
            args["running"] = False
            args["name"] = signal_name

            producer = Sinus_signal_producer(args["frequency"],args["amplitude"],args["transmissionFrequency"])

        elif(signal_type=="cosinus"):
            args = cosinus_arguments.parse_args()
            args["type"] = "cosinus"
            args["running"] = False
            args["name"] = signal_name

            producer = Cosinus_signal_producer(args["frequency"],args["amplitude"],args["transmissionFrequency"])
        
        elif(signal_type=="emphasized"):
            args = emphasized_arguments.parse_args()
            args["type"] = "emphasized"
            args["running"] = False
            args["name"] = signal_name

            producer = Emphasized_signal_producer(args["center"], args["scale"], args["transmissionFrequency"])

        elif(signal_type=="spiked"):
            args = spiked_arguments.parse_args()
            args["type"] = "spiked"
            args["running"] = False
            args["name"] = signal_name

            producer = Spiked_signal_producer(args["base"],args["distance"],args["propability"],args["size"],args["transmissionFrequency"])

        else:
            return "Invalid signal type"


        # Add the signal object to the objects dictionary 
        running_signal_objects[signal_name] = producer 

        # Add the arguments of the signal to the args dictionary 
        running_signal_args.append(args)

        # Return all existing signals
        return json.dumps(running_signal_args)

    def patch(self, signal_type,signal_name):
        
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

    def delete(self, signal_type, signal_name):
        
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

    # Return all existing signals
    def get(self):
        return json.dumps(running_signal_args)

# Add endpoint for GET requests
api.add_resource(GetAllSignals, '/api/signals/')

# Add endpoints for PUT, PATCH, DELETE requests
api.add_resource(HandleSignals,'/api/<string:signal_type>/<string:signal_name>/')

@app.route("/api/")
def root():
    return jsonify({"message": "Message"})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
