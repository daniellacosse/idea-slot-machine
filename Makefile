BUILDFILES_FOLDER=.buildfiles
BUILDFILES_REPO=git@github.com:daniellacosse/typescript-buildfiles.git
COMMANDS=$(BUILDFILES_FOLDER)/main.mk $(BUILDFILES_FOLDER)/commands/*.mk

override SOURCE_FOLDER=app
override PACKAGE_ENTRY_POINT=$(SOURCE_FOLDER)/index.html
override PACKAGE_FOLDER=artifacts
override PACKAGE_BUILD=$(PACKAGE_FOLDER)/$(SOURCE_FOLDER)/index.html
override PACKAGE_TARGET=browser

include $(COMMANDS)

default: $(PROXY_FOLDER)
	make $(PROJECT_DEPENDENCY_PROXY_TARGETS) ;\
	yarn parcel $(PACKAGE_ENTRY_POINT) \
		--out-dir $(PROXY_FOLDER)/dist \
		--cache-dir $(PROXY_FOLDER)/.cache

$(COMMANDS):
	git submodule add --force $(BUILDFILES_REPO) $(BUILDFILES_FOLDER)
