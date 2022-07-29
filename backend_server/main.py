import tornado.ioloop
import tornado.web
import tornado.websocket
import paho.mqtt.client as mqtt
import threading
import asyncio

connections = set()
class TestWebSocket(tornado.websocket.WebSocketHandler):

    def check_origin(self, origin):
        return True

    def open(self):
        connections.add(self)
        print("WebSocket opened")

    def on_message(self, message):
        self.write_message("You said: " + message)

    def on_close(self):
        connections.remove(self)
        print("WebSocket closed")

def on_connect(client, userdata, flags, rc):
   print("Connected With Result Code "+str(rc))


def on_disconnect(client, userdata, rc):
   print("Client Got Disconnected")

def on_message(client, userdata, message):
   print("Message: "+message.payload.decode())
   for conn in connections:
       conn.write_message(message.payload.decode())

def mqtt_client(loop):
    asyncio.set_event_loop(loop)
    broker_url = "broker.hivemq.com"
    broker_port = 1883
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_disconnect = on_disconnect
    client.on_message = on_message
    client.connect(broker_url, broker_port)
    client.subscribe("Device:1")
    client.loop_forever()

class main(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html")

def make_app():
    return tornado.web.Application([(r"/websocket",TestWebSocket),(r"/",main)])

if __name__ == "__main__":
    loop = asyncio.new_event_loop()
    threading.Thread(target=mqtt_client,args=(loop,)).start()
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()