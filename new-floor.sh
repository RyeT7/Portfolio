#!/bin/bash

let floorName=$1

if [ -z "$floorName" ]; then
    let $count=$(ls ./src/floor | wc -l) - 1
    $floorName="Floor-($count)"
fi

cp ./src/floor/_TEMPLATE.tsx ./src/floor/$floorName.tsx