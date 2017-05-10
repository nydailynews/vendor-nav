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
    add_js: function(src) {
        var s = document.createElement('script');
        s.setAttribute('src', src);
        document.getElementsByTagName('head')[0].appendChild(s);
    },
    add_header: function() {
        // Put the header on the page.

        if (  jQuery('#templateheader').length )
        {
            jQuery('#templateheader').html(this.header + '</div>');
        }
    },
    add_footer: function() {
        // Put the footer on the page.
        if (  jQuery('#templatefooter').length )
        {
            jQuery('#templatefooter').html(this.footer);
        }
    },
    css_checks: function() {
        // Make sure the page is as ready as possible for the new styles.
        var search_string = 'prod/static/css/denverpost';
        var css_href = '//extras.denverpost.com/vendor_templates/mason/denverpost.css';
        //this.add_css_if_necessary(search_string, css_href);
        search_string = 'Source+Sans';
        css_href = 'https://fonts.googleapis.com/css?family=Source+Serif+Pro%3A400%2C400italic%2C600%2C600italic%2C700%2C700italic%7CSource+Sans+Pro%3A400%2C400italic%2C600%2C600italic%2C700%2C400italic&#038;ver=4.5.3';
        //this.add_css_if_necessary(search_string, css_href);


        // Remove existing bartertown CSS
        //jQuery('link[rel=stylesheet][href="http://extras.mnginteractive.com/live/css/site67/bartertown.css"]').remove();
    },
    init_ads: function() {
        window.ranNum = Math.floor(Math.random()*101);
        window.ranRPN = ranNum.toString();
        window.dfpBuiltMappings = {};
        window.dfpAdUnits = {};
        googletag.cmd.push(function() {
            dfpBuiltMappings["top_leaderboard"] = googletag.sizeMapping().addSize([1000,200],[[728,90],[970,90],[970,250],[970,30]]).addSize([750,200],[[728,90]]).addSize([300,400],[[300,50],[320,50],[320,100]]).build();
            dfpBuiltMappings["Cube1_RRail_ATF"] = googletag.sizeMapping().addSize([1000,200],[[300,250],[300,600],[300,1050]]).addSize([750,200],[[300,250]]).addSize([300,400],[[300,250]]).build();
            dfpBuiltMappings["Cube2_RRail_mid"] = googletag.sizeMapping().addSize([1000,200],[[300,250]]).addSize([750,200],[[300,250]]).addSize([300,400],[[300,250]]).build();
            dfpBuiltMappings["Cube3_RRail_lower"] = googletag.sizeMapping().addSize([1000,200],[[300,250]]).addSize([750,200],[[300,250]]).addSize([300,400],[[300,250]]).build();
            dfpBuiltMappings["bottom_leaderboard"] = googletag.sizeMapping().addSize([1000,200],[[728,90],[970,250],[970,90]]).addSize([750,200],[[728,90]]).addSize([300,400],[[320,100],[320,50]]).build();
            dfpBuiltMappings["interstitial"] = googletag.sizeMapping().addSize([1000,200],[[1,1]]).addSize([750,200],[[1,1]]).addSize([300,400],[[1,1]]).build();
            dfpAdUnits["interstitial"] = googletag.defineSlot("\/8013\/denverpost.com\/politics\/election",[1,1],"div-gpt-ad-interstitial").defineSizeMapping(dfpBuiltMappings["interstitial"]).setTargeting("POS",["interstitial"]).setTargeting("kv","election").setTargeting("page",["section"]).setTargeting("RPN", ranRPN).addService(googletag.pubads());
            dfpAdUnits["top_leaderboard"] = googletag.defineSlot("\/8013\/denverpost.com\/politics\/election",[728,90],"div-gpt-ad-top_leaderboard").defineSizeMapping(dfpBuiltMappings["top_leaderboard"]).setTargeting("POS",["top_leaderboard"]).setTargeting("kv","election").setTargeting("page",["section"]).setTargeting("RPN", ranRPN).addService(googletag.pubads());
            dfpAdUnits["Cube1_RRail_ATF"] = googletag.defineSlot("\/8013\/denverpost.com\/politics\/election",[300,250],"div-gpt-ad-Cube1_RRail_ATF").defineSizeMapping(dfpBuiltMappings["Cube1_RRail_ATF"]).setTargeting("POS",["Cube1_RRail_ATF"]).setTargeting("kv","election").setTargeting("page",["section"]).setTargeting("RPN", ranRPN).addService(googletag.pubads());
            dfpAdUnits["Cube2_RRail_mid"] = googletag.defineSlot("\/8013\/denverpost.com\/politics\/election",[300,250],"div-gpt-ad-Cube2_RRail_mid").defineSizeMapping(dfpBuiltMappings["Cube2_RRail_mid"]).setTargeting("POS",["Cube2_RRail_mid"]).setTargeting("kv","election").setTargeting("page",["section"]).setTargeting("RPN", ranRPN).addService(googletag.pubads());
            dfpAdUnits["bottom_leaderboard"] = googletag.defineSlot("\/8013\/denverpost.com\/politics\/election",[728,90],"div-gpt-ad-bottom_leaderboard").defineSizeMapping(dfpBuiltMappings["bottom_leaderboard"]).setTargeting("POS",["bottom_leaderboard"]).setTargeting("kv","election").setTargeting("page",["section"]).setTargeting("RPN", ranRPN).addService(googletag.pubads());
            googletag.pubads().enableAsyncRendering();
            googletag.pubads().enableSingleRequest();
            googletag.pubads().collapseEmptyDivs();

            if ( typeof AdLayersAPI === 'undefined' || ! AdLayersAPI.isDebug() ) {
                googletag.enableServices();
            }
        });
    },
    init: function(params) {
        // Make sure we have jquery on the page.
        // Then add the header to the page, then the footer.

        if ( typeof jQuery === 'undefined' )
        {
            this.add_js('https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js');
            var to = window.setTimeout( function () {
                sitenav.css_checks(); sitenav.add_header(); sitenav.add_footer();
                //sitenav.add_js('https://assets.digitalfirstmedia.com/prod/static/js/vendor.min.js?ver=1.0');
                var wait = window.setTimeout( function() { 
                    //sitenav.add_js('https://assets.digitalfirstmedia.com/prod/static/js/denverpost.min.js?ver=1.0'); 
                    }, 3000);
                }, 5000);
        }
        else
        {
            this.css_checks();
            //$('#templateheader').css('visibility', 'hidden');
            this.add_header();
            this.add_footer();
            //this.add_js('https://assets.digitalfirstmedia.com/prod/static/js/vendor.min.js?ver=1.0');
            //var wait = window.setTimeout( function() { sitenav.add_js('https://assets.digitalfirstmedia.com/prod/static/js/denverpost.min.js?ver=1.0'); }, 3000);
            //var to = window.setTimeout( function() { $('#templateheader').css('visibility', 'visible'); }, 5000);
        }

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
            this.add_js('//www.googletagservices.com/tag/js/gpt.js');
            var wait = window.setTimeout( function() { sitenav.init_ads(); }, 2000);
        }
        else this.init_ads();

        // Check for a common ad div, if it's not there then put some ads up
        
        //var to = window.setTimeout("sitenav.add_js('https://assets.digitalfirstmedia.com/prod/static/js/denverpost.min.js?ver=1.0');", 4000);
    }  
};

// Staggered launch of object, depending on if we have jquery or not
if ( typeof jQuery === 'undefined' )
{
    sitenav.add_js('https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js');
    var wait = window.setTimeout(function() { sitenav.init(); }, 2000);
}
else sitenav.initParams();
