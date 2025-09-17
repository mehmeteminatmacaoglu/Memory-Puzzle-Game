from flask import Flask, render_template, redirect, url_for
import random

app = Flask(__name__)

symbols = ["♥", "♦", "♣", "♠", "★", "☀", "☂", "⚑"]

def generate_cards():
    cards = symbols * 2
    random.shuffle(cards)
    return cards

@app.route("/")
def index():
    cards = generate_cards()
    return render_template("index.html", cards=cards)

@app.route("/reset")
def reset():
    return redirect(url_for("index"))

if __name__ == "__main__":
    app.run(debug=True)