from sys import argv

PORT = 5000
HOST = '0.0.0.0'
EMAILS_FILENAME = 'data/emails.txt'
DATA_FILENAMES = {
    'sponsors': 'data/sponsors.json',
    'faqs': 'data/faqs.json',
    'schedule': 'data/schedule.json',
    'judges': 'data/judges.json',
    'prizes': 'data/prizes.json',
    'alerts': 'data/alerts.json',
    'speakers': 'data/speakers.json'
}

if len(argv) >= 2 and argv[1] == 'debug':
    DEBUG = True
