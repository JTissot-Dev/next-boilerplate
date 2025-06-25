build-dev:
	docker compose -f docker-compose.dev.yaml up --build --detach

run-dev:
	docker compose -f docker-compose.dev.yaml up --detach

migrate-generate-dev:
	docker exec -it my-app-web-dev npm run prisma:migrate:dev

better-auth-generate:
	docker exec -it my-app-web-dev npm run better-auth:generate

db-seed:
	docker exec -it my-app-web-dev npm run prisma:seed

format:
	npm run format
	
lint:
	npm run lint

test:
	docker compose -f docker-compose.test.yaml up --build