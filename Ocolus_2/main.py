from flask import Flask, render_template, request, redirect, url_for, jsonify
import sqlite3
from flask_sqlalchemy import SQLAlchemy
from cloudipsp import Api, Checkout

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///shop.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
db = SQLAlchemy(app)

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(36), nullable=False)
    newPrice = db.Column(db.Integer, nullable=False)
    oldPrice = db.Column(db.Integer, nullable=True)
    star = db.Column(db.Integer, nullable=True)
    colors = db.Column(db.Integer, nullable=False)
#    S = db.Column(db.Boolean, nullable=True, default=False)
#    M = db.Column(db.Boolean, nullable=True, default=False)
#    L = db.Column(db.Boolean, nullable=True, default=False)
#    XL = db.Column(db.Boolean, nullable=True, default=False)
#    XXL = db.Column(db.Boolean, nullable=True, default=False)
    
    def __repr__(self):
        return str(self.id)

@app.route('/shop')
def shop():
    items = Item.query.all()
#    order_by(Item.newPrice.desc()).
    return render_template('magaz/index.html', data=items)

@app.route('/shop/product/<int:id>')
def product(id):
    product = Item.query.get(id)
    items = Item.query.all()
    return render_template('product/index.html', data=[product, items])

@app.route('/')
def index():
    return render_template('home/index.html')

@app.route('/create', methods=['POST', 'GET'])
def create():
    if request.method == "POST":
        title = request.form.get('title')
        newPrice = request.form.get('newPrice')
        oldPrice = request.form.get('oldPrice')
        star = request.form.get('star')
        colors = request.form.get('colors')
#        S = request.form.get('S')
#        M = request.form.get('M')
#        L = request.form.get('L')
#        XL = request.form.get('XL')
#        XXL = request.form.get('XXL')
        
        item = Item(title=title, newPrice=newPrice, oldPrice=oldPrice, star=star, colors=colors)
        
        try:
            db.session.add(item)
            db.session.commit()
            db.session.close()
            return redirect(url_for('shop'))
        except:
            return "Error Pls Enter Correct Dates"
    else:
        return render_template('create/index.html')

@app.route('/buy/<int:id>')
def buy(id):
    item = Item.query.get(id)
    api = Api(merchant_id=1396424,
          secret_key='test')
    checkout = Checkout(api=api)
    data = {
        "currency": "USD",
        "amount": str(item.newPrice) + '00'
    }
    url = checkout.url(data).get('checkout_url')
    
    return redirect(url) 

if(__name__) == "__main__":
    app.run(debug=True)