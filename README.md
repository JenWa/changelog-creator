# Changelog creation

This package creates a Changelog based on the commit messages from your repo's history.
The commit messages are grouped by the tag version they belong to. If youre package.json
has a version not belonging to an already created tag, this version will also be listed
in the Changelog.

The benefit of this package is that it can also sort the commits by type
(currently only conventional commit types) and it does not throw the commit messages
not following the pattern away, but puts them into an own subsection (currently "others").

So if you started with conventional commits at a later stage in your project,
you will not get a semi-complete Changelog with this package.

Please note:
This is still a work in progress!!

## Installation

You can either install this package as a devDependency:

```terminal
npm install --save-dev changelog-creator
```

and configure it as a script, e.g.:

```json
    "changelog": "changelog-creator --sort-by=type"
```

**OR**

You can install this package globally

```terminal
npm install -g changelog-creator
```

and run the commands directly in your terminal:

```terminal
changelog-creator --releases-only
```

## Current requirements

- The tags have to follow the [semantic versioning specification](https://semver.org/spec/v2.0.0.html).
  E.g. they have to look like that `v1.3.1`, where `v` can be replaced by any kind of prefix.

## Help

Run

```terminal
changelog-creator --help
```

or for scripts

```terminal
npm run changelog -- --help
```

in order to see all possible configurations.

The output is currently:

```terminal
  "--tag-prefix", "-t": Define which prefix you use for your tags. Default: "v", e.g. "v1.0.1".

  "--releases-only","-r": If the Changelog should be only grouped in releases and not also in pre-releases. Default: Pre-releases appear in Changelog.

  "--has-upcoming-section","-u": If the Changelog should have a section with the latest commits which don't belong to a version yet. Default: false.

  "--sort-by","-s": If the commits should be grouped. Options: "type" | undefined. Default: undefined.

  "--help", "-h": Display help for this package.
```

## Usage

The default configuration for this package is:

```json
 "--tag-prefix": "v",
 "--releases-only": false,
 "--has-upcoming-section": false,
 "--sort-by": undefined
```

which leads to a Changelog that is only grouped by tags (and maybe also your package.json version)
and the commits are listed by creation date. Pre-releases aren't filtered in this setup.

If you have the following setup

```
git tags:
    v0.1.0
    v0.2.0
    v0.3.0-alpha.1

package.json:
    version: 0.3.0
```

then the Changelog will contain the sections `v0.1.0`, `v0.2.0`, `v0.3.0-alpha.1` and `v0.3.0`.

### --tag-prefix

Please note that the Changelog can currently only be created, if the tags follow the
[semantic versioning specification](https://semver.org/spec/v2.0.0.html).
The prefix of the tag can be defined via `--tag-prefix=meow-`. So having tags like
`0.1.0` or `meow-0.1.0` is fine as long as you define it as a prefix in this package.

### --releases-only

This flag can be used to filter pre-releases. The commits of pre-releases like e.g. `v0.3.0-alpha.1`
are then listed under `v0.3.0`. If the tag with version `v0.3.0` does not exist
or the package.json does not contain such a version, the commits won't be listed in the Changelog.

### --has-upcoming-section

This flag can get handy in the beginning if your Changelog is empty or if you would like
to see the latest commit messages.
It lists commit messages that will be part of the next release, but the next version
is not yet defined in the package.json.

### --sort-by

The commit messages in the Changelog are grouped by tags. The commit messages belonging to a
section are sorted by creation date per default. However, it is possible to sort them by type.
Currently, only conventional commits are supported.

#### Accepted values

- type
