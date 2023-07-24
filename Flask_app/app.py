from flask import Flask, render_template,flash,redirect,url_for,session,logging,request
from flask_mysqldb import MySQL
from wtforms import Form, StringField, TextAreaField,PasswordField,validators
from passlib.hash import sha256_crypt
from functools import wraps


app = Flask(__name__)

 # config MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'flask app'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

# init MySQL
mysql = MySQL(app);

 
@app.route('/')
def home():
 return render_template('home.html')

class RegisterForm(Form):
    firstname =  StringField('Firstname',[validators.length(min =1, max = 50),validators.input_required()])
    lastname =  StringField('Lastname',[validators.length(min =1, max = 50),validators.optional()])
    username = StringField('Username',[validators.length(min =4, max = 25), validators.input_required()])
    email = StringField('Email',[validators.length(min =6, max = 50),validators.input_required()])
    password = PasswordField('Password',[
    validators.DataRequired(),
    validators.EqualTo('confirm',message = 'Passwords do not match')
    ])
    confirm = PasswordField('Confirm Password')

# user signup

@app.route('/signup',methods = ['GET','POST'])
def signup():
 form = RegisterForm(request.form);
 
 if request.method == 'POST'  and form.validate():
  firstname = form.firstname.data
  lastname = form.lastname.data
  email = form.email.data
  username = form.username.data
  password = sha256_crypt.encrypt(str(form.password.data))
  
  # create cursor
  cur = mysql.connection.cursor()
  
  # execute query
  cur.execute(''' INSERT INTO users VALUES(%s,%s,%s,%s,%s)''',(firstname, lastname,email, username, password))

  # commit to the db
  mysql.connection.commit()
  
  #close connection
  
  cur.close()
  return redirect(url_for('registered'))
 
 return render_template('signup.html',form = form)  


# User login
@app.route('/signin', methods=['GET', 'POST'])
def signin():
    if request.method == 'POST':
        # Get Form Fields
        username = request.form['username']
        password_candidate = request.form['password']

        # Create cursor
        cur = mysql.connection.cursor()

        # Get user by username
        result = cur.execute("SELECT * FROM users WHERE username = %s", [username])

        if result > 0:
            # Get stored hash
            data = cur.fetchone()
            password = data['password']

            # Compare Passwords
            if sha256_crypt.verify(password_candidate, password):
                # Passed
                session['logged_in'] = True
                session['username'] = username

                flash('You are now signed in', 'success')
                return redirect(url_for('signedIn'))
            else:
                error = 'Invalid login'
                return render_template('signin.html', error=error)
            # Close connection
            
            cur.close()
        else:
            error = 'Username not found'
            return render_template('signin.html', error=error)

    return render_template('signin.html')

# Check if user logged in
def is_logged_in(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            flash('Unauthorized, Please login', 'danger')
            return redirect(url_for('signin'))
    return wrap
 
@app.route('/registered')
def registered():
    return render_template('thankYou.html')

@app.route('/signedIn')
def signediIn():
    return render_template('secretPage.html')

# Logout
@app.route('/signout')
def signout():
    session.clear()
    flash('You are now signed out', 'success')
    return redirect(url_for('signin'))

if __name__ == '__main__':
 app.secret_key = 'secret123'
 app.run(debug = True) 