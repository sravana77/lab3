from flask import Flask, render_template, request, session

app = Flask(__name__)
app.secret_key = "mysecretkey"


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/check_password', methods=['POST'])
def check_password():
    username = request.form['username']
    password = request.form['password']

    # Check number of consecutive failed attempts
    if 'failed_attempts' not in session:
        session['failed_attempts'] = 0
        
    # Initialize list for error messages
    messages = []

    # Password constraints
    if len(password) < 8:
        messages.append("Your password has less than 8 characters.")
    if not any(char.isupper() for char in password):
        messages.append("You did not use an uppercase character.")
    if not any(char.islower() for char in password):
        messages.append("You did not use a lowercase character.")
    if not password[-1].isdigit():
        messages.append("You did not end your password with a number.")

    # If there are any error messages, join them and return as a single error message
    if messages:
        session['failed_attempts'] += 1
        warning = ""
        if(session['failed_attempts'] >=3):
            warning = f"You have {session['failed_attempts']} consecutive failed attempts"
        
        return render_template('report.html', messages=messages, warning = warning)

    # Reset failed attempts counter if password is valid
    session['failed_attempts'] = 0

    return render_template('report.html', messages=messages)


if __name__ == '__main__':
    app.run(host='localhost', port=5050, debug=True)
