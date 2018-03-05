#!/usr/bin/env python
# Download current versions of denverpost.com's header and footer.
import sys
import argparse
import re
import doctest
from collections import OrderedDict
import types
import os.path
import string

class Parse:

    def __init__(self):
        """ 
            """
        self.regexes = {
            'header': '<nav\ class="pushnav">.*</header>.*<div\ id="content"\ class="site-content">',
            'footer': '<footer\ class="site-footer">.*</footer>'
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
        regex = re.compile(self.regexes[self.regex], re.MULTILINE|re.VERBOSE|re.IGNORECASE|re.DOTALL|re.UNICODE)
        self.parts = regex.findall(markup)
        self.content[self.regex] = self.parts[0]

        return self.parts


class FileWrapper:
    """ class FileWrapper handles file write operations.
        """
    def __init__(self, filename):
        self.filename = filename
        self.fn = None
 
    def open(self):
        self.fn = open(self.filename, 'w')
 
    def close(self):
        self.fn.close
 
    def write(self, content):
        """ 
            """
        fn = open(self.filename, 'w')
        try:
            # Only run this on non-unicode strings
            if type(content) is not types.UnicodeType:
                content = content.decode('utf-8', 'replace')
        except (UnicodeError), e:
            # Figure out what the position of the error is
            regex = re.compile('.* position ([0-9]*):')
            r = regex.search(e.__str__())
            if len(r.groups()) > 0:
                position = int(r.groups()[0])
                str_range = [position - 10, position + 10]
            print e, content[str_range[0]:str_range[1]]
        fn.write(content.encode('utf-8', 'replace'))
        fn.close
 
    def read(self, filename=''):
        """ 
            """
        if filename == '':
            fn = open(self.filename, 'r')
        else:
            fn = open(filename, 'r')
        content = fn.read()
        fn.close
        return content
 
    def exists(self):
        return os.path.isfile(self.filename)

def main(args):
    """ Example usage:
        Describe what we do in this file, then give an example of a command you
        might run on the command line.
        $ python parse.py
        """
    fh = open('denverpost.new', 'rb')
    markup = fh.read()

    # Results of this parsing is stored in parse.content
    parse = Parse()
    parse.regex = 'header'
    parse.extract_parts(markup)
    parse.regex = 'footer'
    parse.extract_parts(markup)

    # Remove these two elements from the footer
    parse.content['footer'] = parse.content['footer'].replace('Powered by WordPress.com VIP', '').replace('Arbitration', '')

    # Turn the nav markup into actionable javascript
    fh = open('html/template.js', 'rb')
    js = fh.read()
    js = js.replace('{{header}}', parse.content['header'].replace("\n", "\\n").replace("'", "\\'"))
    js = js.replace('{{footer}}', parse.content['footer'].replace("\n", "\\n").replace("'", "\\'"))

    fh = open('html/head.html', 'rb')
    head_markup = fh.read()

    # Write the file
    if parse.content['header'] != '':
        f = FileWrapper('output/header.html')
        f.write(parse.content['header'])
        f = FileWrapper('output/header-iframeable.html')
        f.write('%s%s' % (head_markup, parse.content['header']))
    if parse.content['footer'] != '':
        f = FileWrapper('output/footer.html')
        f.write(parse.content['footer'])
        f = FileWrapper('output/footer-iframeable.html')
        f.write('%s%s' % (head_markup, parse.content['footer']))
    if parse.content['footer'] != '' and parse.content['header'] != '':
        f = FileWrapper('output/vendor-include.js')
        f.write(js)
        

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
