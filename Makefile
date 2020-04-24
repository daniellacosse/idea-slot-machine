include .buildfiles/index.mk

.buildfiles/index.mk:
	git submodule update --init --recursive

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
	@yarn concurrently \
		-n jest,eslint,stylelint \
		"make RECIPE=jest TASK=check ENTRY=$(SLOTS_ENTRY)" \
		"make RECIPE=eslint TASK=check ENTRY=$(SLOTS_ENTRY)" \
		"make RECIPE=stylelint TASK=check ENTRY=$(SLOTS_ENTRY)"
