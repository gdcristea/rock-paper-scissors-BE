#!/bin/bash

# Disable proxies
unset HTTP_PROXY HTTPS_PROXY http_proxy https_proxy

# Extract and clean --dev or -D from arguments
ARGS=()
DEV_FLAG=""

for arg in "$@"; do
  if [[ "$arg" == "--dev" || "$arg" == "-D" ]]; then
    DEV_FLAG="--dev"
  else
    ARGS+=("$arg")
  fi
done

# Run yarn with or without --dev flag
yarn add "${ARGS[@]}" $DEV_FLAG
