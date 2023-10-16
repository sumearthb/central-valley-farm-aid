.DEFAULT_GOAL := all
SHELL := bash

clean: 
	rm -f *.tmp

run: 
	echo "Running application..."
	cd ./frontend/ && npm start
	echo "Successfully ran"

pull:
	make clean
	@echo
	git pull
	git status

build-frontend :
	docker build -t idb-frontend frontend/

build-backend :
	docker build -t idb-backend backend/

run-frontend:
	docker run -dp 80:3000 idb-frontend

run-backend:
	docker run idb-backend