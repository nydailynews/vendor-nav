// This javascript handles writing the site header / footer to a vendor page.
var sitenav = {
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
    add_js: function(src, callback) {
        var s = document.createElement('script');
        s.onload = function() { callback(); }
        s.setAttribute('src', src);
        document.getElementsByTagName('head')[0].appendChild(s);
    },
    add_header: function() {
        // Put the header on the page.
        if ( jQuery('#templateheader').length )
        {
            jQuery('#templateheader').html(this.header + '</div>');
        }
    },
    add_footer: function() {
        // Put the footer on the page.
        if ( jQuery('#templatefooter').length )
        {
            jQuery('#templatefooter').html(this.footer);
        }
    },
    css_checks: function() {
        // Make sure the page is as ready as possible for the new styles.
        var search_string = 'Source+Sans';
        var css_href = 'https://fonts.googleapis.com/css?family=Source+Serif+Pro%3A400%2C400italic%2C600%2C600italic%2C700%2C700italic%7CSource+Sans+Pro%3A400%2C400italic%2C600%2C600italic%2C700%2C400italic&#038;ver=4.5.3';
        //this.add_css_if_necessary(search_string, css_href);
    },
    init_ads: function() {
        window.ranNum = Math.floor(Math.random()*101);
        window.ranRPN = ranNum.toString();
    },
    init: function(params) {
        // Make sure we have jquery on the page.
        // Then add the header to the page, then the footer.
        if ( 'section' in params ) this.header = this.header.replace('<a id="rh-front" href="http://www.nydailynews.com/opinion">  <span>entertainment</span>',  '<a id="rh-front" href="http://www.nydailynews.com/opinion">  <span>' + params.section + '</span>');
        if ( 'url' in params ) this.header = this.header.replace('<a id="rh-front" href="http://www.nydailynews.com/opinion">', '<a id="rh-front" href="' + params.url + '">');

        this.css_checks();
        this.add_header();
        this.add_footer();

        // Check for existing GPT script, which we need to show ads
        var has_gpt = $('script').filter(function () {
            if ( $(this).attr('src') )
            {
                return ($(this).attr('src').indexOf('www.googletagservices.com/tag/js/gpt.js') > 0);
            }
            return false;
        }).length;
        if ( has_gpt == 0 )
        {
            this.add_js('//www.googletagservices.com/tag/js/gpt.js', function() { sitenav.init_ads(); });
        }
        else this.init_ads();
    }  
};

if ( typeof nav_params === 'undefined' ) var nav_params = {};
// Staggered launch of object, depending on if we have jquery or not
if ( typeof jQuery === 'undefined' )
{
    sitenav.add_js('http://interactive.nydailynews.com/js/jquery.min.js', function() { sitenav.init(nav_params); });
}
else
{
    sitenav.init(nav_params);
}
