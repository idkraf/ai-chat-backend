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
- git clone https://github.com/idkraf/ai-chat-backend.git

## On the folder 
```
npm install
```
## Create .env with default
```
OPENAI_API_KEY=
WEATHER_API_KEY=
```

## get OPENAI_API_KEY
- open https://platform.openai.com/
- register / login 
- Generate key
- paste key to .env
- example: OPENAI_API_KEY=xxxx
- Add model gpt-3.5-turbo

## get Scenario Smart Travel Planner for WEATHER_API_KEY
- open https://www.weatherapi.com/ 
- register and generate key
- paste key to .env example WEATHER_API_KEY=xxxxx

## run the script with
```
npm start
```
- Make sure both the frontend and backend servers are running.
- current backend with port 5000 and front with port 3000


# Response Postman
## Cek demo postman after you start the npm
```
https://grey-water-2999.postman.co/workspace/My-Workspace~713571d6-247b-4330-85ef-81647abcf30b/collection/5170792-e61cf429-3a6b-43d2-b704-bc24875e7f89?action=share&creator=5170792&active-environment=5170792-4f7e6bf3-d7b6-44d0-8e5e-5eb6f85ad894
```

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
