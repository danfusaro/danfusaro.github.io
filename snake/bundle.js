/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	var _game = __webpack_require__(3);

	var _config = __webpack_require__(10);

	new _game.Game(_config.config, document.getElementById('app'));

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Game = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _renderer = __webpack_require__(4);

	var _food = __webpack_require__(5);

	var _snake = __webpack_require__(8);

	var _util = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Game = exports.Game = function () {
	  function Game(config, element) {
	    var _this = this;

	    _classCallCheck(this, Game);

	    this.size = config.size;
	    this.configuredSpeed = config.speed;
	    this.colors = config.colors;
	    this.levelUp = config.levelUp;
	    this.canvas = this.createGameboard(element, config.width, config.height, config.colors);
	    this.gameOver = true;
	    this.renderer = new _renderer.Renderer(this, this.canvas, config.font);
	    // Intro text
	    this.renderer.text('SNAKE!', config.width / 2, config.height / 2);
	    this.renderer.text('Press Enter to Start', config.width / 2, config.height / 2 + 50, { size: '3vh' });
	    // Add global key handlers
	    window.addEventListener('keydown', function (event) {
	      return _this.keyHandler(event);
	    });
	  }

	  _createClass(Game, [{
	    key: 'createGameboard',
	    value: function createGameboard(parent, width, height, colors) {
	      var canvas = document.createElement('canvas');
	      canvas.width = width;
	      canvas.height = height;
	      // TODO - checkerboard
	      canvas.style.background = colors.board[0];
	      parent.appendChild(canvas);
	      return canvas;
	    }
	  }, {
	    key: 'keyHandler',
	    value: function keyHandler(event) {
	      if (!this.gameOver) {
	        // Control the snake
	        var direction = Object.keys(_util.directions).map(function (key) {
	          return _util.directions[key];
	        }).find(function (direction) {
	          return (
	            // Find matching direction based on keyCode
	            direction.keyCode === event.keyCode
	          );
	        });
	        if (direction) {
	          this.snake.turn(direction);
	        }
	      } else {
	        if (event.keyCode === 13) {
	          this.start();
	        }
	      }
	    }

	    // Gmae started, reset board

	  }, {
	    key: 'start',
	    value: function start() {
	      this.gameOver = false;
	      this.score = 0;
	      this.level = 1;
	      this.generateFood();
	      this.snake = new _snake.Snake(this, this.size, this.colors.snake, this.speed);
	      this.renderer.draw();
	    }

	    // Speed is a constant based on the inital speed and the player's level

	  }, {
	    key: 'generateFood',
	    value: function generateFood() {
	      this.food = new _food.Food(this.canvas, this.size, this.colors.food);
	    }
	  }, {
	    key: 'scored',
	    value: function scored() {
	      this.score++;
	      if (this.score % this.levelUp === 0) {
	        this.level++;
	      }
	      this.generateFood();
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.gameOver = true;
	      // Intro text
	      this.renderer.text('Game Over!', this.canvas.width / 2, this.canvas.height / 2);
	      // TODO - real math for laying out text
	      this.renderer.text('Press Enter to Play Again', this.canvas.width / 2, this.canvas.height / 2 + 50, { size: '3vh' });
	    }
	  }, {
	    key: 'speed',
	    get: function get() {
	      return this.configuredSpeed * this.level;
	    }
	  }]);

	  return Game;
	}();

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Renderer = exports.Renderer = function () {
	  function Renderer(game, canvas, font) {
	    _classCallCheck(this, Renderer);

	    this.game = game;
	    this.font = font;
	    this.canvas = canvas;
	    this.context = canvas.getContext('2d');
	  }

	  _createClass(Renderer, [{
	    key: 'draw',
	    value: function draw() {
	      var _this = this;

	      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	      // Draw food 
	      this.game.food.draw(this.context);
	      // Draw snake
	      this.game.snake.update(this.context);
	      // Game info text
	      this.text('Level: ' + this.game.level, 105, 50);
	      this.text('Score: ' + this.game.score, this.canvas.width - 150, this.canvas.height - 30);

	      if (this.game.gameOver === false) {
	        // Rendering thread, draw on each animation frame
	        setTimeout(function () {
	          requestAnimationFrame(function () {
	            return _this.draw();
	          });
	        });
	      }
	    }

	    // Supply text, coordinates, and misc props

	  }, {
	    key: 'text',
	    value: function text(value, x, y) {
	      var props = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

	      this.context.fillStyle = props.color || 'white';
	      var size = props.size || '5vh';
	      this.context.font = size + ' ' + (props.font || this.font);
	      this.context.textAlign = props.textAlign || 'center';
	      this.context.fillText(value, x, y);
	    }
	  }]);

	  return Renderer;
	}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Food = undefined;

	var _util = __webpack_require__(6);

	var _sprite = __webpack_require__(7);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Food = exports.Food = function (_Sprite) {
	  _inherits(Food, _Sprite);

	  function Food(canvas, size, color) {
	    _classCallCheck(this, Food);

	    var coords = (0, _util.randomCoordinate)(canvas.width, canvas.height, size);
	    return _possibleConstructorReturn(this, (Food.__proto__ || Object.getPrototypeOf(Food)).call(this, coords.x, coords.y, size, color));
	  }

	  return Food;
	}(_sprite.Sprite);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.randomCoordinate = randomCoordinate;
	exports.intersects = intersects;
	function randomCoordinate(width, height, size) {
	  var x = Math.max(Math.round(Math.random() * width) - size / 2, size / 2);
	  var y = Math.max(Math.round(Math.random() * height) - size / 2, size / 2);
	  return { x: x, y: y };
	}

	function intersects(a, b) {
	  return Math.max(a.left, b.left) < Math.min(a.right, b.right) && Math.max(a.top, b.top) < Math.min(a.bottom, b.bottom);
	}

	var directions = exports.directions = {
	  left: { keyCode: 37, opposite: 39 },
	  right: { keyCode: 39, opposite: 37 },
	  up: { keyCode: 38, opposite: 40 },
	  down: { keyCode: 40, opposite: 38 }
	};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Sprite = exports.Sprite = function () {
	  function Sprite(x, y, size, color) {
	    _classCallCheck(this, Sprite);

	    this.x = x;
	    this.y = y;
	    this.size = size;
	    this.color = color;
	  }

	  _createClass(Sprite, [{
	    key: "getRect",
	    value: function getRect() {
	      return {
	        top: this.y,
	        left: this.x,
	        bottom: this.y + this.size,
	        right: this.x + this.size
	      };
	    }
	  }, {
	    key: "draw",
	    value: function draw(context) {
	      context.fillStyle = this.color;
	      context.beginPath();
	      context.moveTo(this.x - this.size / 2, this.y - this.size / 2);
	      context.lineTo(this.x + this.size / 2, this.y - this.size / 2);
	      context.lineTo(this.x + this.size / 2, this.y + this.size / 2);
	      context.lineTo(this.x - this.size / 2, this.y + this.size / 2);
	      context.closePath();
	      context.fill();
	    }
	  }]);

	  return Sprite;
	}();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Snake = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(6);

	var _segment = __webpack_require__(9);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Snake = exports.Snake = function () {
	  function Snake(game, size, color) {
	    _classCallCheck(this, Snake);

	    this.canvas = game.canvas;
	    // Start in the middle
	    this.segments = [new _segment.Segment(Math.round((game.canvas.width - size) / 2), Math.round((game.canvas.height - size) / 2), size, color)];
	    // Defaults to right-moving
	    this.direction = _util.directions.right;
	    this.game = game;
	    this.size = size;
	    this.color = color;
	    this.growing = false;
	  }

	  _createClass(Snake, [{
	    key: 'update',
	    value: function update(context) {
	      var _this = this;

	      var boundsInfo = this.getBoundsInfo();
	      // Start rendering loop
	      this.segments.push(new _segment.Segment(boundsInfo.x, boundsInfo.y, this.size, this.color));

	      // Food was eaten
	      if (boundsInfo.food) {
	        this.game.scored();
	        // Add segment at a certain length of time based on game speed and animation performance
	        this.growing = true;
	        var timeStamp = performance.now();
	        requestAnimationFrame(function () {
	          var diff = Math.round(performance.now() - timeStamp);
	          var time = Math.floor(_this.size / _this.game.speed) * diff;
	          setTimeout(function () {
	            _this.segments.push(new _segment.Segment(boundsInfo.x, boundsInfo.y, _this.size, _this.color));
	            _this.growing = false;
	          }, time);
	        });
	      } else if (!this.growing) {
	        // If there was no growth, remove last added segment
	        this.segments.splice(0, 1);
	      }

	      // There was a collision, game over
	      if (boundsInfo.collision) {
	        this.game.stop();
	      }

	      // Motion
	      this.head.x = boundsInfo.x;
	      this.head.y = boundsInfo.y;

	      // Draw all segments
	      this.segments.forEach(function (s) {
	        s.draw(context);
	      });
	    }
	  }, {
	    key: 'turn',
	    value: function turn(direction) {
	      if (this.direction) {
	        // Check for opposite and do not allow
	        if (direction.keyCode === this.direction.opposite && this.game.score > 0) {
	          return;
	        }
	      }
	      this.direction = direction;
	    }
	  }, {
	    key: 'getBoundsInfo',
	    value: function getBoundsInfo() {

	      var x = this.head.x;
	      var y = this.head.y;

	      var min = this.size / 2;
	      var bounds = { width: this.canvas.width - min, height: this.canvas.height - min };
	      // Speed based on level
	      var speed = this.game.speed;
	      var collisonSelf = void 0;

	      switch (this.direction) {
	        case _util.directions.right:
	          // Check for max width and increment +
	          if (x + speed < bounds.width) {
	            x += speed;
	          }
	          break;
	        case _util.directions.left:
	          // Check for 0 and decrement -
	          if (x - speed > min) {
	            x -= speed;
	          }
	          break;
	        case _util.directions.down:
	          // Check for max height and increment +
	          if (y + speed < bounds.height) {
	            y += speed;
	          }
	          break;
	        case _util.directions.up:
	          // Check for 0 and decrement -
	          if (y - speed > min) {
	            y -= speed;
	          }
	          break;
	      }

	      // Test for head collision with a segment
	      for (var i = 1; i < this.segments.length; i++) {
	        var s = this.segments[i];
	        if (x === s.x && y === s.y) {
	          collisonSelf = true;
	          break;
	        }
	      }

	      // No coordinates changed, there was a collision or head collided with segment
	      var collision = x === this.head.x && y === this.head.y || collisonSelf;

	      // Check to see if the snake ate food
	      var food = (0, _util.intersects)(this.game.food.getRect(), this.head.getRect());

	      return { x: x, y: y, collision: collision, speed: speed, food: food };
	    }
	  }, {
	    key: 'head',
	    get: function get() {
	      return this.segments[0];
	    }
	  }]);

	  return Snake;
	}();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Segment = undefined;

	var _sprite = __webpack_require__(7);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Segment = exports.Segment = function (_Sprite) {
	  _inherits(Segment, _Sprite);

	  function Segment(x, y, size, color) {
	    _classCallCheck(this, Segment);

	    return _possibleConstructorReturn(this, (Segment.__proto__ || Object.getPrototypeOf(Segment)).call(this, x, y, size, color));
	  }

	  return Segment;
	}(_sprite.Sprite);

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var config = exports.config = {
	  width: 1200,
	  height: 800,
	  size: 32,
	  colors: {
	    snake: '#00FF00',
	    food: 'white',
	    board: ['black', 'blue']
	  },
	  speed: 2,
	  levelUp: 3,
	  font: 'Arial'
	};

/***/ })
/******/ ]);