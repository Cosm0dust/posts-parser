.PHONY: build up down logs

build:
	docker build -t rss-parser .

up:
	docker-compose -f docker/docker-compose.yml up -d

down:
	docker-compose -f docker/docker-compose.yml down

logs:
	docker-compose -f docker/docker-compose.yml logs -f
