build:
	@./node_modules/.bin/browserify -d lib/index.js -o ../server/assets/main.js

.PHONY: build
