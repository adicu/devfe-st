# use Docker's provided python image
FROM python:2.7
MAINTAINER natebrennand <natebrennand@gmail.com>

# install all packages
COPY ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

# add the application directories
ADD ./ /
WORKDIR /

# expose the port and start the server
EXPOSE 6000
CMD gunicorn app:app -b 0.0.0.0:6000 --log-level debug

