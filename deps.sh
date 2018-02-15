#!/usr/bin/env bash

dep ensure -v
pushd web/app/
npm install
popd
