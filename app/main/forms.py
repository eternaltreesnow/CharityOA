#-*- coding: utf-8 -*-
from flask.ext.wtf import Form
from wtforms import StringField, SubmitField,BooleanField,PasswordField
from wtforms.validators import DataRequired

class LoginForm(Form):
    name = StringField(u'用户名', validators=[DataRequired()])
    password = PasswordField(u'密码',validators=[DataRequired()])
    need_remember = BooleanField(u'记住我')
    submit = SubmitField(u'登录')
    
