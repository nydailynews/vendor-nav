// Globals
var is_mobile = /Android|webOS|iPhone|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var is_tablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/i.test(navigator.userAgent);
var googletag = googletag || {};

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
        if ( document.querySelectorAll('#templateheader').length )
        {
            document.getElementById('templateheader').innerHTML = this.header + '</div>';
			var moduleinsert =  ' <div id="rh-ssm"> <div id="rh-sm"> <dl id="rh-follow"> <dt>Follow Us <span class="ri-close"></span></dt> <dd><a href="https://www.facebook.com/NYDailyNews"><span class="ri-facebook"></span> Facebook </a></dd> <dd><a href="https://twitter.com/NYDailyNews"><span class="ri-twitter"></span> Twitter </a></dd> <dd><a href="https://www.instagram.com/nydailynews/"><span class="ri-instagram"></span> Instagram </a></dd> <dd><a href="https://www.pinterest.com/nydailynews/"><span class="ri-pinterest"></span> Pinterest </a></dd> <dd><a href="https://www.youtube.com/user/nydailynews"><span class="ri-youtube"></span> YouTube</a></dd> </dl> <div id="rh-follow-btn"></div> </div> <div id="rh-subscribe"> Subscribe </div> </div> <div id="rho-subscribe"><span class="rho-subscribe-close"></span> <header>Follow Us</header> <!-- <a href="http://link.nydailynews.com/join/4xm/newslettersignup-mobile">Newsletter <span class="ri-angle-right"></span></a> --> <a href="https://www.nydailynews.com/cmlink/notifications">News Alerts<span class="ri-angle-right"></span></a> <a href="/services/mobile">App <span class="ri-angle-right"></span></a> <a href="https://homedelivery.nydailynews.com/">Subscriptions <span class="ri-angle-right"></span></a> </div> <div id="rho-subscribe-desk"><span class="rho-subscribe-close">Subscribe</span> <div class="subscribe-flyout-left-tout"> <p class="headline"><span class="headline-blue">READY</span> FOR THE DAILY NEWS IN REAL TIME?</p> <div class="opt-in-container"> <div class="opt-in-container-left"> <img src="http://assets.nydailynews.com/nydn/img/static/notification.png"> </div> <div class="opt-in-container-right"> <p class="opt-in-signup">Sign up now to start receiving breaking news alerts on the web.</p> <p class="opt-in-signup-message">Available only on <br/>Chrome and Firefox browsers</p> <a href="https://www.nydailynews.com/cmlink/notifications">Opt-In Now</a> </div> </div> </div> <div id="rh-app"><span>Get the latest breaking news, entertainment, sports and more.</span><img src="http://assets.nydailynews.com/nydn/img/static/rh-app.jpg"><a href="/services/mobile">Download Our App</a></div> <div id="rh-subscriptions"><span>Subscribe to the newspaper, our e-edition, or both.</span><img src="http://assets.nydailynews.com/nydn/img/static/rh-subscribe.jpg"><a href="https://homedelivery.nydailynews.com/">Subscribe</a></div> </div> <div class="rho-subscribe-bg" style=""></div> <div id="webpush-subscribe-container" class="webpush-subscribe"> <a class="webpush-subscribe-close" href="javascript:closeWebPushLightbox()">Subscribe</a> <p class="webpush-subscribe__headline">GET BREAKING NEWS UPDATES</p> <p class="webpush-subscribe__subheadline">Get our instant notifications as news happens</p> <div class="webpush-subscribe__opt-in-container"> <a class="webpush-subscribe__link blue" href="https://www.nydailynews.com/cmlink/notifications">ENABLE</a> <a class="webpush-subscribe__link white" href="javascript:closeWebPushLightbox()">NOT NOW</a> </div> <p class="webpush-subscribe__manage">You can manage them anytime using browser settings</p> </div>  ';


			document.getElementById('normalSubScribe').innerHTML = moduleinsert;
        }
    },
    add_footer: function() {
        // Put the footer on the page.
        if ( document.querySelectorAll('#templatefooter').length )
        {
            document.getElementById('templatefooter').innerHTML = this.footer;
            var div_el = document.createElement('div');
            div_el.id = 'header-container';
            div_el.setAttribute('data-reg-role', 'header-container');
            var rh_el = document.getElementById('rh');
            rh_el.appendChild(div_el);
        }
    },
    css_checks: function() {
        // Make sure the page is as ready as possible for the new styles.
        var search_string = 'rh.css';
        var css_href = '//www.nydailynews.com/nydn/c/rh.css';
        this.add_css_if_necessary(search_string, css_href);
        var search_string = 'ra.css';
        var css_href = '//interactive.nydailynews.com/css/ra.css';
        this.add_css_if_necessary(search_string, css_href);
        //var search_string = 'http://interactive.nydailynews.com/css/style.css';
        //var css_href = '//interactive.nydailynews.com/css/style.css';
        //this.add_css_if_necessary(search_string, css_href);
        var search_string = 'Source+Sans';
        var css_href = 'https://fonts.googleapis.com/css?family=Source+Serif+Pro%3A400%2C400italic%2C600%2C600italic%2C700%2C700italic%7CSource+Sans+Pro%3A400%2C400italic%2C600%2C600italic%2C700%2C400italic&#038;ver=4.5.3';
        this.add_css_if_necessary(search_string, css_href);
    },
    init_ads: function() {
        window.ranNum = Math.floor(Math.random()*101);
        window.ranRPN = ranNum.toString();
    },
    init: function(params) {
        // Make sure we have jquery on the page.
        // Then add the header to the page, then the footer.
        this.css_checks();
        if ( 'section' in params ) this.header = this.header.replace('<a id="rh-front" href="http://www.nydailynews.com/opinion">  <span>entertainment</span>',  '<a id="rh-front" href="http://www.nydailynews.com/opinion">  <span>' + params.section + '</span>');
        if ( 'url' in params ) this.header = this.header.replace('<a id="rh-front" href="http://www.nydailynews.com/opinion">', '<a id="rh-front" href="' + params.url + '">');
        this.add_header();
        this.add_footer();

        // Check for existing GPT script, which we need to show ads
        // Array.prototype.filter.call(document.querySelectorAll(selector), filterFn);
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
    sitenav.add_js('//interactive.nydailynews.com/js/jquery.min.js', function() { sitenav.init(nav_params); });
}
else
{
    sitenav.init(nav_params);
}
