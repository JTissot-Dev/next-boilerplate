build-dev:
	docker compose -f docker-compose.dev.yaml up --build --detach

run-dev:
	docker compose -f docker-compose.dev.yaml up --detach

migrate-generate-dev:
	docker exec -it todo-web-dev npm run prisma:migrate:dev

better-auth-generate:
	docker exec -it todo-web-dev npm run better-auth:generate

db-seed:
	docker exec -it todo-web-dev npm run prisma:seed