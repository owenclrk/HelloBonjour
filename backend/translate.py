import deepl
import os
from fastapi import HTTPException
from dotenv import load_dotenv

# Load the variables from .env into the environment
load_dotenv()

# Access them using os.getenv
api_key = os.getenv("DEEPL_KEY")
auth_key = api_key # replace with your key
deepl_client = deepl.DeepLClient(auth_key)

# result = deepl_client.translate_text("Hello, world!", target_lang="DE")
def translate_word(text,lang):
    try:
        result = deepl_client.translate_text(text, target_lang=lang)
    except deepl.exceptions.AuthorizationException:
        raise HTTPException(status_code=401, detail="DeepL API key invalid")
    except deepl.exceptions.QuotaExceededException:
        raise HTTPException(status_code=429, detail="DeepL quota exceeded")
    except Exception:
        raise HTTPException(status_code=502, detail="Translation service unavailable")
    #Only return the response. Need to return a packet
    return result.text


