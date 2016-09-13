FROM python:2.7-alpine
MAINTAINER ADI <hello@adicu.com>

COPY ./requirements.txt /app/requirements.txt
RUN pip install -r /app/requirements.txt

ADD ./ /app
WORKDIR /app

EXPOSE 6001
CMD gunicorn app:app -b 0.0.0.0:6001
