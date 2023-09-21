install: install-chakra install-router install-axios

install-chakra:
	npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
	npm install @chakra-ui/icons

install-router:
	npm install react-router-dom
	npm install --save-dev @types/react-router-dom

install-axios:
	npm install axios

update-react:
	npm install react@latest react-dom@latest
	npm install react-router-dom@latest

run:
	npm start

build:
	npm run build

test:
	npm test

clean:
	rm -rf node_modules/
