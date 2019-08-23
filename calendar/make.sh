#!/bin/bash

for i in {2010..2020} ; do
    for j in {1..12} ; do
        php calendar.php ${i} ${j} > ${i}$(printf "%02d" $j).png
    done
done