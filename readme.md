# Upcoming Movies Web App

## Requirements
[Docker](https://www.docker.com/): Latest Version

## Getting Started
Copy `.env.example` to `.env` and change all environment variables you need.

```
cp .env.example .env
```

Install Node dependencies.

``` sh
docker-compose run --rm web yarn install
```

Run development server with Docker Compose.

``` sh
docker-compose up
```
