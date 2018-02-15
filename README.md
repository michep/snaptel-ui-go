# snaptel-ui-go
UI for snap-telemetry nodes. Give access to plugins, metrics, tasks list and individual tasks on each snap-telemetry node.

## Build
To build from source you'll need:
* Golang
* dep tool (go get github.com/golang/dep/cmd/dep)
* esc tool (go get github.com/mjibson/esc)
* nodejs with npm
* @angular/cli module installed globally to have 'ng' executable in path (npm install -g @angular/cli)

First, install dependencies with deps.(bat|sh) script.

Then build app with build.(bat|sh) script.

That's all, falks! :)

## Usage
Command line parameters:
```
-l --listen    - listen address, ex: ":8888", "127.0.01:6060"
-f -- file     - file with snap-telemetry hosts list in form of 'schema://hostname:port', one host per line
```
