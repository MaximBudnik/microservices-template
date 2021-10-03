build:
	docker-compose -f docker-compose.backend.yml -f docker-compose.frontend.yml build

up:
	docker-compose -f docker-compose.backend.yml -f docker-compose.frontend.yml up -d

up-prod:
	docker-compose -f docker-compose.backend.yml -f docker-compose.backend.prod.yml -f docker-compose.frontend.yml up

down:
	docker-compose down

generate-service:
	python generate-service.py
