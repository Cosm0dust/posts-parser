# Post parser

## Overview

This project involves developing a backend system using Node.js and MongoDB. The system includes features like file uploads and visual effects for file viewing. Additionally, there is a cron job that fetches RSS feeds every 2 minutes. Docker is used for containerization, and the project is structured with directories for source code, configuration, jobs, services, and more.

## Project Structure

The project is organized into the following directories:

- `src`: Contains the source code.
- `config`: Configuration files.
- `jobs`: Scheduled jobs, including the cron job for fetching RSS feeds.
- `services`: Service-related files.
- `docker`: Docker-related files.
- `package.json`: Project metadata and dependencies.

## Prerequisites

- Node.js
- MongoDB
- Docker
- Git

## Makefile Commands

These Makefile commands help in building, running, stopping, and viewing logs for the application:

- `build`: Builds the Docker image `rss-parser`.
- `up`: Starts the application in detached mode using Docker Compose.
- `down`: Stops the application and removes containers using Docker Compose.
- `logs`: Shows the logs of all containers managed by Docker Compose.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Docker
- Docker Compose