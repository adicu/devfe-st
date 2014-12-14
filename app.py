from flask import Flask, render_template, request
from flask.ext.assets import Environment, Bundle
from config import config
import json

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        email = request.form['email']
        with open(app.config['EMAILS_FILENAME'], 'a') as emails:
            emails.write(email + '\n')
        return render_template('index.html', submit=True)
    return render_template('index.html')


def register_scss():
    """"""
    assets.url = app.static_url_path
    with open('config/scss.json') as f:
        bundle_instructions = json.loads(f.read())
        for _, bundle_set in bundle_instructions.iteritems():
            output_folder = bundle_set['output_folder']
            depends = bundle_set['depends']
            for bundle_name, instructions in bundle_set['rules'].iteritems():
                bundle = Bundle(*instructions['inputs'],
                                output=output_folder + instructions['output'],
                                depends=depends,
                                filters='scss')
                assets.register(bundle_name, bundle)

assets = Environment(app)
app.config.from_object('config.config')
register_scss()

if __name__ == '__main__':
    app.run(port=config.PORT, host=config.HOST)
