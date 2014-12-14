'use strict';

/**
 * Clase encargada de realizar las tareas del cargado dinámico de páginas
 * webs.
 *
 * @author David Soler <aensoler@gmail.com>
 */
function DynamicLoader() {

	// Atributo privado
	var _me = this;

	/**
	 * Método que actúa como constructor
	 */
	var _DynamicLoader = function(config) {

		if (typeof config !== "object") {
			config = {};
		}

		if (typeof config.defaultPage !== "string") {
			console.warn("No has especificado una página por defecto.");
			config.defaultPage = "";
		}

		if (typeof config.map !== "object") {
			console.warn("No has especificado ningún recurso.");
			config.map = {};
		}

		this.config = config;
	};

	var _getResource = function(id) {
		if (typeof _me.config.map[id] === "undefined") {
			return null;
		} else {
			return _me.config.map[id];
		}
	};

	var _basename = function(path) {
		return path.split('/').reverse()[0];
	};

	var _activeTabByUrl = function() {
		var url = window.location.pathname;
		$('ul.nav a[href="'+ basename(url) +'"]').parent().addClass('active');
	};

	var _activeTabByHash = function() {
		var hash = _getHash();
		$("ul.nav li").removeClass("active");
		if (hash)
			$('ul.nav li a[href="#'+ hash +'"]').parent().addClass('active');
	};

	var _getHash = function() {
		return window.location.hash.substring(1);
	};

	var _startHashListener =function(func) {
		$(window).on("hashchange", func);
	};

	this.load = function(idFile, config) {
		if (typeof config !== "object") {
			config = {};
		}

		var filepath = _getResource(idFile);

		var target = ("target" in config? config.target : "#content");

		var success = ("success" in config? config.success : function(target, data) {
			//$(target).fadeOut();
			$(target).hide().html(data).fadeIn(1500);
			//$(target).fadeIn();
			console.log("Loaded " + filepath + " in " + target, "[triggering onLoad]");
			$(_me).trigger("onLoad");
		});

		var failure = ("failure" in config? config.failure : function() {
			console.error("It is not a valid URL");
		});

		if (filepath) {
			$.get(filepath, null, function(responseText, textStatus, jqXHR) {
				_activeTabByHash();
				success(target, responseText);
			}, "html").fail(function() {
				failure();
			});
		} else {
			console.error("No existe el recurso con el ID =", idFile);
			_me.load(_me.config.defaultPage);
		}
	};

	this.start = function() {
		_startHashListener(function(win) {
			var hash = _getHash();
			console.log("Loading", hash);
			_me.load(hash);
		});

		if (_getHash()) {
			_me.load(_getHash());
		} else {
			_me.load(_me.config.defaultPage);
		}
	};

	// Lanza el método constructor
	_DynamicLoader.apply(this, arguments);
}
