#!/bin/sh

dir="src/day${1}"

[ -d "$dir" ] && node "${dir}/index.js" || echo "Solution for day ${1} does not exist."