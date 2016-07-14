#!/bin/bash
# Keep tabs on an Ooyala feed URL. Could work for any URL.
# Sends an email if the length of the content is something that couldn't be correct.
# Example:
# $ ./scrape.bash
# Scrape a different URL
# $ ./scrape.bash --url http://extras.denverpost.com/
source ./source.bash

# Default arguments
URL='http://www.denverpost.com/'
TEST=0
SLUG='denverpost'
FILESIZE=0

# Handle args
while [ "$1" != "" ]; do
    case $1 in
        -u | --url ) shift
            URL=$1
            ;;
        -t | --test ) shift
            TEST=1
            ;;
    esac
    shift
done

# If we're not testing, we download the file
if [ "$TEST" -eq 0 ]; then wget -q -O "$SLUG.new" $URL; fi

wget -O "$SLUG.new" "$URL"

FILESIZE=$(du -b "$SLUG.new" | cut -f 1)
if [ $FILESIZE -lt 1000 ]; then
    echo "Filesize smaller than it sohuld be: $FILESIZE"
    exit 2
fi

python scrape.py

exit 1
