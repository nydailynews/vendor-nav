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
            if ( document.styleSheets[i].href.indexOf(search_string) > 0 ) has_css = 1;
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
    add_js_if_necessary: function(search_var, href) {
    },
    initParams: function(params) {
        //  Make sure we have the CSS we need on the page.
        var search_string = 'prod/static/css/denverpost';
        var css_href = 'https://assets.digitalfirstmedia.com/prod/static/css/denverpost.css?ver=1.0';
        this.add_css_if_necessary(search_string, css_href);

        // * Put the header together
        // * Add the header to the page, then the footer.
    }  
};
