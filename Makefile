.DEFAULT_GOAL := all
SHELL := bash

clean: 
	rm -f *.tmp

pull:
	make clean
	@echo
	git pull
	git status

status:
	make clean
	@echo
	git branch
	git remote -v
	git status

log:
	git log > idb.log.txt

run-frontend-local: 
	echo "Running application..."
	cd ./frontend/ && npm start
	echo "Successfully ran"

# test-frontend:
# 	echo "Running frontend unit tests..."
# 	cd ./frontend/ && ...
# 	echo "Successfully ran tests"

test-backend:
	echo "Running backend unit tests..."
	cd ./backend/ && python3 tests.py
	echo "Successfully ran tests"

build-frontend :
	docker build -t idb-frontend frontend/

run-frontend:
	docker run -dp 80:3000 idb-frontend

# build-backend:
# 	docker build ...

# run-backend:
# 	docker ...