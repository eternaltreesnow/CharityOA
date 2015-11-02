#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask,request
from flask import render_template
from flask.ext.script import Manager
from flask_bootstrap import Bootstrap
from forms.userForm import LoginForm
app = Flask(__name__)
app.config.from_object('config')
Bootstrap(app)
manager = Manager(app)

@app.route('/')
def homePage():
    return '<h1>Hello World!</h1>'


#@app.route('/hello')
@app.route('/user/<name>')
def hello(name):
    return render_template('user.html',name = name)
@app.route('/login',methods=['GET','POST'])
def login():
    form = LoginForm()
    return render_template('login.html',title='Sign In',form = form)
#待实现，错误处理
if __name__ == '__main__':
   manager.run() 
