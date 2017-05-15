# Vendor Nav
Tools for managing our vendor nav implementations.

Vendor nav javascript used on the majority of vendor sites exists at http://extra.denverpost.com/vendor_templates/mason/vendor-include.js and is updated every 30 minutes.

## Example implementation

### Denver Post

```html
<html>
<head>
...
</head>
<body>
<div id="dfmHeader"><!--Header Goes Here--></div>

...

<script src="http://extra.denverpost.com/vendor_templates/mason/vendor-include.js"></script>
        <script> dfmNav.initParams("mode|article", "site|denverpost", "pageTitle|Crime Map and Stats", "leaderboard|false", "thirdParty|true"); </script>
</body>
</html>
```

### Non-Denver Post

```html
<html>
<head>
...
</head>
<body>
<header id="templateheader"><!--Header goes here--></header>

...

<footer id="templatefooter"><!-- Footer will go in here --></footer>
<script src="path/to/vendor-include.js"></script>
</body>
</html>
```

## How it works

### Denver Post

This is more or less the cron job that fires every thirty minutes:

```bash
*/30 * * * * cd path/to/vendor-nav; source .env-vars.bash; date > log; ./scrape.bash >> log
```

scrape.bash calls parse.py, which downloads a Denver Post page and pulls out the necessary elements, then ftp's the pieces and the javascript that makes the pieces work to extras.

### Non-Denver Post

Same as above, except your cronjob will look something like 
```bash
*/30 * * * * cd path/to/vendor-nav; source .env-vars.bash; date > log; ./scrape.bash --url http://www.nydailynews.com/ --slug dailynews >> log
```

Also, `scrape.bash` will execute a not-in-repo file named `deploy.bash`, which is where you can put all your environment-specific calls. 
