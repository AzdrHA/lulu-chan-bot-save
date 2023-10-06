start:
	@docker-compose -f docker-compose.yml -f docker-compose-dev.yml up

start-prod:
	@docker-compose -f docker-compose.yml -f docker-compose-prod.yml up

stop:
	@docker-compose stop

build:
	@docker-compose build

enter:
	@docker-compose run --rm lulu-chan-bot sh

install:
	@docker-compose run --rm lulu-chan-bot npm install