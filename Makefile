include .buildfiles/index.mk

.buildfiles/index.mk:
	git submodule add --force git@github.com:daniellacosse/typescript-buildfiles.git .buildfiles

ifeq ($(NODE_ENV),production)

override PROJECT_DEPENDENCIES=$(ARTIFACT_FOLDER)/Gemfile.lock $(ARTIFACT_FOLDER)/yarn.lock

endif

SLOTS_FOLDER=$(APPLICATION_FOLDER)/slots
SLOTS_ENTRY=$(SLOTS_FOLDER)/index.html

# yarn start
.PHONY: start
start: setup
	make ENTRY=$(SLOTS_ENTRY) TASK=server RECIPE=parcel

# yarn build
.PHONY: build
build: setup
	make ENTRY=$(SLOTS_ENTRY) TASK=artifact RECIPE=parcel

# yarn checks
.PHONY: checks
checks: setup
	@TASK=check ENTRY=$(SLOTS_ENTRY) yarn concurrently \
		-n jest,eslint,stylelint \
		"make RECIPE=jest" \
		"make RECIPE=eslint" \
		"make RECIPE=stylelint" \
