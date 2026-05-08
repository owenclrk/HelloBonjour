import deepl
import os
from dotenv import load_dotenv

# Load the variables from .env into the environment
load_dotenv()

# Access them using os.getenv
api_key = os.getenv("DEEPL_KEY")
auth_key = api_key # replace with your key
deepl_client = deepl.DeepLClient(auth_key)

# result = deepl_client.translate_text("Hello, world!", target_lang="DE")
def translate_word(text,lang):
    print (text)
    print(lang)
    return deepl_client.translate_text(text, target_lang=lang)

text = "Hello"
lang = "FR"

print (translate_word(text,lang))

