refresh:
	docker compose down && docker compose up -d --remove-orphans

shellapi:
	docker compose exec api bash

shellworker:
	docker compose exec worker /bin/sh
shellfrontend:
	docker compose exec vidflow-frontend /bin/sh
shellapi:
	docker compose exec vidflow-api /bin/sh
shellworker:
	docker compose exec vidflow-worker /bin/sh
