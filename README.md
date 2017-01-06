# Vendor Nav
Tools for managing our vendor nav implementations.

Vendor nav javascript used on the majority of vendor sites exists at http://extra.denverpost.com/vendor_templates/mason/vendor-include.js and is updated every 30 minutes.

Example implementation:

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

# How it works

This is more or less the cron job that fires every thirty minutes:

```bash
*/30 * * * * cd path/to/vendor-nav; source .env-vars.bash; date > log; ./scrape.bash > log
```

scrape.bash calls parse.py, which downloads a Denver Post page and pulls out the necessary elements, then ftp's the pieces and the javascript that makes the pieces work to extras.
