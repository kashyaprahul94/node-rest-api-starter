# To build the application for production machines where production build is used with production configurations
.PHONY: build
build:
	NODE_ENV=production CONFIG_ENV=production npm run build

# To build the application for staging machines where production build is used but the configuration is non production
.PHONY: build_staging
build_staging:
	NODE_ENV=production CONFIG_ENV=development npm run build

# To build the application for dev env
.PHONY: build_dev
build_dev:
	NODE_ENV=development CONFIG_ENV=development npm run build


#####################

# Build the application for production & run the server
.PHONY: production
production: build
	NODE_ENV=production CONFIG_ENV=production npm run start

# Build the application for staging & run the server
.PHONY: staging
staging: build_staging
	NODE_ENV=production CONFIG_ENV=staging npm run start

# Run the application with live reload server
.PHONY: dev
dev:
	NODE_ENV=development CONFIG_ENV=development npm run dev

#####################

# Perform the lint for code quality checks on the application
.PHONY: lint
lint:
	npm run format -- --check && npm run lint

# Perform the lint for code quality checks on the application and fix all possible issues on its own
.PHONY: lint_fix
lint_fix:
	npm run format:fix -- --write && npm run lint:fix

#####################

# Unit test
.PHONY: unit_test
unit_test:
	NODE_ENV=development CONFIG_ENV=development npm run test:unit

# Unit test
.PHONY: unit_test_watch
unit_test_watch:
	NODE_ENV=development CONFIG_ENV=development npm run test:unit:watch
	
#####################

# Run the dev server by default
.DEFAULT_GOAL := dev
