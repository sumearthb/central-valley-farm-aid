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
