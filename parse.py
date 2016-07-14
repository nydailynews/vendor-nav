#!/usr/bin/env python
# Download current versions of denverpost.com's header and footer.
import sys
import argparse
import re
from collections import OrderedDict
import httplib2

class Parse:

    def __init__(self):
        """ 
            """
        self.regexes = {
            'header': '<nav class="pushnav">.*</nav></nav>',
            'footer': '<footer>.*</footer>'
        }
        self.content = {
            'header': '',
            'footer': ''
        }
        self.regex = 'header'

    def extract_parts(self, markup):
        """ Take a string and parse the desired key/value pairs. Requires a regex
            of named fields. Returns a dict of the named pairs.
            """
        regex = re.compile(self.regex, re.MULTILINE|re.VERBOSE|re.IGNORECASE|re.DOTALL)
        self.parts = regex.findall(markup)
        #print self.parts
        return self.parts

def parse_page():
    """ Given a search string, return the content that matches that search.
        """
    pass

def main(args):
    """ Example usage:
        Describe what we do in this file, then give an example of a command you
        might run on the command line.
        $ python parse.py
        """
    fh = open('denverpost.new', 'rb')
    markup = fh.read()
    parse = Parse()
    parse.extract_parts(markup)
    

def build_parser(args):
    """ This method allows us to test the args.
        >>> args = build_parser(['--verbose'])
        >>> print args.verbose
        True
        """
    parser = argparse.ArgumentParser(usage='$ python parse.py',
                                     description='Parse site header & footer.',
                                     epilog='Examply use: python parse.py')
    parser.add_argument("-v", "--verbose", dest="verbose", default=False, action="store_true")
    args = parser.parse_args(args)
    return args

if __name__ == '__main__':
    args = build_parser(sys.argv[1:])

    if args.verbose == True:
        doctest.testmod(verbose=args.verbose)
    main(args)
