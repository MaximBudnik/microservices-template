build:
	docker-compose build

up:
	docker-compose -f docker-compose.backend.yml up -d

up-prod:
	docker-compose -f docker-compose.backend.yml -f docker-compose.backend.prod.yml up

down:
	docker-compose down

generate-service:
	python generate-service.py
