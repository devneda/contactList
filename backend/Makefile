start-dev-env:
	docker compose -f docker-compose.dev.yaml up -d

stop-dev-env:
	docker compose -f docker-compose.dev.yaml down

wait-for-db:
	@echo "Esperando a que MariaDB esté healthy..."
	@timeout=80; \
	while [ "$$(docker inspect -f '{{.State.Health.Status}}' contacts-db-dev)" != "healthy" ]; do \
		sleep 2; \
		timeout=$$((timeout - 2)); \
		if [ $$timeout -le 0 ]; then echo "Timeout esperando a la base de datos"; exit 1; fi; \
	done; \
	echo "MariaDB está lista."

all-test: stop-dev-env start-dev-env wait-for-db
	CONFIG_FILE=config.local.yaml npm test

.PHONY: all-test start-dev-env stop-dev-env wait-for-db
