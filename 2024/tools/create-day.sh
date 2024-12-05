#!/bin/sh

mkdir src/day${1}
cp tools/day_template.txt src/day${1}/index.js
sed -i "" "s/DAY_NUM/${1}/g" "src/day${1}/index.js"
touch src/day${1}/input.txt
