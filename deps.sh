#!/usr/bin/env bash

dep ensure
pushd web/app/
npm install
popd
