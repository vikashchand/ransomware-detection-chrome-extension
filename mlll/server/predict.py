import pickle
import sys

# Load the machine learning model from the pickle file
phish_model_ls = pickle.load(open('phishing.pkl', 'rb'))

# Get the website name from the command-line arguments
url = sys.argv[1]

# Make a prediction using the machine learning model


def predict():

    X_predict = []

   
    print(url, "0000000000000000000000")
    if url:
        X_predict.append(str(url))
        y_Predict = ''.join(phish_model_ls.predict(X_predict))
        print(y_Predict)
        if y_Predict == 'bad':
            result = "This is a Phishing Site"
        else:
            result = "This is not a Phishing Site"

