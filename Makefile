include .buildfiles/index.mk

.buildfiles/index.mk:
	git submodule add --force https://github.com/daniellacosse/typescript-buildfiles.git .buildfiles

ifeq ($(NODE_ENV),production)

override PROJECT_DEPENDENCIES=$(ARTIFACT_FOLDER)/Gemfile.lock $(ARTIFACT_FOLDER)/yarn.lock

endif

SLOTS_FOLDER=$(APPLICATION_FOLDER)/slots
SLOTS_ENTRY_POINT=$(SLOTS_FOLDER)/index.html

# yarn start
.PHONY: start
start: setup
	make ENTRY=$(SLOTS_ENTRY_POINT) TASK=server RECIPE=parcel

# yarn build
.PHONY: build
build: setup
	make ENTRY=$(SLOTS_ENTRY_POINT) TASK=artifact RECIPE=parcel
