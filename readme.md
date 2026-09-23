# Vite Meteo Weather App

A lightning-fast, lightweight weather application built with the OpenWeather API. It features Redis caching to optimize API calls, rate-limiting to prevent abuse, and a clean separation of concerns containerized via Docker.

<h1 align='center'>
    <img src="./assets/images/weather-app.png" />
</h1>

## Why This Stack?

While a standard weather app only requires basic API fetching, this project was architected to demonstrate robust, production-grade features:

* **Redis Caching:** The free tier of the OpenWeather API limits requests to 60 calls per minute. To prevent hitting rate limits under high traffic, the app caches weather data in a Redis database. Subsequent requests for the same city fetch the stored JSON data directly, drastically reducing external API usage.
* **Rate Limiting:** Protects the application from DoS attacks and request API abuse using `express-rate-limit` paired with `rate-limit-redis`.
* **Separation of Concerns:** The backend and frontend are completely decoupled. The backend is built with **Express and TypeScript**, while the client uses **Vite and React**, allowing for flexible frontend scaling.
* **Dockerization:** Fully containerized using **Docker Compose** to ensure seamless deployment across different environments without manual dependency management or runtime discrepancies.

---

## Getting Started

### Prerequisites
* [Docker & Docker Compose](https://docs.docker.com/engine/install/) (Recommended)
* Alternatively, **Node.js (v24+)** if running locally without containers.

### Project Structure
```
.
├── assets
├── backend
├── client
├── compose.yaml
├── .env.example
├── .gitignore
└── README.md
```

## The Setup

### prerequisites
**make sure you have the following to install on your system before proceeding:**
  * Node.js: Version 24.x (Recommended)
  * Docker & Docker Compose (Optional, for containerized setup)
  * npm (comes bundled with Node.js)

---
## Local host installation

copy .env.example inside backend folder to .env

```cp .env.example .env```

after that you must setup your .env inside ! 

```
PORT=3000
NODE_ENV=development
WEATHER_API_KEY=your_openweather_api_key_here
REDIS_URL=redis://localhost:6379
```

remember to put your open weather api key! login to https://openweathermap.org/ to get the key!

---
## To download docker, 

since I use debian I recommended you to go to this website :https://docs.docker.com/engine/install/debian/ 

if you use windows go to this website instead : https://docs.docker.com/desktop/

## setup your ENV

```
.
├── assets
├── backend
├── client
├── compose.yaml
├── .env.example
├── .gitignore
└── readme.md
```

see that .env.example in the project repo you can copy that, you must copy and paste it and change the name of **.env.example** into **.env**

```cp .env.example .env```

after that you must setup your .env inside ! 

```
PORT=3000
NODE_ENV=development
WEATHER_API_KEY=your_openweather_api_key_here
REDIS_URL=redis://redis:6379
```

now in this project you can setup **PORT,NODE_ENV,REDIS_URL** to whatever you want but you must have **WEATHER_API_KEY** for this project to work, you must login into openweatherapi website and get the key there!

## Run your docker

After setting up your .ENV, make sure you’re in the roots that have compose.yaml, type in your command :
<br>
```docker compose up -d```