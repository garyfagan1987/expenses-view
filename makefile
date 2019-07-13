PATH := node_modules/.bin:$(PATH)

DEV_CONFIG := \
	NODE_ENV=development \

PROD_CONFIG := \
	NODE_ENV=production \

all: clean depend build

clean: clean-depend clean-dist clean-build

clean-depend:
	rm -rf node_modules

clean-dist:
	rm -rf .next

clean-build:
	rm -rf build

depend:
	yarn install

build:
	$(PROD_CONFIG) next build

deploy:
	make build && make export

dev:
	$(DEV_CONFIG) node server.js

export:
	$(PROD_CONFIG) next export

prod:
	$(PROD_CONFIG) node server.js

lint:
	eslint "**/*.jsx" "**/*.js" --config .eslintrc

.PHONY: test lint
