import os
from google import genai
from dotenv import load_dotenv


# Load the variables from .env into the environment
load_dotenv()

# Access them using os.getenv
gemini_key = os.getenv("GEMINI")
client = genai.Client(api_key=gemini_key)


def query_gemini(prompt):
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )
    return response.text


