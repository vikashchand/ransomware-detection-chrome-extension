from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)
phish_model_ls = pickle.load(open('phishing.pkl', 'rb'))

@app.route('/')
def home():
    return "Hello, World!"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    links = data.get('links')
    predictions = []
    for link in links:
        prediction = phish_model_ls.predict([link])[0]
        if prediction == "bad":
            predictions.append("ransomeware Phishing link: " + link)
        else:
            predictions.append("Not a ransomeware phishing link: " + link)
    result = {"result": "\n".join(predictions)}
    return jsonify(result)



if __name__ == '__main__':
    app.run(debug=True)
