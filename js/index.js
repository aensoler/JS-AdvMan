'use strict';

/**
 * Launcher de la aplicación.
 *
 * @author David Soler <aensoler@gmail.com>
 */
function initializeApplication() {

	var resourcesMap = {
		"nav"           : "nav.html",
		"main"          : "manPages/main.html",
		"variables"     : "manPages/variables.html",
		"callApplyBind" : "manPages/callApplyBind.html",
		"prototipado"   : "manPages/prototipado.html",
		"claseBasica"   : "manPages/claseBasica.html"
	};

	var dynamicLoader = new DynamicLoader({
		defaultPage: "main",
		map: resourcesMap
	});

	dynamicLoader.load("nav", {

		target:"#nav",

		success: function(target, data) {
			$(target).html(data);
			var navbar = new NavBar();
			dynamicLoader.start();

			$(dynamicLoader).on("onLoad", function(ev) {
				var hash = window.location.hash.slice(1);
				var item = navbar.getItem(hash);
				if (item) {
					navbar.updateBreadCrumb(item);
					navbar.updatePageControls(item);
				}
			});
		}

	});
}

// Safe code begins here.
$(document).ready(function () {
	initializeApplication();
});
