import pika
Queue = 'NVR-Alert'
def initializeChannel():
	#Initialize queue for door signal
	credentials = pika.PlainCredentials('NVR', 'NVR')
	parameters = pika.ConnectionParameters('localhost', 5672, '/', credentials, heartbeat=0, blocked_connection_timeout=3000)

	connection = pika.BlockingConnection(parameters)
	channel = connection.channel()
	channel.queue_declare(queue=Queue,durable = True)

	#Clear queue for pre-existing messages
	channel.queue_purge(queue=Queue)

	print("Rabbitmq connections initialized ")
	return channel, connection

initializeChannel()
