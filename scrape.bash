#!/bin/bash
# Scrape the Denver Post nav bar and footer.
# Example:
# $ ./scrape.bash
# Scrape a different URL
# $ ./scrape.bash --url http://extras.denverpost.com/

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
        -s | --slug ) shift
            SLUG=$1
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
    echo "Filesize smaller than it should be: $FILESIZE"
    exit 2
fi

if [[ $URL == *"denverpost.com"* ]]; then
    # denverpost.com deploy
    python2.7 parse.py 
    ./ftp.bash --dir $REMOTE_DIR --host $REMOTE_HOST
else
    # non-denverpost.com deploy
    # offload all other deploys to non-tracked script deploy.bash
    ./deploy.bash
fi

exit 1
