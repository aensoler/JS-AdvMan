'use strict';

/**
 * Clase encargada de gestionar la navegación.
 *
 * @author David Soler <aensoler@gmail.com>
 */
var NavBar = function() {

	var _me = this;

	var _menu = {
		nocionesBasicas: "0. Nociones básicas",
		scope          : "1. Scope",
		clases         : "2. Clases"
	};

	var _menuItems = [
		{
			name  : "0.1. Variables, constantes...",
			id    : "variables",
			parent: "nocionesBasicas"
		},
		{
			name   : "1.1. Modificar el scope de una función",
			id     : "callApplyBind",
			parent : "scope"
		},
		{
			name   : "2.1. Prototipado",
			id     : "prototipado",
			parent : "clases"
		},
		{
			name   : "2.2. Crear una clase",
			id     : "claseBasica",
			parent : "clases"
		}
	];

	var _NavBar = function() {
		_renderMenu();
		_renderSubItems();
	};

	var _renderMenu = function() {
		var createMenuItem = function(id, name) {
			return '<li id="menu-' + id + '" class="dropdown">' +
				'<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button">' +
				name + '<span class="caret"></span></a>' +
				'<ul class="dropdown-menu" role="menu"></ul></li>';
		};

		for (var element in _menu) {
			if (_menu.hasOwnProperty(element)) {
				console.log(element, _menu[element]);
				$(".nav.navbar-nav").append(createMenuItem(element, _menu[element]));
			}
		};
	};

	var _renderSubItems = function() {
		var createMenuSubItem = function(id, name) {
			return '<li><a href="#'+id+'">'+name+'</a></li>';
		};

		var previous = "";
		_menuItems.forEach(function(element, index, array) {
			var el = $("#menu-"+element.parent+" ul.dropdown-menu");
			el.append(createMenuSubItem(element.id, element.name));
			element.previous = previous;
			previous.next = element;
			previous = element;
		});
	};

	_me.updateBreadCrumb = function(item) {
		var createBreadcrumbItem = function(currentId, currentName, parentName) {
			return '<li>'+parentName+'</li>' +
				'<li><a href="#'+currentId+'" class="active">'+currentName+'</a></li>';
		};

		$("ol.breadcrumb").append(createBreadcrumbItem(item.id, item.name, _menu[item.parent]));
	};

	_me.updatePageControls = function(item) {
		var scrollTop = function() {
			console.log("DSAK");
			$('html, body').animate({
				scrollTop: 0
			}, 1000);
		};

		if (item.previous) {
			$(".pageControls #previous").attr("href", "#"+item.previous.id);
			$(".pageControls #previous").children("button").html(item.previous.name);
			$(".pageControls #previous").on("click", scrollTop);
		} else {
			$(".pageControls #previous").hide();
		}
		if (item.next) {
			$(".pageControls #next").attr("href", "#"+item.next.id);
			$(".pageControls #next").children("button").html(item.next.name);
			$(".pageControls #next").on("click", scrollTop);
		} else {
			$(".pageControls #next").hide();
		}
	};

	_me.getItem = function(id) {
		return $.grep(_menuItems, function(e){ return e.id == id; }).pop();
	};

	_NavBar.apply(this, arguments);
};
