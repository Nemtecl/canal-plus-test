##
## -----------------------------
## Install
## -----------------------------
##

.env:
	cp $@.dist $@

dependencies: 
	yarn --frozen-lockfile

install: .env dependencies