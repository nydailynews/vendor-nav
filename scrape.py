#!/usr/bin/env python
# Download current versions of denverpost.com's header and footer.

def main(args):
    """ Example usage:
        Describe what we do in this file, then give an example of a command you
        might run on the command line.
        $ python3 handler.py
        """
    pass

def build_parser(args):
    """ This method allows us to test the args.
        >>> args = build_parser(['--verbose'])
        >>> print args.verbose
        True
        """
    parser = argparse.ArgumentParser(usage='$ python scrape.py',
                                     description='Download and parse site header & footer.',
                                     epilog='Examply use: python scrape.py')
    parser.add_argument("-v", "--verbose", dest="verbose", default=False, action="store_true")
    args = parser.parse_args(args)
    return args

if __name__ == '__main__':
    args = build_parser(sys.argv[1:])

    if args.verbose == True:
        doctest.testmod(verbose=args.verbose)
    main(args)
