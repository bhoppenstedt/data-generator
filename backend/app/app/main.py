# Import installed packages
from flask import Flask, jsonify
from flask_restful import Resource, Api,reqparse
from numpy import add
from message_producer import Random_signal_producer,Sinus_signal_producer,Cosinus_signal_producer,Spiked_signal_producer,Emphasized_signal_producer

# Import app code
app = Flask(__name__)
api = Api(app)


running_signal_objects={}
running_signal_args={}


random_arguments = reqparse.RequestParser()
random_arguments.add_argument("lowerBoundary", type = int, required=True)
random_arguments.add_argument("upperBoundary", type = int, required=True)
random_arguments.add_argument("transmissionFrequency", type = float, required=True)

sinus_arguments = reqparse.RequestParser()
sinus_arguments.add_argument("frequency", type = float, required=True)
sinus_arguments.add_argument("amplitude", type = float, required=True)
sinus_arguments.add_argument("transmissionFrequency", type = float, required=True)

cosinus_arguments = reqparse.RequestParser()
cosinus_arguments.add_argument("frequency", type = float, required=True)
cosinus_arguments.add_argument("amplitude", type = float, required=True)
cosinus_arguments.add_argument("transmissionFrequency", type = float, required=True)

emphasized_arguments = reqparse.RequestParser()
emphasized_arguments.add_argument("center", type = float, required=True)
emphasized_arguments.add_argument("scale", type = float, required=True)
emphasized_arguments.add_argument("transmissionFrequency", type = float, required=True)

spiked_arguments = reqparse.RequestParser()
spiked_arguments.add_argument("base", type = float, required=True)
spiked_arguments.add_argument("distance", type = float, required=True)
spiked_arguments.add_argument("propability", type = float, required=True)
spiked_arguments.add_argument("size", type = float, required=True)
spiked_arguments.add_argument("transmissionFrequency", type = float, required=True)

class RandomSignal(Resource):
    def put(self,signal_name):

        if signal_name in running_signal_args:
             return "Signal name already in use"

        args = random_arguments.parse_args()
        args["type"] = "random_signal"
        args["running"] = False

        producer = Random_signal_producer(args["lowerBoundary"],args["upperBoundary"],args["transmissionFrequency"])

        running_signal_objects[signal_name] = producer
        running_signal_args[signal_name] = args

        return True
    def patch(self,signal_name):
        if running_signal_args[signal_name]["type"] != "random_signal":
            return "invalid request for this URL "

        running_signal_args[signal_name]["running"] = not running_signal_args[signal_name]["running"]
        running_signal_objects[signal_name].patch()
        return True
    def delete(self,signal_name):
        if running_signal_args[signal_name]["type"] != "random_signal":
            return "invalid request for this URL "
            
        running_signal_objects[signal_name].running = False 

        del running_signal_objects[signal_name]
        del running_signal_args[signal_name]

        return running_signal_args



class SinusSignal(Resource):
    def put(self,signal_name):

        if signal_name in running_signal_args:
             return "Signal name already in use"

        args = sinus_arguments.parse_args()
        args["type"] = "sinus_signal"
        args["running"] = False

        producer = Sinus_signal_producer(args["frequency"],args["amplitude"],args["transmissionFrequency"])

        running_signal_objects[signal_name] = producer
        running_signal_args[signal_name] = args

        return True
    def patch(self,signal_name):

        running_signal_args[signal_name]["running"] = not running_signal_args[signal_name]["running"]
        running_signal_objects[signal_name].patch()

        return True
    def delete(self,signal_name):

        running_signal_objects[signal_name].running = False 

        del running_signal_objects[signal_name]
        del running_signal_args[signal_name]

        return running_signal_args


class CosinusSignal(Resource):
    def put(self,signal_name):

        if signal_name in running_signal_args:
             return "Signal name already in use"

        args = cosinus_arguments.parse_args()
        args["type"] = "cosinus_signal"
        args["running"] = False

        producer = Cosinus_signal_producer(args["frequency"],args["amplitude"],args["transmissionFrequency"])

        running_signal_objects[signal_name] = producer
        running_signal_args[signal_name] = args

        return True
    def patch(self,signal_name):
        running_signal_args[signal_name]["running"] = not running_signal_args[signal_name]["running"]
        running_signal_objects[signal_name].patch()
        return True

    def delete(self,signal_name):
        running_signal_objects[signal_name].running = False 

        del running_signal_objects[signal_name]
        del running_signal_args[signal_name]

        return running_signal_args




class  EmphasizedSignal(Resource):
    def put(self,signal_name):

        if signal_name in running_signal_args:
             return "Signal name already in use"

        args = emphasized_arguments.parse_args()
        args["type"] = "emphasized_signal"
        args["running"] = False
        
        producer = Emphasized_signal_producer(args["center"],args["scale"],args["transmissionFrequency"])

        running_signal_objects[signal_name] = producer
        running_signal_args[signal_name] = args

        return True
    def patch(self,signal_name):
        running_signal_args[signal_name]["running"] = not running_signal_args[signal_name]["running"]
        running_signal_objects[signal_name].patch()
        return True

    def delete(self,signal_name):
        running_signal_objects[signal_name].running = False 

        del running_signal_objects[signal_name]
        del running_signal_args[signal_name]

        return running_signal_args

class  SpikedSignal(Resource):
    def put(self,signal_name):

        if signal_name in running_signal_args:
             return "Signal name already in use"

        args = spiked_arguments.parse_args()
        args["type"] = "spiked_signal"
        args["running"] = False

        producer = Spiked_signal_producer(args["base"],args["distance"],args["propability"], args["size"],args["transmissionFrequency"])

        running_signal_objects[signal_name] = producer
        running_signal_args[signal_name] = args

        return True
    def patch(self,signal_name):
        running_signal_args[signal_name]["running"] = not running_signal_args[signal_name]["running"]
        running_signal_objects[signal_name].patch()
        return True
        
    def delete(self,signal_name):
        running_signal_objects[signal_name].running = False 

        del running_signal_objects[signal_name]
        del running_signal_args[signal_name]

        return running_signal_args

class GetAllSignals(Resource):
    def get(self):
        return running_signal_args


api.add_resource(GetAllSignals, '/api/signals/')
api.add_resource(RandomSignal, '/api/random/<string:signal_name>/')
api.add_resource(SinusSignal, '/api/sinus/<string:signal_name>/')
api.add_resource(CosinusSignal, '/api/cosinus/<string:signal_name>/')
api.add_resource(EmphasizedSignal, '/api/emphasized/<string:signal_name>/')
api.add_resource(SpikedSignal, '/api/spiked/<string:signal_name>/')

@app.route("/api/")
def root():
    return jsonify({"message": "Message"})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=80)

  
  
