// This javascript handles writing the site header / footer to a vendor page.
var dfmNav = {
    header: '{{header}}',
    footer: '{{footer}}',
    add_css_if_necessary: function(search_string, href) {
        // If there's not a css file that matches the search_string, add the href URL.
        var len = document.styleSheets.length;
        var has_css = 0;
        for ( i = 0; i < len; i++ )
        {
            if ( document.styleSheets[i].href !== null )
            {
                if ( document.styleSheets[i].href.indexOf(search_string) > 0 ) has_css = 1;
            }
        }
        if ( has_css == 0 )
        {
            var l = document.createElement('link');
            l.setAttribute('rel', 'stylesheet');
            l.setAttribute('type', 'text/css');
            l.setAttribute('href', href);
            document.getElementsByTagName('head')[0].appendChild(l);
        }

    },
    add_js: function(src) {
        var s = document.createElement('script');
        s.setAttribute('src', src);
        document.getElementsByTagName('head')[0].appendChild(s);
    },
    add_header: function() {
        // Put the header on the page.

        //this.add_js('https://assets.digitalfirstmedia.com/prod/static/js/vendor.min.js?ver=1.0');
        //this.add_js('http://www.denverpost.com/wp-content/themes/wp-mason/static/js/global.min.js');

        if (  jQuery('#dfmHeader').length )
        {
            jQuery('#dfmHeader').html(this.header + '</div>');
        }
    },
    add_footer: function() {
        // Put the footer on the page.
        if (  jQuery('#dfmFooter').length )
        {
            jQuery('#dfmFooter').html(this.footer);
        }
    },
    css_checks: function() {
        // Make sure the page is as ready as possible for the new styles.
        var search_string = 'prod/static/css/denverpost';
        var css_href = 'https://assets.digitalfirstmedia.com/prod/static/css/denverpost.css?ver=1.0';
        this.add_css_if_necessary(search_string, css_href);
        search_string = 'Source+Sans';
        css_href = 'https://fonts.googleapis.com/css?family=Source+Serif+Pro%3A400%2C400italic%2C600%2C600italic%2C700%2C700italic%7CSource+Sans+Pro%3A400%2C400italic%2C600%2C600italic%2C700%2C400italic&#038;ver=4.5.3';
        this.add_css_if_necessary(search_string, css_href);


        // Remove existing bartertown CSS
        jQuery('link[rel=stylesheet][href="http://extras.mnginteractive.com/live/css/site67/bartertown.css"]').remove();
        //jQuery('body').addClass('body-copy');
    },
    initParams: function(params) {
        // Make sure we have jquery on the page.
        // Then add the header to the page, then the footer.

        if ( typeof jQuery === 'undefined' )
        {
            console.log('Adding jQuery');
            this.add_js('https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js');
            var to = window.setTimeout('dfmNav.css_checks(); dfmNav.add_header(); dfmNav.add_footer();', 2000);
        }
        else
        {
            this.css_checks();
            $('#dfmHeader').css('visibility', 'hidden');
            this.add_header();
            this.add_footer();
            var to = window.setTimeout( function() { $('#dfmHeader').css('visibility', 'visible'); }, 5000);
        }
        //var to = window.setTimeout("dfmNav.add_js('https://assets.digitalfirstmedia.com/prod/static/js/denverpost.min.js?ver=1.0');", 4000);
    }  
};
dfmNav.initParams();
