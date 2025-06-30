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

test-dev-e2e:
	docker compose -f docker-compose.e2e.local.yaml up --build --detach

test-exec-e2e:
	docker compose -f docker-compose.e2e.ci.yaml up --build --abort-on-container-exit
