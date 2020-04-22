include .buildfiles/index.mk

.buildfiles/index.mk:
	git submodule add --force https://github.com/daniellacosse/typescript-buildfiles.git .buildfiles

SLOTS_FOLDER=$(APPLICATION_FOLDER)/slots
SLOTS_ENTRY_POINT=$(SLOTS_FOLDER)/index.html

# yarn build
.PHONY: build
build: setup
	make RECIPE=parcel ENTRY=$(SLOTS_ENTRY_POINT) TASK=artifact
