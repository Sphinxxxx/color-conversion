/*!
 * @sphinxxxx/color-conversion v2.0.0
 * https://github.com/Sphinxxxx/color-conversion
 *
 * Copyright 2017-2018 Joudee (https://github.com/Joudee), Andreas Borgen (https://github.com/Sphinxxxx), Michael Jackson (https://github.com/mjackson)
 * Released under the ISC license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Color = factory());
}(this, (function () { 'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

String.prototype.startsWith = String.prototype.startsWith || function (needle) {
	return this.indexOf(needle) === 0;
};
String.prototype.padStart = String.prototype.padStart || function (len, pad) {
	var str = this;while (str.length < len) {
		str = pad + str;
	}return str;
};

var Color = function () {
	function Color(r, g, b, a) {
		classCallCheck(this, Color);


		var that = this;
		function parseString(input) {

			if (input.startsWith('#')) {
				that.rgba = Color.hexToRgb(input);
			}

			else if (input.startsWith('hsl')) {
					var _input$match$map = input.match(/([\-\d\.e]+)/g).map(Number),
					    _input$match$map2 = slicedToArray(_input$match$map, 4),
					    h = _input$match$map2[0],
					    s = _input$match$map2[1],
					    l = _input$match$map2[2],
					    _a = _input$match$map2[3];

					if (_a === undefined) {
						_a = 1;
					}

					h /= 360;
					s /= 100;
					l /= 100;
					that.hsla = [h, s, l, _a];
				}

				else {
						var _input$match$map3 = input.match(/([\-\d\.e]+)/g).map(Number),
						    _input$match$map4 = slicedToArray(_input$match$map3, 4),
						    _r = _input$match$map4[0],
						    _g = _input$match$map4[1],
						    _b = _input$match$map4[2],
						    _a2 = _input$match$map4[3];

						if (_a2 === undefined) {
							_a2 = 1;
						}

						that.rgba = [_r, _g, _b, _a2];
					}
		}

		if (r === undefined) {}


		else if (Array.isArray(r)) {
				this.rgba = r;
			}

			else if (b === undefined) {
					var color = r && ('' + r).trim();
					if (color) {
						parseString(color.toLowerCase());
					}
				} else {
					this.rgba = [r, g, b, a === undefined ? 1 : a];
				}
	}


	createClass(Color, [{
		key: 'rgba',
		get: function get$$1() {
			if (this._rgba) {
				return this._rgba;
			}
			if (!this._hsla) {
				throw new Error('No color is set');
			}

			return this._rgba = Color.hslToRgb(this._hsla);
		},
		set: function set$$1(rgb) {
			if (rgb.length === 3) {
				rgb[3] = 1;
			}

			this._rgba = rgb;
			this._hsla = null;
		}


	}, {
		key: 'rgbString',
		get: function get$$1() {
			return 'rgb(' + this.rgba.slice(0, 3) + ')';
		}
	}, {
		key: 'rgbaString',
		get: function get$$1() {
			return 'rgba(' + this.rgba + ')';
		}
	}, {
		key: 'hsla',
		get: function get$$1() {
			if (this._hsla) {
				return this._hsla;
			}
			if (!this._rgba) {
				throw new Error('No color is set');
			}

			return this._hsla = Color.rgbToHsl(this._rgba);
		},
		set: function set$$1(hsl) {
			if (hsl.length === 3) {
				hsl[3] = 1;
			}

			this._hsla = hsl;
			this._rgba = null;
		}


	}, {
		key: 'hslString',
		get: function get$$1() {
			var c = this.hsla;
			return 'hsl(' + c[0] * 360 + ',' + c[1] * 100 + '%,' + c[2] * 100 + '%)';
		}
	}, {
		key: 'hslaString',
		get: function get$$1() {
			var c = this.hsla;
			return 'hsla(' + c[0] * 360 + ',' + c[1] * 100 + '%,' + c[2] * 100 + '%,' + c[3] + ')';
		}
	}, {
		key: 'hex',
		get: function get$$1() {
			var rgb = this.rgba,
			    hex = rgb.map(function (x, i) {
				return i < 3 ? x.toString(16) : Math.round(x * 255).toString(16);
			});

			return '#' + hex.map(function (x) {
				return x.padStart(2, '0');
			}).join('');
		},
		set: function set$$1(hex) {
			this.rgba = Color.hexToRgb(hex);
		}



	}], [{
		key: 'hexToRgb',
		value: function hexToRgb(input) {
			var hex = (input.startsWith('#') ? input.slice(1) : input).replace(/^(\w{3})$/, '$1F') 
			.replace(/^(\w)(\w)(\w)(\w)$/, '$1$1$2$2$3$3$4$4') 
			.replace(/^(\w{6})$/, '$1FF'); 

			if (!hex.match(/^(\w{8})$/)) {
				throw new Error('Unknown hex color; ' + input);
			}

			var rgba = hex.match(/^(\w\w)(\w\w)(\w\w)(\w\w)$/).slice(1) 
			.map(function (x) {
				return parseInt(x, 16);
			}); 

			rgba[3] = rgba[3] / 255;
			return rgba;
		}


	}, {
		key: 'rgbToHsl',
		value: function rgbToHsl(_ref) {
			var _ref2 = slicedToArray(_ref, 4),
			    r = _ref2[0],
			    g = _ref2[1],
			    b = _ref2[2],
			    a = _ref2[3];

			r /= 255;
			g /= 255;
			b /= 255;

			var max = Math.max(r, g, b),
			    min = Math.min(r, g, b);
			var h = void 0,
			    s = void 0,
			    l = (max + min) / 2;

			if (max === min) {
				h = s = 0; 
			} else {
				var d = max - min;
				s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
				switch (max) {
					case r:
						h = (g - b) / d + (g < b ? 6 : 0);break;
					case g:
						h = (b - r) / d + 2;break;
					case b:
						h = (r - g) / d + 4;break;
				}

				h /= 6;
			}

			return [h, s, l, a];
		}


	}, {
		key: 'hslToRgb',
		value: function hslToRgb(_ref3) {
			var _ref4 = slicedToArray(_ref3, 4),
			    h = _ref4[0],
			    s = _ref4[1],
			    l = _ref4[2],
			    a = _ref4[3];

			var r = void 0,
			    g = void 0,
			    b = void 0;

			if (s === 0) {
				r = g = b = l; 
			} else {
				var hue2rgb = function hue2rgb(p, q, t) {
					if (t < 0) t += 1;
					if (t > 1) t -= 1;
					if (t < 1 / 6) return p + (q - p) * 6 * t;
					if (t < 1 / 2) return q;
					if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
					return p;
				};

				var q = l < 0.5 ? l * (1 + s) : l + s - l * s,
				    p = 2 * l - q;

				r = hue2rgb(p, q, h + 1 / 3);
				g = hue2rgb(p, q, h);
				b = hue2rgb(p, q, h - 1 / 3);
			}

			var rgba = [r * 255, g * 255, b * 255].map(Math.round);
			rgba[3] = a;

			return rgba;
		}
	}]);
	return Color;
}();

return Color;

})));
