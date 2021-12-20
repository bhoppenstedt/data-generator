# Import installed packages
from flask import Flask, jsonify
from flask_restful import Resource, Api,reqparse
from numpy import add
from message_producer import Random_signal_producer,Sinus_signal_producer,Cosinus_signal_producer,Spiked_signal_producer,Emphasized_signal_producer

# Import app code
app = Flask(__name__)
api = Api(app)


running_signals={}

random_arguments = reqparse.RequestParser()
random_arguments.add_argument("lowerBoundary", type = int)
random_arguments.add_argument("upperBoundary", type = int)
random_arguments.add_argument("transmissionFrequency", type = float)

sinus_arguments = reqparse.RequestParser()
sinus_arguments.add_argument("frequency", type = float)
sinus_arguments.add_argument("amplitude", type = float)
sinus_arguments.add_argument("transmissionFrequency", type = float)

cosinus_arguments = reqparse.RequestParser()
cosinus_arguments.add_argument("frequency", type = float)
cosinus_arguments.add_argument("amplitude", type = float)
cosinus_arguments.add_argument("transmissionFrequency", type = float)


emphasized_arguments = reqparse.RequestParser()
emphasized_arguments.add_argument("center", type = float)
emphasized_arguments.add_argument("scale", type = float)
emphasized_arguments.add_argument("transmissionFrequency", type = float)

spiked_arguments = reqparse.RequestParser()
spiked_arguments.add_argument("base", type = float)
spiked_arguments.add_argument("distance", type = float)
spiked_arguments.add_argument("propability", type = float)
spiked_arguments.add_argument("size", type = float)
spiked_arguments.add_argument("transmissionFrequency", type = float)

class RandomSignal(Resource):
    def put(self,signal_name):
        args = random_arguments.parse_args()
        running_signals[signal_name] = args
        signal_name = Random_signal_producer(args["lowerBoundary"],args["upperBoundary"],args["transmissionFrequency"])
        signal_name.sendRandomSignal()
    

class SinusSignal(Resource):
    def put(self,signal_name):
        args = sinus_arguments.parse_args()
        running_signals[signal_name] = args
        signal_name = Sinus_signal_producer(args["frequency"],args["amplitude"],args["transmissionFrequency"])
        signal_name.sendPeriodicSinusSignal()

class  CosinusSignal(Resource):
    def put(self,signal_name):
        args = sinus_arguments.parse_args()
        running_signals[signal_name] = args
        signal_name = Cosinus_signal_producer(args["frequency"],args["amplitude"],args["transmissionFrequency"])
        signal_name.sendPeriodicSinusSignal()



api.add_resource(RandomSignal, '/api/random/<string:signal_name>/')
api.add_resource(SinusSignal, '/api/sinus/<string:signal_name>/')
api.add_resource(CosinusSignal, '/api/cosinus/<string:signal_name>/')

@app.route("/api/")
def root():
    return jsonify({"message": "Message"})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=80)

  
  
