#!/bin/bash
# Download current versions of denverpost.com's header and footer.
# Example usage:
# $ ./scrape.bash

while [ "$1" != "" ]; do
    case $1 in
        --yoyonly ) shift
            YOY=1
            YOYONLY=1
            ;;
    esac
    shift
done
