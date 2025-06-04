from flask import Flask, request, jsonify
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)  # Allow CORS for all domains

@app.route('/parse-prescription', methods=['POST', 'GET'])
def parse_prescription():
    if request.method == 'GET':
        return "Welcome to the Prescription Parser API! Please send a POST request with prescription data."

    data = request.get_json()
    prescription_text = data.get('text', '')

    pattern = re.compile(
        r'(?P<name>[A-Za-z]+)\s(?P<dosage>\d+mg)\s(?P<frequency>once|twice|three times)',
        re.IGNORECASE
    )
    time_mapping = {
        'once': ['08:00 AM'],
        'twice': ['08:00 AM', '08:00 PM'],
        'three times': ['08:00 AM', '02:00 PM', '08:00 PM']
    }

    result = {}
    for match in pattern.finditer(prescription_text):
        name = match.group('name').capitalize()
        dosage = match.group('dosage')
        freq = match.group('frequency').lower()
        result[name] = {
            'dosage': dosage,
            'frequency': freq,
            'times': time_mapping.get(freq, [])
        }

    print(result)
    return jsonify(result)

if __name__ == '__main__':
    app.run(port=5000)
# To run the Flask app, use the command: python app.py