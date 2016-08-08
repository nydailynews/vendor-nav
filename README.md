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
