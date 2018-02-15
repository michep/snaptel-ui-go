#!/usr/bin/env bash

pushd web/app/
bash -c ng build
popd

go generate
go build -o dist/snaptel-ui .
