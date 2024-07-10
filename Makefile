# Define variables
DOCKER_COMPOSE = docker-compose
DOCKER_BUILD_BACKEND = $(DOCKER_COMPOSE) build backend
DOCKER_BUILD_FRONTEND = $(DOCKER_COMPOSE) build frontend
DOCKER_UP = $(DOCKER_COMPOSE) up -d
DOCKER_DOWN = $(DOCKER_COMPOSE) down

# Default target
.PHONY: all
all: up

# Build backend service
.PHONY: build-backend
build-backend:
	$(DOCKER_BUILD_BACKEND)

# Build frontend service
.PHONY: build-frontend
build-frontend:
	$(DOCKER_BUILD_FRONTEND)

# Bring up Docker containers
.PHONY: up
up: build-backend build-frontend
	$(DOCKER_UP)

# Bring down Docker containers
.PHONY: down
down:
	$(DOCKER_DOWN)
