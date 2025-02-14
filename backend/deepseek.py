import os
import requests
from pydantic import BaseModel
from fastapi import HTTPException

class ChatRequest(BaseModel):
    message: str

def call_deepseek_api(message: str):
    try:
        # Call the Deepseek API
        deepseek_response = requests.post(
            os.getenv("DEEPSEEK_API_URL"),
            headers={"Authorization": f"Bearer {os.getenv('DEEPSEEK_API_KEY')}"},
            json={"message": message},
        )
        deepseek_response.raise_for_status()  # Raise an error for bad responses
        return deepseek_response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def get_chatbot_response(request: ChatRequest):
    response_data = call_deepseek_api(request.message)

    # Filter out unrelated questions
    if "unrelated" in response_data.get("response", "").lower():
        return {"response": "I can only answer questions related to the school menu. Please visit the school website for more information."}

    return {"response": response_data["response"]}