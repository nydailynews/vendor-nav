#!/usr/bin/env python
# Download current versions of nydailynews.com's header and footer.
import parse
import sys
import argparse
import doctest

def main(args):
    """ Example usage:
        Describe what we do in this file, then give an example of a command you
        might run on the command line.
        $ python parse.py
        """
    fh = open('nydailynews.new', 'rb')
    markup = fh.read()

    # Results of this parsing is stored in p.content
    regexes = {
        #'header': '<nav\ id="rh-trending">.*</header>.*<div\ id="content"\ class="site-content">',
        'header': '<header\ id="rh">.*</div>\ </nav>\ \ \ \ \ </header>',
        'footer': '<footer\ class="site-footer">.*</footer>'
    }
    p = p.Parse()
    p.regexes = regexes
    p.regex = 'header'
    p.extract_parts(markup)
    p.regex = 'footer'
    p.extract_parts(markup)

    # Remove these two elements from the footer
    p.content['footer'] = p.content['footer'].replace('Powered by WordPress.com VIP', '').replace('Arbitration', '')

    # Turn the nav markup into actionable javascript
    fh = open('html/template.js', 'rb')
    js = fh.read()
    js = js.replace('{{header}}', p.content['header'].replace("\n", "\\n").replace("'", "\\'"))
    js = js.replace('{{footer}}', p.content['footer'].replace("\n", "\\n").replace("'", "\\'"))

    fh = open('html/head.html', 'rb')
    head_markup = fh.read()

    # Write the file
    if p.content['header'] != '':
        f = FileWrapper('output/header.html')
        f.write(parse.content['header'])
        f = FileWrapper('output/header-iframeable.html')
        f.write('%s%s' % (head_markup, p.content['header']))
    if p.content['footer'] != '':
        f = FileWrapper('output/footer.html')
        f.write(parse.content['footer'])
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
