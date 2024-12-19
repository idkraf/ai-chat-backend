# Prerequisites
Before starting, ensure the following tools are installed:
- Node.js (v18+ recommended) 
- npm or yarn – Comes with Node.js (or install yarn).
- Git 
- VS Code 

# Dependency 
- express: For creating REST endpoints.
- dotenv: For managing environment variables.
- axios: For making HTTP requests (e.g., LLM or external APIs).
- nodemon: For hot-reloading during development.
- openai : For OpenAI library

# Install
## first clone the repo
- https://github.com/idkraf/ai-chat-backend.git

## On the folder 
```
npm install
```
## Create .env with blank

## get OPENAI_API_KEY
- open https://platform.openai.com/
- register / login 
- Generate key
- paste key to .env
- Add model gpt-3.5-turbo

## get Scenario Smart Travel Planner for WEATHER_API_KEY
- open https://www.weatherapi.com/ 
- register and generate key
- paste key to .env

## run the script with
```
npm start
```
- Make sure both the frontend and backend servers are running.



# Response Postman
## 
## sample body on chat in frontend
```
{
    "message": "Tell me about the weather in Paris."
}
```

## Postman body
```
{
    "prompt": "I want a 5-day itinerary including sightseeing and food recommendations.",
    "location": "Paris"
}

```

## Expected Response
```
{
    "gptResponse": "Here's your travel plan for Paris: ...",
    "weatherData": {
        "location": {
            "name": "Paris",
            "region": "Île-de-France",
            "country": "France"
        },
        "current": {
            "temp_c": 15,
            "condition": {
                "text": "Partly cloudy"
            }
        }
    }
}
```

## Error Running
- You exceeded your current quota, please check your plan and billing details. For more information on this error, read the docs: https://platform.openai.com/docs/guides/error-codes/api-errors."
- Make sure your plan and billing details will on.