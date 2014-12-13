#! /bin/bash
virtualenv --no-site-packages .
source bin/activate
gem install sass
pip install -r requirements.txt
