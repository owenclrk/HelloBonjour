# HelloBonjour

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
   1.
4. translate.py
   1. Connect to DeepL and return language translation
5. ai.py
   1. Connect to Google Gemini and return prompt. Input to function is a prompt created in main.py

# Work in Progress

1. Containerisation - allow app to run on any machine. Currently connected to local database and using private API keys
2. Generate spelling test for questions when user clicks a button
3. Updating Front-End REACT to implement chatbot style discussions on database.
