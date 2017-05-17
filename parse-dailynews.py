#!/usr/bin/env python
# Download current versions of nydailynews.com's header and footer.
from parse import Parse, FileWrapper
import sys
import argparse
import doctest
import mimetypes
import gzip

def main(args):
    """ Example usage:
        Describe what we do in this file, then give an example of a command you
        might run on the command line.
        $ python parse.py
        """
    fn = 'dailynews.new'
    fh = open(fn, 'rb')
    markup = fh.read()
    if markup[:3] != '   ':
        # We have a gunzip'ed file we have to extract.
        # We know this because the first three characters of www.nydailynews.com urls are always '   '.
        # Always. They are always '   '.
        markup = gzip.GzipFile(fn, 'r').read()

    # Results of this parsing is stored in p.content
    regexes = {
        'header': '<header\ id="rh">.*</nav>\ *</header>',
        'footer': '<footer\ id="rf">.*</footer>'
    }
    p = Parse()
    p.regexes = regexes
    p.regex = 'header'
    p.extract_parts(markup)
    p.regex = 'footer'
    p.extract_parts(markup)

    # Turn the nav markup into actionable javascript
    fh = open('html/template-dailynews.js', 'rb')
    js = fh.read()
    #js = js.replace('{{header}}', " ".join(p.content['header'].replace("\n", "\\n").replace("'", "\\'").replace(";",";\\n\\\n").splitlines()))
    js = js.replace('{{header}}', " ".join(p.content['header'].replace("\n", "\\n").replace("'", "\\'").splitlines()))
    js = js.replace('{{footer}}', p.content['footer'].replace("\n", "\\n").replace("'", "\\'"))

    fh = open('html/head.html', 'rb')
    head_markup = fh.read()

    # Write the file
    if p.content['header'] != '':
        f = FileWrapper('output/header.html')
        f.write(p.content['header'])
        f = FileWrapper('output/header-iframeable.html')
        f.write('%s%s' % (head_markup, p.content['header']))
    if p.content['footer'] != '':
        f = FileWrapper('output/footer.html')
        f.write(p.content['footer'])
        f = FileWrapper('output/footer-iframeable.html')
        f.write('%s%s' % (head_markup, p.content['footer']))
    if p.content['footer'] != '' and p.content['header'] != '':
        f = FileWrapper('output/vendor-include.js')
        f.write(js)
        

def build_parser(args):
    """ This method allows us to test the args.
        >>> args = build_parser(['--verbose'])
        >>> print args.verbose
        True
        """
    p = argparse.ArgumentParser(usage='$ python parse.py',
                                     description='Parse site header & footer.',
                                     epilog='Examply use: python parse.py')
    p.add_argument("-v", "--verbose", dest="verbose", default=False, action="store_true")
    args = p.parse_args(args)
    return args

if __name__ == '__main__':
    args = build_parser(sys.argv[1:])

    if args.verbose == True:
        doctest.testmod(verbose=args.verbose)
    main(args)
