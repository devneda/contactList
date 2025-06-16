start-dev-env:
	docker compose -f docker-compose.dev.yaml up -d

stop-dev-env:
	docker compose -f docker-compose.dev.yaml down

wait-for-db:
	@echo "Esperando 10 segundos para que MariaDB termine de arrancar..."
	@sleep 10
	@echo "Continuando con los tests"

all-test: stop-dev-env start-dev-env wait-for-db
	npm test

.PHONY: all-test start-dev-env stop-dev-env wait-for-db
