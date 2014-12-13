from sys import argv

PORT = 5000

HOST = '0.0.0.0'

if len(argv) >= 2 and argv[1] == 'debug':
    DEBUG = True
