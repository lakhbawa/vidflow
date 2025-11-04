refresh:
	docker compose down && docker compose up -d --remove-orphans

shellapi:
	docker compose exec api bash

shellworker:
	docker compose exec worker /bin/sh
