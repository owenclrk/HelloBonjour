# HelloBonjour

## Introduction

HelloBonjour is a web app created to help languge learners by utilising previous word translations. With apps like Google Translate or Deepl, once a learner looks up a new word, they rarely use it again. The purpose of this app is to create a database of previous words and utilise AI to generate information, questions and language learning advice based on the their previous search history. With the database, insights into common spelling mistakes can be indetified and shown to the user.

# Tech Stack

Backend - Python, Alchemqy SQL
Frontend - React, CSS
Language Translation using DEEPL API
LLM Model using Google Gemini

# Starting Server

uvicorn main:app --reload

# Starting Client Side

npm start

# Terminology

text - Text to be translated
result - Translated text
dict - Dictionary of translated words past looked up
translation_id - Id number of the translated number

# Server

1. main.py
   1. Contains API calls for functions to add, remove and update translations
2. database.py
   1. Connect to local database using SQLalchemy
3. models.py
   1. Contains Class for connecting to
4. translate.py
   1. Connect to DeepL and return language translation
5. ai.py
   1. Connect to Google Gemini and return prompt. Input to function is a prompt created in main.py

# Work in Progress

1. Containerisation - allow app to run on any machine. Currently connected to local database and using private API keys
2. Generate spelling test for questions when user clicks a button
3. Updating Front-End REACT to implement chatbot style discussions on database.
