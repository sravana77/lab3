# name : sravana kumar papasani , Blazer ID : papasani

import requests
import json

url = "https://michaelgathara.com/api/python-challenge"

# send a GET request to retrieve the challenge
response = requests.get(url)

# extract the challenges from the response
challenges = response.json()

answers = []

for challenge in challenges:
    # Extract the problem string and remove the trailing question mark
    problem = challenge['problem'].strip('?')
    #  Evaluate the expression and calculate the result
    result = eval(problem)
    # Append the result to the answers list
    answers.append(result)

print("Name: sravana kumar papasani, Blazer ID: papasani\n")

for challenge, answer in zip(challenges, answers):
    print(f"Id: {challenge['id']} Problem: {challenge['problem']} Answer: {answer}")
