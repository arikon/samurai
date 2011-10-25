#!/usr/bin/env bash

SELF_PATH=$(cd -P -- "$(dirname -- "$0")" && pwd -P) && SELF_PATH="$SELF_PATH/$(basename -- "$0")"

while [ -h "$SELF_PATH" ]; do
    DIR=$(dirname -- "$SELF_PATH")
    SYM=$(readlink -- "$SELF_PATH")
    SELF_PATH=$(cd -- "$DIR" && cd -- $(dirname -- "$SYM") && pwd)/$(basename -- "$SYM")
done

SAMURAI_HOME=$(dirname -- "$(dirname -- "$SELF_PATH")")

node $SAMURAI_HOME/lib/samurai.js $@