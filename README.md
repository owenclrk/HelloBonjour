# HelloBonjour

## Introduction

HelloBonjour is a web app that helps language learners retain vocabulary by storing their translation history. Unlike tools such as Google Translate or DeepL, where looked-up words are quickly forgotten, HelloBonjour builds a personal dictionary and uses AI to generate quizzes, learning advice, and insights into common spelling mistakes — all based on the user's own search history.

## Tech Stack

| Layer            | Technology                  |
| ---------------- | --------------------------- |
| Backend          | Python, FastAPI, SQLAlchemy |
| Frontend         | React, CSS                  |
| Database         | MySQL                       |
| Translation      | DeepL API                   |
| AI / LLM         | Google Gemini               |
| Containerisation | Docker                      |

## Project Structure

```
HelloBonjour/
├── backend/
│   ├── main.py          # API routes (CRUD + AI endpoints)
│   ├── database.py      # SQLAlchemy engine and session setup
│   ├── models.py        # ORM model for the translation table
│   ├── translate.py     # DeepL API integration
│   ├── ai.py            # Google Gemini integration
│   └── requirements.txt
├── frontend/
│   └── src/
│       ├── App.js        # Main React component (UI + state management)
│       ├── App.css       # Component styles
│       ├── api.js        # Axios instance with base URL config
│       ├── index.js      # React app entry point
│       └── index.css     # Global styles
├── helper/
├── compose.yaml
└── README.md
```

## Getting Started

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- [Node.js](https://nodejs.org/) (for running the frontend locally)
- A `.env` file in the project root with the following variables:

```env
DATABASE_URL=mysql+pymysql://user:password@db:3306/hellobonjour
DEEPL_KEY=your_deepl_api_key
GEMINI=your_gemini_api_key
```

- A `.env` file in the `frontend/` directory:

```env
REACT_APP_API_URL=http://localhost:8000
```

### Running with Docker (recommended)

```bash
docker compose up --build
```

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`

To stop the app:

```bash
docker compose down
```

### Running locally (development)

Update your `.env` to use `localhost` instead of `db` as the database host, then:

```bash
# Backend
cd backend
uvicorn main:app --reload

# Frontend (separate terminal)
cd frontend
npm start
```

## Frontend Features

- Translate a word into French or English via the input form
- Latest translation displayed prominently after each submission
- Collapsible history table showing all past translations with delete support
- API base URL configurable via `REACT_APP_API_URL` environment variable

## API Reference

| Method | Endpoint      | Description                             |
| ------ | ------------- | --------------------------------------- |
| GET    | `/`           | Health check                            |
| GET    | `/dict/`      | Retrieve translation history            |
| POST   | `/dict/`      | Translate and save a new word           |
| PUT    | `/dict/{id}`  | Update an existing translation          |
| DELETE | `/dict/{id}`  | Delete a translation                    |
| GET    | `/questions/` | Generate AI quiz questions from history |

## Terminology

| Term             | Description                                         |
| ---------------- | --------------------------------------------------- |
| `text`           | The original word or phrase to be translated        |
| `result`         | The translated output                               |
| `dict`           | The user's personal dictionary of past translations |
| `translation_id` | Unique identifier for each translation entry        |

## Environment Variables

| Variable            | Description                                                           |
| ------------------- | --------------------------------------------------------------------- |
| `DATABASE_URL`      | Full database connection string                                       |
| `DEEPL_KEY`         | DeepL API authentication key                                          |
| `GEMINI`            | Google Gemini API key                                                 |
| `REACT_APP_API_URL` | Backend API base URL (frontend) — defaults to `http://localhost:8000` |

## Work in Progress

- Spelling test generation via the `/questions/` endpoint
- Chatbot-style frontend for conversational learning using translation history
