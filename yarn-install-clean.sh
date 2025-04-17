#!/bin/bash

# Disable proxies
unset HTTP_PROXY HTTPS_PROXY http_proxy https_proxy

#  Forward all arguments to yarn
yarn "$@"

