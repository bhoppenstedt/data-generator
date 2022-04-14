FROM tiangolo/uwsgi-nginx-flask:python3.8

RUN pip install flask_cors
RUN pip install kafka-python
RUN pip install numpy
RUN pip install flask-restful
RUN pip install paho-mqtt
RUN pip install flask-swagger-ui
RUN pip install flask_socketio


COPY ./app /app
