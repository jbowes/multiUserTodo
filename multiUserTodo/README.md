# Aura Multi-User Todo POC

## Setup

### Clone the repo.

```sh
$ git clone git@github.com:mattcreaser/multiUserTodo.git
```
### Import the project to Eclipse
`File -> Import -> Maven -> Existing Maven Projects`.
Hit `Next`, select the cloned repo as the root directory, and click `Finish`.

### Setup the debug configuration

`Run -> Debug Configurations...`. Double click `Maven Build`. Use the following
information:

* **Name**: Aura Todo
* **Base Directory**: `${workspace_loc:/multiUserTodo}`
* **Goals**: `jetty:run`

Click `Apply` and then `Debug`.

### Open the app

Open `http://localhost:8080/multiUserTodo/multiUserTodo.app` in your browser.

## Notes

* All instances are sharing a single hardcoded GoInstant room.
