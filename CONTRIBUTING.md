# Welcome to Things2Do contributing guide

Thank you for investing your time in contributing to this project! In this guide you will get an overview of the
contribution workflow from opening an issue, creating a PR, reviewing, merging the PR and committing.

## Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**. The format is based on the Angular
commit [format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format).

```
<header>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The following is an example for a well formatted commit message.

```
feat(frontend): set up the frontend project

Set up the frontend project with all build tools dependencies and files.
```

### Commit Message Header

The header is mandatory. It consists out of a **type**, a **scope** and a **short summary**.

```
<type>(<scope>): <short summary>
```

#### Type

Possible types and when to use them:

- **build**: Changes affecting the configuration of build tools or libraries.
- **docs**: Changes that only affect the documentation of the repository.
- **feat**: Changes that add new functionality and features to the application.
- **fix**: Changes that fix an error in the source code or the application.
- **refactor**: Changes that change architecture, project structure or source code structure, but essentially not the function.
- **test**: Changes which changes or add tests.

#### Scope

The scope indicates in which part of the repository the change was made. The following scopes are possible:

- **frontend**: Used when the change affects the frontend.
- **backend**: Used when the change affects the backend.

The scope can be omitted if if the changes are made to the root directory or, in exceptional cases, the change affects the frontend and backend at the same time.

#### Short Summary

Short summary in lower case. Line breaks are not allowed.

### Commit Message Body

A detailed summary of the changes made. May extend over several lines without blank lines.

### Commit Message Footer

The footer can always be omitted. If available, it contains additional information and references to issues and pull requests.
