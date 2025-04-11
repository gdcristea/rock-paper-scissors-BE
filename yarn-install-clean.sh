#!/bin/bash

# Disable proxies
unset HTTP_PROXY
unset HTTPS_PROXY
unset http_proxy
unset https_proxy

#Run yarn install on a clean environment
yarn install

