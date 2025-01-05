from flask import Flask, render_template, jsonify
import json

app = Flask(__name__)

# Load center data from JSON file
def load_centers():
    with open("data.json", "r") as file:
        return json.load(file)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/find_centers")
def find_centers():
    return render_template("find_centers.html")

@app.route("/centers",   methods=["GET"])
def get_centers():
    return jsonify(load_centers())

if __name__ == "__main__":
    app.run(debug=True)
