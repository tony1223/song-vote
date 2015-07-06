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
/******/ 	__webpack_require__.p = "/resource/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(14);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var cx = __webpack_require__(3);
	var util = __webpack_require__(4);

	var MaterialRow = React.createClass({
	  displayName: "MaterialRow",

	  getInitialState: function getInitialState() {
	    return { point: this.props.point };
	  },
	  handleTDClick: function handleTDClick(num) {
	    var input = React.findDOMNode(this.refs["p" + num]);
	    if (!input.checked) {
	      this.props.handleClick(this.props.item, num);
	    } else {
	      this.props.handleClick(this.props.item, -1);
	    }
	  },
	  render: function render() {
	    var item = this.props.item;
	    var map = this.props.map;

	    var point = this.props.point;
	    // "id": 134,
	    // "title": "螃蟹",
	    // "track_id": 212634641,
	    // "author_name": "創作人：青春笑捻夢  詞/曲：莊凱程",
	    // "desc": "在台灣的勞動市場裡，有太多不是努力就能有希望的事，\n熱愛台灣的我們，也只能在繼續努力之餘，\n用首歌博君一笑，順便用螃蟹的螯夾一下可愛的台灣老闆們。\n",
	    // "lyrics": "今天晚上下班還有⼀一點時間 我想去逛街\n今天晚上下班還有⼀一點時間 我想去吃螃蟹\n從未來來的未來叫我不要 不能去逛街\n他說該研究投資還要留⼀一點錢 不然他很可憐\n房地產正夯利息也不會太貴 應該趕緊兼差賣屁股賺點錢\n\n可不可以 努力上班就可以\n不用管 黃金現在幾塊銀\n不用怕 股市現在正慘兮兮\n可不可以 不用想房子要買哪裡\n還是 車子要買幾ＣＣ\n包包要不要背ＧＵＣＣＩ\n可不可以 照媽媽說的做就可以\n不用想拯救那些非洲難民\n不用管北極還有沒有冰\n",
	    // "vote_count": 111,
	    // "official_url": "",
	    // "winners": false
	    var comp = this;

	    var disabled = this.props.disabled;

	    var detail = null;
	    return React.createElement(
	      "tr",
	      { className: "song" },
	      React.createElement(
	        "td",
	        null,
	        "#",
	        item.id,
	        " ",
	        item.title,
	        React.createElement("br", null),
	        item.author_name,
	        " ",
	        React.createElement("br", null),
	        React.createElement(
	          "a",
	          { target: "_blank", href: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + item.track_id + "&amp;auto_play=true" },
	          "在新視窗播放"
	        )
	      ),
	      React.createElement(
	        "td",
	        null,
	        item.vote_count
	      ),
	      [5, 4, 3, 2, 1].map(function (index) {
	        var dis = disabled[index] == 2 && point != index;
	        return React.createElement(
	          "td",
	          { className: cx({ lock: dis }),
	            onClick: comp.handleTDClick.bind(this, index), style: { cursor: "pointer" } },
	          React.createElement("input", { diabled: dis, ref: "p" + index, type: "checkbox", checked: point == index, value: "" })
	        );
	      })
	    );
	  }
	});

	var MaterialTable = React.createClass({
	  displayName: "MaterialTable",

	  getInitialState: function getInitialState() {
	    return {
	      vote: {},
	      button: "送出"
	    };
	  },
	  onSongVote: function onSongVote(sing, point) {
	    var check = 0;
	    if (point == -1) {
	      var vote = this.state.vote;
	      delete vote[sing.track_id];
	      this.setState({ vote: vote });
	      return true;
	    }
	    for (var k in this.state.vote) {
	      if (this.state.vote[k] == point) {
	        check++;
	      }
	    }
	    if (check == 2) {
	      alert("已有兩首評為 " + point + " 分的歌，請先取消舊的再選擇");
	      return false;
	    }
	    var vote = this.state.vote;
	    vote[sing.track_id] = point;
	    this.setState({ vote: vote });
	    console.log(arguments);
	  },
	  onSubmit: function onSubmit() {
	    var materials = this.props.songs;
	    var lock_grid = {
	      1: 0,
	      2: 0,
	      3: 0,
	      4: 0,
	      5: 0
	    };
	    for (var k in this.state.vote) {
	      lock_grid[this.state.vote[k]]++;
	    }

	    var vote = this.state.vote;

	    var songs = {};

	    for (var i = 0; i < materials.length; ++i) {
	      songs[materials[i].track_id] = materials[i];
	    }

	    var selecteds = [];
	    for (var k in vote) {
	      selecteds.push({ name: "#" + songs[k].id + " " + songs[k].title, point: vote[k] });
	    }

	    var all_selected = true;
	    for (var i = 1; i <= 5; ++i) {
	      if (lock_grid[i] != 2) {
	        all_selected = false;
	      }
	    }
	    if (!all_selected) {
	      alert("請先選完十首評分歌曲。");
	    }
	    console.log(this.state.vote);

	    this.setState({ button: "送出中，請稍後" });

	    $.post("http://google.com", function () {
	      this.setState({ button: "已完成" });
	    });
	  },
	  render: function render() {
	    var comp = this;
	    var materials = this.props.songs;

	    var max_20 = [];
	    materials.sort(function (s1, s2) {
	      return s2.vote_count - s1.vote_count;
	    });

	    max_20 = materials.slice(0, 20);

	    var lock_grid = {
	      1: 0,
	      2: 0,
	      3: 0,
	      4: 0,
	      5: 0
	    };
	    for (var k in this.state.vote) {
	      lock_grid[this.state.vote[k]]++;
	    }

	    var vote = this.state.vote;

	    var songs = {};

	    for (var i = 0; i < materials.length; ++i) {
	      songs[materials[i].track_id] = materials[i];
	    }

	    var selecteds = [];
	    for (var k in vote) {
	      selecteds.push({ name: "#" + songs[k].id + " " + songs[k].title, point: vote[k] });
	    }

	    var all_selected = true;
	    for (var i = 1; i <= 5; ++i) {
	      if (lock_grid[i] != 2) {
	        all_selected = false;
	      }
	    }

	    var res = React.createElement(
	      "div",
	      null,
	      React.createElement("p", null),
	      React.createElement("p", null),
	      React.createElement(
	        "table",
	        { style: { width: "100%", "padding-left": "20px", "padding-right": "20px" }, className: "table table-bordered col-xs-12" },
	        React.createElement(
	          "tbody",
	          null,
	          React.createElement(
	            "tr",
	            null,
	            React.createElement(
	              "td",
	              { width: "30%" },
	              "#編號 名稱"
	            ),
	            React.createElement(
	              "td",
	              { width: "10%" },
	              "網友票數"
	            ),
	            React.createElement(
	              "td",
	              { width: "10%" },
	              "評分 5 "
	            ),
	            React.createElement(
	              "td",
	              { width: "10%" },
	              "評分 4 "
	            ),
	            React.createElement(
	              "td",
	              { width: "10%" },
	              "評分 3 "
	            ),
	            React.createElement(
	              "td",
	              { width: "10%" },
	              "評分 2 "
	            ),
	            React.createElement(
	              "td",
	              { width: "10%" },
	              "評分 1 "
	            )
	          )
	        ),
	        max_20.map(function (s) {
	          return React.createElement(MaterialRow, { disabled: lock_grid, handleClick: comp.onSongVote, point: vote[s.track_id] == null ? -1 : vote[s.track_id], item: s, key: s.id });
	        })
	      ),
	      all_selected ? "" : "（請先選好評分歌曲）",
	      React.createElement("br", null),
	      React.createElement(
	        "button",
	        { onClick: this.onSubmit, className: "btn btn-disable" },
	        this.state.button
	      )
	    );
	    return res;
	  }
	});

	module.exports = MaterialTable;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/

	(function () {
		'use strict';

		function classNames () {

			var classes = '';

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if ('string' === argType || 'number' === argType) {
					classes += ' ' + arg;

				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);

				} else if ('object' === argType) {
					for (var key in arg) {
						if (arg.hasOwnProperty(key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}

			return classes.substr(1);
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true){
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}

	}());


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Promise = __webpack_require__(5);

	var util = {
		base_url:function(str){
			if(str && str[0] == "/"){
				return str;
			}
			return "/"+str;
		},
		site_url:function(str){
			if(str && str[0] == "/"){
				return str;
			}
			return "/"+str;
		},
		asset_url:function(str){
			if(str && str[0] == "/"){
				return str;
			}
			return "/"+str;
		},
		format_date:function(d){
			var pad = function(num){
				if(num < 10){
					return "0"+num;
				}
				return num;
			};
			if(!isNaN(d)){
				d= new Date(d);
			}
			if(d.getTime){ //date
				return d.getFullYear()+"/"+ pad(d.getMonth()+1) 
					+"/" + pad(d.getDate())
					+" "+pad(d.getHours())
					+":"+pad(d.getMinutes())
					+":"+pad(d.getSeconds());
			}
		},
		watch:function(label){
			return function(d){
				console.log(label,d);
				return Promise.resolve(d);
			}
		},
		//analyticProvider.get_last_comment(null,1,200).then(function(comments){
		timeout:function(promise,time,timeout){
			var p = new Promise(function(ok,fail){
				var flag = false ,resolved = false;
				promise.then(function(datas){
					if(!resolved) {
						ok(datas);
					}
					flag = true;
				},fail);
				setTimeout(function(){
					if(!flag){
						resolved = true;
						timeout(ok);
					}
				},time);
			});
			return p;
		},
		each:function(ary,cb){
			if(ary == null){
				return true;
			}
			if(ary.forEach){
				ary.forEach(cb);
			}else{
				for(var i = 0; i < ary.length;++i){
					if(cb){ 
					  var r = cb(ary[i],i);
					  if(r === false){
					    break;
					  }
					}
				}
			}
		},
		combine:function(arrs){
			var out = [];
			this.each(arrs,function(){
				out.push.apply(out,ary);
			});
			return ary;
		},
		err:function(){
	  		return function(){
		    	console.log("fail:",message);
		    	console.log(arguments);
			};
		}
	};

	module.exports = util;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(6)


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(7);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var asap = __webpack_require__(8);

	function noop() {}

	// States:
	//
	// 0 - pending
	// 1 - fulfilled with _value
	// 2 - rejected with _value
	// 3 - adopted the state of another promise, _value
	//
	// once the state is no longer pending (0) it is immutable

	// All `_` prefixed properties will be reduced to `_{random number}`
	// at build time to obfuscate them and discourage their use.
	// We don't use symbols or Object.defineProperty to fully hide them
	// because the performance isn't good enough.


	// to avoid using try/catch inside critical functions, we
	// extract them to here.
	var LAST_ERROR = null;
	var IS_ERROR = {};
	function getThen(obj) {
	  try {
	    return obj.then;
	  } catch (ex) {
	    LAST_ERROR = ex;
	    return IS_ERROR;
	  }
	}

	function tryCallOne(fn, a) {
	  try {
	    return fn(a);
	  } catch (ex) {
	    LAST_ERROR = ex;
	    return IS_ERROR;
	  }
	}
	function tryCallTwo(fn, a, b) {
	  try {
	    fn(a, b);
	  } catch (ex) {
	    LAST_ERROR = ex;
	    return IS_ERROR;
	  }
	}

	module.exports = Promise;

	function Promise(fn) {
	  if (typeof this !== 'object') {
	    throw new TypeError('Promises must be constructed via new');
	  }
	  if (typeof fn !== 'function') {
	    throw new TypeError('not a function');
	  }
	  this._41 = 0;
	  this._86 = null;
	  this._17 = [];
	  if (fn === noop) return;
	  doResolve(fn, this);
	}
	Promise._1 = noop;

	Promise.prototype.then = function(onFulfilled, onRejected) {
	  if (this.constructor !== Promise) {
	    return safeThen(this, onFulfilled, onRejected);
	  }
	  var res = new Promise(noop);
	  handle(this, new Handler(onFulfilled, onRejected, res));
	  return res;
	};

	function safeThen(self, onFulfilled, onRejected) {
	  return new self.constructor(function (resolve, reject) {
	    var res = new Promise(noop);
	    res.then(resolve, reject);
	    handle(self, new Handler(onFulfilled, onRejected, res));
	  });
	};
	function handle(self, deferred) {
	  while (self._41 === 3) {
	    self = self._86;
	  }
	  if (self._41 === 0) {
	    self._17.push(deferred);
	    return;
	  }
	  asap(function() {
	    var cb = self._41 === 1 ? deferred.onFulfilled : deferred.onRejected;
	    if (cb === null) {
	      if (self._41 === 1) {
	        resolve(deferred.promise, self._86);
	      } else {
	        reject(deferred.promise, self._86);
	      }
	      return;
	    }
	    var ret = tryCallOne(cb, self._86);
	    if (ret === IS_ERROR) {
	      reject(deferred.promise, LAST_ERROR);
	    } else {
	      resolve(deferred.promise, ret);
	    }
	  });
	}
	function resolve(self, newValue) {
	  // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
	  if (newValue === self) {
	    return reject(
	      self,
	      new TypeError('A promise cannot be resolved with itself.')
	    );
	  }
	  if (
	    newValue &&
	    (typeof newValue === 'object' || typeof newValue === 'function')
	  ) {
	    var then = getThen(newValue);
	    if (then === IS_ERROR) {
	      return reject(self, LAST_ERROR);
	    }
	    if (
	      then === self.then &&
	      newValue instanceof Promise
	    ) {
	      self._41 = 3;
	      self._86 = newValue;
	      finale(self);
	      return;
	    } else if (typeof then === 'function') {
	      doResolve(then.bind(newValue), self);
	      return;
	    }
	  }
	  self._41 = 1;
	  self._86 = newValue;
	  finale(self);
	}

	function reject(self, newValue) {
	  self._41 = 2;
	  self._86 = newValue;
	  finale(self);
	}
	function finale(self) {
	  for (var i = 0; i < self._17.length; i++) {
	    handle(self, self._17[i]);
	  }
	  self._17 = null;
	}

	function Handler(onFulfilled, onRejected, promise){
	  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
	  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
	  this.promise = promise;
	}

	/**
	 * Take a potentially misbehaving resolver function and make sure
	 * onFulfilled and onRejected are only called once.
	 *
	 * Makes no guarantees about asynchrony.
	 */
	function doResolve(fn, promise) {
	  var done = false;
	  var res = tryCallTwo(fn, function (value) {
	    if (done) return;
	    done = true;
	    resolve(promise, value);
	  }, function (reason) {
	    if (done) return;
	    done = true;
	    reject(promise, reason);
	  })
	  if (!done && res === IS_ERROR) {
	    done = true;
	    reject(promise, LAST_ERROR);
	  }
	}


/***/ },
/* 8 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	// Use the fastest means possible to execute a task in its own turn, with
	// priority over other events including IO, animation, reflow, and redraw
	// events in browsers.
	//
	// An exception thrown by a task will permanently interrupt the processing of
	// subsequent tasks. The higher level `asap` function ensures that if an
	// exception is thrown by a task, that the task queue will continue flushing as
	// soon as possible, but if you use `rawAsap` directly, you are responsible to
	// either ensure that no exceptions are thrown from your task, or to manually
	// call `rawAsap.requestFlush` if an exception is thrown.
	module.exports = rawAsap;
	function rawAsap(task) {
	    if (!queue.length) {
	        requestFlush();
	        flushing = true;
	    }
	    // Equivalent to push, but avoids a function call.
	    queue[queue.length] = task;
	}

	var queue = [];
	// Once a flush has been requested, no further calls to `requestFlush` are
	// necessary until the next `flush` completes.
	var flushing = false;
	// `requestFlush` is an implementation-specific method that attempts to kick
	// off a `flush` event as quickly as possible. `flush` will attempt to exhaust
	// the event queue before yielding to the browser's own event loop.
	var requestFlush;
	// The position of the next task to execute in the task queue. This is
	// preserved between calls to `flush` so that it can be resumed if
	// a task throws an exception.
	var index = 0;
	// If a task schedules additional tasks recursively, the task queue can grow
	// unbounded. To prevent memory exhaustion, the task queue will periodically
	// truncate already-completed tasks.
	var capacity = 1024;

	// The flush function processes all tasks that have been scheduled with
	// `rawAsap` unless and until one of those tasks throws an exception.
	// If a task throws an exception, `flush` ensures that its state will remain
	// consistent and will resume where it left off when called again.
	// However, `flush` does not make any arrangements to be called again if an
	// exception is thrown.
	function flush() {
	    while (index < queue.length) {
	        var currentIndex = index;
	        // Advance the index before calling the task. This ensures that we will
	        // begin flushing on the next task the task throws an error.
	        index = index + 1;
	        queue[currentIndex].call();
	        // Prevent leaking memory for long chains of recursive calls to `asap`.
	        // If we call `asap` within tasks scheduled by `asap`, the queue will
	        // grow, but to avoid an O(n) walk for every task we execute, we don't
	        // shift tasks off the queue after they have been executed.
	        // Instead, we periodically shift 1024 tasks off the queue.
	        if (index > capacity) {
	            // Manually shift all values starting at the index back to the
	            // beginning of the queue.
	            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
	                queue[scan] = queue[scan + index];
	            }
	            queue.length -= index;
	            index = 0;
	        }
	    }
	    queue.length = 0;
	    index = 0;
	    flushing = false;
	}

	// `requestFlush` is implemented using a strategy based on data collected from
	// every available SauceLabs Selenium web driver worker at time of writing.
	// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593

	// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
	// have WebKitMutationObserver but not un-prefixed MutationObserver.
	// Must use `global` instead of `window` to work in both frames and web
	// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.
	var BrowserMutationObserver = global.MutationObserver || global.WebKitMutationObserver;

	// MutationObservers are desirable because they have high priority and work
	// reliably everywhere they are implemented.
	// They are implemented in all modern browsers.
	//
	// - Android 4-4.3
	// - Chrome 26-34
	// - Firefox 14-29
	// - Internet Explorer 11
	// - iPad Safari 6-7.1
	// - iPhone Safari 7-7.1
	// - Safari 6-7
	if (typeof BrowserMutationObserver === "function") {
	    requestFlush = makeRequestCallFromMutationObserver(flush);

	// MessageChannels are desirable because they give direct access to the HTML
	// task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
	// 11-12, and in web workers in many engines.
	// Although message channels yield to any queued rendering and IO tasks, they
	// would be better than imposing the 4ms delay of timers.
	// However, they do not work reliably in Internet Explorer or Safari.

	// Internet Explorer 10 is the only browser that has setImmediate but does
	// not have MutationObservers.
	// Although setImmediate yields to the browser's renderer, it would be
	// preferrable to falling back to setTimeout since it does not have
	// the minimum 4ms penalty.
	// Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
	// Desktop to a lesser extent) that renders both setImmediate and
	// MessageChannel useless for the purposes of ASAP.
	// https://github.com/kriskowal/q/issues/396

	// Timers are implemented universally.
	// We fall back to timers in workers in most engines, and in foreground
	// contexts in the following browsers.
	// However, note that even this simple case requires nuances to operate in a
	// broad spectrum of browsers.
	//
	// - Firefox 3-13
	// - Internet Explorer 6-9
	// - iPad Safari 4.3
	// - Lynx 2.8.7
	} else {
	    requestFlush = makeRequestCallFromTimer(flush);
	}

	// `requestFlush` requests that the high priority event queue be flushed as
	// soon as possible.
	// This is useful to prevent an error thrown in a task from stalling the event
	// queue if the exception handled by Node.js’s
	// `process.on("uncaughtException")` or by a domain.
	rawAsap.requestFlush = requestFlush;

	// To request a high priority event, we induce a mutation observer by toggling
	// the text of a text node between "1" and "-1".
	function makeRequestCallFromMutationObserver(callback) {
	    var toggle = 1;
	    var observer = new BrowserMutationObserver(callback);
	    var node = document.createTextNode("");
	    observer.observe(node, {characterData: true});
	    return function requestCall() {
	        toggle = -toggle;
	        node.data = toggle;
	    };
	}

	// The message channel technique was discovered by Malte Ubl and was the
	// original foundation for this library.
	// http://www.nonblocking.io/2011/06/windownexttick.html

	// Safari 6.0.5 (at least) intermittently fails to create message ports on a
	// page's first load. Thankfully, this version of Safari supports
	// MutationObservers, so we don't need to fall back in that case.

	// function makeRequestCallFromMessageChannel(callback) {
	//     var channel = new MessageChannel();
	//     channel.port1.onmessage = callback;
	//     return function requestCall() {
	//         channel.port2.postMessage(0);
	//     };
	// }

	// For reasons explained above, we are also unable to use `setImmediate`
	// under any circumstances.
	// Even if we were, there is another bug in Internet Explorer 10.
	// It is not sufficient to assign `setImmediate` to `requestFlush` because
	// `setImmediate` must be called *by name* and therefore must be wrapped in a
	// closure.
	// Never forget.

	// function makeRequestCallFromSetImmediate(callback) {
	//     return function requestCall() {
	//         setImmediate(callback);
	//     };
	// }

	// Safari 6.0 has a problem where timers will get lost while the user is
	// scrolling. This problem does not impact ASAP because Safari 6.0 supports
	// mutation observers, so that implementation is used instead.
	// However, if we ever elect to use timers in Safari, the prevalent work-around
	// is to add a scroll event listener that calls for a flush.

	// `setTimeout` does not call the passed callback if the delay is less than
	// approximately 7 in web workers in Firefox 8 through 18, and sometimes not
	// even then.

	function makeRequestCallFromTimer(callback) {
	    return function requestCall() {
	        // We dispatch a timeout with a specified delay of 0 for engines that
	        // can reliably accommodate that request. This will usually be snapped
	        // to a 4 milisecond delay, but once we're flushing, there's no delay
	        // between events.
	        var timeoutHandle = setTimeout(handleTimer, 0);
	        // However, since this timer gets frequently dropped in Firefox
	        // workers, we enlist an interval handle that will try to fire
	        // an event 20 times per second until it succeeds.
	        var intervalHandle = setInterval(handleTimer, 50);

	        function handleTimer() {
	            // Whichever timer succeeds will cancel both timers and
	            // execute the callback.
	            clearTimeout(timeoutHandle);
	            clearInterval(intervalHandle);
	            callback();
	        }
	    };
	}

	// This is for `asap.js` only.
	// Its name will be periodically randomized to break any code that depends on
	// its existence.
	rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;

	// ASAP was originally a nextTick shim included in Q. This was factored out
	// into this ASAP package. It was later adapted to RSVP which made further
	// amendments. These decisions, particularly to marginalize MessageChannel and
	// to capture the MutationObserver implementation in a closure, were integrated
	// back into ASAP proper.
	// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Promise = __webpack_require__(7);

	module.exports = Promise;
	Promise.prototype.done = function (onFulfilled, onRejected) {
	  var self = arguments.length ? this.then.apply(this, arguments) : this;
	  self.then(null, function (err) {
	    setTimeout(function () {
	      throw err;
	    }, 0);
	  });
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Promise = __webpack_require__(7);

	module.exports = Promise;
	Promise.prototype['finally'] = function (f) {
	  return this.then(function (value) {
	    return Promise.resolve(f()).then(function () {
	      return value;
	    });
	  }, function (err) {
	    return Promise.resolve(f()).then(function () {
	      throw err;
	    });
	  });
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//This file contains the ES6 extensions to the core Promises/A+ API

	var Promise = __webpack_require__(7);
	var asap = __webpack_require__(8);

	module.exports = Promise;

	/* Static Functions */

	var TRUE = valuePromise(true);
	var FALSE = valuePromise(false);
	var NULL = valuePromise(null);
	var UNDEFINED = valuePromise(undefined);
	var ZERO = valuePromise(0);
	var EMPTYSTRING = valuePromise('');

	function valuePromise(value) {
	  var p = new Promise(Promise._1);
	  p._41 = 1;
	  p._86 = value;
	  return p;
	}
	Promise.resolve = function (value) {
	  if (value instanceof Promise) return value;

	  if (value === null) return NULL;
	  if (value === undefined) return UNDEFINED;
	  if (value === true) return TRUE;
	  if (value === false) return FALSE;
	  if (value === 0) return ZERO;
	  if (value === '') return EMPTYSTRING;

	  if (typeof value === 'object' || typeof value === 'function') {
	    try {
	      var then = value.then;
	      if (typeof then === 'function') {
	        return new Promise(then.bind(value));
	      }
	    } catch (ex) {
	      return new Promise(function (resolve, reject) {
	        reject(ex);
	      });
	    }
	  }
	  return valuePromise(value);
	};

	Promise.all = function (arr) {
	  var args = Array.prototype.slice.call(arr);

	  return new Promise(function (resolve, reject) {
	    if (args.length === 0) return resolve([]);
	    var remaining = args.length;
	    function res(i, val) {
	      if (val && (typeof val === 'object' || typeof val === 'function')) {
	        if (val instanceof Promise && val.then === Promise.prototype.then) {
	          while (val._41 === 3) {
	            val = val._86;
	          }
	          if (val._41 === 1) return res(i, val._86);
	          if (val._41 === 2) reject(val._86);
	          val.then(function (val) {
	            res(i, val);
	          }, reject);
	          return;
	        } else {
	          var then = val.then;
	          if (typeof then === 'function') {
	            var p = new Promise(then.bind(val));
	            p.then(function (val) {
	              res(i, val);
	            }, reject);
	            return;
	          }
	        }
	      }
	      args[i] = val;
	      if (--remaining === 0) {
	        resolve(args);
	      }
	    }
	    for (var i = 0; i < args.length; i++) {
	      res(i, args[i]);
	    }
	  });
	};

	Promise.reject = function (value) {
	  return new Promise(function (resolve, reject) {
	    reject(value);
	  });
	};

	Promise.race = function (values) {
	  return new Promise(function (resolve, reject) {
	    values.forEach(function(value){
	      Promise.resolve(value).then(resolve, reject);
	    });
	  });
	};

	/* Prototype Methods */

	Promise.prototype['catch'] = function (onRejected) {
	  return this.then(null, onRejected);
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// This file contains then/promise specific extensions that are only useful
	// for node.js interop

	var Promise = __webpack_require__(7);
	var asap = __webpack_require__(13);

	module.exports = Promise;

	/* Static Functions */

	Promise.denodeify = function (fn, argumentCount) {
	  argumentCount = argumentCount || Infinity;
	  return function () {
	    var self = this;
	    var args = Array.prototype.slice.call(arguments);
	    return new Promise(function (resolve, reject) {
	      while (args.length && args.length > argumentCount) {
	        args.pop();
	      }
	      args.push(function (err, res) {
	        if (err) reject(err);
	        else resolve(res);
	      })
	      var res = fn.apply(self, args);
	      if (res &&
	        (
	          typeof res === 'object' ||
	          typeof res === 'function'
	        ) &&
	        typeof res.then === 'function'
	      ) {
	        resolve(res);
	      }
	    })
	  }
	}
	Promise.nodeify = function (fn) {
	  return function () {
	    var args = Array.prototype.slice.call(arguments);
	    var callback =
	      typeof args[args.length - 1] === 'function' ? args.pop() : null;
	    var ctx = this;
	    try {
	      return fn.apply(this, arguments).nodeify(callback, ctx);
	    } catch (ex) {
	      if (callback === null || typeof callback == 'undefined') {
	        return new Promise(function (resolve, reject) {
	          reject(ex);
	        });
	      } else {
	        asap(function () {
	          callback.call(ctx, ex);
	        })
	      }
	    }
	  }
	}

	Promise.prototype.nodeify = function (callback, ctx) {
	  if (typeof callback != 'function') return this;

	  this.then(function (value) {
	    asap(function () {
	      callback.call(ctx, null, value);
	    });
	  }, function (err) {
	    asap(function () {
	      callback.call(ctx, err);
	    });
	  });
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	// rawAsap provides everything we need except exception management.
	var rawAsap = __webpack_require__(8);
	// RawTasks are recycled to reduce GC churn.
	var freeTasks = [];
	// We queue errors to ensure they are thrown in right order (FIFO).
	// Array-as-queue is good enough here, since we are just dealing with exceptions.
	var pendingErrors = [];
	var requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError);

	function throwFirstError() {
	    if (pendingErrors.length) {
	        throw pendingErrors.shift();
	    }
	}

	/**
	 * Calls a task as soon as possible after returning, in its own event, with priority
	 * over other events like animation, reflow, and repaint. An error thrown from an
	 * event will not interrupt, nor even substantially slow down the processing of
	 * other events, but will be rather postponed to a lower priority event.
	 * @param {{call}} task A callable object, typically a function that takes no
	 * arguments.
	 */
	module.exports = asap;
	function asap(task) {
	    var rawTask;
	    if (freeTasks.length) {
	        rawTask = freeTasks.pop();
	    } else {
	        rawTask = new RawTask();
	    }
	    rawTask.task = task;
	    rawAsap(rawTask);
	}

	// We wrap tasks with recyclable task objects.  A task object implements
	// `call`, just like a function.
	function RawTask() {
	    this.task = null;
	}

	// The sole purpose of wrapping the task is to catch the exception and recycle
	// the task object after its single use.
	RawTask.prototype.call = function () {
	    try {
	        this.task.call();
	    } catch (error) {
	        if (asap.onerror) {
	            // This hook exists purely for testing purposes.
	            // Its name will be periodically randomized to break any code that
	            // depends on its existence.
	            asap.onerror(error);
	        } else {
	            // In a web browser, exceptions are not fatal. However, to avoid
	            // slowing down the queue of pending tasks, we rethrow the error in a
	            // lower priority turn.
	            pendingErrors.push(error);
	            requestErrorThrow();
	        }
	    } finally {
	        this.task = null;
	        freeTasks[freeTasks.length] = this;
	    }
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(2);
	var cx = __webpack_require__(3);

	var materialDatas = __webpack_require__(15);
	var MaterialTable = __webpack_require__(1);

	React.render(React.createElement(
		"div",
		{ className: "container" },
		React.createElement(MaterialTable, { songs: materialDatas })
	), document.getElementById("react-root"));

/***/ },
/* 15 */
/***/ function(module, exports) {

	var datas = [
	  {
	    "id": 134,
	    "title": "螃蟹",
	    "track_id": 212634641,
	    "author_name": "創作人：青春笑捻夢  詞/曲：莊凱程",
	    "desc": "在台灣的勞動市場裡，有太多不是努力就能有希望的事，\n熱愛台灣的我們，也只能在繼續努力之餘，\n用首歌博君一笑，順便用螃蟹的螯夾一下可愛的台灣老闆們。\n",
	    "lyrics": "今天晚上下班還有⼀一點時間 我想去逛街\n今天晚上下班還有⼀一點時間 我想去吃螃蟹\n從未來來的未來叫我不要 不能去逛街\n他說該研究投資還要留⼀一點錢 不然他很可憐\n房地產正夯利息也不會太貴 應該趕緊兼差賣屁股賺點錢\n\n可不可以 努力上班就可以\n不用管 黃金現在幾塊銀\n不用怕 股市現在正慘兮兮\n可不可以 不用想房子要買哪裡\n還是 車子要買幾ＣＣ\n包包要不要背ＧＵＣＣＩ\n可不可以 照媽媽說的做就可以\n不用想拯救那些非洲難民\n不用管北極還有沒有冰\n",
	    "vote_count": 111,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 146,
	    "title": "走過的路",
	    "track_id": 212635205,
	    "author_name": "周照棠 story, teller\n詞 周照棠、李崇甫、陳郁翔\n曲 周照棠",
	    "desc": "「不要畏懼眼前正籠罩著的黑暗，\n讓我們一起把太陽給點亮。」\n歌曲以半口語的方式嵌入「作伙」的精神\n以及對於「臺灣」這片土地的依戀。\n在邁向成功的旅途中，\n也許我們可以依著歌曲最末段的簡單樂句，\n一同合唱前進。\n",
	    "lyrics": "看這片山、我們的海岸；\n美麗的人、美麗的夢\n都在這。\n\n這塊土地上有我們堅持的理想\n流過的汗、痛過的痛\n也在這。\n\n不怕黑暗籠罩，我與你作伴，\n我們一起將太陽點亮；\n若是颳風下雨，讓我來作你的雨傘，\n陪你慢慢地走。\n\n我喊你的名字，你聽我的聲音，\n不用去想面前的路有多少變化；\n\n我牽著你的手，請你跟著我的腳步，\n我們就快要到那個叫做「成功」的大道。\n\n咱向前走，咱向前衝，\n衝過這段路。\n\n一路上也會跌倒，\n不知道如何是好的時候，\n有我有你來互相照顧。\n請你相信，\n希望就在前方。\n",
	    "vote_count": 1298,
	    "official_url": "https://www.facebook.com/ChouChaoTang",
	    "winners": false
	  },
	  {
	    "id": 4,
	    "title": "我有你",
	    "track_id": 211101502,
	    "author_name": "李文良",
	    "desc": "結束過去  迎接希望的未來(我想用簡單的音符  像兩隻老虎一樣  簡單旋律 容易傳唱)",
	    "lyrics": "無論你有啥代誌  我永遠塊你身邊  日頭出  已經過去  不如意甲放抹記   喝一杯要歡喜   摁湯喝甲目屎滴   你甲我要歡喜   歡喜來過日子   一路走來風風雨雨    日子過甲茫茫霧霧    所有困難我處理   誰叫咱是麻吉   誰叫咱是麻吉",
	    "vote_count": 43,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 116,
	    "title": "光島",
	    "track_id": 212582413,
	    "author_name": "Lin Simon",
	    "desc": "結束在國外一年的生活回到台灣，\n發現台灣其實有很多很美好的事情正在發生。\n\n也許此刻，我們正面臨各種不同的問題和選擇，\n但我知道，總有一道光，會指引我們向前找到對的方向。\n\n我也相信，台灣這座發光的小島，永不熄滅，永遠堅強！\n\n",
	    "lyrics": "親吻過 大地的臉頰\n撫摸過 城市的手掌 \n\n看過了 動人的風景\n走進了 力爭上游的人群\n\n目光如炬  清晰透明\n不斷探尋生活的意義\n\n遠方 一直有 個地方\n閃爍著堅韌的光\n\n是哪道光 成就了這座島\n覆蓋了所有 憂傷和沮喪\n\n帶著希望 它點亮了夢想\n奔跑著 期待 明天的太陽\n\n是哪道光 給了我們信仰\n勇敢相信著 未來不再迷惘\n\n結局是否一樣 溫柔而堅強\n親愛的 這座島 永不熄滅 的 光亮",
	    "vote_count": 133,
	    "official_url": "https://www.facebook.com/profile.php?id=1653507115",
	    "winners": false
	  },
	  {
	    "id": 40,
	    "title": "愛爾蘭",
	    "track_id": 211594041,
	    "author_name": "Mr.河燈",
	    "desc": "寫『外交』困境，美麗的愛爾蘭，愛你真的有那麼難嗎？---這是發生在愛河的一段異國情緣。",
	    "lyrics": "無緣的人～無緣的人\n彼個無緣的愛爾蘭\n彼暝河燈～照著閃爍藍藍的眼\n無緣的人～無緣的人\n彼個無緣的愛爾蘭\n今暗月光～照著稀微的打狗港\n\n等待的愛～隨風而散\n冷清的街巷\n飄（剩）著異國的咖啡香\n\n",
	    "vote_count": 30,
	    "official_url": "https://www.facebook.com/dungjye",
	    "winners": false
	  },
	  {
	    "id": 175,
	    "title": "聽聽",
	    "track_id": 212796188,
	    "author_name": "胡月美",
	    "desc": "當我們看著每天忙碌生活中的人來人往時，\n是否曾想想他們過得快樂嗎，對未來煩惱嗎？\n想到核電，美麗灣，黑箱服貿…\n為了所謂經濟利益而不惜犧牲台灣百姓幸福的重大議題…\n不禁想到：\n難道為了利益要付出的代價是我們這片土地的美好回憶變得越來越陌生嗎？\n原來的蘭嶼已經被核廢料污染，\n花東部落那麼辛苦弱勢為了守護傳統領域也是台灣最後的海岸，\n許多將被黑箱服貿影響而失業的產業勞工…\n台灣四面環繞著海洋，如果海知道也會吶喊哭泣，\n\n希望透過這首歌曲，呼籲大家用心聽，去感覺，\n我們將聽見心裡那海洋的聲音，\n呼喚我們手牽手守護我們心中的夢田，\n珍惜海洋土地所給我們的幸福，\n為孩子留下美好的明天。",
	    "lyrics": "Ａ\n我推開窗                又看見昨天的你\n站在遠方                的身影\n\n你面無表情            深深呼吸\n我想知道                你心情\n\n這片天空                這片土地\n漸漸陌生的回憶\n沈默的吶喊                海洋在哭泣\n\nＢ\nCan you hear it\nDo you feel it\n閉上眼睛                聽聽海的聲音\n\nCan you hear it\nDo you feel it\n聲聲不息 \n\nＣ\n用心聽        去感覺\n其實我們都聽得見\n\n你和我        手牽手向前                \n守護心中那片夢田\n\n海風吹        土地滋養一切\n幸福就在身邊\n\n為孩子留下那美好的明天\n\n",
	    "vote_count": 59,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 143,
	    "title": "臺灣親像一隻船",
	    "track_id": 212635010,
	    "author_name": "作詞/許宗恩 作曲/許宗恩、王俊傑",
	    "desc": "作詞者許宗恩是最近在小英美國行聽了小英數場演講之後，\n用簡單的詩句勾畫出小英口中台灣人的夢。\n曲則由鋼琴詩人王俊傑與旅美詩詞作家許宗恩合作這首歌。\n",
	    "lyrics": "臺灣親像一隻船 大漢細漢共命運\n全民打拼勤做工 島嶼天光有希望\n兩岸一中設陷坑 佳哉大家有覺醒\n團結一心迎新政 確保主權愛和平\n",
	    "vote_count": 110,
	    "official_url": "https://www.facebook.com/profile.php?id=100000338245411&fref=ts",
	    "winners": false
	  },
	  {
	    "id": 77,
	    "title": "芋仔番薯仔囝",
	    "track_id": 212447693,
	    "author_name": "曲：莊堵安 詞：陳素月",
	    "desc": "芋仔番薯所呈現的意象是在地的、質樸的、實實在在扎根於這塊土地上。族群融合是這首歌要傳遞的中心價值。在這塊土地上生活的人們雖來自不同的族群，卻共同領受著這塊土地賦予的恩惠。有共同的命運，共同的未來。",
	    "lyrics": "芋仔香、蕃薯甜、阮是芋仔蕃薯仔囝\n芋仔香、蕃薯甜、芋仔蕃薯滿田埂\n冷風吹、露水凍、萌芽生根年年發\n日頭曝、雨水淋、田頭田尾自由發\n芋仔香、蕃薯甜、阮是芋仔蕃薯仔囝\n芋仔香、蕃薯甜、芋仔蕃薯好腰飼\n土地肚量大、芋仔蕃薯逗陣大\n土地恩情大、芋仔蕃薯來請養大\n芋仔弟和蕃薯仔兄、有緣歡喜作親戚\n芋仔弟和蕃薯仔兄、牽手作伙向前行\n啊．．．啊．．．、向前看、向前行、風雨大免驚嚇\n啊．．．啊．．．、向前看、向前行、春天已經等待在那\n有我的血、有你的汗、我的傷痕有你的痛 \n有我的心、有你的情、我的夢中有你的夢\n啊．．．啊．．．向前行",
	    "vote_count": 42,
	    "official_url": "www.facebook.com/duane.sj",
	    "winners": false
	  },
	  {
	    "id": 73,
	    "title": "我們的地方  我們的家",
	    "track_id": 212071773,
	    "author_name": "胡詩穎 Queenie Hu",
	    "desc": "有人說，台灣最美的風景是「人」。沒有「我們」的凝聚，台灣就失去了被賦予的最大意義。我們，就是台灣；台灣，就是我們。",
	    "lyrics": "有一個地方，叫「我們」的地方。\n那裡的土地上種植我們的夢想。\n回到那故鄉，只有一個方向。\n說好一起鋪路實現的理想。\n\n有一個地方，叫「我們」的地方。\n空氣裡充滿著我們堅信不疑的立場。\n一起朝著，幸福未來目的勇闖。\n我們就是實現夢想的力量。\n\n有我們的地方，就是我們的家。\n我們都是撫慰沮喪的避風港。\n無論漂泊流浪，前途艱難迷惘。\n我們一起找到希望。\n（我們一起創造天堂）\n這個地方，是台灣，我們的家。\n\n走過無數艱難的崎嶇道路上，\n學會什麼是勇敢和堅強。",
	    "vote_count": 462,
	    "official_url": "https://www.facebook.com/queeniehu",
	    "winners": false
	  },
	  {
	    "id": 18,
	    "title": "寄託",
	    "track_id": 211101474,
	    "author_name": "蘇于繡",
	    "desc": "2011年蔡英文女士第一次要選總統，\n我們就做好<民主出頭天>的初本\n2014年5月也創做<寄託>…..共2首選舉歌曲。\n隻樹多枝多煩憂\n亦喜亦愁亦悠悠\n還真還假還夢遊\n一心一意等春秋\n劣者編寫<民主出頭天與.寄託>二首心聲歌曲，\n乃因愚者本身出身在清寒家境，如今已單親10多年，\n經歷種種的辛酸.血淚.無以言表.深知中下階層的勞工.百姓，在腐敗無能的國民黨執政下..貧富差距大，\n生活在水深火熱中的人民不計其數。\n劣吾編曲，道出百姓之苦，更是期盼    民主進步黨\n能有賢能之智者來執政，讓台灣人民過著幸福快樂的生活。\n誠願  祝福蔡英文女士，高票當選2016年，\n台灣第一女總統",
	    "lyrics": "嘿唷喔嘿唷  看過去的運命   茫茫渺渺勞碌一生\n嘿唷喔嘿唷  謂古早到現代   百姓艱苦無奈無奈\n一碗飯       有幾擺      流血流汗做甲身體醜\n一粒米       有幾擺      鋤頭拿起心酸流眼淚\n嘿唷喔嘿唷  咱今嘛的社會  攏無溫暖愛心的有幾個  \n嘿唷喔嘿唷  台灣人要團結  為著正義要勇敢站出來\n一夕人       的期待       想要認真拼乎咱後代\n一世情       寄託在       民主進步美好的將來",
	    "vote_count": 297,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 1,
	    "title": "打拚為台灣",
	    "track_id": 211101508,
	    "author_name": "黃光洲",
	    "desc": "\n以歌曲詮敘台灣的過去,現在與未來,凝聚共識.\n",
	    "lyrics": "太平洋岸.美麗島嶼.物產豐盛.文化多元.歷盡滄桑四百年.人民勤樸愛和平.自立自主不驚強權無理欺壓.自由民主代代幸福長長久久.族群平等和睦共處.作伙打拚命為台灣",
	    "vote_count": 185,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 122,
	    "title": "下港囝仔",
	    "track_id": 212582531,
	    "author_name": "張國斌",
	    "desc": "長大後，也許有些人是留在家鄉，但絕大部份的子弟，都往比較繁華的市中心去打拼定居了，\n工作上的壓力、經濟的重擔、人口擁擠的煩雜壓迫，常使人精神崩潰。\n回家吧！亦或者說找個時間回家吧！家鄉的一切，還是處處保留離開前的那一幕。\n放鬆的去享受，庄腳的點點滴滴，世外桃源，你會發現生活的靈感、人生的希望，\n都是從這裡開始萌芽的。",
	    "lyrics": "大廟口ㄟ榕樹下 行棋ㄟ老歲仔 \n捉迷藏ㄟ囝仔   樹仔頂有一隻\n古厝頭前ㄟ茴埕 丫嬤底捏杉\n腳赤翩背一個嬰兒仔 唱歌吼伊聽\n延著田邊 我行落去 脫赤腳 踏爛糊仔粥\n坐牛車  斗斗啊走 魚溫仔頂有白鷺絲\n\n南面而歌 南方的聲 阮作伙唱著古早味 \n清爽ㄟ風 對阮面吹 輕鬆的畫面 \n阿雜的代誌 暫時將伊來放一邊 \n生活ㄟ靈感為這開始\n\n南面而歌 南方的聲 阮作伙唱著人情味 \n莊腳ㄟ故事 逐天底扮 酸甘蜜甜\n所有無歡喜 暫時將伊來放一邊 \n人生ㄟ希望為這開始",
	    "vote_count": 336,
	    "official_url": "https://www.facebook.com/goubin.zhang",
	    "winners": false
	  },
	  {
	    "id": 37,
	    "title": "我們的時代",
	    "track_id": 211594075,
	    "author_name": "曲:Anthony Kwong, 詞:Barry Lam",
	    "desc": "希望新思維推進台灣民主發展，建立關懷仁愛社會，不向惡勢力低頭，加油！\n編曲的Barry: 最後左邊有一段像潑墨水的聲，在左邊出現，是代表中國大陸思想的入侵。\n而同時三味線就是代表不斷地保衛家園。\n民進黨是綠營的，所以作了“綠地上青苗老石上青苔徐徐踏進舞台”。\nps Barry和Anthony最為人熟識的作品是‘民主會戰勝歸來’，是一首紀念六四事件的歌。\n謝謝",
	    "lyrics": "青春的浪花一重重\n每個人都有一個夢\n和平地繁榮是初衷\n進步卻不娓共\n張開民主的笑容\n張開創新的黑瞳孔\n美麗的島嶼的輪廓\n是我們的臉孔\n\n流行的樂曲在窗外\n何時能走進未來\n綠地上青苗 老石上青苔\n徐徐踏進舞台\n我的眼前從來沒阻礙\n因為心中是仁愛\n黑夜要離開 心靈要雪白\n我們的時代\n\nMusic\n\n青春的浪花一重重\n每個人都有一個夢\n和平地繁榮是初衷\n進步卻不娓共\n張開民主的笑容\n張開創新的黑瞳孔\n美麗的島嶼的輪廓\n是我們的臉孔\n\n\n流行的樂曲在窗外\n何時能走進未來\n團結的朋友一起來\n我們的時代",
	    "vote_count": 217,
	    "official_url": "https://www.facebook.com/anthonykwong82\n\n",
	    "winners": false
	  },
	  {
	    "id": 7,
	    "title": "叼位",
	    "track_id": 211101495,
	    "author_name": "海馬 迴",
	    "desc": "很多的徬徨。有時候也不知道自己到底走的路是對還錯，未來在哪裡? 但是每個人都是這樣過來的，一步一步勇敢的向前，不管前方有多少的阻礙與困難。知道自己在做什麼事，做就對了!!!",
	    "lyrics": "天頂微微的光 風微微的冷 空氣是那樣的輕 \n路程飛入夢中 飄浪的稀微 不願回頭找過去\n看不清 聽不入 想不開 靈魂要有的形\n我的未來在哪裡 人生茫茫叼位去\n希望未來去叼位 我的未來在哪裡",
	    "vote_count": 139,
	    "official_url": "https://www.facebook.com/BuYaoBuNengBuKeYi",
	    "winners": false
	  },
	  {
	    "id": 81,
	    "title": "百合花",
	    "track_id": 212447740,
	    "author_name": "雅子",
	    "desc": "",
	    "lyrics": "大肚山紅土頂      百合花開佇六七月\n一朵二朵惦惦開    優雅个形影帶香味\n想到過去少年時    青草埔仔連海天\n日出東爿照花蕊    日落花謝等來年\n百合花 滿山開     親像天星閃閃爍\n百合花 价汝約束   年年會當再相見\n\n自山崙到海邊      百合花開佇咱土地\n花苞揭頭聽春天    花開犁頭心謙虛\n不願和人比並美    青春戀夢自由開\n枝骨柔軟堅意心    逆風也欲湠下去\n百合花 滿山開     親像天星閃閃爍\n百合花 价汝約束   年年會當再相見\n百合花 咱个夢     百合花 咱个夢",
	    "vote_count": 542,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 58,
	    "title": "青春啊",
	    "track_id": 211898886,
	    "author_name": "許明傑",
	    "desc": "趁著青春有所改變有所作為做自己的主人",
	    "lyrics": "放浪青春 交換的理想 \n有堅持的衝碰 閃爍的快樂 \n父母的吩咐 毋是阮聽袂落 \n是我的時代 我的精彩家己創造 \n\n你若問我 有什麼撇步 \n挑戰的人 提勇氣佮骨力做 \n毌管路上會跋倒 四界有風雨 \n咱的舞台予咱家己來編劇 \n\n紅田嬰 鬥照顧 火金姑 來照路 \n\n啊~驕傲的這當時 青春的這當時 \n濁水溪繼續流著咱 拍拚的汗水 \n驕傲的這當時 青春的這當時 \n玉山頂懸日出的光影 照著咱名字 \n驕傲的青春 是屬於我佮你（驕傲的青春 因為有我有你） \n青春啊 青春啊~~",
	    "vote_count": 354,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 32,
	    "title": "幸福台灣",
	    "track_id": 211594054,
	    "author_name": "廖君綾",
	    "desc": "一起創造幸福台灣",
	    "lyrics": "我的思念乘著海風，太平洋上輕輕吹過,在那心中眷戀的故鄉降落。\n浩瀚海中的小島，名字叫台灣，青翠山脈美麗的海岸。\n\n經過許多年的磨難，歷經一甲子滄桑，歷史軌跡在她臉上刻下風霜。\n苦盡甘來的日子，快來到；愛這片土地的人們啊、走出台灣的路。\n\n春天櫻花紛飛時，阿里山看日出；花海、樹蔭，滿載懷舊的小火車；\n啜飲一口，那烏龍茶的清香，縷縷回甘在腦海；\n夕陽映照西子灣紅了我們臉龐，思想起的歌聲迴盪在愛河水岸；\n平溪天燈天邊緩緩的升起，祈求台灣順遂平安。\n\n我的思念乘著海風，太平洋上輕輕吹過,在那心中眷戀的故鄉降落。\n浩瀚海中的小島，名字叫台灣，青翠山脈美麗的海岸。\n\n經過許多年的磨難，歷經一甲子滄桑，歷史軌跡在她臉上刻下風霜。\n苦盡甘來的日子，快來到；愛這片土地的人們啊、迎向曙光。\n\n留給台灣的孩子，一片自由天空，不沈默、不放棄，守護唯一的家園；\n擁有希望的未來，其實並不遙遠，就掌握在你我的手中，自己做決定。\n\n拿出台灣人的勇氣，追求公平正義；民主台灣需要你我的努力，\n有你陪伴，我們腳步更堅定，\n一起創造幸福台灣，一起創造幸福台灣。",
	    "vote_count": 36,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 44,
	    "title": "台灣的路",
	    "track_id": 211594009,
	    "author_name": "噴火器",
	    "desc": "【台灣的路】\n前一陣子身旁有許多人，出國工作、念書，我最常聽到的話就是：待在台灣真的沒前途了，有能力的話快出國吧。聽到這些話，除了羨慕，更多的其實是難受，台灣是我成長的地方，有我熟悉的味道，人群，還有那種不服輸的精神。\n有一天我到了嘉義市的東市場，我仔細的觀察了在市場裡擺攤的大哥大姐，年紀最大的甚至可以當我阿嬤了，依然笑容滿面的大聲叫賣，精神奕奕的問我們今天要買什麼青菜？\n那天回家，我用簡單的和絃寫下了這首歌，因為我知道，描繪最純粹的美，不需要太華麗的修飾，在滿溢的情緒下，很快速的完成了這首歌曲。\n我們相信，儘管點亮台灣這條路上有點坎坷，有點崎嶇，但我們確定，如同歌詞所述，只要堅定信心大步向前行，蕃薯仔子，一定代代湠。堅持下去，我們一定會成功！",
	    "lyrics": "作詞：王銘宏\n作曲：王銘宏\n編曲：噴火器\n\n這段坎坷 ê 路程，有我也有你；\n有笑容，有悲傷，參著目屎 hām 汗水。\n雖然頭前 ê 路，hiah-nī 黑暗 hiah-nī 長，\n家在有你，陪我勇敢行落去。\n\n這片溫柔 ê 土地，有可愛 ê 人民；\n用生命，用青春，譜著美麗 ê 歌詩。\n毋管大雨咧淋，毋驚塗跤咧動，\n為著未來，作伙拍拚。\n\n台灣啊，台灣啊，你是我 ê 母親我 ê 名。\n毋管別人安怎折磨你甲我，咱總是愛甲目屎擦乎焦。\n台灣啊，台灣啊，光明 ê 未來已經咧等咱。\n只要堅定信心大步向前行，蕃薯仔子，一定代代湠。",
	    "vote_count": 626,
	    "official_url": "https://www.facebook.com/flamethrower.taiwan",
	    "winners": false
	  },
	  {
	    "id": 21,
	    "title": "食飽袂",
	    "track_id": 211101470,
	    "author_name": "謝銘祐",
	    "desc": "台灣原有的人與人之間的情感日漸疏離, 政治一直是主因, 生活裡溫柔的小細節正被這樣的疏離感帶離我們的生活",
	    "lyrics": "一陣一陣南風微微    吹入即个生份城市\n春來冬去幾年咻一下經過   \n即爾拍拼的你我  變化有偌濟?\n外久無相借問  厝邊姓陳王林抑是黃?\n對面二扇門  離千萬里遠\n外久沒聽過  你食飽袂?  食飽袂?\n\n黑輪伯仔最近去佗?   勇仔敢娶囉?  囡仔幾个?\n吃的穿的開的攏即舒適呢\n敢有算過你最近  朋友減幾个?\n為家己來拍算  管隔壁扁圓短抑是長?\n對面二扇門  若天邊赫遠\n外久沒聽過  你食飽袂?  食飽袂?\n",
	    "vote_count": 1206,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 75,
	    "title": "母親台灣",
	    "track_id": 212447635,
	    "author_name": "詞曲:楊欣燁 唱:蔡沛峰",
	    "desc": "這歌記述清朝腐敗割讓臺灣。害臺灣人民二戰替日本當局當砲灰的故事，描寫那個動盪不安年代下小人物悲慘的人生!如今她已駕鶴。我緬懷教誨特譜此曲追思……",
	    "lyrics": "僅以此曲哀悼二戰犧牲的台灣子民\n\n啊 我的母親 一世人受盡風霜勞苦     台灣子弟何辜       悲哀乎滿清拖土\n啊 歹命的伊 一出世著送人做童養媳   因為伊出征的嗲親   一去就戰死置南洋\n\n問蒼天~問蒼天 為何偉大國家乎鴉片害死\n全無代念幼兒哀啼 無奈戰爭打輸將阮抵押去. 可憐台灣女兒\n\n啊 親恩卡大天 妳教阮苦難台灣毋通祙記 卡始也有來生花連枝 嘛甘願做妳的女兒\n\n",
	    "vote_count": 23,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 52,
	    "title": "台灣，咱的土地",
	    "track_id": 211898823,
	    "author_name": "WYC",
	    "desc": "詞曲創作於美國求學時，身為異鄉遊子，對台灣這塊土地更感思念。\n簡單的旋律，讓每個人都能夠朗朗上口。\n簡單的字句，表達的是對台灣這塊土地的疼惜。\n為著美麗將來，咱來打拼，邁向最後一哩路，\n為著台灣，咱的土地！",
	    "lyrics": "詞曲:WYC\n\n阮生在一塊美麗的土地\n阮的故鄉叫台灣 \n咱的寶島叫台灣 \n咱攏是可愛的台灣人 \n風風雨雨 多少辛酸 \n咱牽手鬥陣走過 \n為著美麗將來 咱來打拼\n為著台灣 咱的土地",
	    "vote_count": 414,
	    "official_url": "https://www.facebook.com/wychen624",
	    "winners": false
	  },
	  {
	    "id": 117,
	    "title": "是誰在決定我們的未來",
	    "track_id": 212582424,
	    "author_name": "古少騏",
	    "desc": "從殖民者手中取回公民的主權 需要覺醒 ",
	    "lyrics": "是誰在決定我們的現在 \n是爸媽老師同學還是看不見的買賣\n美麗的謊言  漫天欺騙來誘拐\n痛苦的帳單  全都留給老百姓來買\n\n有些人每天都在拜拜  \n邊拜邊賺黑錢  自己也不覺得奇怪\n有政府無政府  每天都在亂亂蓋\n印章亂蓋飯店亂蓋  嘴巴最會亂蓋\n\n是誰在決定我們的未來\n青山綠水老樹  都不留給下一代\n該打的都不打 不該拆的全都拆\n有天他們也許說  你們這代真的是  金害  \n\n是誰在決定我們的未來\n耶穌佛祖阿拉菩薩  全部都請出來\n幫幫忙 醒醒吧 別打瞌睡不理睬 \n神啊請你一起來  神啊請你一起來\n讓我們自己決定我們的未來\n\n",
	    "vote_count": 157,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 149,
	    "title": "綠色光芒",
	    "track_id": 212748312,
	    "author_name": "蔣孟/孟白/張雨",
	    "desc": "希望透過這首歌,\n讓擁有夢想的人重拾希望,\n告訴他們,\n即使這條路艱辛漫長,\n就算走過會滿身是傷,\n只要我們奮力奔向,\n充滿荊棘的蠻荒,\n\n淚水會給我們力量\n夢想就在不遠前方\n台灣的未來就在我們手上",
	    "lyrics": "有多少人揹著太陽\n卻看不見天亮\n有多少人擁抱希望\n卻捉不到夢想\n漫漫長夜\n我們等待著燭光\n等待照亮未來的\n一絲光芒\n\n熬過黑夜就要迎接曙光\n秉著勇氣抵擋惡的力量\n無畏前往就算艱辛漫長\n\n跨過黑暗就要擁抱希望\n用力吶喊就算全身是傷\n奮力奔向充滿荊棘的蠻荒\n因為我們知道\n綠洲就在前方",
	    "vote_count": 173,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 119,
	    "title": "好米好男好女",
	    "track_id": 212582475,
	    "author_name": "詞/曲: 邱豐松",
	    "desc": "台灣是美樂地\n咱愛甲伊做伙\n咱就愛加保護\n咱就愛加照顧\n\n",
	    "lyrics": "好米不是簡那製造米酒\n更加養育好男好女美人\n\n米酒米酒俗閣好飲\n晃頭仔晃頭仔真快樂\n美人勸我不倘飲甚多\n飲酒(醉)千萬不倘駛車\n你就愛照顧你的身體\n\n台灣台灣是美樂地\n咱愛甲伊做伙\n咱就愛加保護\n咱就愛加照顧\n\n台灣出產好米\n出產米酒\n出產美人\n台灣是米樂地\n來飲一杯\n來飲一杯\n甲美人做陣\n台灣是美樂地\n\n來飲一杯\n來飲一杯\n慶祝咱住在美樂地\n慶祝咱擁有美樂地\n\n來飲一杯\n\n好米不是簡那製造米酒\n更加養育好男好女美人\n\n米酒米酒俗閣好飲\n晃頭仔晃頭仔真快樂\n美人勸我不倘飲甚多\n飲酒(醉)千萬不倘駛車\n你就愛照顧你的身體\n\n台灣台灣是美樂地\n咱愛甲伊做伙\n咱就愛加保護\n咱就愛加照顧\n\n",
	    "vote_count": 26,
	    "official_url": "https://www.facebook.com/profile.php?id=100000936493731",
	    "winners": false
	  },
	  {
	    "id": 170,
	    "title": "呷飽未",
	    "track_id": 212748699,
	    "author_name": "蕭賀碩",
	    "desc": "一連串的食安問題令人有感而發，直接跟農夫買，直視生產者眼神才是生活中真正的確幸。",
	    "lyrics": "呷飽未\n尚親切也尚傷心兮問題\n呷飽未\n泡麵加布丁毒lu毒lu毒lu毒\n呷飽未\n油條油麵豬油拌飯蔥油餅就愛這一味\n呷飽未  GMP你哪位\n\n確定的幸福  香噴噴的魯肉飯\n確定的幸福  剛炸好的香雞排\n回鍋油  原來還是回收餿水油\n還在裝無辜 財團  不值得信任托付\n\n呷飽未\n農人的辛苦沒有被公平對待\n呷飽未\n年輕人再優秀卻難以期待未來\n呷飽未\n有自己兮厝親像不可能兮代誌\n呷飽未  說好的再生能源咧\n\n確定的幸福  帶水壺用環保筷\n確定的幸福  呷有機在地生產\n跟農夫買  直接回饋大地與勞力\n每一個選擇  累積  成生活文化的根\n\n呷飽未\n咱的土地刁靠咱自己照顧\n呷飽未\n還能交給誰",
	    "vote_count": 594,
	    "official_url": "https://www.facebook.com/shuo.cool.humor",
	    "winners": false
	  },
	  {
	    "id": 94,
	    "title": "家",
	    "track_id": 212447864,
	    "author_name": "鄭尹翔",
	    "desc": "移民後 思念家鄉的感覺",
	    "lyrics": "我的家鄉 \n那一處可愛的地方 \n在腦海中 \n回憶常挑起的美夢\n\n我的故鄉 \n就在山嶺的那一方 \n寄託太多的牽掛 \n美麗的家\n\n無論何時我人身在何處 \n它永遠是我脆弱心的支柱 \n不管狂風暴雨如何試煉 \n它總是在那平息的邊緣\n\n默默等待 \n家在等待 \n感謝你 你的心意我明白\n\n默默期待 \n家在期待 \n別愁眉苦臉 我很快就會回來\n\n我的家人 \n難以取代的緣份 \n手足情深 \n排解我所有疑問\n\n我的朋友 \n帶給我童年的純真 \n讓歲月帶你 \n到理想的人生\n\n看著人们一個個長高 \n我也隨著時間流逝長老 \n青梅竹馬竟然萬年不變 \n是否會容許我多見一面\n\n我的家鄉 \n人海茫茫 \n小攤的食物 我永遠不會忘\n\n我的故鄉 \n虱目魚湯 \n雖然環境是有一點骯髒 \n但卻還是我所珍惜的家",
	    "vote_count": 38,
	    "official_url": "http://www.soundcloud.com/aposkdjc",
	    "winners": false
	  },
	  {
	    "id": 158,
	    "title": "幸福的方向\n",
	    "track_id": 212748479,
	    "author_name": "平威",
	    "desc": "我想我們都希望我們的大家長真心的愛我們，領導我們建築一個更幸福美好的家園",
	    "lyrics": "為這片土地唱首歌 唱出心裡的聲音\n我的關懷 夢想 勇敢 愛 與 希望\n這塊土地無限芬芳 孕育著生機萬樣\n人人奉獻經營 我們 朝幸福的方向 \n\n盼望的遠景阿 我心倘徉\n美麗的福爾摩沙 我的家鄉\n充滿勇氣 堅定自強 努力奮鬥 不徬徨\n我們朝著陽光 朝著幸福的方向",
	    "vote_count": 341,
	    "official_url": "www.pingwaybian.com",
	    "winners": false
	  },
	  {
	    "id": 156,
	    "title": "感謝日光照著咱的田莊",
	    "track_id": 212748434,
	    "author_name": "五餅二魚(樂團) Demo帶 ",
	    "desc": "親愛的二姑蒙主恩召了.每一次的選舉二姑一定會打電話來催促我與弟弟要記得投票\n二姑是一位愛家人愛社會愛國家有博雅精神的人.明年不會再接到二姑的電話 .\n但我會傳承二姑的使命,家庭不好 社會不好 國家不好 我們都不能嫌棄它.\n我們要努力使家人社會國家更好….盡我們卑微的力量..\n一點一滴的燭光,2300萬人聚集的燭光就有力量照亮改變台灣\n我們是日光之子是光明之子.我們要點亮台灣.",
	    "lyrics": "山頂的風吹, 天頂的雲 輕輕飛, 互相唻作伙 互相逗陣陪伴 看顧 這塊土地.\n不通嫌台灣,所有快樂盼望攏置遮. 咱著 愛 台灣, 互相照顧 珍惜 這塊土地 咱的希望.\n不通嫌台灣.咱著 愛 台灣\n因為…\n天漸漸會光 天漸漸會光 抬頭看見天邊山頭的日光.\n天漸漸會光 天漸漸會光 感謝日光 照著咱的故鄉 咱的田莊\n不通嫌台灣,所有快樂盼望攏置遮. 咱著 愛 台灣, 互相照顧 珍惜 這塊土地 咱的希望.\n不通嫌台灣.咱著 愛 台灣\n天漸漸會光 天漸漸會光 天漸漸會光",
	    "vote_count": 20,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 84,
	    "title": "過橋",
	    "track_id": 212447780,
	    "author_name": "淡水男孩",
	    "desc": "這不是只有情緒的發洩\n有台灣土地與歷史上許多受迫者的真實情形\n掌權執政者的迫害絕對不僅於此\n2016立法委員選舉國民黨不能過半，但是可以過橋",
	    "lyrics": "一個是頂港有名聲 一個是下港有出名 台灣百姓真痛苦 只有大人啊不知道\n出國比賽得冠軍 拿到金牌返回來 垃圾政府眾人譙 國民黨 過橋喔\n\n山要崩就讓他去 反正死也不是死你自己\n厝要拆讓他去 反正建商賺錢大家來分小費\n田若要拋荒也讓他去 欺負咱們農民一直是這麼憨直\n有人要燒炭管他去死 反正新聞過兩天通通都忘記\n\n彰化夏天吹南風 台西村的人民生命全無\n20冬前桃園的RCA糟蹋雜的尊嚴 性命和身體\n苑裡的海邊海風在吹 殺人的風車讓咱鄉親過不下去\n石門金山貢寮的老前輩 反核到現在二、三十冬都不曾退\n\n歷史的過去攏總乎人來暗崁 祖先的故事我們知道沒半項\n島嶼的命運難道真的這麼悲哀 什麼時候才來停止吞忍和忍耐\n古早都是為了生活來賺食 今嘛他們卻拿錢來交換我們的命\n這樣的日子咁真正過的去 台灣的人民我們何時來覺醒\n\n\n一個是頂港有名聲 一個是下港有出名 台灣百姓真痛苦 只有大人啊不知道\n出國比賽得冠軍 拿到金牌返回來 垃圾政府眾人譙 國民黨 過橋喔\n\n國民黨 過橋喔 馬英九 過橋喔 吳敦義 過橋喔 江宜樺 過橋喔\n蔡正元 過橋喔 吳育昇 過橋喔 馬英九 過橋喔 國民黨都來過橋",
	    "vote_count": 1323,
	    "official_url": "https://www.facebook.com/pages/%E6%B7%A1%E6%B0%B4%E7%94%B7%E5%AD%A9-Tamsui-BoyZTBZ/340457545967792",
	    "winners": false
	  },
	  {
	    "id": 2,
	    "title": "台北慕情",
	    "track_id": 211101506,
	    "author_name": "曲：陳以寧\n詞：陳德耀",
	    "desc": "我和妻女旅居海外三十年，在僑居地已落地生根，\n但我還時常心繫台灣，懷念那塊我出生長大的地方。\n這首 \"台北慕情\" 是我和女兒的合作曲，是一首懷舊慕情的歌。\n而什麼是慕情，就讓聽者自己去詮釋了，\n也許是一個人，一個地方，或是人生的一段時光。\n我的慕情是台北，所以把這首歌與來自台北和曾去過台北的朋友分享。",
	    "lyrics": "走在六月台北的街頭，細雨中憶起往日清愁，\n一樣的風一樣的雨，人事已非景物依舊。\n憶起那年我們在雨中，一種没有告別的分手，\n在這台北的街頭，失去我的愛人已永久。\n曾經說過永遠的愛我，永恆不變的温柔，\n妳迷濛深情的眼神，今夜又縈繞我心頭。\n憶起那年我們在雨中，一種没有告別的分手，\n在這台北的街頭，失去我的愛人已永久。",
	    "vote_count": 45,
	    "official_url": "https://www.facebook.com/teyao.chen.3",
	    "winners": false
	  },
	  {
	    "id": 127,
	    "title": "臺灣花",
	    "track_id": 212582616,
	    "author_name": "詞：葉子  鄭朝方 /曲： 鄭朝方/唱：鄭朝方",
	    "desc": "這蕾花，在日裡，在夜裡，時時開著清香的蓓蕾。\n\n分別唱著閩語的雨夜花，客語的髻鬃花，以及國語的魯冰花，主題意象恰為月、日、星，構築出臺灣音樂天空一片燦爛，也以音符娓娓訴說臺灣島內最溫柔動人的三個故事，以順序法串起臺灣這座故事島的百年記憶～\n\n閩語：臺灣雨夜花說著在地的希望～\n鄧雨賢的出生到隕落，三十九年的歲月，正好落在日據時代的歷史方塊裡，但他心中非常期待臺灣光復能夠真正得到自由，這位閩式歌謠之父，以雨夜花寄情自由的渴求。\n\n客語：臺灣髻鬃花說著在地的永恆～\n髻鬃是臺灣早期農業社會客家婦女普遍的一種髮型。作家葉國居以髻鬃花形擬客家婦女一生堅韌奉獻的形象。而她們越老越開花，青絲到白髮，越開越潔美，髻鬃裡藏着汗水淋灕的親情，無聲無息的散播在每個日出日落，是代表臺灣客家婦女的生命之花！\n\n國語：臺灣魯冰花說著在地的點亮～\n時代的腳步近入工商業社會，臺灣進入了一個飛躍的年代。鍾肇政的魯冰花記述了一位富有繪畫天分卻出身貧窮的小學生，雖然受到當時學校不公不義的對待，仍堅持自己的理想畫畫，點亮自己小小的生命，拿到了世界兒童畫展金獎！他的堅持不懈，點亮心中的燈，點亮希望就出發。\n\n原住民語：台灣茉莉花說著在地的美麗～\n臺灣是一個多元民族的國家，還有最熱情奔放的原住民們，以最嘹亮最美好的歌聲，鐫刻山谷河海間一道道彩虹橋。\n\n這蕾花，在日裡，在夜裡，永世的盛放;\n在地的希望，點亮了台灣，這蕾花就叫做臺灣花。",
	    "lyrics": "閩語：\n有一蕊花 伊開抵咱的心肝內\n雨夜的挨弦仔聲 故事起走的所在\n親像希望的種籽 慢慢升起天光時\n聽到伊的歌聲 歌詩唱出愛\n\n客語：\n有一蕾花 恬恬開在我介屋下（安靜地開在我的家）（介：的之意）\n髻鬃圓圓介遮 遮風抵雨我介該蕾花（第一個 遮：傘之意） \n勞勞碌碌日隔夜 越老越開花\n在心項開等啊 他輕輕唱等啊\n\n國語：\n我要為你 彩繪一幅畫  一路為你美麗到天涯 \n一朵小小的野地花 微笑望著天空的眼 輕輕的眨\n我們守著 夜晚的籬笆 星星默契的不多說話  \n點亮心中的燈  點亮希望就出發 \n一朵最美麗的 台灣花在心中發芽\n\n原住民語（阿美族語）：\n好一朵美麗的台灣花",
	    "vote_count": 3548,
	    "official_url": "https://www.facebook.com/qscwdvnji?ref=br_rs&__nodl&_rdr",
	    "winners": true
	  },
	  {
	    "id": 68,
	    "title": "Dreams",
	    "track_id": 212071745,
	    "author_name": "Balkon Schatten ",
	    "desc": "我們是一群熱血有夢想的高中生，在正值對未來充滿憧憬的年紀，我們創作出這首歌-夢想，我們相信自己也相信未來的臺灣，希望創造出一首讓別人聽起來充滿力量，和重新追逐自己夢想的力量！*我們盡力用低成本的方式呈現這首原創歌曲，所以音質沒有很好",
	    "lyrics": "We all have a dream\nDreaming all we could be\nIn this world full of possibilities\n \nWe all have a dream\nStruggling to reach\nBut we can't forever be in reverie\n\nOh these stars are shining so bright \nI'm not going down without a fight \n\nDreams\nDon't know where it leads\nBut as long as we are standing\nNothing can stop us from believing\n\nDreams\nNot sure where we're heading\nBut with our strongest belief\nThere's nothing we can't beat",
	    "vote_count": 198,
	    "official_url": "https://www.facebook.com/profile.php?id=100005638008064",
	    "winners": false
	  },
	  {
	    "id": 60,
	    "title": "堡壘",
	    "track_id": 211898908,
	    "author_name": "張少瑜",
	    "desc": "會寫下這首是因為在金門當兵的關係，一開始真的很不習慣，也曾想過自己一定會因為當兵的關係討厭這個地方。從家裡寄了腳踏車過去，放假時就騎著它到處跑，到古寧頭、歐厝海灘、料羅灣、馬山......等等，發現金門的路很好騎，海邊的景色也很不錯，最能放鬆的就是看看海，身心都能得到釋放。很難想像這個地方在當年是最前線戰場，那些炮彈的儘管傷痕還在，土地仍然無懼的茁壯。現在回想起來其實是個不錯的回憶，那年也是我最貼近自然的一年吧",
	    "lyrics": "詞曲/編曲 : 張少瑜\n\n滾燙的雨燒開土壤民房\n沸騰的那一年，那一戰\n汗水淚水流血熬成塔\n座落在無語的小島上\n\n時光倒轉 空間易換\n背負戰火的眠床\n\n天要湛藍 地要輝煌\n是你承載歷史的重量\n傷要釋放 堅忍不換\n完美的堡壘固若金湯\n\n沉睡的軍火 醒成名刀\n綿延的時間 釀成酒香\n海浪盛滿夢想託付浪花\n座落在豐盛的小島上\n\n時光荏苒 空間成長\n交替世代的錦簇榮繁\n\n天要湛藍 地要輝煌\n是你承載歷史的重量\n傷要遺忘 堅忍不換\n完美的堡壘固若金湯\n\n",
	    "vote_count": 173,
	    "official_url": "http://www.facebook.com/shaoyumuzik\n\n",
	    "winners": false
	  },
	  {
	    "id": 135,
	    "title": "人景",
	    "track_id": 212634688,
	    "author_name": "孫啟豪",
	    "desc": "台灣是個美麗的國家有非常多美麗的自然景色，但這些美好的山林河川都比不上在台灣的在地人情味，人和人之間的距離如此地靠近才是台灣最美麗的地方。",
	    "lyrics": "蔚藍的天空 是美景 讓人著迷\n綿延的山嵐 多美麗 讓人屏息\n屋~~~ 屋~~~~\n\n喧囂的市集 多美麗 不願離去\n吵雜的人群 卻美麗 讓人安心\n\n才看見 才發現 才看見  才發現\n\n這裡最美的風景 就是彼此零距離\n在這最美的風景 就是心靠再一起\n熱情 熱心 暖進心裡\n攜手前進彼此相信\n天空 山嵐 都不能比\n這才是台灣的美麗\n\n才發現 才看見  才發現 才了解 才發現  才看見 才發現 才了解\n\n這裡最美的風景 就是彼此零距離\n在這最美的風景 就是心靠再一起\n熱情 熱心 暖進心裡\n攜手前進彼此相信\n天空 山嵐 都不能比\n這才是台灣的美麗\n\n熱情 熱心 暖進心裡\n攜手前進彼此相信\n天空 山嵐 要怎麼比\n這才是 台灣的美麗\n",
	    "vote_count": 559,
	    "official_url": "https://www.facebook.com/profile.php?id=100002010083429",
	    "winners": false
	  },
	  {
	    "id": 139,
	    "title": "夜空的翡翠之冕~~The Corona of Emerald in the Night Sky",
	    "track_id": 212634892,
	    "author_name": "詞曲, 編曲, 鋼琴: 屹 & 群   Vocals: 小白兔",
	    "desc": "本想和久違的親友在夏威夷度假時用珍貴彈琴的機會 (日裔studio owner的幫忙)一起回憶時光. 但在環境氣氛被保持很好的room感受到一種複雜而多層次的情感牽引,特別是對台灣的想像. 那時略過腦海的還有先前看過的極光, 彼此交織出神聖的氛圍. 所以儘管只有幾小時的時間, 我們決定增加創作的緊張感而且順利地發展出完成度還不錯的鋼琴錄音.\n\n以此與所有不願迷惘的偉大台灣人共勉, 或許是夕陽, 咖啡, 腳踏車,唱片行, 迷迭香和小確幸. 為了共同的幸福經驗和夢裡的記憶請一起珍愛這顆美麗的寶石, 這塊土地, 為自己的信仰無所保留的奮鬥. 因為, 台灣真的很好\n\n詞有英文版本, 也有鋼琴純演奏版, 希望以後有機會與大家分享\n\n感謝Niki, Shannon, 親人, 極光團好朋友的問候與來信\n",
	    "lyrics": "台灣, 在這片美麗的土地上, 人們努力創造與維繫理想中的幸福狀態, 也忍受許多的不完美. \n\n因此歌曲有春煦暖風般的溫柔但緊鄰著不安的未知; 有在蜿蜒道路上持續的意志力和高漲的決心,但也有激情之後蒼穹的靜謐與沉澱後面對現實的智慧和持續專注力的保持; \n\n即使黑夜長盡, 被翡翠之冕眷顧的靈魂將不再有恐懼, 因為現在輪到子民來守護它的未來.\n\nDice fortuna amoveamus... (命運之骰被擲出了…)\nNon ut simplex… (並不單純…)\nNon ut facilis… (也不容易…)\nNebulosum… (迷霧般…)\nMenusquam ita dilucide  (卻從來沒有這麼清晰過)\n",
	    "vote_count": 634,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 82,
	    "title": "路是走出來的",
	    "track_id": 212447758,
	    "author_name": "Zoe Hsiao",
	    "desc": "相信台灣，相信自己，相信「共同」，走出屬於台灣的路。",
	    "lyrics": "365天，戰戰兢兢，害怕走錯；\n年過一年，天天感覺︰要怎辦？\n\n是否路途就這樣？\n前景不看好？\n無能為力…\n\n還是有什麼能做？\n用上我力量，\n做點改變。\n\n前景要測量，\n創新又創造–\n路是走出來的\n我們是能夠。\n\n(重複最後一段)",
	    "vote_count": 13,
	    "official_url": "https://www.facebook.com/zoe.hsiao",
	    "winners": false
	  },
	  {
	    "id": 5,
	    "title": "甲我走逗陣",
	    "track_id": 211101501,
	    "author_name": "SNOOPY YU",
	    "desc": "跟著新的時代來臨一起走向幸福光明  作為歌曲題材。",
	    "lyrics": "出外的心  有你我就有志氣\n想要飛 唰飛不出相思\n人生啊～人生～\n走找成功的意義  回頭今嘛開始\n \n麥擱酒醉  麥怪世間太無情\n幸福啊 就是你惦阮身邊\n頭前路歹行 相信未來是光明\n寒冬嘛會變春天\n \n希望有你甲我走逗陣\n是你乎我有勇氣\n你會看見 這世人打拼攏為你\n希望有你甲我走逗陣\n一步一步攏堅定\n我不驚風雨 我不驚天創治\n\n希望有你甲我走逗陣\n是你乎我有勇氣\n你會看見 這世人打拼攏為你\n希望有你甲我走逗陣\n一步一步攏堅定\n我知道光明  成功就在眼前\n",
	    "vote_count": 130,
	    "official_url": "https://www.facebook.com/bbmusic0939",
	    "winners": false
	  },
	  {
	    "id": 154,
	    "title": "堅持",
	    "track_id": 212748413,
	    "author_name": "王大鼎",
	    "desc": "寫給我快三歲的寶貝女兒采緹,不管世界如何變化,我會堅持我對她的愛,堅持對的方向",
	    "lyrics": "每天清晨總難以抗拒寒意  \n只有想著你\n刺激我的軟弱\n我知道一個人生活是簡單又無聊\n不能讓妳快樂\n讓你笑容變少\n穿上薄薄的上衣  我有愛你的勇氣\n在九九年的寒冬  挑戰這多變的愛情\n\n堅持 我也會堅持 我們的愛  永遠不會老\n堅持 我也會堅持 我們的愛  永遠不會老",
	    "vote_count": 28,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 118,
	    "title": "保護咱的美樂地",
	    "track_id": 212582450,
	    "author_name": "詞/曲: 邱豐松",
	    "desc": "台灣出好米\n好米養育好人\n好人做好代\n呼台灣變做\n美麗的所在\n\n",
	    "lyrics": "台灣出好米\n好米養育好人\n好人做好代\n呼台灣變做\n美麗的所在\n\n美樂地台灣\n美樂地台灣\n\n台灣美樂地\n台灣美樂地\n\n進口的俗米\n亂來的奧米\n冒充咱台灣的\n好米\n損害咱的美樂地\n破壞咱的美樂地\n毀壞咱的美樂地\n\n咱就愛加注意\n政府愛加制止\n\n咱就愛保護咱的美樂地\n咱就愛保護咱的美樂地\n\n咱愛保護咱的美樂地\n咱愛保護咱的美樂地\n\n美樂地\n呼人民快樂\n呼人民滿足\n\n美樂地\n美樂地\n呼人民機會\n呼人民民主自由\n免跪皇帝喊萬歲\n\n咱愛保護咱的美樂地\n咱愛保護咱的美樂地\n\n(重複第一段)\n\n美樂地\n美樂地\n\n",
	    "vote_count": 24,
	    "official_url": "https://www.facebook.com/profile.php?id=100000936493731",
	    "winners": false
	  },
	  {
	    "id": 147,
	    "title": "在我心裡的台灣",
	    "track_id": 212635216,
	    "author_name": "Max Hsu",
	    "desc": "希望用盡量簡單，安靜的旋律及歌詞，表達這片土地一直以來給予我的支持及能量",
	    "lyrics": "那一個在我心裡的台灣，是開滿花的庭院\n那一個在我心裡的台灣，是擁抱溫暖的港灣\n雖然很多事情讓人沮喪，總還是會再次燃起希望\n雖然前方的路看似黑暗，總有人點起天光\n那一個在我心裡的台灣，是旭日指引我方向\n那一個在我心裡的台灣，是安撫我入睡的夜晚\n",
	    "vote_count": 337,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 65,
	    "title": "美好的一天",
	    "track_id": 212071723,
	    "author_name": "BIKE機踏車樂團",
	    "desc": "選戰總是辛苦與艱難的，希望這首美好的一天能陪伴小英姐迎接勝選日，那天就是美好的一天",
	    "lyrics": "睜開雙眼我看見今天陽光很耀眼\n我告訴我自己這是美好的一天\n微風吹過我的臉帶我逃離這世界\n我只想要加緊油門衝向地平線\n\n不管前方有多少的困難擋在前\n我想我都不會再膽怯\n就算路途遙遠讓我模糊了視線\n我還是會一路走向前\n",
	    "vote_count": 57,
	    "official_url": "https://www.facebook.com/biketaiwanband",
	    "winners": false
	  },
	  {
	    "id": 125,
	    "title": "最後一程",
	    "track_id": 212582587,
	    "author_name": "詞/曲：鍾德修（雲鐵客樂團）",
	    "desc": "在過往的歷史中，台灣被許多不同的外來殖民者所統治，對於國家的認同有著各式不同的主張。在多年的努力之下，人民的意識抬頭，也終於有了大多數人的共識，台灣真正有機會往自主、公平正義的方向發展。\n為了向過去不符合公平正義的一切；以及與這片土地脫節的荒謬歷史告別，寫下了這首「最後一程」，向未來充滿希望的台灣，送上我的祝福。",
	    "lyrics": "四百年‭ ‬好日子過了沒幾年\n兒孫代代這麼多人\n等不到當主人的那一天\n壞世代‭ ‬一樣有人過的輕輕鬆鬆\n良心自尊拿去爆米香\n忘記了自已是什麼人\n\n天靈靈啊地靈靈\n你要看的清認的明\n過往社會的不公不義\n我們來送他最後一程\n天靈靈啊地靈靈\n你要的清認的明\n錯誤的歷史到此為止\n送他最後一程\n\n四百年‭ ‬好過他人吹噓的五千年\n別被人騙到好像腦袋有洞\n分不清自已是什麼人\n\n天靈靈啊地靈靈\n你要的清認的明\n過往社會的不公不義\n我們來送他最後一程\n天靈靈啊地靈靈\n你要看的清認的明\n錯誤的歷史到此為止\n送他最後一程",
	    "vote_count": 202,
	    "official_url": "https://www.facebook.com/yuntechband",
	    "winners": false
	  },
	  {
	    "id": 128,
	    "title": "For Formosa",
	    "track_id": 212582630,
	    "author_name": "詞曲：太極林 \n演唱：林清華",
	    "desc": "我愛台灣，所以要為台灣寫一首歌，台灣是孕育我們成長的媽媽，在這片土地生活的人都應該飲水思源，敬愛我們的母親。",
	    "lyrics": "for~for~formosa  \nfor~for~formosa \nformosa係咱的媽媽\n嘎汝搖啊搖 嘎汝抱啊抱 \n嘎汝疼 嘎汝寵 嘎汝惜\n\nfor~for~formosa \nfor~for all the people \nfor all~formosa\n命運的安排 風風雨雨這幾冬 \n不驚風 不驚苦 不驚痛\n\nfor~for~formosa \nfor~for all the people \nfor all~formosa\nFor~For~Formosa 係咱的媽媽",
	    "vote_count": 1876,
	    "official_url": "",
	    "winners": true
	  },
	  {
	    "id": 112,
	    "title": "雨衣",
	    "track_id": 212469571,
	    "author_name": "黃耀增",
	    "desc": "這是一個我與父親的故事，四十幾年前，那個人們深信著只要肯吃苦打拼，就能創造屬於自己的奇蹟的年代，父親帶著幾百塊錢隻身離開了朴子鎮，到台北擺地攤，做學徒。他說幾乎所有的工作他都做過了，只為了有一天能夠成家立業，回鄉孝敬父母。殊不知這一天卻讓他等了四十年。\n    小時候美麗的記憶似乎都有個下著雨的背景，那時家裡住在簡單老舊的日式宿舍，諾大的木造房子用夾板隨意隔成了幾間與鄰居合租，常常聞著隔壁家的飯菜香，從夾縫中偷看著電視裡播放的五燈獎節目，聽見剝剝剝的偉士牌機車聲就知道爸爸回來了，一群小孩趕緊爬上餐桌繼續寫功課。到了雨天，水滴或大或小從屋頂低落，孩子們專心地看顧接著雨水的大小鍋碗瓢盆，聆聽百種不同滴落的節奏聲響。到了假日，三個小孩擠在父母的兩台機車上舉家出遊，我最喜歡抓著父親的皮帶爬上厚實的偉士牌座墊，有時下起了大雨，父親倉促地抽出座墊下的黃色雨衣披在肩上，我也很有默契地鑽進雨衣裡，還記得那個臭臭的橡膠與霉味，混合著爸爸身上的汗水，我把臉貼上父親的背，透過腳邊細縫看著地上濺起的水花濕透了鞋，想像著自己就像故事裡的探險家，乘坐在狂風中的船破浪探險。這些幸災樂禍的幸福日子一直到上了小學才開始破滅，也才了解到原來這樣的生活就是別人口中的苦日子，但父母發愁的那段時光卻成就了我們無憂無慮的童年。\n    踏入社會將近一年了，而早在大學期間就開始擔心的各種壓力與困境也如期來到，水泥叢林裡，我們甚至不知道正在吃苦打拼的自己究竟能成就什麼樣的未來，是生不逢時的感嘆還是隱形階級下的無奈。下雨的日子不再繽紛有趣，取而代之的是各種徬徨無助，在這個年輕的世代中逐漸蔓延開來。那天午後，我一樣踩著濕透了的鞋走在街頭，聽著街坊屋簷上滴落的水聲，抬頭一看，天空的一邊是逐漸散去的烏雲密布，另一邊是一道清晰而明亮的彩虹高掛在餘暉下的天空，似乎，我又瞥見了童年的自己與家人，那個充滿希望的美好年代。",
	    "lyrics": "騎著摩托車，跑從在陌生的城市\n趁著好時機，離開故鄉來賺錢\n甘像人咧講，台北是紅花擱麗綠\n誰人知影，這一去三十年。\n\n行入台北市，又擱是嘸閒的拜一\n想欲出頭天，人說今嘛嘸對時\n心內的希微，像雨水落在咱厝頂\n刷來想起，細漢的彼當時\n\n一陣大雨渥在巷仔口\n一件雨衣搭在肩甲頭\n奚是阿爸的無奈，卻是幸福的所在\n為著生活你就抓乎緊\n不管風雨，站乎在\n因為希望的虹在雲頂等待",
	    "vote_count": 1408,
	    "official_url": "https://www.facebook.com/profile.php?id=1553407184",
	    "winners": true
	  },
	  {
	    "id": 107,
	    "title": "Love My Life",
	    "track_id": 212469459,
	    "author_name": "Gusian Yu",
	    "desc": "愛音樂，愛生活，通過唱歌，將喜怒哀樂和世間各種紛繁復雜的情緒吶喊出來，通過音樂保持生活好心態。",
	    "lyrics": "無論時光有多快 這壹刻起還不晚\n無關悲喜或成敗 時常保持好心態\n我們都來自五湖四海\n相識全因為共同熱愛\n\nI love my life 把所有的情緒 還原成吶喊\nMusic online 音樂鬧著玩 感覺才自在\n\nI love my life要秉持著雨後 放晴的期待\nMusic online 音樂鬧著玩 明天才精彩\n\n歡呼雀躍 身體動起來\n煩惱不安 全部都拋開\n怨恨 眼淚 通通說 bye bye\n 因為 音樂要鬧著玩\n\n無論前方有多難 壹路向前不轉彎\n無視挫折與不甘 怎會迷失方向感\n我們都來自五湖四海\n相識全因為共同熱愛\n\nI love my life 把所有的情緒 還原成吶喊\nMusic online 音樂鬧著玩 感覺才自在\n\nI love my life要秉持著雨後 放晴的期待\nMusic online 音樂鬧著玩 明天才精彩\n\n歡呼雀躍 身體動起來\n煩惱不安 全部都拋開\n怨恨 眼淚 通通說 bye bye\n 因為 音樂要鬧著玩\n\n",
	    "vote_count": 16,
	    "official_url": "https://www.facebook.com/GusianYu",
	    "winners": false
	  },
	  {
	    "id": 86,
	    "title": "土地在歌唱",
	    "track_id": 212447810,
	    "author_name": "芙賽（謝婉琳）",
	    "desc": "記得2014.03.23那一天，我坐在電視機前看著新聞畫面，無法壓抑住眼淚，當下恨不得飛奔到現場盡一份心力，有一個力量喚醒了許多年輕人，而我決定做一些事情，決定寫下一首歌一同感受這片土地的聲音…..台灣是一個美麗的地方，我們用不同的方式紀錄著，更是一份記憶的傳承，在這土地上人們為自由奮鬥著，為生存努力著….或許在這個世代我們看不見改變、無法收割美麗的果實，但確信的是這份精神與力量，將會隨著歌曲繼續傳唱下去！\n\n太陽花之所以仰望，因為那是光的方向。\n每一朵花，都由一顆種子死了，而後生長\n這顆種子是你、是我\n只要不放棄夢想堅持到底\n就要從痛苦裡，開出最美麗的花\n這是土地最溫柔的力量\n土地會痛、也會歌唱\n縱使朵朵微光如此渺小\n但當我們聚集，就要成為一道光芒\n它能照亮我們的家園\n能照亮所有黑暗的角落\n你，聽見了嗎？\n土地最溫柔的歌唱....",
	    "lyrics": "想起了花的芬芳\n她開在最遙遠的山上\n原來有一顆 種子 \n死了 而後生長\n那是土地最溫柔的力量\n\n恣意為義的人哪\n讓謊言遮蔽讓雙眼瞎\n是什麼讓你我走到\n今天而荒唐？\n讓我們守護美麗的家鄉\n\n聽見了嗎？\n啊...每一道傷 換來成長\n人類因夢想而 偉大\n愛使無所懼畏\n什麼值得我們用血淚 去捍衛\n不管有多傷 \n溫柔地 土地在歌唱\n\n聽見了嗎？\n啊...每一道傷 換來成長\n黑暗猶如白晝 發亮\n愛使無所懼畏\n那曾擁有過的夢想 在綻放\n不管有多傷\n溫柔地 土地在歌唱\n溫柔地 重來的力量\n\n朵朵微光\n將成為一道光芒\n要照亮 我們的國家\n溫柔地 土地在歌唱\n從痛苦裡 重生的力量",
	    "vote_count": 107,
	    "official_url": "http://www.facebook.com/fusay.ludu",
	    "winners": false
	  },
	  {
	    "id": 113,
	    "title": "台灣美樂地",
	    "track_id": 212469588,
	    "author_name": "Hamster",
	    "desc": "台灣是美樂地，有自由，有尊嚴，有自己引以自豪身份，這也不單是香港人一直渴求的，也是全球人類應該擁有的。",
	    "lyrics": "《台灣美樂地 Taiwan, a beautiful and joyous land》\n\n台灣這美樂地　台灣這片美樂地\nTaiwan, a beautiful and joyous land. Taiwan, a beautiful and joyous land.\n\n百花齊爭艷　百鳥同爭鳴\nFlowers contended in blooming while birds contended in singing.\n\n是什麼叫她美麗　我也著迷\nI am obsessed by what made her so beautiful \n\n這個信念　一直在我心底\nThis belief has long been in my heart \n\n就是　改變、改變　勇敢地改變一切落後的\nChange, change, change everything backward with courage\n\n不怕　改變、改變　不會怕回響震天　只怕沉默\nChange without fear, change, fear not thundering echo, but fear silence\n\n勇敢改變、改變　經歴多少的蛻變　台灣這美樂地\nChange with courage, change, undergoing countless changes, Taiwan, a beautiful and joyous land\n\n台灣這美樂地　台灣這片美樂地\nTaiwan, a beautiful and joyous land.  Taiwan, a beautiful and joyous land. \n\n百花齊爭艷　百鳥同爭鳴\nFlowers contended in blooming while birds contended in singing.\n \n是什麼叫她美麗　我也著迷\n這個信念   一直在我心底\n\n是什麼叫她美麗　我也著迷\nI am obsessed by what made her so beautiful\n\n這個信念　一直在我心底\nThis belief has long been in my heart \n\n就是　改變、改變　勇敢地改變一切落後的\nChange, change, change everything backward with courage\n\n不怕　改變、改變　不會怕回響震天　只怕沉默\nChange without fear, change, fear not thundering echo, but fear silence\n\n勇敢改變、決心改變　經歴多少的蛻變　台灣這美樂地\nChange with courage, change, undergoing countless changes, Taiwan, a beautiful and joyous land\n\n我卻不會怕　你也不用怕、不用怕\nI shall never fear, you don't have to fear.\n\n台灣這美樂地\nTaiwan, a beautiful and joyous land\n\n現在一起變奏　譜出新的美樂地\nLet's change the tune and compose a new beautiful and joyous land. \n\n台灣這美樂地　台灣這美樂地\nTaiwan, a beautiful and joyous land\nTaiwan, a beautiful and joyous land",
	    "vote_count": 378,
	    "official_url": "https://www.facebook.com/hamstertheband",
	    "winners": false
	  },
	  {
	    "id": 17,
	    "title": "民主出頭天",
	    "track_id": 211101477,
	    "author_name": "蘇于繡",
	    "desc": "2011年蔡英文女士第一次要選總統，\n我們就做好<民主出頭天>的初本\n2014年5月也創做<寄託>…..共2首選舉歌曲。\n隻樹多枝多煩憂\n亦喜亦愁亦悠悠\n還真還假還夢遊\n一心一意等春秋\n劣者編寫<民主出頭天與.寄託>二首心聲歌曲，\n乃因愚者本身出身在清寒家境，如今已單親10多年，\n經歷種種的辛酸.血淚.無以言表.深知中下階層的勞工.百姓，在腐敗無能的國民黨執政下..貧富差距大，\n生活在水深火熱中的人民不計其數。\n劣吾編曲，道出百姓之苦，更是期盼    民主進步黨\n能有賢能之智者來執政，讓台灣人民過著幸福快樂的生活。\n誠願  祝福蔡英文女士，高票當選2016年，\n台灣第一女總統",
	    "lyrics": "咱的土地咱的名     咱的生命咱的歌\n為著生活每日來打拼     透早出門日落返來這\n咱的幸福靠自己    咱的意志要堅持\n為著將來為著咱子兒    堅持目標一直向前去\n啊--我甲你   你甲伊   大家都是親兄弟\n啊--我牽你   你牽伊   為著台灣拼落去\n為著正義     守護城市    需要你我共同來扶持\n全民相挺     民主勝利    咱會幸福快樂出頭天",
	    "vote_count": 411,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 132,
	    "title": "阮是台灣人4拍",
	    "track_id": 212634504,
	    "author_name": "小隱 Eric Cole",
	    "desc": "在海外常碰到有人問”你是那裡人?”我都”無歹勢”大聲說”阮是台灣人!”身為台灣人是我一生的驕傲. 也甘願打拼為祖國台灣做一點事. 這是創曲的inspiration and idea.",
	    "lyrics": "",
	    "vote_count": 35,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 34,
	    "title": "台灣美樂地",
	    "track_id": 211594066,
	    "author_name": "小護士樂團 許大俠",
	    "desc": "盛傳著那麼一句話：『台灣最美的風景是人』因此台灣人的善良勤奮讓風景更美,但『快樂』二字,在這七八年的時間內,逐漸在心中被打上問號…\n回顧這些年來的事件,我們歷歷在心,常常問自己,如果多年前那個夜,我們真的一起走完那哩路.事情方能至此？\n但是也正因為這些事件,給了我們莫大的警惕.甚至,公民力量的覺醒,也越來越不容忽視,去去年大選結果,選民用民主的方式教訓了當權者.台灣意識也因此逐漸地抬頭,我們越來越堅定大聲地說出自己來自台灣,來自於即將改變,即將走完最後一哩路而到達的『台灣美樂地』\n放下孤傲的靈魂,天空不必再是藍色.全新的一天,寫一首歌送給像媽媽一樣孕育我們的Formosa,送給自由民主,認真打拼,永遠的台灣人！！！\n\n我們將堅定地說：『我們替台灣的下一任總統寫過一首歌』",
	    "lyrics": "台灣美樂地\n\n台灣的美樂地  為著咱的土地寫一首歌\n台灣的Melody  送給阮的媽媽  美麗的Formosa\n\n聽人在講  這尚水的風景是人\n山珍海味  啥米東西都好吃\n沒分河洛外省  在地還是客人\n咱攏知影  這裡才是我的家\n\n士農工商  為著賺吃真打拼\n學生囝仔  麻關心社會的變化\n會駛擱卡好  想欲改變  這是尚好的一次\n甲不見的這幾年  討返來\n\n台灣的美樂地  為著咱的土地寫一首歌\n台灣的Melody  送給自由民主  永遠的台灣人\n\n孤不二三莊  為著環境來拖磨\n但是要覺醒  甲瞑夢來變希望\n只要咱照起工來坐陣  走完最尾的那一哩路\n人民來做主  公平正義是壓不倒\n\n台灣的美樂地  為著咱的土地寫一首歌\n台灣的Melody  送給認真打拼  永遠的台灣人\n\nViva Taiwan  \nWe Love Taiwan \nViva Taiwan  加油\n\nViva Taiwan  \nWe Love Taiwan \nViva Taiwan＋you\n\n",
	    "vote_count": 409,
	    "official_url": "https://www.facebook.com/lpnurse?fref=ts",
	    "winners": false
	  },
	  {
	    "id": 76,
	    "title": "我的決定",
	    "track_id": 212447672,
	    "author_name": "老時鐘",
	    "desc": "最後一哩是2012年的一聲嘆息，卻是我們在2016年的盼望，創作的時候其實是把”我們”定位成一個集體意識，是一種台灣共識，像是一台充滿燃料的火車，有一個希望的方向，往前走著。",
	    "lyrics": "C            F\n下了一晚的雨 我們坐在一起\nG                   C\n想知道未來是不是就在不遠距離\nA              E\n好長好長的一夜 其實不敢張開眼晴\nF                F7              G\n希望一覺醒來 我們就走完 最後一哩\nC            F\n清晨陽光穿透了 厚厚一層烏雲\nG                   C\n原來 是太陽 輻射蒸散了穢氣\nA              E\n好久好久等在這裡 其實我們不曾遠離\nF            F7           G\n於是下了決定 我們一起走完 未完成的 最後一哩\nC     Am   F          F7           G \n都都  都都 火車要開往鄉村農地 傳達我的信息\n都都  都都 火車正在希望的軌道 這是我的決定\n   Am      E        F            C   Dm     G\n喔 或許你曾覺得失望 我不願你永遠沮喪 抬起頭的盼\nC     Am   F          F7           G\n都都  都都 火車要開往高山野嶺 告訴你不再獨寂\n都都  都都 火車載著滿滿未來前景 說著堅定的心\n   Am      E        F            C     Dm        G   C\n喔 或許你曾感到無奈 我決定不再沉默等待 走在這光明的路 上\n\n",
	    "vote_count": 18,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 62,
	    "title": "只要有愛",
	    "track_id": 212071659,
	    "author_name": "陳維斌",
	    "desc": "海是藍色的，而捲起來的波浪是綠色。兩者都是水的表象，同樣是生命之源。再放眼地球，看到的都是彩色，何不讓彩色來渲染台灣？",
	    "lyrics": "藍色的海洋  綠色的波浪\n藍色的天空  綠色的家鄉\n只要有愛    光彩的世界 \n只要有愛    世界真精彩\n\n藍色的宇宙  綠色的地球\n藍色的溪流  綠色的田秧\n只要有愛    光彩的世界 \n只要有愛    世界真精彩\n\n藍色的光明包容綠色的生長\n綠色的希望昇華藍色的感動\n\n七彩的世間  七彩的年冬\n七彩的美夢  七彩咱倆人\n只要有愛    光彩的世界 \n只要有愛    世界真精彩\n\n大家攏來\n只要有愛    光彩的世界 \n只要有愛    世界真精彩\n\n",
	    "vote_count": 113,
	    "official_url": "https://www.youtube.com/channel/UCOf7S4lhEEzD62nOW_WPmWg",
	    "winners": false
	  },
	  {
	    "id": 19,
	    "title": "頭前路",
	    "track_id": 211101472,
	    "author_name": "我要加辣樂團",
	    "desc": "每個人總是為了自己的夢想打拼著，儘管傻傻地的做，默默的努力，也希望能找到自己心中的滿足，而遇到困難或失落別忘了身邊還有家人值得信賴的朋友陪著一起成長。",
	    "lyrics": "一個人  佇遐  為生活 賣命\n人笑你 憨到呣出聲  天公敢會疼\n天未亮  開車  哪一站欲下車\n才會當找到阮心肝內 夢中希望\n這條路\n要去哪裡  我佇遮等你 有你的陪伴  給我阿勇氣\n毋通放棄  打拼的日子 差一腳步莫放棄\n要去哪裡  我佇遮等你 有你的陪伴  給我阿勇氣\n毋通忘記  打拼的日子 不怕甘苦  有你佇我的心",
	    "vote_count": 136,
	    "official_url": "https://www.facebook.com/hotrock.tw",
	    "winners": false
	  },
	  {
	    "id": 42,
	    "title": "霧中的情歌",
	    "track_id": 211594028,
	    "author_name": "島嶼組合",
	    "desc": "當代科技 詮釋歌謠！！詮釋一種對消逝情感的回味！！唱的人 bakan naui",
	    "lyrics": "台灣原住民語 這世界上 已無人了解全意",
	    "vote_count": 14,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 121,
	    "title": "牽手向前",
	    "track_id": 212582516,
	    "author_name": "黃玉瑜",
	    "desc": "用簡單的旋律，淺顯的歌詞，期許台灣有更美好的未來。",
	    "lyrics": "溫柔的堅持 最深的期待\n牽手出頭天 咱有將來\n真心的勇氣 風雨無阻礙\n雲快見日出 春天來\n\n為了台灣公平正義的存在\n牽手向前做陣來\n為了台灣最美最好的未來\n牽手向前 你我的愛\n\n",
	    "vote_count": 545,
	    "official_url": "https://www.facebook.com/yuyu0323",
	    "winners": false
	  },
	  {
	    "id": 137,
	    "title": "乎台灣卡好的未來",
	    "track_id": 212634859,
	    "author_name": "詞曲/林桐毅  編曲/劉主揚",
	    "desc": "因為深愛著台灣這片土地，希望我們的堅持與努力，能讓台灣變得更好…",
	    "lyrics": "寶島台灣，是我們的家\n我從小就生長在，這片家園\n這片土地，擁有美麗的風景\n還有著那溫暖的，人情味\n\n不管遇見，什麼困難\n不論遇到，什麼挫折\n希望有我們的堅持\n能讓台灣變的更好\n\n台灣，是咱兜\n是阮成長的所在\n因為有阿爸阿母的打拼\n一步步嘎阮，晟養大漢\n\n今後台灣的未來\n咱一定要爭取\n希望能夠牽起，咱的雙手\n大聲說出對台灣的愛\n\n希望咱ㄟ當手牽手\n作伙為這片土地來打拼\n為咱的子孫爭取，一個希望\n乎台灣卡好的未來\n\n希望咱ㄟ當手牽手\n作伙為這片土地來打拼\n為咱的子孫爭取，一個希望\n一個乎台灣，擱卡好的未來\n",
	    "vote_count": 248,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 92,
	    "title": "明天",
	    "track_id": 212447848,
	    "author_name": "Chony",
	    "desc": "期待下一任總統能保留台灣在每個海外遊子記憶中的美，並排除政治色彩的侷限做對的事。",
	    "lyrics": "電視上的畫面，越來越鮮豔\n新聞中的內容，感覺越來越危險\n曾經暫別之前，約好有一天再為妳貢獻\n\n記憶中的景象，現在還猶新\n課本上的章節，還隱約在記憶裡\n曾經感受過的愛還熟悉\n卻有那麼一點怯意\n\n跟我說\n台北的天空是否還依舊\n淡水的樹林是否還紅的\n太陽餅的味道是否還像從前那樣甜\n\n聽著\n鐵軌的低吟，嘉南是否還翠綠\n在愛河畔的故事，讓它隨風而去\n只要阿里山的日出，明天還能再繼續\n\n街道上插滿各種顏色的旗\n有藍，有橘，也有紅綠\n但我卻看不到真正的彩虹旗\n\n總有人，他話講的贏妳\n誰能解釋這還有什麼意義\n愛，需要去成就\n別再做無謂的退縮\n\n跟我說\n台北的天空是否還依舊\n淡水的樹林是否還紅的\n太陽餅的味道是否還像從前那樣甜\n\n聽著\n鐵軌的低吟，嘉南是否還翠綠\n在愛河畔的故事，讓它隨風而去\n只要阿里山的日出，明天還能再繼續\n\n",
	    "vote_count": 182,
	    "official_url": "https://www.facebook.com/chonyandcompany",
	    "winners": false
	  },
	  {
	    "id": 114,
	    "title": "台灣我愛你",
	    "track_id": 212469593,
	    "author_name": "演唱:Tim Hsu\n詞 /曲 / 編曲: Huai Che Huang",
	    "desc": "自己是一個素人音樂工作者,其實一直很想為台灣這片土地創作,剛好這次有這個活動,我就有一個動力把這首歌寫下來,很感謝主辦單位的用心,台灣人很多人都辛苦打拼著,台灣人有一種又軟弱又堅強的武器就是感情,所以我歌詞寫到就像愛情一樣,雖然我們的情感很壓抑,但不能否認他一直存在著,真心希望台灣人能團結能彼此相愛,然後不要貪心與欺騙(食安問題等),我們都會老去,但還有下一代要承接,我希望留給下一代的是美好與希望,但這是要大家一起努力的!!! ",
	    "lyrics": "台灣台灣 咱的故鄉 在這在這 \n認真打拼 士農工商 流汗生活 \n親像愛情 咱會為著對方來犧牲 \n再接再勵 遇著問題作伙來面對 \n台灣台灣 咱的寶島 在這在這 \n認份認命 心甘情願 傷心快活 \n親像愛情 咱會為著對方來犧牲 \n這次決定 跟你 這次決定 牽手 這次決定 同心鬥陣 \n你為著你 不是干那為自己 感恩謙卑 代代無盡 疼惜資源 誠心對待 為著還沒出世 咱的後代 你為著你 不通干那為自己 感恩謙卑 代代無盡 台灣只有一個 人生無法重來 台灣我愛你",
	    "vote_count": 1681,
	    "official_url": "https://www.facebook.com/huai.c.huang",
	    "winners": true
	  },
	  {
	    "id": 26,
	    "title": "騎著我的跤踏車",
	    "track_id": 211171147,
	    "author_name": "詞：陳虹百\n曲：張登傑",
	    "desc": "作詞者聽聞作曲者經常在騎著腳踏車上班的途中，配合著踩腳踏車的韻律進行歌謠創作，靈感油然而生，想像作曲者騎車在高雄各地漫遊，伴隨著與至親好友共同的成長記憶，創作了本闕歌詞，二人共同完成了這首歌曲創作，描繪小人物悠然自在的心境，與對這塊土地的熱愛。",
	    "lyrics": "騎著我的跤踏車，來到舊厝的門口埕，看到阿公佮阿媽，阮的親人攏佇遮；\n騎著我的跤踏車，來到彎彎的愛河岸，情人散步相依偎，阮的青春攏佇遮；\n騎著我的跤踏車，遊覽四界寬寬仔行，一輪一輪慢慢啊踏，踏出心內彼條歌。\n騎著我的跤踏車，來到鳳山的衛武營，綠草田嬰來相伴，阮的熱情攏佇遮；\n騎著我的跤踏車，來到青青的柴山坪，朋友用心來交陪，阮的回憶攏佇遮。\n騎著我的跤踏車，遊覽四界寬寬仔行，一輪一輪慢慢啊踏，踏出心內彼條歌。\n一輪一輪慢慢啊踏，踏出心內彼條歌。",
	    "vote_count": 40,
	    "official_url": "https://www.facebook.com/dungjye",
	    "winners": false
	  },
	  {
	    "id": 99,
	    "title": "四合院",
	    "track_id": 212448218,
	    "author_name": "編曲：林大為 / 曲：林大為 阿不拉吉  陳品章 / 詞：陳品章",
	    "desc": "兒時的記憶裡，充滿著多彩多姿的人文景色，我是台灣人，在眷村玩耍可以聽老士官長講好多故事，鄰居有原住民，也有客家人，大家不分彼此，和樂融融的氛圍就如同一個大家庭般。\n    想像台灣就像個四合院,住著四大族群,創作這一首歌使用了四種語言，是希望表達這塊土地上族群融合的善美境界，真心守護著我們家園，不容許有紛爭，不製造衝突，回歸到最單純和諧的台灣美樂地。\n    創作該首歌詞的（小乖）陳品章也是有如此啟發，他說：我媽媽是原住民,爸爸是台灣人,我們家住在眷村內,開一家鐘錶行,晚上的時候常常聽到爸爸跟阿公在唱歌（阿公喜歡唱日本歌）,媽媽很愛跳舞（小時候又在客家村長大的,會講客語），真心希望在我們的土地上，一直都能有這樣和諧的生活著。\n\n",
	    "lyrics": "A1 （台語）\n人生有一條歌  自細漢攏底聽    阿爸ㄟ日本歌  阿母ㄟ跳舞聲 \n外省攏唱軍歌  阿公ㄟ喊拳聲    阿嬤喊麥吵～ \nA2 \n人生有一齣戲  你我逐工底搬   有時拵演落魄  有時拵演快活 \n哮嘸免太大聲  笑驚人嘸知影   有緣行相偎～ \nB1（台灣童謠）\n一的炒米香  二的炒韭菜  三的強強滾  四的炒米粉\n五的五將軍  六的六子孫  七的看無影  八的分一半\nA3 \n無同款ㄟ過去  抬頭共一片天    嬰仔學講話聲  持大攏笑咪咪 \n日頭是赤燄燄  隨人底固性命    希望出頭天～ \nA4\n麥怨嘆這呢濟  咱係共款未來   無同款ㄟ色彩  攏為著後一代 \n雙腳愛骨力行  雙手麥驚骯髒   將來係咱ㄟ～\nB2 （客家童謠）\n油菜花 油菜花 尖尖低 油菜花 摘兩蕊 轉屋家 給渣 好親家 \nC（原住民語 國語）\n那魯灣多伊啊那呀嘿  無論你是來自何方   一起守護這美麗的地方 \n那魯灣多伊啊那呀嘿  雙腳踩同片土地上   相互體諒 就有改變的力量\n\n",
	    "vote_count": 1693,
	    "official_url": "https://www.facebook.com/davidjr909",
	    "winners": true
	  },
	  {
	    "id": 171,
	    "title": "咱尚愛的台灣",
	    "track_id": 212748708,
	    "author_name": "說書人",
	    "desc": "以說書人的概念，訴說從四百年前的台灣到今天，這是我們的土地，是我們的家。",
	    "lyrics": "講到彼時老荷跟小牙愛玩大富翁           (這段寫荷西時期)\n鬼天比賽起足多城堡看誰的分數卡高\n熱蘭遮城赤崁樓還有紅毛城\n留到現在攏嘛是咱的古蹟和財產\n\n後來小鄭哥帶漢人來把老荷趕走           (這段寫鄭成功時期) \n置台灣開始訓練阿兵哥欲對付清兵\n阿擱開了全台灣第一間學校\n就是現在台南彼間全台首學的孔廟\n\n想不到 阿清煞把小小小鄭招降            (這段寫清朝治台時期)\n彼個時代人講一府二鹿三艋舺\n起真多水圳鋪第一條鐵路\n甘哪把台灣變成 伊的開心農場\n\n等到阿本仔 贏得阿清的蕃薯了後          (這段寫日本殖民時期) \n來到這個所在開始做起了小叮噹\n百寶袋變出文化的新樣貌\n解禁、同化、統一的法寶全部通通用上\n\n\n這就是台灣 這就是台灣\n這就是咱的台灣 咱的台灣\n伊的名叫做台灣 美麗的福爾摩沙\n咱尚愛台灣 喔~\n\n這就是咱的台灣 咱的台灣\n這就是咱的台灣 咱的台灣\n伊的名叫做台灣 美麗的福爾摩沙\n咱尚愛台灣 喔~  咱尚愛台灣\n\n二次大戰結束終於來到小民的時代         (這段寫中華民國到來)\n較是從此以後人民可以高枕無憂\n但是跟咱所想的煞不相同款\n二二八白色恐怖政治迫害逐項來\n\n好家在咱攏不願放棄為到將來\n因為人民才是一個國家正港的頭家\n一直做伙打拼到現在\n相信咱的堅持跟美夢永遠站的穩\n\n這就是台灣 這就是台灣\n這就是咱的台灣 咱的台灣\n伊的名叫做台灣 美麗的福爾摩沙\n咱尚愛台灣 喔~\n\n這就是咱的台灣 咱的台灣\n這就是咱的台灣 咱的台灣\n伊的名叫做台灣 美麗的福爾摩沙\n會擱卡好台灣 喔~  咱尚愛台灣\n\n\nRAP:\n站在這片土地我們都有滿腔熱血\n不分你我共同緊緊抓住唯一信念\n持續蔓延 美好的憧憬等著實現\n就讓 心跳震撼感動伸手架起連結\n\n歷史不斷刻劃台灣將近快四百年\n那些驕傲一直都在永遠不會改變\n相信自己 在過去和未來的時間\n不管多麼艱難多麼崎嶇都不後退\n\n這就是台灣 這就是台灣\n這就是咱的台灣 咱的台灣\n伊的名叫做台灣 美麗的福爾摩沙\n咱尚愛台灣 喔~\n\n這就是咱的台灣 咱的台灣\n這就是咱的台灣 咱的台灣\n伊的名叫做台灣 美麗的福爾摩沙\n會擱卡好台灣 喔~  咱尚愛台灣\n\n",
	    "vote_count": 476,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 64,
	    "title": "自由公路",
	    "track_id": 212071713,
	    "author_name": "BIKE機踏車樂團",
	    "desc": "自由的可貴總是要等失去才知道，在民主體制下最珍貴的就是自由了，希望小英姐可以帶領台灣踏上自由公路，堅定前行！",
	    "lyrics": "為了生活我們忙碌的奔走\n沒發現 不自由\n為了工作我們迷失在車陣中\n這時候 很沉默\n往下個路口 期待些甚麼\n往下個出口 未來怎麼走\nOpen radio 方向盤在手 \n自由公路讓我陪你一起走\n\n",
	    "vote_count": 95,
	    "official_url": "https://www.facebook.com/biketaiwanband",
	    "winners": false
	  },
	  {
	    "id": 66,
	    "title": "七星潭的約會",
	    "track_id": 212071730,
	    "author_name": "馮德明",
	    "desc": "",
	    "lyrics": "妳到底會不會來七星潭赴 我們這次的約會\n妳那一天晚上含糊的回答 不知該如何理解\n墨藍色海浪的回響 漁舟昏黃的燈光 似乎隱喻待續的希望\n也許只是我的一廂情願 也許妳也正徬徨\n也許只是夢一場 也許一起陷情網\n妳到底願不願意享受這風景\n妳到底願不願意分享這甜蜜\n抬頭往上看了看 滿天星\n低頭無語空對影 想著妳",
	    "vote_count": 14,
	    "official_url": "https://www.facebook.com/mcaming",
	    "winners": false
	  },
	  {
	    "id": 110,
	    "title": "在地希望點亮台灣台語版",
	    "track_id": 212469546,
	    "author_name": "江欣洲",
	    "desc": "其實敝人認為最純粹的原聲，才是最吻合台灣美樂地的新生。",
	    "lyrics": "清唱版 (國語或台語亦可)\noh ya hi ya oh ya oh oh oh hi ya\nFormosa ; Taiwan； It‘s our beautiful country\n(重複二次)\n腳踏美麗的家園 民主價值的保全\n多元族群的台灣 在地希望的改變\n教育文化的本源 新型經濟的創先\n普世保護的人權 堅持永續的主權\n維持現狀的兩岸 和平互惠的前瞻\n(副歌二次)\n開放格局的宏觀 在地希望的清泉\n點亮人情的台灣 自信領袖的承擔\noh ya hi ya oh ya oh oh oh hi ya \nFormosa ; Taiwan； It‘s our beautiful country",
	    "vote_count": 15,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 169,
	    "title": "這是我們的選擇",
	    "track_id": 212748686,
	    "author_name": "Huai-En",
	    "desc": "318學運後，年輕人不再對政治冷漠。政治不再只是「大人們」的事，而是「我們」的事。台灣不大，卻住著不同種族，說著不同語言的人們。隨著年歲增長，在懂事成熟的同時，我們也不小心遺忘了小時候的那份純真。我們變得會因為顏色不合，我們開始會為了理念爭執，卻忘了每次的「選擇」都是尊重，每次的「選擇」都要負責。\n\n上一代的裂痕，這一代我們用愛撫平。民主的過程，是一次又一次的「選擇」。我們學習尊重，我們學習包容。這一次，盼望年輕的世代不再沉默，勇敢且驕傲地說：「這是我們的選擇！」",
	    "lyrics": "生命是一首歌，不同樂器，不同音色。五線譜上扮演著，不同的角色。\n生命是一條河，沖走悲傷，帶來快樂。無論未來變化如何，我們獨一無二。\n這是我們的選擇，不分種族和顏色。肩並著肩一起唱著，童年單純的歌。\n這是我們的選擇，無論平凡或獨特。善良溫暖和那真誠，是我們擁有的。\n這是我們的選擇，不分種族和顏色。肩並著肩一起唱著，童年單純的歌。\n這是我們的選擇，我們驕傲的活著。這一刻我永遠記得，這是我的選擇。\n這一刻我永遠記得，這是我的選擇。",
	    "vote_count": 1611,
	    "official_url": "https://www.facebook.com/huaien.huang",
	    "winners": true
	  },
	  {
	    "id": 8,
	    "title": "欲飛",
	    "track_id": 211101492,
	    "author_name": "海馬 迴",
	    "desc": "帶著認份與努力，相信著可以被改變的現況，飛出去。",
	    "lyrics": "生命 甘無一些希望 \n願望 甘無法度完成\n帶著我的認份 你的期望 ㄟ當改變啥 \n帶著我的靈魂 你的孤單 不能改變啥\n我想要飛 飛出這個蓋著烏雲的天\n我想要飛 飛不出去\n\n我想要飛 飛出這個黑暗無聊的天\n我想要飛 飛出去",
	    "vote_count": 95,
	    "official_url": "https://www.facebook.com/BuYaoBuNengBuKeYi",
	    "winners": false
	  },
	  {
	    "id": 133,
	    "title": "天已經光",
	    "track_id": 212634617,
	    "author_name": "詞：張光音 曲：賴如茵",
	    "desc": "美麗的島嶼福爾摩沙, 擁有得天獨厚的大自然與生態, 堪稱東方明珠. 並且在各方面人才輩出, 已在全球發光發熱, 象徵著時機已成熟, 而愛才是最大的資產, 期許發揮更無私的愛, 讓和平永續, 讓台灣成為真正的美樂地",
	    "lyrics": "天已經光, 緊起床\n日頭曬尻川\n風微微, 耳空邊\n鳥仔唱歌詩\n\n天已經光, 緊出門\n巡視滿山滿野兮田園\n毋驚風, 毋驚雨\n毋驚乾旱火燒埔\n\n天已經光, 緊出航\n茫茫大海細緻行\n互相疼痛甲珍惜\n正有永久兮美樂地",
	    "vote_count": 68,
	    "official_url": "https://www.facebook.com/profile.php?id=100003753361635",
	    "winners": false
	  },
	  {
	    "id": 54,
	    "title": "土地的希望",
	    "track_id": 211898848,
	    "author_name": "林育伶",
	    "desc": "台灣是我們的母親，我們已經從她的身上得到許多的養分，但是確時常忘了要保護她。這一片土地是我們世世代代共同的生命泉源，讓我們一同來珍惜她，保護她，讓我們的未來充滿平安與希望。",
	    "lyrics": "土地的希望\n土地若有希望\n咱的未來有望\n望幸福\n望平安\n望枝葉代代湠\n將希望種佇咱的土地\n大家同心做陣來守護伊\n嘸通自私袂當軟弱\n咱的夢攏佇這\n咱的未來\n用心感受土地的心情\n若是有心怎樣會辜負伊\n青山綠水人人疼惜\n為未來編織一個夢\n\n",
	    "vote_count": 406,
	    "official_url": "https://www.youtube.com/watch?v=EJa5TLJoNQo",
	    "winners": false
	  },
	  {
	    "id": 166,
	    "title": "夢想的家園",
	    "track_id": 212748628,
	    "author_name": "e-Hao",
	    "desc": "台灣，我們的家 ，美好的土地\n我們都對台灣有一份特殊的情感\n鄉間的田野，時尚的都會，便利的城市，熱鬧的夜市與美食 \n也許有些事情 \n讓人感到灰茫，甚至對未來迷惘 \n但我們終究還是要\n滿載著能量，再闖一次\n這路途上總有困難\n但我們一定會互相扶持\n度過所有難關\n因為，我們是打不倒的台灣人\n\n",
	    "lyrics": "田園裡散滿了花香\n敞開手感受這暖陽\n鳥兒唱起輕快樂章 \n這是我最熟悉的家鄉\n\n街道上熱鬧的模樣\n施展著絢麗的魔法\n穿梭城市裡的時尚\n也是我最熟悉的家鄉\n\n這些年我時常帶著些迷惘\n期望到頭來總是有點落差 \n少了禮讓多了吵雜\n失去了方向\n爬到越高點天空卻更灰茫\n但我始終沒忘記 家鄉 原始的模樣\n\n扛起著行囊\n再闖一次吧\n我們依然滿載著能量\n拋開那徬徨\n甩開這失望\n別忘了最初的理想\n不分你我他\n總有困難但我們併肩抵擋                \ngo fight win 一起向前追\n努力找回埋藏心中 \n夢想的家園\n\n",
	    "vote_count": 105,
	    "official_url": "https://www.facebook.com/ehao27",
	    "winners": false
	  },
	  {
	    "id": 151,
	    "title": "Forever Young",
	    "track_id": 212748348,
	    "author_name": "林欣曄",
	    "desc": "這首歌初稿寫於太陽花學運期間，後經改寫成此一版本。歌名來自1980年代知名反戰歌曲，曾經唱出當代美國年輕人的心聲；而台灣年輕人的力量，也在邁向民主化國家的過程中扮演了重大角色。我希望藉由這首台灣版Forever Young的全新創作，從一個參與太陽花學運學子的角度，傳達我們對台灣未來的思考與祝福；也透過這首歌曲，呈現我們對理想中領導者的支持和期許。最重要的是，我們相信，這不僅是一首屬於年輕人的歌，而是只要願意堅持理想、努力為台灣付出的每一個人，都將是Forever Young──永遠年輕的！",
	    "lyrics": "這裡就是Formosa　讓我們在這裡跳吧\n這首失傳的舞蹈　我們還來不及遺忘\n歷史的河床　淘盡了滄桑　彩虹就在不遠前方\n鮮花用倔強　翻時間的牆　蛻變是美麗的翅膀\n為愛我勇敢想像　把未來扛在肩上\n擁抱心中的太陽　將黑夜點亮\n當沈默變得堅強　淚化成溫柔的鋼\n我姿態只有一種說法　Forever Young\n最親愛的Formosa　讓我們都為妳唱吧\n這首蜿蜒的流浪　時代還來不及跟上\n年輕是渴望　自由的海洋　夢想激盪在我胸膛\n讓我們面向　風雨的穹蒼　致上金黃色的臉龐\n為愛我勇敢想像　把未來扛在肩上\n擁抱心中的太陽　將黑夜點亮\n當沈默變得堅強　淚化成溫柔的鋼\n自己的美樂地自己創　Forever Young\n為愛我摘下鏡框　看透是非的色盲\n擁抱荊棘的真相　拾歷史的荒\n當記憶拒絕泛黃　熱血灌溉著信仰\n我答案只有一種飛翔　Forever Young",
	    "vote_count": 419,
	    "official_url": "http://www.facebook.com/Lawpoet",
	    "winners": false
	  },
	  {
	    "id": 20,
	    "title": "希望之舟 ‧ 幸福之軸",
	    "track_id": 211101471,
	    "author_name": "山畝",
	    "desc": "希望、幸福是一幅畫，須眾人一起描繪；以幸福為風帆之軸，合力造一艘希望之舟，同行。",
	    "lyrics": "希望之舟  幸福之軸\n自由的風  吹動\n手牽著手  畫一道彩虹\n讓理想輪廓流露\n雨後的天空   燦爛的笑容   溫暖著一樣的夢\n牽著  你手   幸福在手中流動",
	    "vote_count": 28,
	    "official_url": "https://www.facebook.com/samland",
	    "winners": false
	  },
	  {
	    "id": 104,
	    "title": "天佑台灣",
	    "track_id": 212448285,
	    "author_name": "黃盛一",
	    "desc": "32年次出生的老前輩，寫出對台灣的期許祝福",
	    "lyrics": "歷代先賢，毋驚艱苦，克服萬難，開山造路\n創立台灣幸福的樂土 現代青年勇敢進言\n野百合了後 太陽花開 一片攏是民主的花蕊\n咱大家攏是 台灣仔子 團結同心 逗陣行\n天佑台灣 天佑台灣 天佑快樂幸福的台灣\n朋友啊 擱拼落 毋通驚悚 流血流汗 繼續打拼\n建設台灣民主的京城 黑暗喀久嘛會天光\n風颱喀大 嘛會平靜 堅強忍耐一定會光明\n咱台灣攏是 台灣仔子 團結同心 逗陣行\n天佑台灣 天佑台灣 天佑快樂幸福的台灣",
	    "vote_count": 31,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 124,
	    "title": "美德硬！台灣",
	    "track_id": 212582576,
	    "author_name": "Swain Shih 石惟安",
	    "desc": "台灣應該要有自己的主題曲, 讓世界看到,\n這就是台灣的主題曲.\n這就是, 我的家鄉,\n日日夜夜響起的歌聲,\n完",
	    "lyrics": "當街道充斥著冷漠\n連天空也不停躁動\n我們的心 也開始生鏽\n\n任誰都難以捉摸\n和歷史的擦肩而過\n遊盪在喚不醒的睡夢中\n\n現在起 我要帶你走\n無論你是否同意我\n請接受 這世界的潮流\n註定讓我們名字永垂不朽\n\n因為咱的名就叫做台灣\n是我們的心靠岸的所在\n手牽手   一起來\n這個寶島 不需要在忍耐\n手牽手   一起來\n讓台灣的名 報給這個世界 \n\ncome from an island besides china\n來自中國旁邊的一個島嶼\ndown below‭ ‬Sakura\n在櫻花撒落的國度下面\nI‭'‬d like you to called me a Taiwanese\n我比較喜歡你叫我台灣人\n\nnow I'm standing here\n現在我站在這裡\nno I don't need you to define me\n我不需要你來定義我\nyeah I hurrah for my‭ ‬Neverland\n喔耶‭ ‬我為我的夢幻國度歡呼\n\nI may act abnormally\n我可能舉止怪異\nbut I dream enormously\n但我的夢想巨大\nhard times won't be easy to‭ ‬go\n苦日子也許不會好走\nbut I'm keeping on my‭ ‬faith and‭ ‬belief\n但我堅持我的信念\n\ncause\n因為\nall my mind is made in Taiwan\n我的所有心智都是製造於台灣\n ‭ ( ‬you can see it when sun rises‭ )‬\n ‭ ( ‬當太陽升起你就會看見‭ )‬\nand all my soul belongs to Taiwan\n我的每片靈魂都是歸屬於台灣\n ‭ ( ‬you'll hear that when in the midnight‭ )‬\n ‭ ( ‬當夜半三更你就可以聽的見‭ )‬\n\nsing with me, all my friends‭, ‬\n和我一起大聲歡唱‭ ‬所有我的朋友\nthis is the spirit of Formosa\n這是福爾摩沙的精神\nsing with me‭, ‬all my‭ ‬neighbors,\n和我一起大聲歡唱‭ ‬所有我身邊的人\nthis is the story of made in Taiwan\n這就是美德硬‭!‬台灣\nmade in Taiwan‭, ‬\nI’m made in Taiwan‭,‬\nMade in Taiwan\n\n",
	    "vote_count": 40,
	    "official_url": "https://www.facebook.com/swain.shih",
	    "winners": false
	  },
	  {
	    "id": 100,
	    "title": "台灣美樂地",
	    "track_id": 212448222,
	    "author_name": "Belle Wang/Eric Cole",
	    "desc": "台灣是世界有名的水果王國. 以台灣最代表性的水果和農產品來歌頌,表現出寶島的物產豐盛和人民的樂觀勤奮以及珍惜自由民主的強烈願望. <蕃薯香香竽仔鬆, 和氣生財逗三工> ( 逗三工=互相合作). 表示族群的融合和熱情的相互幫忙促進國家的經濟發展及主權的更加穩固.",
	    "lyrics": "滿山好景色 近近在眼前\n荔枝紅吱吱 龍眼花招開\n鳳梨芒果糖蜜甜 香蕉黃黃香入鼻\n稻仔茶米滿田邊 台灣到處是春天\n蕃薯香香芋仔鬆 和氣生財逗三工\n為著將來的美夢 流汗打拼有采工\n為著台灣的希望 民主寶島愛疼窗",
	    "vote_count": 89,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 95,
	    "title": "台灣是我們的母親",
	    "track_id": 212447872,
	    "author_name": "紀文章",
	    "desc": "透過對台灣的地景、簡史、族群、生態，及多元文化之爬梳，建構對台灣這塊土地與國族之認同。",
	    "lyrics": "玉山白雪皚皚  高聳耀眼壯麗\n起霧的日月潭  空氣清澄靜寂\n風吹嘉南平原  稻浪一望無際\n濕地上蚵農駕著牛車滿載豐收的牡蠣\n\n萬年前原住民  文明遍佈島嶼\n四百年前漢人  移民開墾土地\n破浪的白海豚  帝雉御風飛行\n福爾摩沙人民特有種多樣性生物雲集\n\n品味土地的豐饒  和文化氣息\n豐富多元的文明已萬年有餘\n無言的眾生  斯土有情的人民\n萬物棲息台灣  人民亦無所逃遁這天地\n\n\n台灣是我們的母親  沒人可以奪走她美麗\n台灣是我們的土地  要用盡全力去疼惜\n台灣是我們的根基  她養育我我滿懷感激\n台灣是我們的國家  我們要用生命捍衛到底\n\n嗬嗨呀吶咿嗨唷~  嗬嗨呀吶唷~~\n嗬嗨呀吶咿嗨唷~  嗬嗨呀吶唷~~\n\n",
	    "vote_count": 159,
	    "official_url": "https://www.facebook.com/scott.chi.6688",
	    "winners": false
	  },
	  {
	    "id": 6,
	    "title": "我的英雄",
	    "track_id": 211101499,
	    "author_name": "涼煙樂團",
	    "desc": "創作於2009年八八風災後，當政府救災顢頇，西裝筆挺的高官們忙著在鏡頭前搶救自己聲望的時刻，有一群台灣人為了自己的土地與同胞勇敢地站出來，對抗大風，對抗惡水。他們拯救了無數人，有些還因此犧牲了寶貴的生命。 台灣人對事件的記憶，往往與媒體的報導連結。當下深刻感念，義憤填膺，新聞過後，船過水無痕。我們希望能透過歌曲的創作以及樂團持續地演出，讓更多人記得這些無畏的台灣人，紀念他們的勇氣與對土地的愛。  在台灣生活，一直都是一個持續與天災搏鬥的過程。我們期望蔡主席可以帶領台灣的全體公民一起打造一個安居，宜居的社會。讓天災可以被有效地預防，讓人禍得以被清廉高效的政府消滅，讓英雄們都可以跟被他們拯救的人一樣，安全回家，看著孩子長大。",
	    "lyrics": "我的英雄沒有名字 沒有華麗頭銜官職 或偽善的言詞\n喔你 是我最陌生的朋友 從天而降的補給品 橫渡那\n湍急洶湧的溪 淹沒你和我的摯愛 腳步 依然堅定\n忘記身上累積多少艱辛 多少傷痕多少淚滴\n前進曾經翠綠山谷底 即使崩塌仍無所畏懼 焦急的母親 等待你捎來好消息\n也許人世間太多別離 因為你生命充滿奇蹟 消失的背影 我的英雄\n\n我的英雄沒有體溫 他們永遠地沉睡了 錯過孩子的青春\n為你 我們決意站在這裡 唱一首驕傲的歌曲 懷念那\n夏季狂風暴雨 埋葬你和我的摯愛 腳步 依然堅定\n忘記身上累積多少艱辛 多少傷痕多少淚滴\n前進曾經翠綠山谷底 即使崩塌仍無所畏懼 焦急的母親 等待你捎來好消息\n也許人世間太多別離 因為你生命充滿奇蹟 消失的背影 我的英雄\n前進曾經翠綠山谷底 即使崩塌仍無所畏懼 焦急的母親 等待你捎來好消息\n向默默奉獻的背影致敬 你的名字叫做絕對不放棄 我的英雄\n\n絕不低頭 絕不放手 我的英雄",
	    "vote_count": 395,
	    "official_url": "https://www.facebook.com/TheSlimCigarettes",
	    "winners": false
	  },
	  {
	    "id": 111,
	    "title": "在地希望點亮台灣國語版",
	    "track_id": 212469563,
	    "author_name": "江欣洲",
	    "desc": "其實敝人認為最純粹的原聲，才是最吻合台灣美樂地的新生。",
	    "lyrics": "清唱版 (國語或台語亦可)\noh ya hi ya oh ya oh oh oh hi ya\nFormosa ; Taiwan； It‘s our beautiful country\n(重複二次)\n腳踏美麗的家園 民主價值的保全\n多元族群的台灣 在地希望的改變\n教育文化的本源 新型經濟的創先\n普世保護的人權 堅持永續的主權\n維持現狀的兩岸 和平互惠的前瞻\n(副歌二次)\n開放格局的宏觀 在地希望的清泉\n點亮人情的台灣 自信領袖的承擔\noh ya hi ya oh ya oh oh oh hi ya \nFormosa ; Taiwan； It‘s our beautiful country",
	    "vote_count": 15,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 150,
	    "title": "時代",
	    "track_id": 212748333,
	    "author_name": "信森活樂團",
	    "desc": "讓我們一同創造全新未來,這是屬於我們的時代",
	    "lyrics": "這是一個愛的時代 互相了解互相關懷\n這是一個夢的時代 創造屬於咱的舞台\n\n這是一個美麗時代 做伙飛向彩色的未來\nWe all live under the same sky(我們都生活在同片天空下)\nSharing our hope and smile(分享我們的希望和笑容)\n \n麥閣踮茫茫人海\n怨嘆上天的安排\n心情真醜 孤單悲哀\n毋通見怪 這個世界\n照起工實實在在\n盡人事用心對待\n咱的將來 咱來主宰\n毋驚阻礙 勇敢來一擺",
	    "vote_count": 1793,
	    "official_url": "https://www.facebook.com/lovebigsam",
	    "winners": true
	  },
	  {
	    "id": 35,
	    "title": "正義的花朵開滿地（華語）",
	    "track_id": 211594070,
	    "author_name": "曲:鄭英傑, 詞:藍惠容 ",
	    "desc": "正義的花朵開滿地(華語)",
	    "lyrics": "湖邊瀟瀟秋風吹，細雨綿綿飛，                 \n楓葉飄飄片片墜，寒風冷心扉，\n冬季凋謝的花蕊，等待春風吹，\n\n春風柔柔溪邊吹，花兒吐新蕊，\n自由民主在那裡，在公平選舉，\n\n正義花朵開滿地，搖曳春風裡。",
	    "vote_count": 35,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 176,
	    "title": "為你微笑",
	    "track_id": 212796206,
	    "author_name": "南西樂團",
	    "desc": "這首創作出發點是試著以自己的角度來對台灣說話,台灣給我們每個人成長的養分,無限的 愛,而我們也希望可以用自己的力量,讓這塊土地驕傲,不同的語言與顏色都都是對土地的愛, 不只是蔡英文,我們每個人都可以是歌曲的主角。",
	    "lyrics": "Na lu wa do I ya ho hi ya 你甲我有同款的夢(台語) \nNa lu wa do I ya ho hi ya 你跟我有同樣的夢(國語) \nNa lu wa do I ya ho hi ya 你甲我有同款的夢(原住民語: 阿美族) \nNa lu wa do I ya ho hi ya 你甲我有同款的夢(客語)\n\n[A1]\n每天 睜開眼睛 我看見你 \n陽光下 你的臉 山林搖曳風情 \n\n[A2]\n路兒彎彎 車潮擁擠 \n我不擔心迷失方向路徑 \n有些焦急 和著期許\n等不及抵達目的\n\n[B]\n也許在別人的眼中 你是如此平凡 \n地圖中渺小的存在\n小小的 土地 給予我最無私的愛 \n就讓我為你微笑 台灣\n\n也許在別人的眼中 我是如此平凡 \n所以我不曾懈怠\n大步努力 追上 你不間斷的愛 \n要讓你為我微笑 台灣\n\n[A3]\n夜裡 你的懷裡 令人安心 \n月光下 城市裡 聽見你的呼吸 \n\n[A4]\n滿天星星 旅途中指引 \n黑是為了襯托光明\n鳥叫蟲鳴 是你的密語 \n為我加油打氣\n\n[B2]\n我知道在我的眼中 你是如此不凡 \n繽紛絢爛的色彩 \n明白那藍的綠的黃的來自同一份愛 \n讓我再為你微笑 台灣\n\n多希望在你的眼中 我能有一絲不凡\n想給你更好的未來\n要我們自信驕傲自然流露出神采\n再讓你為我微笑 台灣\n\nNa lu wa do I ya ho hi ya 你甲我有同款的夢(台語) \nNa lu wa do I ya ho hi ya 你跟我有同樣的夢(國語) \nNa lu wa do I ya ho hi ya 你甲我有同款的夢(原住民語: 阿美族) \nNa lu wa do I ya ho hi ya 你甲我有同款的夢(客語)",
	    "vote_count": 1908,
	    "official_url": "",
	    "winners": true
	  },
	  {
	    "id": 160,
	    "title": "油菜花的一句話",
	    "track_id": 212748531,
	    "author_name": "江昱仁",
	    "desc": "在台灣冬天，各地都可看到油菜花田，一株一株小小的，開著一朵朵小花，成片滿鄉間黃澄澄溫暖人心。春天到，油菜花又和著田土成為綠肥，滋養作物，像是台灣人一般，一個個默默在這塊土地耕耘，耕作出台灣這片最美麗的風景。而油菜花的花語為加油，在風中搖來搖去，更像在和彼此說，「台灣！加油」。",
	    "lyrics": "黃花滿滿開抵田的土地 花開有香味甜甜對著風吹\n唉呦喂 蝴蝶輕飛過 和花蕊在講情話\n唉呦喂 油菜花笑笑 歹勢 又頭犁犁\n黃花搖來搖去 在風中在旋\n白鷺鷥嘛飛過來和我在覓相找\n風在吹 心在飛 溫暖置阮的心肝底\n\n那 那 那 那 那 那 那 那\n油菜花是啥人的寶貝 油菜花是土地的寶貝\n花黃葉青 冬天時開最多 春天到 紡落田和土地結作夥\n油菜花是土地的寶貝  油菜花疼惜這塊的土地\n無聲無說 惦惦開著小花 感謝伊乎稻子飽穗 有豐收的月\n風中傳來油菜花在講 甘巴爹揑(加油)\n那 那 那 那 那 那 那 那\n油菜花在講 甘巴爹揑(加油)",
	    "vote_count": 360,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 33,
	    "title": "咱的國家叫臺灣",
	    "track_id": 211594060,
	    "author_name": "李宗信",
	    "desc": "描述台灣人在困境中不畏艱辛，保持希望，期待有朝一日能當家作主。",
	    "lyrics": "秋葉怎知春花香，夜夜期待好年冬，\n台灣人民有希望，讓阮用愛來栽種。\n無奈北風這麼寒，對阮無情來摧殘，\n請你千萬不通忘，咱的國家叫台灣。",
	    "vote_count": 22,
	    "official_url": "https://www.facebook.com/100004164733131/videos/503553573126796/",
	    "winners": false
	  },
	  {
	    "id": 67,
	    "title": "手伸出給我",
	    "track_id": 212071739,
	    "author_name": "馮德明",
	    "desc": "",
	    "lyrics": "尋找一片空時間，為了回到我原點，\n回到原來的平衡， 回到原來的重點，\n忙碌的日子已經夠多都害我不方便，\n上班下班的習慣讓我長得像鬼，\n喔，我要離開， 走到遙遠，剛快準備進入未來，\n過去的煩惱已不見，方向在我們的前面，\n把妳的手伸出給我，我要帶妳離開這個街頭，\n帶妳看另一個世界，帶妳感受真的自由，\n一起唱這個音樂，跟著這個節奏。",
	    "vote_count": 15,
	    "official_url": "https://www.facebook.com/mcaming",
	    "winners": false
	  },
	  {
	    "id": 70,
	    "title": "整座城市都是我的遊樂園",
	    "track_id": 212071763,
	    "author_name": "柴郡貓 Cheshire Cat",
	    "desc": "擅長童話故事般的旋律搭配慵懶而清新的聲線，呢喃地唱著生活中的美好的柴郡貓，喜歡透過一雙如貓般敏銳的雙眼蒐集日常生活中的觀察，在這首「整過城市都是我的遊樂園」之中，希望傳達每個城市的角落只要透過愛心、關心、細心灌溉，就能成為每個人心中的遊樂園。也希望透過輕快的夏日曲風，邀請大家走出戶外走進城市，用心感受自己所居住的土地就是每個人的夢奇地。",
	    "lyrics": "一覺醒來 眼睛睜開 滿心的期待 ．\n太陽出來 你來不來 一起出去玩\n黑夜降臨 星星眨眼 故事正精彩 \n早安晚安 不見不散 一起出去玩\n穿越車水馬龍的熱鬧風景\n掂起腳尖 就能發現 \n遠方草原正上演著小清新 嘟嘟嘟嘟\n蒐集大街小巷的溫暖熱情 \n轉過了身就能感覺 \n整座城市都是我的遊樂園\n一覺醒來 眼睛睜開 滿心的期待 ．\n太陽出來 你來不來 一起出去玩\n黑夜降臨 星星眨眼 故事正精彩 \n早安晚安 不見不散 一起出去玩\n穿越車水馬龍的熱鬧風景\n掂起腳尖 就能發現 \n遠方草原正上演著小清新 嘟嘟嘟嘟\n蒐集大街小巷的溫暖熱情 \n轉過了身就能感覺 \n整座城市都是我的遊樂園\n整座城市都是我的遊樂園\n",
	    "vote_count": 50,
	    "official_url": "http://www.facebook.com/CheshireCatMusic",
	    "winners": false
	  },
	  {
	    "id": 130,
	    "title": "山 RGAX",
	    "track_id": 212634437,
	    "author_name": "雅瓦伊 卯令YAWAI‧MAWLIN 詞：YAWAI‧MAWLIN／曲：YAWAI‧MAWLIN／編曲:高潮",
	    "desc": "YAWAI是在泰雅族山上泰安鄉斯瓦細格部落長大的小孩，上學後開始在都市長大，知道了都市及故鄉山上的極大差異，不時經常懷念如同母親的原始山林，如此簡單而美麗，親身感受對山林的情感，加上對這座山的濃烈感情及關愛，不捨如同母親般的原始山林因過度開發而失去原有的面貌。山，就是原住民的家，像母親一樣給我們生活所需的一切資源，也是原住民生存的一切源頭，我們從出生.長.大.到老死，都要仰賴這座山，死也死在它的懷中，這首歌一方面訴說身為原住民後代對於目前原始山林因開發的減少及破壞有著非常不捨的心情，一方面呼籲各界，關心我們的土地，關心我們的家，不要為了利益而破壞了山林生態，維護家園就如同保護一手養育我們成長的母親一樣，水土保持的非常意義重大!簡單的歌詞及旋律，用泰雅族母語訴說著對山林故鄉濃烈的情感!",
	    "lyrics": "sbiru maku lawyag qu ktang mu baitnux  rgax  我用眼睛寫下山林的美\npongang maku papak  mqwas  baihuy  我用耳朵聆聽風的歌聲\nshobang maku nguhuw  insuna hyal  我用鼻子深深呼吸泥土的清新         \nngqwax maku mnbu qsha rgax sbing balay 我用嘴喝下山泉水真的很甜美\nah~~~rgax qani ga lyan yaya mu 啊～～～山就像我的媽媽\ninlegaw ta gmahang inlegaw ta gmahang 好好善待她  好好善待她 \nah~~~rgax qani ga lyan yaya mu 啊～～～山就像我的媽媽\ninlegaw ta gmahang inlegaw ta gmahang 好好善待她  好好善待她\nyaya mu 我的媽媽\ns anun maku mawsa si rgax mita ngasal yaya mu 我好想回到山上的家看看媽媽\ns anun maku genholan yutas yaki maku  我好想回到阿公阿嬤時的故鄉源頭\nah~~~rgax qani ga lyan yaya mu 啊～～～山就像我的媽媽\ninlegaw ta gmahang inlegaw ta gmahang 好好善待她  好好善待她 \nah~~~rgax qani ga lyan yaya mu 啊～～～山就像我的媽媽\ninlegaw ta gmahang inlegaw ta gmahang yaya mu 好好善待她  好好善待\nah~~~rgax qani ga lyan yaya mu 啊～～～山就像我的媽媽\ninlegaw ta gmahang inlegaw ta gmahang 好好善待她  好好善待她 \n",
	    "vote_count": 1513,
	    "official_url": "https://www.facebook.com/yawai.mawlin",
	    "winners": true
	  },
	  {
	    "id": 145,
	    "title": "有你就是家",
	    "track_id": 212635195,
	    "author_name": "詞：吳閃亮  曲：曾寓慈",
	    "desc": "國家，國家，「國」就是同在一片土地上的人共同建立的「家」，所有的人以希望、團結作工具，用關懷、溫暖為材料，齊心合力打造一個大家的家。總統是這個家的大家長，當總統候選人對人民説「有你就是家」，意謂著他視人民為己出，將盡全力為人民謀求最大的利益與福祉；當人民對總統候選人説「有你就是家」，則顯示人民信任該候選人會是一位領導有方，與民同在的國家領袖。",
	    "lyrics": "跟我，跟我一起手牽手\n打開希望的藍圖\n與你，與你一塊肩並肩\n建造團結的地基\n\n大家， 大家一同心連心\n架上關懷的樑柱\n我們，我們一道唱呀唱\n堆砌溫暖的磚瓦\n\n台灣是家  家在台灣\n有夢就有家\n台灣是家  家在台灣\n有你就是家\n\n台灣是家  家在台灣\n有愛就有家\n台灣是家  家在台灣\n有你就是家\n",
	    "vote_count": 84,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 153,
	    "title": "我欲來去掃塗腳",
	    "track_id": 212748383,
	    "author_name": "劉榮昌",
	    "desc": "許多人高喊理想，宣講理念\n卻不如這些在土地上\n已經默默堅持付出的小人物\n還不如好好的從我們身邊做起  \n把小事做好 把地掃乾淨",
	    "lyrics": "我欲來去掃塗腳\n先來去找那支掃帚\n雖然有很多ㄟ代誌\n先位手頭開始做\n\n我欲來去掃塗腳\n位咱ㄟ故鄉開始行\n雖然有很多ㄟ理想\n先位身邊開始做\n\n隔壁 ㄟ阿伯  \n伊自己一ㄟ生活\n頭路是收歹銅舊錫\n雙腳 一跛一跛 照常行\n\n路邊ㄟ糞埽\n順遂拼甲清氣單單\n伊干焦國小畢業\n很多大道理 嘎那無知影  咖那無知影\n\n美麗ㄟ願望    是心內開出ㄟ花\n幸福ㄟ未來    用汗水乎發芽\n   \n高闊ㄟ世界      就抵咱ㄟ心肝底\n歸鄉ㄟ旅途     用 雙手開始做   \n\n『客語』\n庄口个阿伯姆       (庄頭的阿嬸)\n矩逐日 沒閒七叉  （每天都十分忙碌）\n田頭地尾做毋驚   （田地間忙碌好像做不怕）  \n庄肚个事  定著參加   （庄頭的事 她一定參加）\n\n有人討補娘    （有人討老婆）\n需要滕手个老人家  （或是需要幫忙的老人家）\n大家喊倨阿熱姊啊  （大家叫她阿熱姊）\n公眾个事情  倨做毋會驚    樣般毋會驚 （公眾的事情 她都不怕付出  怎麼不怕付出） \n\n\n美麗ㄟ願望    是心內開出ㄟ花\n幸福ㄟ未來    用汗水乎發芽\n   \n高闊ㄟ世界      就抵咱ㄟ心肝底\n歸鄉ㄟ旅途     用雙手開始做   \n\n\n\n我欲來去掃塗腳\n先拿起那支掃帚\n雖然有很多ㄟ代誌\n咱用真心開始做   開始做",
	    "vote_count": 204,
	    "official_url": "https://www.facebook.com/md759md759",
	    "winners": false
	  },
	  {
	    "id": 28,
	    "title": "Taiwan Melody",
	    "track_id": 211171152,
	    "author_name": "黃昱縉",
	    "desc": "創作這首曲子是希望能夠代表台灣這個民主的國家,雖然今年才16歲,但是我還是希望能對台灣做出一些貢獻!\n",
	    "lyrics": "不好意思我只會作曲!希望各位能諒解! 如果有人想要填詞的話歡迎!",
	    "vote_count": 155,
	    "official_url": "https://www.facebook.com/DjK3vinKevinHuang",
	    "winners": false
	  },
	  {
	    "id": 173,
	    "title": "台灣愛出聲",
	    "track_id": 212796156,
	    "author_name": "陳東賢 余國光",
	    "desc": "台灣是我們的國家，就像身上的衣服，閃耀著光芒，我們要海內外團結一致，盡可能的在國際出頭，讓世界知道身為台灣人的驕傲，讓台灣永續生存。",
	    "lyrics": "台灣職領衫 穿佇咱心肝\n七彩的光線 世界相爭看\n\n台灣愛出聲 偉大伊的名\n用心來甲晟 世界攏知影\n\n歷史一面鏡 歡歡喜喜向前行\n共船共生命 風風雨雨毋免驚\n理想有外大 咱的天地就外濶\n成功靠打拼 永遠永遠毋認命\n\n台灣袂孤單 堅定親像山\n花蕊年年開 幸福日日湠\n\n",
	    "vote_count": 256,
	    "official_url": "https://www.facebook.com/profile.php?id=100002340080416",
	    "winners": false
	  },
	  {
	    "id": 167,
	    "title": "台灣在哪裡",
	    "track_id": 212748669,
	    "author_name": "Shin Lin, Clark Yu, Jing Lin",
	    "desc": "過去幾年我們嘗過各種酸甜苦辣，大多處在忙忙的生活，忘記了自己人生的追尋， \n我們是否還記得，在這塊富饒的土地上，友善的人群一直在我們身旁，只要我們願意把那些負面框架拋開，這裡依舊是個美麗的寶島。找尋生活操之在己的精神，找尋互相包容妥善溝通的美德，找尋對於這塊土地的歸屬感，\n找尋我們的台灣在哪裡？",
	    "lyrics": "過去忙茫盲氓\n找不到彼此方向\n儘管過去承受各種質疑眼光\n \n\n一年一月又一日\n還屬於個未知的島嶼\n稻香瀰漫的田道\n變成\n煩囂喧鬧的街道\n不變的是\n我們這個美麗寶島\n\n我相信\n我們可以\n互相鼓勵\n打破沈寂越過藩籬\n\n我相信\n我們可以\n再次覺醒\n鼓起勇氣突破過去   我和你\n\n再一次當太陽崛起\n讓我們有勇氣再向前進\n這一次\n決定握在我們手裏\n在未來大聲說出\n台灣在這裡",
	    "vote_count": 61,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 63,
	    "title": "走找",
	    "track_id": 212071671,
	    "author_name": "夢想六號樂團 ",
	    "desc": "土身土長的台灣樂團\n夢想六號Dream6樂團\n一直在找尋著不同的聲音，也因此命名這首歌曲為 走找(台語)，大家生活在台灣都一直在找尋自我，找尋著未來的方向，而對於台灣有著一起同甘共苦之精神，總是希望找到最適合自己的生活方式。\n夢想六號就如同方舟一樣，全臺灣的人民都一起在方舟上打拼；為臺灣、為理想、為經濟、為事業打拼。\n在途中也許經過許多意見的分歧，在途中也經過不少權力的鬥爭，但是生在臺灣的我們，都是為了臺灣，全體人民都在船上，不可自私、不許獨裁；不能自我，大家同心協力把船航向那和平、美好的大同世界。",
	    "lyrics": "作詞：劉志浤 作曲：藍詩緯\n走找 回憶內總有舊相片的夢\n如今 飄落的梅花親像一場空\n聲音 迴盪在谷底一陣陣雷聲\n光陰 穿梭著空氣抬頭望星空\n\n永遠愛 我會永遠愛 心內總有妳形影\n袂放棄 永遠袂放棄 就算放開我負擔 踏過這土地\n\n台灣像母親 勇敢欸愛妳 愛就已證明\n美夢成真 太陽照著阮的心靈\n直到永遠 唱出我最真心的聲音\n這不是弄戲 來走找 夢中的土地 哦就是這朵花\n\n環境來造成 勇敢的囝兒序細揪鬥陣\n無願相信 這一切就安內消失 總有一日 欸凍唱出阮的歌兒\n堅持下去 來相挺 永遠袂放棄 哦\n台灣像母親 勇敢欸愛妳 愛就已證明\n美夢成真 太陽照著阮的心靈\n直到永遠 唱出我最真心的聲音\n這不是弄戲 來走找 夢中的土地 哦\n\n走找 回憶內總有舊相片的夢\n如今 飄落的梅花親像一場空",
	    "vote_count": 56,
	    "official_url": "https://www.facebook.com/dream6band",
	    "winners": false
	  },
	  {
	    "id": 148,
	    "title": "天公伯 ",
	    "track_id": 212748302,
	    "author_name": "詞：林泰佑（人人有功練）編曲：陳昶煬(藍窖音樂工作室)",
	    "desc": "拜拜是台灣人的習俗 有很多人會把想說的話 對神明訴說 而得到心裡上的一個安慰 對照 神明就像台灣領導人 如何讓信任建立在全台灣的人民上面 想表達台灣最基層的問題和聲音",
	    "lyrics": "他是一個有夢的少年家 \n他在外地讀書遇到很多問題 \n坐在教室裡面想暫時沒辦法改善 考慮要繼續讀書還是開始找工作 \n他問天公伯甘有別條出路 他有能力為了賺錢還是要出國 \n他想想後 放下他的理想 開始搖頭 未來濛濛潦潦 \n相對剛出社會找工作 顧慮就是三餐 找沒再找 \n若是 有工作快做 現在外面很競爭 \n他去應徵的時候說他工作很認真 拜託一下 \n清楚拼來拼去也是買不起都市的厝 看一下手錶 不知還要拼多久 \n天公伯請指示一條生路 弟子不求成功 只求顧到肚子 \n旁邊是一對新婚家庭 也在顧慮 小孩長大在什麼環境 \n現在空氣很差 經濟很慘 煩惱東煩惱西煩惱教育煩惱小孩甘會學壞 \n感覺無奈 我們大人都沒關係 天公伯請跟我們站同邊 \n保佑我們子女一點關心 弟子在這懇求 只要你有聽見 \n在這個社會 需要關係孤單老人 他的子女都外出 \n前年失去老伴 他孤單一人 將所有放下 \n每天都會走到門口等你回來叫他一聲 （母阿） \n每天對天公伯說 我會自己堅強 \n這樣才可以等到大家回來團圓日子所以眾神保庇子兒 身體健康 台灣萬事如意\n 口白（台語 蔡豐鞠 國語 朱阿美）\n我是一個台灣人請天公伯保佑 \n台灣所發生的每一件事情 \n每一次的考驗 跟今天的你 \n(客家話 涂詩璇)\n我是一個客家人請天公伯保佑 \n台灣所發生的每一件事情 \n每一次的考驗 跟今天的你 \n\n天公伯阿 你有沒有看到現在的狀況 \n請賜我們一點面對這個社會的力量 \n天公伯阿 畢業完退伍後開始面對壓力 \n若是這關不過的人要怎麼受到保庇 \n天公伯阿 我在這對天發誓 給我一個機會我會成為一個成功的人\n         (我會好好的把握 好好的打拼)\n天公伯阿 我是這片土地出生長大的小孩 \n請跟我一起站起來一起來保護美麗的台灣 保庇我們的台灣 \n(女聲 吳品萱)\n舉頭三尺有神明 遇到蝦米代誌都會對天求一個安心 \n求一個籤詩 想要跟神明講話 訴出自己的問題後 誠心擲筊 \n別怨歎自己出生底 走出身價 因為三分靠天公伯七分靠你自己站起來 \n對天發誓 你會對的起明天 不管你是誰 我們都是驕傲的台灣人 \n口白（原住民母語 高鍥莘Kalui ）\n我是一個原住民 請祖靈保佑 \n台灣所發生的每一件事情 \n每一次的考驗 跟今天的你",
	    "vote_count": 1777,
	    "official_url": "",
	    "winners": true
	  },
	  {
	    "id": 164,
	    "title": "頌台灣",
	    "track_id": 212748589,
	    "author_name": "洪立",
	    "desc": "前人走過的路，都成為我們的歷史。\n不論膚色黑白、不論先來後到，\n共同在這土地上生活而奮鬥的我們，都是臺灣人。\n這首歌結合了國語、台語、客語、原住民語，以及台灣的名勝名產和歷史。\n台灣頌 頌台灣。",
	    "lyrics": "詞：洪立、游家源、遲翔\n曲：洪立\n主唱：游家源\n編曲：吳思毅\n和聲編寫：張詠承\n和聲：游家源、陳采儀、遲翔、洪立\n混音師：張詠承\n\nA1.\n臺員北港東藩基隆山\n蓬萊鯤島瀛洲嘎高砂\n葡萄牙隨著風湧駛到這 伊工\nWhat A Beautiful Island, Formosa.\n\nA2.\n荷蘭在安平起了Zeelandia (熱蘭遮城)\n西班牙在淡水起了紅毛城\n日本為台灣留了鐵支路\n擱有阿嬤尚愛ㄟえんか（演歌）\n\nB.\n阮置這成家  阮置這打拼\n阮住這土地  阮巄係歹丸人\n\nC.\n那魯灣嘟伊呀那呀伊呀嘿 阮住在這個叫台灣的國家(客語)\n那魯灣嘟伊呀那呀伊呀嘿 我確確實實站在這土地上(客語)\n那魯灣嘟伊呀那呀伊呀嘿 阮住在這個叫台灣的國家\n那魯灣嘟伊呀那呀伊呀嘿 阮可以平平安安站在地上\n\nA3.\n碗糕滷味肉粽臭豆干(臭豆腐)\n雞排丟係愛配珍珠奶茶\n肉丸貢丸鴨賞豬血糕\n擱有阿公愛ㄟ米粉炒\n\nrap.\n我來到嘉義陪阿里山姑娘看日出\n台中高美溼地 花蓮太魯閣峽谷\n北港朝天宮 大甲鎮瀾宮\n跟著媽祖從行天宮走到外太空\n\n我來去宜蘭逛逛清水公園\n再跟美眉去北投陽明山泡溫泉\n新竹城隍廟 苗栗三義木雕\n元宵節戴安全帽體驗鹽水蜂炮\n\n我和朋友一起去南臺灣衝浪\n墾丁南灣沙灘上的風景只有棒\n聽綠島小夜曲  看蘭嶼飛魚季\n到台東和阿美族一起過豐年祭\n\n澎湖干貝小管花枝丸和仙人掌\n金門砲彈做成菜刀高粱配貢糖\n放天燈到平溪 吃海鮮到旗津\n漫步愛河再坐高鐵去逛101\n\n",
	    "vote_count": 1602,
	    "official_url": "https://www.facebook.com/introspa",
	    "winners": true
	  },
	  {
	    "id": 23,
	    "title": "金色太陽",
	    "track_id": 211101465,
	    "author_name": "林佑達",
	    "desc": "寫這首歌時，定位為一曲兩聲帶兩個版本，一剛一柔，陰陽並濟。\n隨著腦力退化，加上愈老愈龜毛，所以花了兩年時間，才在今年五月完成此歌曲。\n部分歌詞引用聖經詩篇二十三篇之內容，本歌曲是以詩歌的型態隱喻變天。\n百合花在基督信仰裡象徵清純、純潔。 野百合在台灣人眼中，象徵著自主性，\n\n反映台灣人民的草根性，在惡劣的環境下，依舊堅韌地綻放，又象徵自由和平與公義。\n詩篇二十三篇 : 耶和華是我的牧者．我必不至缺乏 。  \n他使我躺臥在青草地上、領我在可安歇的水邊 。  \n他使我的靈魂甦醒、為自己的名引導我走義路 。  \n我雖然行過死蔭的幽谷、也不怕遭害．因為你與我同在．你的杖、你的竿、都安慰我 。  \n在我敵人面前、你為我擺設筵席．你用油膏了我的頭、使我的福杯滿溢。  \n我一生 一世必有恩惠慈愛隨著我．我且要住在耶和華的殿中、直到永遠 。",
	    "lyrics": "行過遙遠的路途，來到水墘這片青草埔。一路有伊安慰看顧，才知伊是我的偎靠。\n是伊叫醒我的靈魂，引導我行義的路，雖然行過死蔭的山谷，我也毋驚受害毋驚受害。\n因為有你甲我同在，親像太陽總會出來。金色的太陽漸漸浮出地平線，\n照亮著黑暗的土地，溫暖著每個心肝， 金色的太陽慢慢行到天中央，\n寒冬過春風吹，野百合花滿山開。\n\n走過遙遠的路途，來到水邊這片青草地。一路有他安慰著我，才知他是我的依靠。\n是他甦醒我的靈魂，引導我走義的路，雖然行過死蔭的幽谷，我也不怕遭害不怕遭害。\n因為有你與我同在，就像太陽總會出來。金色的太陽漸漸浮出地平線，\n照亮著黑暗的大地，溫暖著每一顆心，金色的太陽慢慢爬到天空中，\n寒冬過春風吹，野百合花滿山開。",
	    "vote_count": 17,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 49,
	    "title": "台灣送",
	    "track_id": 211898794,
	    "author_name": "陳元冠",
	    "desc": "景氣不好,\n很多人為了利益而投入對岸的市場,\n商人都為了自身的金錢謀取\n卻不願意付出來改善台灣的低潮,\n嘴巴總是說愛台灣\n卻沒把她當作一個自己的家看待,\n\n小時候的教育\n書本說台灣有多麼的好\n美麗的福爾摩沙\n台灣經濟奇蹟\n我們有吃苦耐勞的傳統精神\n想不到一轉眼幾年過去\n笑貧不笑娼時代\n商人模糊焦點,媚俗靠外\n不敢大聲說自己的土地名字\n覺得非常的諷刺和悲哀",
	    "lyrics": "(a)\n佇立這個土地    她的名叫做台灣\n攬都是她的子    永遠的福爾摩沙阿\n沒人可以忘記    這裡有我們的傳統\n為了理想來辛苦打拼   才有今日這個寶島\n(b)\n常常有人說   國外有多大  文化有多高尚\n我坦白來說   我就愛這味  簡單的台灣慫\n(c)\n台灣送啦~~~台灣慫嘎~~ 這是攬ㄟ故鄉   每天望春風喔~~\n台灣送啦~~~台灣慫嘎~~ 這是美麗的土地  每年四季紅~~(x2)\n(bridge)\n賣擱底家貢~~在這沒希望  好好為她打拼 謀好嗎 ?\n賣擱底家嫌~~在這沒盼望  這是攬ㄟ國家阿~~~台灣郎.....\n(ending)\n這是攬ㄟ國家  攬的愛來好好為她打拼~~~啊~~~~\n這是攬ㄟ土地  攬的愛來好好為她疼惜~~~啊~~~~叫她的名~~~台灣!!!",
	    "vote_count": 409,
	    "official_url": "https://www.facebook.com/yuancuan.chen",
	    "winners": false
	  },
	  {
	    "id": 55,
	    "title": "南邊的風",
	    "track_id": 211898856,
	    "author_name": "張少瑜、戴世輔(詞)",
	    "desc": "世輔當初丟給我歌詞時，我就很喜歡他詞裡那個純樸、涼意十足的感覺，加上我在高雄唸書，對於「南邊的風」更是有感觸。西子灣那鹹鹹的風，就算是在市區裡也不疾不徐的步調，夜裡的高雄有種迷人的氣味與氛圍。南邊的風，不全然是大自然的風，也是這個城市的呼吸，如果問我這首歌最想傳達什麼樣的意念，我想說：「你走一趟高雄，感受到的就是了。」",
	    "lyrics": "這一刻 我們不要再說話\n靜靜地聽南邊的風歌唱\n有個微醺的老漁夫在娓娓道來\n一段浪花與貝殼的相愛\n這一刻 我們不要再說話\n靜靜地聽南邊的風歌唱\n樹梢的麻雀問我們何時要返鄉\n回到知了與孩子的捉迷藏\n總是專注於 往前\n追逐寒冷北邊那孤獨的尊嚴\n總是忽略了 從前\n痴痴守候落日和鹹鹹的海水\n總是專注於 往前\n西裝筆挺來往在利慾之間\n總是忽略了 從前\n赤著上身奔跑在田間鄉野\n\n這一刻 我們不要再說話\n靜靜地聽南邊的風歌唱\n街角的麵攤在聲聲地叫喚\n盛滿了一碗肉燥香的浪漫\n這一刻 我們不要再說話\n靜靜地聽南邊的風歌唱\n小巷裡最後一片凋謝的花瓣\n有少時和小情人共渡的燦爛\n\n總是專注於 往前\n沉溺於喧鬧街道 紅塵體驗\n總是忽略了 從前\n沉浸於閑適巷弄 綠柳岸邊\n總是專注於 往前\n嚮往著新新世界 新的改變\n總是忽略了 從前\n眷戀著舊舊唱盤 老的照片\n\n讓南邊的風把燈吹熄 把淚吹乾\n讓南邊的風把髮弄亂 把心填滿\n讓南邊的風把燈吹熄 把淚吹乾\n讓南邊的風把髮弄亂\n\n",
	    "vote_count": 488,
	    "official_url": "http://www.facebook.com/shaoyumuzik\n\n",
	    "winners": false
	  },
	  {
	    "id": 165,
	    "title": "土地的記憶",
	    "track_id": 212748606,
	    "author_name": "梅林槍Merlin Gun",
	    "desc": "二零一六年七、八年級生漸漸開始影響這個國家，我們對這片土地的記憶，有著和阿公阿嬤們完全不同的風貌。\n這是個迅速發展的社會，卻又不失純樸與傳統，記憶中的米香，兒時玩樂的風景，總是熱情的鄰居，充斥在我們成長的時代。 \n台灣融合了不同文化傳統和不同的意識型態，彼此包容成長，唯一相同的是我們都一樣靠著這片土地給我們的恩惠而活著，土地守護著我們走過這些年頭，我們也會記得台灣給我們的一切，互相陪伴然後繼續前進。",
	    "lyrics": "詞:童韋/曲:何政毅/編曲:梅林槍Merlin Gun\n\n咱　自細漢開始　\n就呷到這片　土地的稻米\n風吹過是　尚迷人的景緻\n\n猶擱欸記　隔壁的厝邊\n過年過節  互相恭喜\n來喝兩杯啦　這是台灣的熱情\n\n台灣的美麗啊　疼惜的土地啊\n溫柔得守護咱　擱繼續向前行\n台灣的美麗啊　疼惜的土地啊\n溫柔得守護咱　乎咱繼續向前行\n\n打拼的出外人　抱孫仔的  阿公阿嬤\n在第三號月台　思念的便當在那\n種田的阿伯仔　還有抓泥鰍的　猴死囝仔\n日頭若袂落山　趕緊返去呷飯休息啦\n\n不管是什麼人　不相同的文化\n雙腳踩土地　  咱攏佇這相伴\n不管是什麼人　不相同的文化\n雙腳踩土地　  咱攏佇這相伴\n\n台灣的美麗啊　疼惜的土地啊\n溫柔得守護咱　擱繼續向前行\n台灣的美麗啊　疼惜的土地啊\n溫柔得守護咱　乎咱繼續向前行\n\n台灣的美麗啊　疼惜的土地啊\n溫柔得守護咱　擱繼續向前行\n台灣的美麗啊　疼惜的土地啊\n溫柔得守護咱　乎咱繼續向前行\n\n我騎著VESPA　穿過霓虹閃爍　來到安靜的橋腳\n月娘跟我陪伴　夢到土地的記憶啊",
	    "vote_count": 1734,
	    "official_url": "https://www.facebook.com/merlingun",
	    "winners": true
	  },
	  {
	    "id": 15,
	    "title": "轉來key",
	    "track_id": 211101479,
	    "author_name": "嚴詠能",
	    "desc": "轉來key牽手路(country road)，期待透過從泥土生出來的台灣鄉村音樂(country road)，帶領大家「回到土地，重新長大」，轉來key，不只是一句口號，是行動，是重新打開故鄉美好的生命記憶，翻轉土地原生價值的契機，帶著當初離鄉阿爸交予的那隻key，交換智慧的汗水，豐富有機的人情味，用歌謠牽起不同世代人們的雙手，逗陣轉來key。\n",
	    "lyrics": "彼邊看過去      是南兮故鄉留乎你  \n金色兮稻海 伴著青春歌  遠遠撞到彼支山\n阿爸牽老牛 拖著命   土地公伯來放伴\n腳踏實地 流著汗     有一天欲傳乎我\n\n燕仔隨風 揚揚飛     借問欲飛去叨(哪)\n南邊有一個兮老土地  不時等你來奉茶\n            \n離鄉打拼赫濟年   上思念巷仔口兮彼碗麵  \n阿伯歕雞規 廟口罔下棋   香腸攤兮火炭味\n阿爸笑笑 甲阮求情       外面嘛沒卡快活     \n若有學出師 就要轉來去  南兮故鄉需要你 \n\n轉來key  轉來key故鄉兮記誌\n當初交乎你兮那支鎖匙     一直沒換 值等你\n轉來key   隨燕仔走找 南兮春天\n交換歲月兮汗水 豐富有機兮人情味 轉來key",
	    "vote_count": 3002,
	    "official_url": "https://www.facebook.com/profile.php?id=100000088952168",
	    "winners": true
	  },
	  {
	    "id": 45,
	    "title": "希望",
	    "track_id": 211898631,
	    "author_name": "FourKeys Band (劉薰博)",
	    "desc": "只要活著就有希望",
	    "lyrics": "月亮和地球之間共有多少的距離\n誰能告訴你 複雜的問題 說也不盡\n這個世界上擁有各種不同的表情\n為何會傷心 為何會哭泣 我分不清\n擦乾眼淚別害怕 \n前方的願望 別迷失 別再徬徨 別怕受傷\n現在開始 未來方向 有更多希望\n告訴自己我要如何堅強\n從今以後丟掉悲傷 找更多希望\n走向生命裡面 燦爛的陽光",
	    "vote_count": 72,
	    "official_url": "https://www.facebook.com/FourKeysBand",
	    "winners": false
	  },
	  {
	    "id": 57,
	    "title": "驕傲的太陽花",
	    "track_id": 211898876,
	    "author_name": "林育伶",
	    "desc": "去年，我們的學生為了自己的未來，為了公理與正義站出來，走上街頭，令人不捨卻非常的感到驕傲。希望年長一輩的我們不輸給年輕人，全力守護他們，讓太陽花可以全力迎向挑戰，迎向陽光。\n\n",
	    "lyrics": "窗外又擱開始在落雨\n想起著太陽花在沃雨\n天公伯啊你著來看顧\n阮的寶貝阮的太陽花\n嘸通將因打落土\n太陽花\n自因發芽咱用心栽培\n太陽花\n已經大欉在保護土地\n太陽花\n為著未來不要後悔\n咱的希望咱來守護\n乎咱驕傲的太陽花\n",
	    "vote_count": 254,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 41,
	    "title": "迎向天晴",
	    "track_id": 211594039,
	    "author_name": "陳金隆(T-rex)",
	    "desc": "讓社會大眾知道 改變對自己有多重要",
	    "lyrics": "我們就是句點 停下政治干戈\n讓孩子夜晚 安心騎著單車\n我們盼著 讓社會 不只有是非\n還有更多智慧 不管 藍的綠的\n男的女的 或他們承諾後\n卻又懶得理的\n當作這選擇 為我們未來投資\n爲給我們理由 向前衝刺\n劃破那些謊言的捉弄\n不管改變是否多痛\n為了拎 搵決定咩唱到燒聲\n金山銀山他們站在頂端\n我們只想\n保存人文景觀 維護自然景觀\n幫助 台灣一起面對極端的天氣\n這次選擇 改變 那就是天意\nHey boy 讓我們向前行\nHey girl  讓我們迎向天晴\nAhy yo.   不管前方的艱辛\nAhy oh 這次我們一起前進\n生重病的島國需要醫師\n不是說謊的祭師\n這時代確實有點失敗\n做事的不實在 講話卻很厲害\n別再信服包著糖衣的謊言\n讓我們當劃破黑暗的那道光線\n當福爾摩沙 自由被謀殺\n我們得像自由女神點燃 象徵自由的火光\n讓不久以後 不再用文件踢著皮球\n讓弱勢不用 透過媒體向社會乞求\n民主的皮膚 包住獨裁政權\n我們別再輕易信服 相信你我都很清楚\n讓飢餓的人 還能吃著麵包披上\n棉襖渡過景氣寒冬 \nHey boy 讓我們向前行\nHey girl  讓我們迎向天晴\nAhy yo.   不管前方的艱辛\nAhy oh 這次我們一起前進",
	    "vote_count": 110,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 74,
	    "title": "一心",
	    "track_id": 212071777,
	    "author_name": "高雄阿文",
	    "desc": "2014年8月1日, 高雄發生不幸的氣爆事件, 而且氣爆最嚴重的災區就發生在一心路.\n高雄市極具代表性的主要道路 (一心,二聖,三多,四維,五福,六合,七賢,八德,九如,十全), 剛好就從一心路開始, 對於在一心路長大的我來說, 在電視上看到故鄉熟悉的道路一夜之間變成災難現場, 真的是百感交集. 人在北部工作的我, 在腦海裡浮現高雄每條道路陪伴我兒時到求學的許多回憶.\n寫下了這首歌”一心”, 獻給我永遠的故鄉高雄, 因為氣爆雖然暫時摧毀了一心路, 但也因為高雄市民的團結一心, 才能重建高雄這個美麗的港都",
	    "lyrics": "一心路 是阮大漢的所在\n二聖路 期待阿母送來的便當\n三多路 阿公阿媽嗲叫\n四維路 老師對阮上好\n五福路 鬥陣來去大統百貨\n六合路 好食的牛排毋免兩百元\n七賢路 嘎愛人去愛河\n八德路 追車頭離開故鄉\n\n我思念的港都 阮的夢\n哪會變這款 變做這款\n嘎阮熟識的無同\n看嘎心酸 心痛你甘會知影\n行過的路 一暝來變成空\n\n我思念的港都 阮的夢\n總有一天 有彼一天\n大船會咯再起帆\n海湧無論多大 咱攏毋嗲驚\n位前鎮到左營 追小港到鼓山\n咱手牽手 追頭打拼\n\n為著高雄阮愛的人",
	    "vote_count": 46,
	    "official_url": "https://youtu.be/u7yLsfbeXAY",
	    "winners": false
	  },
	  {
	    "id": 138,
	    "title": "Can rock'n'roll change the world",
	    "track_id": 212634878,
	    "author_name": "黃昺翔",
	    "desc": "當天災、人禍都降臨的時候，我們要團結，有錢出錢，有力出力，彼此同心面對困難。\n捨棄謾罵，拋開對立，別讓寶島變成了鬼島，福爾摩沙需要我們齊心協力地振作！\n",
	    "lyrics": "Verse1\n滿目瘡痍的時代 無盡天災又人害\n該怎麼作 提醒你們 世界其實還有愛\n\n捷運殺人的小孩 各地氣爆的意外\n連飛機都 掉了下來 天理又何在\n\nVerse2\n高聳佇立的山脈 環顧四面的大海\n我只想要 提醒你們 這片土地還有愛\n\n骯臟的錢收進口袋 吸毒的藝人被公開\n國家機密 都被出賣 人民該怎麼看待\n\nVerse3\n試問自己能 做什麼\n玩音樂 難道只為討生活\n當你 心寒 心碎 心痛\n請聽我唱 一首\n\nChorus\nCan Rock’n’Roll   Change the world\nI can sing this all life long\n如果你有感動 請擦乾淚水抬頭挺胸\n\nRock’n’Roll will Change the world\nYou can let it all be gone\n露出你的笑容 福爾摩沙 請你振作\n",
	    "vote_count": 334,
	    "official_url": "https://www.facebook.com/Hsiang1212?fref=ts",
	    "winners": false
	  },
	  {
	    "id": 172,
	    "title": "台灣尚美麗",
	    "track_id": 212796159,
	    "author_name": "石文章",
	    "desc": "為生我育我的土地留下一項感恩的頌讚，土地的情感尚親，是一生最值得珍惜的寶貝。",
	    "lyrics": "海洋的島嶼  有一片美麗的好土地\n山坪的所在  開著熱情的百合花\n行過淡水河  潦過濁水溪 願用阮真情 呷你行同儕\n台灣尚美麗  玉山的雲隨風飛 它是 咱祖先 為咱傳下來的香火\n面向大海洋  心不怕憂愁 因為你甲我 同心相依偎\n台灣尚美麗  雪山的雪伴圓月 它是 咱的 島嶼子孫傳四界\n台灣尚水  島嶼子孫傳四界",
	    "vote_count": 30,
	    "official_url": "https://www.facebook.com/davstone",
	    "winners": false
	  },
	  {
	    "id": 97,
	    "title": "蛻變的東亞孤兒",
	    "track_id": 212447882,
	    "author_name": "詞曲: 余維泰 演唱: 許成名",
	    "desc": "這首歌以悲愁風格貫穿全曲，但歌曲最後點出，台灣應走出歷史悲情，開創出屬於我們的未來。\n\n歌詞前段，描述台灣先民對於朝代更迭無可奈何的悲愁，創作者並未局限特定時代或族裔，凡舉清末割讓、日治時代、第二次世界大戰、國民政府來台初期等不同階段的台灣人蒙受的苦難皆包含在內。而今時代已變遷，台灣人民可以主宰自己的命運，族群對立的時空背景也不復存在，這些苦難悲愁是台灣人共同的記憶，成為深化民族性的力量。\n\n註記: 歌詞引用「鳥不語花不香」典故，反映甲午戰後，清廷對於台灣棄之不足惜的論調。據傳此語出自李鴻章的奏摺，但此說法欠缺第一手史料佐證。",
	    "lyrics": "花自飄零水自流，牽繫歷史，走過傷痛，經歷民族認同，曾經憔悴沐風。\n\n朝來寒雨晚來風，枝葉婆娑，夜長空，先人孤寂誰懂，無盡寒冬悲秋。\n\n而今解放悲情，台灣是我的故鄉，東亞島嶼，美麗之地，鳥不語花不香多受傷。\n愁已盡，悠天長，無窮希望，未來等待我們開創，縱使愁緒猶在，悲情釋懷，千回思想過。\n\n而今解放悲情，台灣是我的故鄉，東亞島嶼，美麗之地，鳥不語花不香多受傷。\n愁已盡，悠天長，無窮希望，未來等待我們開創，縱使愁緒猶在，悲情釋懷，千回思想過。",
	    "vote_count": 336,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 85,
	    "title": "草地踏實",
	    "track_id": 212447800,
	    "author_name": "阿立",
	    "desc": "曾經年輕的我們，已經在這片土地奮鬥了三十個年頭，不管曾經赤腳走過多少尖石碎路，\n已經多少次流血再結痂；如今能有機會可以讓我們的下一代，再一次站在溫暖的綠色草地下奮鬥，不能再一次放棄改變的機會!\n盼望這一次機會，能像那一片綠色守護著台灣的山，永遠駐立在那，默默的照顧著赤腳打拼的人民!\n\n",
	    "lyrics": "阮走在這片草地  心裡堅定的想要改變\n日頭赤燄在曬    腳底還是感覺很鬆適\n\n牽著阮的心肝寶貝  心裡堅定他的未來會好好去飛\n咱堅定盼望   把握進步的機會\n\n南方  青色的山陪阮堅苦過\n田中  田梗的草讓我腳踏實地\n\n妳的面容  阮相信把握就是咱的\n這片草地  讓我們完整的交給細小\n\n您走在這片草地  阮心裡堅定想要改變\n日頭赤燄在曬    交給阮來照顧這片土地\n\n牽著您的心肝寶貝  心裡堅定未來一定好好去飛\n阮堅定盼望   創作進步的機會\n\n南方  青色的山陪咱作伙\n田中  田梗的路讓咱腳踏實地\n看到您的面容  阮相信把握就是咱的\n這片草地  讓阮來照顧  完整的還呼阮的細小",
	    "vote_count": 1617,
	    "official_url": "https://www.facebook.com/zion.lion.5895",
	    "winners": true
	  },
	  {
	    "id": 51,
	    "title": "阮兜於此 (我家在此) Guan-tau Ti Chia.",
	    "track_id": 211898814,
	    "author_name": "Joshua Kasin Tin (田台仁)",
	    "desc": "如歌詞",
	    "lyrics": "先祖，甭驚干苦，為著前途，\n勇敢，突破黑暗，離開悲慘，\n腳步，贏過風雨，走出活路，\n歡呼，找著甘露，建新鄉土。\n\n大海，有一所在，若仙界，\n有山，閣有溫泉，物資足滿。 \n日光，遍照田園，\n入秋，種作豐收，\n(1)此好，世間的寶，美麗島。\n(2)居腳，阮兜於此，福摹莎。",
	    "vote_count": 16,
	    "official_url": "http://ajin2050.blogspot.ca/",
	    "winners": false
	  },
	  {
	    "id": 93,
	    "title": "未知、奔跑、迷失，退後一步就能看清方向",
	    "track_id": 212447858,
	    "author_name": "Beware the sky falling\n 天空__樂園   樂團",
	    "desc": "樂團簡介：\n像天空一般自由，像樂園般的無拘無束\n沒有歌詞，沒有主唱。我們選擇用肢體去完成內心的旋律\n來自台灣的後搖滾樂團\n我們是Beware the sky falling\n---\n創作理念：\n「未知、奔跑、迷失，後退一步就能看清方向」\n迷惘，彷彿就是我們這個世代的惶恐，一種對未來的充滿「未知」的哀愁。如同佇足在一個充滿迷霧的島，越是竭盡所能，用力地盲目「奔跑」，越是「迷失」在濃霧之中，遍體鱗傷。\n“該往哪個方向？”我們總是呢喃著，撫摸著，彼此依偎的臉龐，在我們深愛的土地上，眺望著看不清的遠方，猜測著迷霧散開的模樣。\n但未來不該只停留在我們猜測中的想像，不是嗎？\n只要勇於改變，往後一步，把揮之不去的迷惘拋開，把尖銳的成見拋下，用愛為前提去突破、去尋找，我想我們會知道，霧散去之後有光的地方，在哪個方向。\n\n",
	    "lyrics": "",
	    "vote_count": 164,
	    "official_url": "http://www.facebook.com/bewaretheskyfalling\n\n",
	    "winners": false
	  },
	  {
	    "id": 162,
	    "title": "希望",
	    "track_id": 212748556,
	    "author_name": "詞：謝依玲,丁天牧 曲/編曲/演唱：謝依玲,丁天牧",
	    "desc": "這次的創作概念為『希望』\n台灣是一座非常美麗的寶島，\n我們共同生活在這片土地上，\n代代相傳；\n\n我們一起努力的打拼著，\n雖然路途上會遇到困難艱辛，\n但卻依然有著堅忍不拔的毅力，\n象徵著我們台灣人的精神，\n逆風著往前邁進。\n\n我們懷抱著希望，更有盼望，\n加上我們的齊心努力，\n一起打造一個屬於所有人民和後代子孫這片美麗的土地。",
	    "lyrics": "A1\n抬起頭 看見一片蔚藍天空\n海鷗們  飛翔在海岸的盡頭\n有希望 就更有勇氣去翱翔\n不怕未來的路 會失去方向\nA2\n我們的 這片土地如此美麗 \n想一起 創造不一樣的奇蹟\n用微笑 一起打敗所有的陰影\n有你有我在一起 就有信心\nＢ\n有你有我就有希望 \n用愛蓋起一座城堡\n不管颳風下雨 我的熱情不被澆熄\n只要我們能夠在一起努力\nC\n希望 跟著我們飛翔\n就算 用盡全力 也要奮鬥到底\n希望 跟著我們前進\n一起大步大步的\n一起奮不顧身的 邁進",
	    "vote_count": 422,
	    "official_url": "https: www.facebook.com/elsa.Le.soleil7",
	    "winners": false
	  },
	  {
	    "id": 14,
	    "title": "旗山印象",
	    "track_id": 211101481,
	    "author_name": "湯茗富",
	    "desc": "這首歌是2013年年底，在高雄旗美地區反核會議上的發想。我在這首歌裡寫盡我印象中旗山的美好，主要是爺爺小時帶我到處玩賞的經驗，但願這樣的風景永遠不變。",
	    "lyrics": "天未光的菜市仔，有鬧熱的叫賣聲，\n媽祖廟的廟埕，那欉老榕仔下。\n過午的西北雨，趕人躲亭仔腳。\n尾晚的老街內，攏是煮吃香。\n　\n小漢的印象，一直攏會記。\n人雖然不相同，同款的人情味。\n就是這片土地，陪伴我塊站起， \n親像是我的父母，那麼地親。\n　\n有一天啊~有一天\n故鄉的景色咁會不相同？ \n有一天啊~有一天\n故鄉的美麗就要永遠。\n　\n　\n旗尾山的日頭高，要看就疲澎喘， \n山下的溪埔田，滿滿的香蕉欉， \n溪水是肖大港，躲護岸卡穩當， \n甘蔗的火車路，載去大煙筒。\n　\n小漢的印象，一直攏會記。\n人雖然不相同，同款的人情味。\n就是這片土地，陪伴我塊站起，\n親像是我的父母，那麼地親。\n　\n有一天啊~有一天\n我的心、我的夢攏同款。\n有一天啊~有一天\n守護我的回憶甲希望。\n故鄉的美麗就要永遠。\n我的心、我的夢攏同款。",
	    "vote_count": 349,
	    "official_url": "https://www.facebook.com/tangmf",
	    "winners": false
	  },
	  {
	    "id": 129,
	    "title": "台灣美樂之地",
	    "track_id": 212586711,
	    "author_name": "Jeng Wei ",
	    "desc": "本歌曲係以客家話為主的選舉民謠。最適用於桃、竹、苗三縣造勢大會帶動唱使用。本歌曲鼓勵年青選民回家鄉協助長輩要把選票如何正確地投給小英。 強調只有小英成為2016年總統才能看見台灣的遠景--重視環保，風景美麗，人民生活在和平、自由、民主的快樂地。",
	    "lyrics": "正月裡來啊是啊是新年\n曰頭出來當好天\n買好車票啊轉啊轉屋下\n總統選舉要選好   小英  \n正會 台湾美樂地     (除了小英用國語，以上用客家話唱)\n台湾美樂地 (用台語唱)\n台湾美樂地 (用國語唱)\nTaiwan, Melody(用英語唱)\n\n",
	    "vote_count": 30,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 12,
	    "title": "愛不夠用",
	    "track_id": 211101483,
	    "author_name": "許偌珩",
	    "desc": "",
	    "lyrics": "細漢的時陣 我以為只有\n父母通愛 兄弟來愛\n大漢啊時陣 以為只有伊來愛\n\n擱大漢的時陣 \n才知影阮的愛不夠用\n\n愛這片土地 愛身邊的人\n愛台灣的孩仔跟大人\n啊是要怎麼辦 \n阮的愛實在不夠用\n\n放蕩的青春 我以為只有\n遊山玩水 談情說愛\n\n社會啊打拼 賺的錢攏不夠用\n懵懂啊的少年 \n才知影青春嘛不夠用\n\n愛這片土地 愛身邊的人\n愛台灣的孩仔跟大人\n啊是要怎麼辦 \n阮的愛實在不夠用",
	    "vote_count": 18,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 78,
	    "title": "美人魚",
	    "track_id": 212447709,
	    "author_name": "曲：莊太乙 詞：陳素月",
	    "desc": "台灣四面環海，就好比是海上的美人魚。海洋意象藉由熱情的曲風傳遞活潑的趣味元素。豐富的海洋資源是上天賜予台灣這海洋國家最好的天然禮物。稚嫩純真的童謠是此曲的獨特處。",
	    "lyrics": "海風吹，海湧起，海天相連千萬里。\n白雲牽手頭頂過，魚蝦相招來過暝。\n藍色的大海是阮的搖笱（籃），搖來搖去過了年年。\n阮青色的魚鱗，閃閃爍爍，FORMOSA就是阮的名字。\n海鳥、海豚不時笑呵呵，海鯨相爭做阮的囝婿。\n在遠遠的所在，甘有看見，阮是海上的美人魚。\n溫柔的大海是阮的搖笱（籃），給阮安穩富裕年年。\n阮青色的魚鱗，閃閃爍爍，FORMOSA 就是阮的名字。\n花枝、小卷相愛勾勾纏，毛蟹、蟳仔古錐又趣味。\n漁船來來去去，甘有聽見，阮唱著迷人的歌詩。\n海風吹，海湧起，海天相連千萬里。\n白雲牽手頭頂過，魚蝦相招來過暝。\n開闊的大海是阮的搖笱（籃），自由的夢若春風微微。\n阮青色的魚鱗，閃閃爍爍，FORMOSA 就是阮的名字。",
	    "vote_count": 45,
	    "official_url": "https://www.facebook.com/terrycycu",
	    "winners": false
	  },
	  {
	    "id": 90,
	    "title": "太陽光",
	    "track_id": 212447844,
	    "author_name": "賴昱瑋(艾爾)",
	    "desc": "記得問過高雄的朋友 “你覺得什麼可以代表高雄?” 大多都會說”太陽” ,這首歌創作於高雄氣爆發生之後, 想以太陽光的正向, 陪伴大家一起走下去,不管前方再怎麼艱苦, 都要忍耐, 曬著陽光, 走出屬與我們共同的路!",
	    "lyrics": "夏天中午作伙出去 街路有夠曬日\n海產攤口的港邊 咱同齊看海景\n吃飽出發來去海邊 一直是好天\n大船準備出航來去 咱麻做好代誌\n太陽光照在咱的身軀頂\n把心裏晚暝全攏放忘記\n日頭照著沙溫暖咱的心\n我會永遠陪妳 繼續走下去\n太陽光照在咱的身軀頂\n就算艱苦嘜要忍耐堅持\n流汗為咱家來過好日子\n咱互相扶持 放下傷悲 走下去",
	    "vote_count": 52,
	    "official_url": "https://www.facebook.com/luckyair777 ",
	    "winners": false
	  },
	  {
	    "id": 140,
	    "title": "細漢的囡仔",
	    "track_id": 212634950,
	    "author_name": "卓佳寧",
	    "desc": "喜愛創作的我\n曾經為了自己的夢想 理想 離開了最熟悉的地方 最溫暖的家園\n曾經因著理想而迷失了自己 忘了自己存在的價值\n每當迷失了道路 平心 且閉上雙眼 將會看見眼前為你預備的光 \n找回最初衷 那份熱情 那位天真的自己\n",
	    "lyrics": "寂靜的夜裡 純淨的聲音 總是在黑暗中想念家鄉的甜\n心中惦記著 回首著 憶起家中門前的花園\n綠油油的一片 好快樂\n\n這樣的夜裡 卸下了防備 想寫一首歌表達我感覺\n明明表面上是和樂的 為何我卻那麼落寞\n下一站是否 屬於我的自由\n\n我用我的雙手展翅飛翔 寫下未曾完成的理想\n不管路有多坎坷 我還是要繼續闖 不管前方有著黑暗力量\n我用我的雙手擁抱前方 儘管路上有很多磨難\n享受片刻的溫暖 準備全副武裝\n回到初衷 最真實的他\n\n這樣的夜裡 顯得好孤寂 想整理思緒回到你身邊\n明明喜樂和傷悲 沒有交叉點 此刻的我卻伪裝的那麼累\n\n我用我的雙手展翅飛翔 寫下未曾到達的夢想\n不管路有多坎坷 我還是要繼續闖 不管前方有未知的力量\n我用我的雙手擁抱前方 保留自己最天真的模樣\n未來有無限可能 等著我去發光\n回到最初 細漢的囡仔\n\n我用我的雙手展翅飛翔 紀錄著每一刻的篇章\n一路跌跌撞撞我還是要繼續闖 不管前方有未知的力量\n我用我的雙手擁抱前方 保留自己最天真的模樣\n未來有無限可能 等著我去發光\n回到最初 細漢的囡仔\n回去細漢的我 快樂的囡仔\n",
	    "vote_count": 1407,
	    "official_url": "https://www.facebook.com/jing.zwo",
	    "winners": true
	  },
	  {
	    "id": 142,
	    "title": "我只是用耳朵聽",
	    "track_id": 212634986,
	    "author_name": "王俊傑(詞/曲)",
	    "desc": "以一個視障者的角度，寫一個視障者面對未來心中的願景。所以歌詞的每一字每一句，都是許多視障朋友對自己生活最簡單的期待。所以我覺得在小英的合輯裡面，有弱勢族群的聲音，它就代表著一種態度。",
	    "lyrics": "期待過車路的時   我都毋免驚\n期待每一個青紅燈 攏有聲音來提醒我\n我總是用耳朵聽   靠聲音過生活\n用聲音來分別     世界的色彩是安怎\n\n期待銀行開戶的時  麥為難我\n期待跟我同款的囝仔 讀冊也當卡快活\n我一直用耳朵聽  靠聲音過生活\n用聲音來了解    喜怒哀樂的感覺\n\n我總是認真啊聽   認真啊聽\n聽四周八圍       不同款的聲\n我總是認真啊聽   認真啊聽\n聽這個世界不斷的變化\n\n我一直認真在聽   認真在聽\n聽溫暖的聲、聽歡喜的聲\n聽土地甲我講伊ㄟ心情\n",
	    "vote_count": 606,
	    "official_url": "https://www.facebook.com/profile.php?id=100000338245411",
	    "winners": false
	  },
	  {
	    "id": 106,
	    "title": "袂轉去",
	    "track_id": 212469451,
	    "author_name": "李尚謙",
	    "desc": "希望藉由音樂來讓大家回味台南之際，不論是好的或壞的，對於攸關在這塊土地上的人們相關的議題，例如對於科技廠招商政策之下以及近幾年城市形象塑造成功而漸漸帶來的人口擁擠問題，以及便利化、快速化的交通建設真的是適合府城的嗎? 這些在新舊時代過渡的關鍵時期尤其需要更多人的深入討論。一項建設或政策除了不應該黑箱進行，也必須能廣泛地照顧到市民的基本福祉，如此才稱得上是民主聖地。",
	    "lyrics": "台南\n已漸漸變成繁華欸城市  古厝留在那 甘賀啦\n愛小心麥打擾到 住幾百年欸眾神\n想起細漢時 鐵枝路就佇阮兠頭前\n甘蔗葉仔落一片\n今馬攏罵係點仔膠\n種田欸阿公阿嬤 滿懷欸感恩\n改變了   係咱做無仝欸夢\n老厝改成咖啡廳  \n台灣欸京都  有人安捏叫伊\n\n你好嗎   你好嗎\n雖然說我很久沒回來陪你\n過年節欸時陣  攏嘛塞車塞不停\n外地人是真愛吃這味\n咖慢咧   咖慢擱咖慢一些啊\n無定著是注定    歡喜來交陪\n地下化欸鐵路    是市民向望欸\n大發展   咁有影福氣啦\n你好嗎   你好嗎\n思念這麼多在地路邊攤\n巷仔口逛過去 相識欸\n豆菜麵 包一碗\n要去哪   要去哪\n有人曾說過\n遮係一塊適合人來作夢、作息、談戀愛、結婚、過生活的土地\n\n",
	    "vote_count": 154,
	    "official_url": "http://streetvoice.com/postwild20/",
	    "winners": false
	  },
	  {
	    "id": 103,
	    "title": "未來在手頭\n\n",
	    "track_id": 212448271,
	    "author_name": "田水牛",
	    "desc": "<藍><綠>堅硬派是台灣很大的問題，作者感恩畫出這樣的天然色彩!也期待【幼童唱兒歌、少年Papago、青年舞春風、老人展千帆!】的桃花源，故一開始就設計「華台雙語歌詞」，也期待再錄「客語版」。\n\n「進取冒險」、「改變框架」、「自信堅定」取自小英的演講主題，為方便「更換、呼口號」，以口白呈現。\n\n台灣的「視野寬度」、「人文深度」、「命運溫度」…未來在手頭!\n\n",
	    "lyrics": "(A1)\n美麗的島嶼Formosa，有太平洋的綠，\n有台灣海峽、巴士海峽、深情的藍。\n(B)\n台灣的視野有寬度，(進取冒險)未來在手頭；\n台灣的人文有深度，(改變框架)未來在手頭；\n台灣的命運有溫度，(自信堅定)未來在手頭；\n(A2)\n幼童唱兒歌，少年Papago，青年舞春風，\n阿嬤阿公無憂無愁，展千帆!\n快樂希望台灣人!快樂希望台灣人!用心展千帆!\n\n",
	    "vote_count": 22,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 102,
	    "title": "觀音月娘\n",
	    "track_id": 212448237,
	    "author_name": "玉蘭花",
	    "desc": "台灣多數人拜「觀音」，各地皆有「觀音廟」與「觀音山」，非常值得寫真成歌!山頭除了知名的台北八里、高雄大社之外，還有苗栗南庄、台中北屯、台中豐原、南投中寮、南投南投、南投埔里、雲林斗六、雲林古坑、嘉義梅山、台南龍崎、台南楠西、花蓮玉里……。\n\n作者學生時代，並不熟悉Formosa的歷史地理，今祈求每個人都能建立台灣文化的自尊心!\n\n",
	    "lyrics": "(A1)\n觀音山的月娘，招呼天星，來來來𨑨迌。\n澎湖島嶼媽祖，飛來寶島(客)招呼各地義民爺來唱<水神介歌>\n白鷺鷥飛高高，烏鶖啾啾啾，芋仔、蕃薯、荔枝、水蜜桃。\n啊---!有夢最美﹗有夢上美﹗永遠袂放無!\n(B)\n不知影Formosa有幾歲，只知影台灣是勇敢的爸爸!\n不知影Formosa有多好，只知影台灣是慈祥的媽媽!\n不知影Formosa偌美麗，只知影兒童是未來的太陽花!\n不知影Formosa偌康健，只知影少年是未來的大勇咖!\n(A2)\n阿里山的雲海，招呼日月潭，來來來𨑨迌。\n(華)熱情的原住民，那魯灣呀呵(客)招呼Hakka人來唱<祖公介山歌>。\n祈求清氣的水質及空氣，祈求安全的食品及交通。\n啊---!祈求建立自尊心的文化，\n祈求建立台灣自尊心的文化!\n\n",
	    "vote_count": 30,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 155,
	    "title": "未來列車",
	    "track_id": 212748427,
	    "author_name": "說書人",
	    "desc": "一頭來自未來的列車，即將帶著大家離開這個鬼地方，駛向更光明的未來！",
	    "lyrics": "hey   don't stand and wait\n別站在那 一副事不關己\nhey   don't be afraid \n這班車 開向未來\n\nand i'll   hold ur hand\n不管 天有多黑 路有多遠\noh   let's be brave\n這是我們的新世界\n\n火車行到伊都阿末伊都丟 \n伊都阿末伊都丟\n伊都阿末伊都丟 哺哺\n\n火車行到伊都阿末伊都丟 \n伊都阿末伊都丟\n哎喲 磅坑內",
	    "vote_count": 31,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 136,
	    "title": "台灣 台灣 FORMOSA",
	    "track_id": 212634708,
	    "author_name": "海產攤 Q 桑",
	    "desc": "美麗之島，婆娑之洋，我們得天獨厚，在此生長。\n\n希望島嶼上的人們，大家團結和諧，共同努力迎向未來。\n\n因為我覺得最能代表台灣的一首歌，是羅大佑的“亞細亞的孤兒”，而這首“台灣 台灣 FORMOSA”在創作的時候， 除了想要延續“亞細亞的孤兒”三拍子的節奏之外，還希望用小女生純真的聲音來演唱，象徵告別悲情，重生之後的新台灣。\n\n希望我們台灣人能夠勇敢向前看，勇敢走出去，在世界上，能夠成為重要的一股力量。\n",
	    "lyrics": "恩介玉山 盡高有四千公尺 還有盡靚盡靚介太平洋\n水果好吃 米飯好吃 台灣介茶 世界有名   台灣 台灣 FORMOSA\n\n恩介祖先 千百年生活佇這 堵到大風大雨抑唔驚\n一代一代 流傳下來 正有今日 恩介寶島   台灣 台灣 FORMOSA\n\n時代進步 大家冇共樣介想法 應該愛知 恩就一個台灣\n唔盼得國家介建設 停到一半 冤家畀背嘛冇格煞\n\n這有漢人 新住民同原住民啊 團結起來不分族群\n行出一條 自家介路 愛分全世界都知   台灣 台灣 FORMOSA\n台灣 台灣 FORMOSA\n\n\n(中譯)\n我們的玉山 最高有四千公尺 還有最美最美的太平洋\n水果好吃 米飯好吃 台灣的茶 世界有名   台灣 台灣 FORMOSA\n\n我們的祖先 千百年生活在這 遇到大風大雨也不怕\n一代一代 流傳下來 才有今日 我們的寶島   台灣 台灣 FORMOSA\n\n時代進步 大家不一樣的想法 應該要知道 我們就只有一個台灣\n捨不得國家的建設 停到一半 吵來吵去也不是辦法\n\n這有漢人 新住民跟原住民啊 團結起來不分族群\n走出一條 自己的路 要讓全世界都知道   台灣 台灣 FORMOSA\n台灣 台灣 FORMOSA\n",
	    "vote_count": 39,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 48,
	    "title": "台灣才是咱的名 ",
	    "track_id": 211898757,
	    "author_name": "温進益",
	    "desc": "台灣是我們寶貝的家，揮汗打拚為了生活，希望明天台灣會更好，\n台灣是我們唯一的根，用生命捍衛的家鄉，希望台灣能成為 進步、民主獨立、團結的寶島。\n\n",
	    "lyrics": "咱是台灣的子弟 咱是台灣的命脈 \n大家手牽手來護著這塊地 犧牲生命也是無關係\n\n台灣才是咱的名 民主改革好名聲 \n經濟若進步啊人人有頭路 家庭和樂大家沒甘苦 \n\n拿出咱的手 擦著咱的汗 打拚是為著台灣名\n拿出咱的信心 創造著台灣奇蹟 \n美麗的寶島 永遠永遠是世界第一好\n\n",
	    "vote_count": 741,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 80,
	    "title": "阿爸的歌詩",
	    "track_id": 212447729,
	    "author_name": "詞&曲：楊欣燁 / 編唱：張詩",
	    "desc": "幾年前日本的福島事件，讓國人深刻了解環境對人類永續發展的重要性，藉由這首歌喚醒我們對環保的重視。",
	    "lyrics": "天清月當圓 相招散步十五暝   我牽著伊的手 阮一路唸歌詩\n行到田岸邊 天然樂章合奏想起 親像置祝福阮的愛 千千萬萬年\nRAP:\n天頂月娘月娘伴天星 樹頭樹頭鳥ㄚ相爭啼 春風吹送吹送戀愛夢 連土地公仔嘛笑咪咪\n田頭田頭稻子花香味 浚溝浚溝魚蝦滿滿是 稻埕火金姑閃爍爍 田尾水雞唱佳尚歡喜\n\n細漢阿爸的歌詩 唱伊青春少年時  時間經過這多年 聽起來也是這趣味\n細漢阿爸的歌詩 唱伊古早好天年  阿爸彼時鄉土味 今嘛已經叨位去  阿爸的歌詩",
	    "vote_count": 437,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 89,
	    "title": "小海龜",
	    "track_id": 212447834,
	    "author_name": "賴昱瑋(艾爾)",
	    "desc": "在我望著龜山島的時候, 一望無際的大海讓我有著無限想像, 海龜慢慢的爬,終能爬到海邊由出去, 我們追逐夢想不就也是堅持下去, 往前方發現無限的可能! 這首小海龜是首勵志正向的歌曲, 寫著宜蘭龜山島及我所看見宜蘭夏天的歡樂!",
	    "lyrics": "麻雀在田裡打瞌睡 遠方海上有隻海龜\n依舊在烏石港划水 揮灑吧青春的汗水\n火車經過太平洋海邊 陽光照醒我懶懶雙眼\n依舊是那蘭陽平原 總是跟溪水說再見\n背後家園 讓我扛在雙肩\n走在崎嶇路上一直往前\n我是一隻小海龜 慢慢爬向藍藍海邊\n沒有翅膀可以飛 但有恆心來跟隨\n就算旁邊有人笑 要我放棄這條 \n看似孤單的路而後退\n我仍堅持爬向前 當一隻小海龜",
	    "vote_count": 92,
	    "official_url": "https://www.facebook.com/luckyair777 ",
	    "winners": false
	  },
	  {
	    "id": 141,
	    "title": "恬靜的海洋",
	    "track_id": 212634966,
	    "author_name": "最．夢生",
	    "desc": "描寫 在 台灣東北角 夜遊 的 風光",
	    "lyrics": "今夜的風  淡薄仔寒\n今夜的妳  佇我身邊\n今夜的月娘\n懸懸掛佇天頂\n路邊的路燈\n照著咱~欲去的方向\n\n\n敢講是夜傷寂寞\n敢講是海傷過闊\n今夜的咱\n話攏無濟\n靜靜佇遮啊\n看向彼片恬靜的海洋\n\n\n遐 有漁船        耀光著海洋\n這 有妳佮草仔的芳味\n恬靜時陣 今有 海的聲音\n佇  海風之中  妳的目睭真正迷人\n\n\n妳講妳佮意這款的夜\n微微的風  哀愁的月\n想欲佇遮  佗位也毋去\n我想我佮意這款的妳\n善良的心  媠媠的面\n\n真佮意和妳作伙\n敢閣會使  敢閣\n會使…..\n佮妳作伙  佮妳作伙…..\n浸佇這片恬靜的海洋\n",
	    "vote_count": 132,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 98,
	    "title": "可愛台灣(台語)",
	    "track_id": 212447889,
	    "author_name": "詞：泰哥 曲/演唱：鄭維宸",
	    "desc": "希望生長在台灣的每個人，和平相處，共同努力，走向世界和未來。",
	    "lyrics": "美麗的島嶼，為咱阻擋所有的風雨。堅強不驚人欺負，惦惦來付出，親像偉大的阿母，疼子的心事。\n\n多種的族群，和氣打拼無論分，為著代代的子孫，創造咱的土地,生命甲青春。\n\n世界咧等待，踏出腳步向未來，大聲講出咱的愛，愛著台灣的精彩，台灣的美麗甲可愛。",
	    "vote_count": 90,
	    "official_url": "http://www.youtube.com/carslaves",
	    "winners": false
	  },
	  {
	    "id": 123,
	    "title": "黎明的陽光",
	    "track_id": 212582562,
	    "author_name": "莊堵安",
	    "desc": "「悶」似乎是這世代共同的感受。渾沌與迷惘徘徊在你我之間；荒腔走板的仕紳官僚作風似乎讓時光倒退了。期待一個改變，一些光亮，能帶給這土地子民平安的生活，與一個公義的社會。",
	    "lyrics": "你是否聽到心理的吶喊\n在這黎明前的黑暗\n不要讓謊言俘虜我們\n走向禁錮沒有自由的地方\n\n當那邪惡勢力崢嶸時\n只見附和者在微笑\n我們總想力爭上游\n但在幽暗裡找無生存的理由\n\n太陽總會在地平面等待\n等著照亮那扇希望之門開\n虛偽和利誘已不被期待\n倉狂的土霸也不再有未來\n\n讓欺騙從霧霾裡散去\n讓明亮陽光再現\n我知道前方有理想在呼喚\n那天空將晴那淚水將乾\n\n不要困惑，也不要逃避\n因為改變就從現在開始\n美好的使命在你我的手裡\n我們將是太陽下無懼的花朵\n\n不要害怕，曙光已劃破夜空\n我們會踏上平安的道路\n在黑夜漸漸退去的早晨\n找回台灣新世代的正義\n\n在黑夜漸漸退去的早晨\n找回台灣新世代的希望",
	    "vote_count": 62,
	    "official_url": "http://www.facebook.com/duane.sj",
	    "winners": false
	  },
	  {
	    "id": 101,
	    "title": "群眾",
	    "track_id": 212448232,
	    "author_name": "張建豪、魏雯麗",
	    "desc": "在大量的閱讀新詩當中，林亨泰的這一首新詩小巧卻別緻，引發我們創造這首慷慨激昂的歌，是一首很有生命力很有張力的歌曲，希望可以給很多人儘管是小人物卻能團結顛覆現狀、勇敢挑戰不公平的精神。",
	    "lyrics": "青苔 看透一切地 \n坐在石頭上 久矣 \n青苔 從雨滴 \n吸吮營養之糧 久矣 \n　\n在陽光不到的陰影裡 \n綠色的圖案 \n從闇祕的生活中 偷偷製造著 \n成千上萬 無窮無盡 \n　\n把護城河著色 \n把城門包圍 把城壁攀登 \n把兵營薨瓦覆沒 \n青苔 終於燃燒了起來",
	    "vote_count": 14,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 30,
	    "title": "身旁",
	    "track_id": 211594049,
	    "author_name": "丁乙恆",
	    "desc": "我們生活在台灣這片土地上 都很努力地想要闖出屬於自己的一片天\n但在追尋的時候 往往會迷失了自己 忽略了許多身旁的人事物\n我們忽略的 可能是四季的變化 可能是人心的轉變 \n我們更可能忽略的 是總有一群人默默的在為我們付出\n他們不求回報 但他們的付出卻為社會帶來更多的美好\n\n這首歌獻給台灣許許多多默默付出的人們\n清晨打掃的清潔人員 在太陽下指揮交通的義工\n關懷弱勢的朋友 投身公益的夥伴…\n還有更多更多我們不知道的人都在為台灣的美好而努力著\n\n謝謝他們 讓我們一起加油\n讓台灣更美好",
	    "lyrics": "樹上的葉子掉了 是不是秋天已經到了\n冷冷的風不吹了 是不是春天早就在了\n路上的人們不笑了 是不是所謂的末日來了\n所有的眼神都變了 是不是心都已經冷卻了\n\n走著走著 尋找人們最初的溫暖\n望著望著 所有匆匆離去的燦爛\n\n怎麼眷戀那故鄉 怎麼思念那海洋\n苦澀的情歌該怎麼唱 午夜燈火何時不再亮\n\n究竟錯過多少滄桑 究竟忽略多少悲傷\n往事他應該怎麼放 我們的未來又會是怎樣\n\n而一切一切 就在你身旁",
	    "vote_count": 221,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 126,
	    "title": "春花姨",
	    "track_id": 212582598,
	    "author_name": "鄭志忠",
	    "desc": "過去 現在 希望",
	    "lyrics": "春花姨仔 民國六十七年 嫁入陳家\n生了 後生 查某囡 安份認命\n彼當時若欲做 無驚沒飯吃\n生活  快活\n\n經濟剛起飛  存錢起番厝\n人情味親像春天的花香\n\n志忠民國68年 生在陳家\n厝內無金好額 世大認真來晟\n不管時嘛在教 冊讀無也要做好子\n人在做  有天在看\n\n啊～     要向前走\n啊～     免做第一名\n啊～     要向前走\n啊～     賣做歹子\n\n春花姨把iPad拿起來  坐在客廳\n天氣越來越熱  人心越吹越冷\n看著時代變化  少年人不敢生不敢娶\n她惦惦在看\n新聞惦惦在看\n\n啊～     要向前走\n啊～     免做第一名\n啊～     要向前走\n啊～     賣做歹子\n \n啊～     要向前走\n啊～     免做第一名\n啊～     要向前走\n啊～     賣做歹子",
	    "vote_count": 233,
	    "official_url": "https://www.facebook.com/scottno138",
	    "winners": false
	  },
	  {
	    "id": 131,
	    "title": "阮是台灣人3拍",
	    "track_id": 212634491,
	    "author_name": "小隱 Eric Cole",
	    "desc": "在海外常碰到有人問”你是那裡人?”我都”無歹勢”大聲說”阮是台灣人!”身為台灣人是我一生的驕傲. 也甘願打拼為祖國台灣做一點事. 這是創曲的inspiration and idea.",
	    "lyrics": "",
	    "vote_count": 35,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 88,
	    "title": "Formosa 福爾摩莎",
	    "track_id": 212447827,
	    "author_name": "詞曲: 陳郁翔 \n編曲: 周照棠,陳郁翔,徐維澤\n製作人: 周照棠",
	    "desc": "“福爾摩莎”像是一艘船\n甲板上歌舞昇平，宴會廳內富麗堂皇\n但位於船艙底下的動力核心，卻盡是真實且令人不快的勞動\n難耐的高溫和髒汙，刺耳的金屬撞擊聲…\n而這些維持船隻運作的聲音，只有在夜深人靜時，才能偶爾被人聽見\n\n在我們生活的這塊土地上，有多少人\n為了一口氣，一個夢想，甚至只是一餐飽飯，而努力拼命著\n這些年來，＂福爾摩莎”雖然迷惘，憂愁，不安定\n人們卻依舊不懈奮鬥著，並期待著改變\n\n謹以此曲，獻給在這名為福爾摩莎的小島上，每一位努力打拼的人\n\nFORMOSA，福爾摩莎，意指美麗之島",
	    "lyrics": "Formosa 是你的溫暖的名字\n因為你 照亮我心內的稀微\n毋驚風雨來澆淋 為著生活犧牲打拼\n佇這塊土地 有阮流過的汗\n\nFormosa 趕緊將目屎擦乎乾\n靠你我 來寫出彩色的希望\n毋驚命運來拖磨 擱再苦嘛照起工行\n全新的 美麗的每一天 腳步就踏乎定\n\n真感謝有恁來陪阮唱歌 為咱的理想阮佔佇這\n信念 就親像海湧 阻礙卡多 咱攏毋驚\n\n真感謝有恁來陪阮唱歌 袂擱來躊躇煩亂孤單\n向前行 將未來 變不同 失志也免著驚 成功會甲阮來作伴\n\n用咱台灣的名 準備與世界車拼",
	    "vote_count": 434,
	    "official_url": "https://www.facebook.com/fumuchanfan?ref=hl",
	    "winners": false
	  },
	  {
	    "id": 79,
	    "title": "打拼人生",
	    "track_id": 212447720,
	    "author_name": "葉斯偉,陳品章",
	    "desc": "花蓮離鄉子弟打拼的人生～\n不管做各行各業～只要肯努力～肯付出\n認同腳下踩著的這塊土地\n必定會有甜蜜的果實\n那怕碰上委屈或是艱難\n秉持著台灣人吃苦耐勞的精神\n只要不畏懼！勇敢向前行～\n一定出頭天～\n\n人生的過程當中～有歡喜～有悲傷\n只要堅持到底！相信天公一定疼憨人！",
	    "lyrics": "A1 透早起床就是為著賺吃\n     日頭赤炎炎  嘛要出去拼\n     不管是落雨  抑是風颱天\n     同款一步一步向前走\n\nA2 麥想那麼多 有夢就會成功\n     哪是勾卡打拼 世界是你的\n     為了生活  啥咪甘苦攏不算啥\n     成功發展  做伙打拼\n\nB1 日頭ㄟ落山     月娘照起工走\n      為著理想做夥繼續走\n      賣看輕自己     憨人毋驚吃虧\n      袂得醉生夢死   做憨豬\n\nB2 日頭ㄟ落山      月娘照起工走\n     為著理想做夥繼續走\n     失敗算什麼      心頭放乎開\n     酸鹹甜ㄟ過程    這才是人生\n\nC1我相信天公一定疼憨人\n     咱逗陣   做伙  向前走\n     堅持到底失敗不算什麼\n     好壞命運  跌倒  別怕疼\n     不管前方阻礙有多大\n     腳踏實地  最後  一定贏\n\n     有理想免驚恐    拼天下你和我\n\nA3 透早起床就是為著賺吃\n     日頭赤炎炎    嘛要出去拼\n     有你的作伴    啥咪攏不驚\n     你跟我    行相偎    做伙來打拼",
	    "vote_count": 1007,
	    "official_url": "https://www.facebook.com/swee7268",
	    "winners": false
	  },
	  {
	    "id": 53,
	    "title": "四個故事 ",
	    "track_id": 211898842,
	    "author_name": "電台大叔樂團",
	    "desc": "很多時候，做為生命中許多不同的角色，\n我們總是不斷地辜負著身邊許多人的期待。\n有意的，無意的，\n我們讓別人失望，也讓自己失望。\n無家可歸的流浪動物；\n對愛情失望的女人；\n盼望和孩子相聚的獨居老人；\n因為現實而不敢再有夢想的年輕人；\n類似這樣的故事不斷地在我們身邊發生，\n我們只能承諾並試著讓自己變得更好，\n不要再讓真正珍惜你的人失望難過。\nBe better，試著讓自己更好；\nBe there，並且努力守在他們身旁。",
	    "lyrics": "眼睛泛著淚光\n眼神透露出了失望\n被遺忘的孩子等待著希望\n女孩放棄夢想\n堅強卻又帶著悲傷\n當愛情不再一樣\n \nI swear \nI will be better\nI will be there \nSo please don't be afraid\nI swear \nI will be better\nI will be there\n \n母親日夜盼望\n傷心卻又總是原諒\n冷漠的孩子選擇了遺忘\n我們忘了勇敢\n妥協卻又帶著不甘\n難道這就是長大\n \nI swear \nI will be better\nI will be there \nSo please don't be afraid\nI swear \nI will be better\nI will be there",
	    "vote_count": 110,
	    "official_url": "https://www.facebook.com/uncleradio",
	    "winners": false
	  },
	  {
	    "id": 50,
	    "title": "咱永遠的春天",
	    "track_id": 211898803,
	    "author_name": "Eric Cole 小隱",
	    "desc": "綠色是代表春天, 春天代表希望和快樂. 綠色執政才是台灣人永遠ㄟ春天.",
	    "lyrics": "春天的花吓妮水 實在是真水 鳥仔飛來又飛去 蝴蝶含蜜甜\n春天的花吓妮香 是愛的門窗 想起走過的路坎 心情笑笑弄 \n你看你看嘿是咱 希望的花欉 一日一日惦惦開 漸漸冽大長\n你講你講三月天 是尚水的時 逗陣牽手坐湖邊 水影照目墘\n你若站在阮身邊 站在阮身軀邊 是咱永遠的春天 尚水的春天",
	    "vote_count": 49,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 29,
	    "title": "來自台灣",
	    "track_id": 211594045,
	    "author_name": "撞軌樂團 蘇恆生",
	    "desc": "台灣新世代的年輕族群.\n心中十分渴望著對這世界大聲吶喊 “來自台灣”\n這首音樂創作也分享給台灣這塊土地上的每一個人\n台灣是我們的家\n我們的家充滿人情.充滿愛.\n這塊孕育生命的寶島是多麼的美麗啊\n當來自世界各地的人們問我們:你來自哪裡?\n我們會驕傲的昂首答:“來自台灣”",
	    "lyrics": "前奏 (A)\n即刻出發  跟隨夢想導引的方向  走吧  盡情的揮灑\n內心釋放  拋棄混亂不堪的過往  丟吧  絲毫不留下\n(B)\n意念 蛻變 勇敢起身向前 激盪出 新能量 開創出 新世紀\n(C)\n來自台灣 對世界熱情友善 愛凝聚正義力量\n一路牽著手 共依靠 互相挺 往前闖        \n\n來自台灣 美麗的生命啟端 綻放著人性光芒\n照亮你和我 這土地 我們都 深愛的家 福爾摩沙\n(間奏)\n \n(B2)\n意念 蛻變 勇敢起身向前 激盪出 新能量 開創出 新世紀\n(C2)\n來自台灣 對世界熱情友善 愛凝聚正義力量\n一路牽著手 共依靠 互相挺 往前闖        \n\n來自台灣 美麗的生命啟端 綻放著人性光芒\n照亮你和我 這土地 我們都 深愛的家  啊~~~\n(C3)\n來自台灣 對世界熱情友善 愛凝聚正義力量\n一路牽著手 共依靠 互相挺 往前闖        \n\n來自台灣 美麗的生命啟端 綻放著人性光芒\n照亮你和我 這土地 我們都 深愛的家 我們的家 福爾摩沙\n\n我們都來自台灣 台灣 台灣 台灣~~~",
	    "vote_count": 1704,
	    "official_url": "https://www.facebook.com/profile.php?id=100000116498798",
	    "winners": true
	  },
	  {
	    "id": 59,
	    "title": "我是主人翁",
	    "track_id": 211898894,
	    "author_name": "Joshua Kasin Tin (田台仁)  ",
	    "desc": "如歌詞",
	    "lyrics": "作人真大方，陽光哥豪爽，我就是主人翁。\n甭驚透大風，對土地認同，咱攏是此e王。\n無論叨一族，作伙來開拓，建立理想國。\n無分階級，團結聚集，保護主權獨立。\n\n(Refrain)\n你我攏是台灣人，\n正直負責台灣人。\n充滿快樂有希望，\n文明高級台灣人。\n\n",
	    "vote_count": 27,
	    "official_url": "http://ajin2050.blogspot.ca/",
	    "winners": false
	  },
	  {
	    "id": 120,
	    "title": "失落世代",
	    "track_id": 212582501,
	    "author_name": "邱柏榮",
	    "desc": "我們青年人,是失落的一代。\n青年失業現象,如同瘟疫一般席捲全球,從歐洲、北美到中東甚至非洲\n,大批的年輕人無法獲得與所學相符的工作,高學歷諷刺地伴隨著高失\n業率,這樣的危機大大改變了家庭與社會的結構,原本應該成為勞動人\n口的青年人,變成了父母必須持續扶養的孩子,原本該成為經濟體系中\n的消費人口,卻受困在失業中。\n青年人對未來迷惑、茫然,並且逐漸瓦解了對於「接受教育」的信仰,\n而社會貧富階級對立則越來越鮮明。\n在台灣,青年人剛好在過去最舒適的環境中成長,因為養育我們的父母 親正好經歷了「經濟奇蹟」的年代,那是個美好的時代,國家的經濟情 況正向上提升,那時候的人們相信受教育就能夠擺脫貧窮、改善家庭經 濟,並且得到生活的尊嚴,上一代的人也這樣努力了,也這樣成就了自 己。\n但是現在的台灣,青年人已經沒有上一代人的機會了,現今我們的大環\n境是經濟萎靡、失業暴增、各級政府的負債劇增幾乎到達喘不過氣的境\n地。於是,青年人嘗試發出怒吼,但是,上一代人卻認為我們只是任\n性、只是無理取鬧!青年人已經喘不過氣,已經無能為力,卻又只能眼\n睜睜看背負著厚望的掌權者,一再重演辜負期望,甚至淪落牢獄的戲\n碼。\n於是,我想為年輕人寫這樣一首歌,雖然大環境把滿腔熱血的青年人變 成了價值崩壞的卑微動物,但是,我們仍然奮力摸索、掙扎,仍然盼望 未來,仍然懷抱希望。",
	    "lyrics": "別說我任性又衝動 \n只想擁有不被剝削的自由\n看著多少人物 被吹捧 \n又有多少人物 淪為階下囚\n\n哪裏還有光亮 能信仰 \n用微笑迎來希望 \n當夢想失去重量 \n世代剝奪的惡夢 怎麼對抗\n\n曾幸福成長 如今卑微地掙扎 \n雙手的力量 無法撐起一個家 \n鏡子裡面憔悴模樣 誰能替我安慰他 \n為何幸福是奢侈的想像\n\n權力舞台上 跳樑小丑在猖狂 \n我們都好傻 拒絕對生命失望 \n世界瞬息變化 未來方向在哪 \n仍奮力摸索 不輕易倒下",
	    "vote_count": 16,
	    "official_url": "https://fb.me/EdisonChiuTW",
	    "winners": false
	  },
	  {
	    "id": 83,
	    "title": "咱的靠山",
	    "track_id": 212447765,
	    "author_name": "Anna Peen",
	    "desc": "以一個對溫暖的家有依賴又想守護著的人為出發點\n我想要這片土地變得更好 我們要一起守候它 它才能繼續顧我們\n想往前 必須有夢 \n想有勇氣 必須人打氣\n家的成分 是一群給你溫暖勇氣跟你一起回憶故事創造未來的人\n家就是靠山 國家裡的大人小孩都給彼此守候和愛 這就是家 是我們的靠山",
	    "lyrics": "厝內一通電話 蹬來甲暗等 打拼的甘苦 隨米香消化\n都市閃爍的燈 參像下午海岸 這是咱的家 咱的靠山\n\n世大用故事泡的茶 苦完甘甜喔\n喝了止嘴乾 笑虧退火 透心涼 \n\n日頭溫暖落過雨的路 這是搵的厝 搵的靠山\n \n啊 向前飛啊 啊 要記得回頭看\n啊 咱還有夢 手牽手  大漢細汗 慢慢走\n啊 向前飛啊 愛有勇氣 為搵打拼\n啊 咱還有夢 手牽手  大漢細汗 好好走\n \n沒看得的傷 不是說不再痛\n沒說出的心聲 不帶表沒希望\n這次咱要相信 也當照顧搵的夢\n這是咱的厝 搵是咱的靠山 ",
	    "vote_count": 130,
	    "official_url": "http://www.facebook.com/anna.peen",
	    "winners": false
	  },
	  {
	    "id": 159,
	    "title": "最後一哩路",
	    "track_id": 212748513,
	    "author_name": "阿密捷克樂團",
	    "desc": "阿密傑克是來自南台灣大學生所組成的樂團，我們熱愛台灣這塊土地和文化，也非常關心台灣未來的發展，但是近年來無情的災害造成家庭破碎，物價的飆漲讓許多人民無力負擔沈重的房貸，食安問題越來越嚴重，黑心商品在台灣流竄，讓大家十分擔心。台灣人能達到的山頂，卻還是差一哩路。相信往後人民的力量可以改變未來，然而我們能做些什麼來讓自己的國家變得更好？或許每個人都盡一點心力，相信台灣一定能改變的！希望這首歌可以給大家正面的力量，一起努力度過許多難關。",
	    "lyrics": "早晨陽光 照在地上 風從我的臉頰輕輕漂揚\n一個人 要走向未知的方向\n所以我 默默地 默默地祈禱\n祈禱著 台灣 能平安美好\n早晨陽光 照在地上 風從我的臉頰輕輕漂揚\n一個人 要走向未知的方向\n這片土地 是我的家 是我記憶中最美麗的畫\n一個人 說什麼也要保護它\n所以我 默默地 默默地祈禱\n祈禱著 台灣 能平安就好\n或許我們 能做些什麼\n或許我們 能改變什麼\n或許台灣 能被看見什麼\n也許昨天 有多少的痛\n也許今天 能抬得起頭\n也許明天 一切會過去的\n喔⋯⋯\n喔⋯⋯\n或許我們 能改變什麼\n或許我們 能做些什麼\n或許台灣 能被看見什麼\n也許昨天 有多少的痛\n也許今天 能抬得起頭\n也許明天 一切會過去的\n喔⋯⋯（輪唱）\n喔⋯⋯（輪唱）\n\n",
	    "vote_count": 1064,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 168,
	    "title": "望鄉",
	    "track_id": 212748682,
	    "author_name": "Busy Cathie",
	    "desc": "在回家的這條路上，經過整個台灣西部的土地，看過連續的風景，發現原來我們想念的都是家",
	    "lyrics": "我背著行李 拋下一切\n疾行高鐵外的向晚天  橘色是家的縮寫\n睽違了幾個季節 原來那種感覺是想念\n\n眼前的稻田 綠成一片\n每一條泊油路肩併肩   畫面放在心裡面\n間隔了多少歲月 偷偷的希望永遠不變\n\n睜開眼 陽光耀眼\n深呼吸 連空氣都甜\n我願意用一輩子的時間\n與這片土地依偎(相依偎)\n與整片天空相依偎\n\n陽光折射下的玻璃\n我願意用一整年換這樣的光景",
	    "vote_count": 326,
	    "official_url": "https://www.facebook.com/ziling.huang3?fref=ts",
	    "winners": false
	  },
	  {
	    "id": 56,
	    "title": "太陽光",
	    "track_id": 211898866,
	    "author_name": "馮德明",
	    "desc": "",
	    "lyrics": "雖然沒有下雨我這麼久沒出門，\n似乎忘記了外面有多溫暖的氣氛，\n我為什麼把窗戶關掉，把門鎖起來，\n一直看同個電視台，也站不起來，oh,\n鈴聲響來，我的心跳跳起來，\n我終於醒醒過來，我的手伸伸伸出來，\n真的是多麼奇妙，這個感覺太屌，\n一萬個泡泡到處飄起來，不停的微笑，給我看妳的 shine,\n太陽光，真漂亮，照亮彩虹帶來的希望，\n看到新的夢想出現，揭開新的方向\n\n",
	    "vote_count": 33,
	    "official_url": "https://www.facebook.com/mcaming",
	    "winners": false
	  },
	  {
	    "id": 108,
	    "title": "方向有什麼不一樣",
	    "track_id": 212469501,
	    "author_name": "黃藍白",
	    "desc": "大學時騎腳踏車環島，看見台灣美麗的風景人文，想想自己的未來，期待大家都不分彼此，共同前進美好的方向，我們的方向都沒有什麼不一樣！",
	    "lyrics": "也許 土壤漸漸的複雜 還有寶藍色海岸\n那天 夜空他其實是 幾兆光年以前的吧\n彷彿那都不關我事 感受宇宙中的浮動\n隨著時流微不足道的我\n\n妳說 不能改變什麼 我在這兒獨自存活\n今晚夜空有一股幽香 來自星球的另一端\n妳說這或許跟我有關 好像勉強但又不牽強\n彷彿慢慢慢慢劃過長空...\n*我們的家在遙遠的那一方 一樣那樣那魯灣\n還有我真摯的夢想 不住的在呼喚我\n也許你的家在這裡 也許我的家在那裡\n然而方向到底有什麼不一樣 \n然而方向到底有什麼不一樣 都一樣..\n我想 生活漸漸的複雜 雖然看起來不難\n也許 有一天我明白(醒來) 而這一切都已不再\n彷彿時光不停到流 回到最初的那場夢\n彷彿一切的一切都是感動.. \n*我們的家在遙遠的那一方 一樣那樣那魯灣\n還有我真摯的夢想 不住的在呼喚我\n也許你的家在這裡 也許我的家在那裡\n然而方向到底有什麼不一樣 \n然而方向到底有什麼不一樣 都一樣..\n\n",
	    "vote_count": 115,
	    "official_url": "https://www.facebook.com/profile.php?id=100000236910610",
	    "winners": false
	  },
	  {
	    "id": 144,
	    "title": "過去 今嘛 未來 ？",
	    "track_id": 212635147,
	    "author_name": "DaMi 乾麵 (from 人人有功練)",
	    "desc": "這片島嶼在幾百年前開始了殖民的歷史，從大航海時代到現今的民主社會，各族歷代有著不同的歷史觀點，誰掌握了權力就掌握了話語權，現今台灣歷史的論述也因此出現了許多分歧。\n從而在創作這首歌曲時，決定深入專研各個不同角度所解讀的過往歷史，在歌詞上以最客觀的\n事件陳述編織出一部四分鐘的台灣簡史。希望這首歌能創造學習的開端，讓聽眾以此做為起點，對這塊土地的歷史產生興趣，進而自我探就，期望2016年台灣人民能站在歷史的新高度。",
	    "lyrics": "Verse 1 (台語)\n在很久以前 有一塊土地\n在幾萬年前就可能有人住著\n冬天有烏魚 夏天可以種稻米\n她的名字幾百年前被人稱作Formosa\n西元1624 年 荷蘭人占領後 蓋了紅毛城\n原住民無奈投降 只有任人欺壓\n開始了被殖民 北部還有西班牙\n看誰可以有辦法把她全部都佔領\n之後荷蘭人勝利 西班牙人在這17 年\n這塊土地也漸漸已經有了移民\n大多是清朝統治下的漢人\n他們跟原住民合作革命 就像郭懷一\n西元1662 年 讓荷蘭人投降的那個姓氏\n創立洪門天地會 後人稱作國姓\nChorus (華語)\n過往的事蹟 被遺忘的回憶\n零散的記憶 有誰能完整拼湊齊\n歷史留下的點點滴滴\n所有留下來的每一個足跡\n好的壞的痕跡 是我們踏出下一步的依據\nX2\nVerse 2 (台語)\n歷史上 東寧王國在這並沒有很久\n3代 23年 1683對滿清未戰就認輸\n清朝人統治下 分化族群是最內行的\n分做台灣本地人 還有唐山大兄\n就是這樣分統治階級\n這種對立抗爭 也影響很深一直到現在\n兩百多年來一直官逼民反\n流血衝突不斷 三年一小反 五年一大亂\n1895對日本投降 簽馬關條約\n也是把台灣推向現代化的一條路\n日本人一開始也是高壓統治\n勇敢的台灣人反抗流血不怕倒下\n接下來抗爭進入新的階段\n人民開始思考 我們比統治者還大\nChorus\nVerse 3 (台語)\n日本野心太大 偷雞不著蝕把米\n引發世界大戰 所以被美國人打\n美國在1945空襲台灣 日本當年投降\n來接管的不是白人\n國民黨戰敗後跑來台灣\n一年三個月以後 1947 228\n台灣人再一次受到迫害 戒嚴 白色恐怖\n為我們換來了民主 自由 跟進步\n我們也在1996可以直選總統\n這代表人民最大\n做不好換人就在2000\n接下來我們要追求的是公平與正義\n好好想一下要留給下一代的是甚麼\n2013 7月4日 2014 318 若不想再流血\n台灣人要覺醒\nChorus X2",
	    "vote_count": 308,
	    "official_url": "https://www.facebook.com/DamiTaiwaneseRapper",
	    "winners": false
	  },
	  {
	    "id": 3,
	    "title": "Round And Round\n",
	    "track_id": 211101504,
	    "author_name": " 蘇兒真",
	    "desc": "作者蘇兒真(本名蘇明淵)為執業律師及創作歌手，藉由這首創作歌曲表達自己長達17年的訴訟實務經驗中所得到的反省；雖因受限於尚待改革而未臻完美的司法體制之中而產生懷疑，但仍期許自己不斷轉動向前(如同歌名Round And Round 的字義)堅持自己所信仰的公平正義。\n\n",
	    "lyrics": "希望有一天   不必再活在  真實和謊言之間\n天秤的兩端   不會再有  委屈的求全\n再也不必把   自己丟在   那些紛紛擾擾\n用緘默去面對   不公平的世界\n我沒有本事   可以把黑的   都說成白的\n人們的是非   對錯和愛恨   都不是原罪\n恨不得把所有  事情都備忘   都拿出來主張\n我來來往往    匆匆忙忙\nRound And Round And Round And Round\n為了不讓人失望\n還是為了自己堅持的理想\nRound And Round And Round And Round\n不停的轉向前方\n患得患失的心需要一個方向",
	    "vote_count": 1818,
	    "official_url": "https://www.facebook.com/ninthchords",
	    "winners": true
	  },
	  {
	    "id": 16,
	    "title": "永不放棄",
	    "track_id": 211101478,
	    "author_name": "林義倫",
	    "desc": "這些年來,台灣人民過得很辛苦,而能繼續撐下去,靠的是人民的他助自助\n有很多不公不義的事,也是台灣有一群人無私地衝在第一線不放棄地捍衛著\n就算困擾重重,就算辛苦,但似乎只要不放棄,我們要的理想跟結果,終究還是可以掙來\n這幾年台灣發生非常多光怪陸離的事件跟現象,許多人開始質疑,台灣最美麗的風景,仍然是人嗎?....我相信…是的! 特別是一群永不放棄的人 !!!",
	    "lyrics": "冷風   一陣陣襲來吹了又吹 該繼續前進 但卻想過就此打退\n(冰雨   一波波遮住我的視線 該繼續撐著 仍睜開不了模糊的眼)\n\n汗乾了 卻又濕了幾回 推著我不停下來的 是摯愛的淚\n(淚乾了 卻又濕了幾回 陪著我不停下來的 是熱情安慰)\n\n不該讓愛我的人受罪 即使他們嘴巴說著不後悔 要我放心勇敢往前飛\nI won't give up , carry on ~ 懷抱親友的鼓勵當信念\n無論夢多遠 都要拼命追 即使前方暗藏危險 我相信終會是藍天 \n\n告訴自己 我 永不放棄   僅管過程也許狼狽  義無返顧我都要去追 \n告訴自己 我 永不放棄   沒有太多是非錯對  只求自己問心後無愧\n\n(RAP)\n我 拼了命去追 這一路上有太多是與非 錯或對 我又能問誰\n只求自己問心後無愧 跌跌撞撞也許很狼狽 \n多少次我笑中帶著淚 因為有你的愛當我的信念夢再遠 也要追\n不管前方暗藏著多少危險 一定是藍天",
	    "vote_count": 421,
	    "official_url": "1048490812@facebook.com",
	    "winners": false
	  },
	  {
	    "id": 9,
	    "title": "心甲心相偎",
	    "track_id": 211101491,
	    "author_name": "許偌珩",
	    "desc": "",
	    "lyrics": "心甲心相偎 深深的戀歌\n惦惦的走著 是咱倆人的生活\n\n心甲心相偎 深深的戀歌\n少年的運命 攏不知影按怎來疼惜\n\n阮知影世間擱有真情存在\n雖然本身攏有一段悲哀\n阮知影世間擱有真情存在\n就是你的人乎阮希望\n\n你的心肝底 阮的心肝底\n快快樂樂出帆啦\n你的心肝底 阮的心肝底\n快快樂樂出帆啦",
	    "vote_count": 33,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 174,
	    "title": "阿嬤的香水味",
	    "track_id": 212796168,
	    "author_name": "林茂誠",
	    "desc": "藉由思念阿嬤的情懷對這片土地感受酸甜苦辣點點滴滴⋯⋯回憶是越陳越香～",
	    "lyrics": "A1\n燙宿裡 有一卡阿嬤的寶貝 伊講那就是足故依早的代誌\n阮細漢 不知影這有啥意義 只知影頂高有 阿嬤的珠淚滴\nA2\n半世人 只靠著一張舊相片 那卡的皮箱永遠對在伊身邊\n阮細漢 不知影這有啥意義 只知影頂高有 阿嬤的珠淚滴\nB\n－阿嬤的香水味 想要甲伊永遠伴相隨不管多少目屎當作沒看見\n日頭哪落 頭蒼梳好擱當作沒代誌 懷念阿嬤的香水味道\n甲伊永遠伴相隨",
	    "vote_count": 51,
	    "official_url": "http://www.facebook.com/amao.bg",
	    "winners": false
	  },
	  {
	    "id": 47,
	    "title": "美麗的台灣",
	    "track_id": 211898751,
	    "author_name": "詞曲：几覓 編曲：Steven 主唱：芳青",
	    "desc": "希望台灣會更好",
	    "lyrics": "美麗這一方 它名叫台灣 鳥語又花香 人兒也善良 你我有個願望\n想必大家都一樣  就是希望這地方  百姓都能安康 \n你我生活在美麗的台灣  勤奮努力的工作  每個人都有理想\n只要民主這地方  領袖他有擔當  你和我就無需再徬徨\n人間的天堂在台灣",
	    "vote_count": 18,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 25,
	    "title": "有一天",
	    "track_id": 211101459,
	    "author_name": "狂潮搖滾樂團",
	    "desc": "這是首對臺灣未來充滿期待的歌曲，希望在大家的努力之下，將臺灣締造成一個更美好的地方，在這裡有美麗的山海林野、更良善的官民、人人生活無虞，不再有傷悲、謊言、枉死，只要肯付出一定能出頭天。",
	    "lyrics": "期待咱有一天  咱住地家   攏真平安        期待咱有一天  咱ㄟ故鄉   ㄟ不同款                       \n美麗ㄟ海岸  白色ㄟ沙  美麗ㄟ溪   水嘎山林       大頭家郎攏真善良   吃頭路免煩惱心情爽                         \n少連郎認真為前途   作官ㄟ認真袂甲歐             身邊有愛我ㄟ老伴   跟我吃穿不驚生活苦                     \nno  more  cry        no  more  sad       no  more  lier      no  more  died\n期待咱有一天  咱住地家   攏真平安        期待咱有一天  咱ㄟ故鄉   ㄟ不同款\n不管你對哆來    住在這大家都平大    我愛你   你愛我    福爾摩沙   歐海丫  \n歐海丫    歐海丫     歐海丫    歐海丫  歐海丫    歐海丫  歐海丫    歐海丫  歐海丫\n",
	    "vote_count": 105,
	    "official_url": "https://www.facebook.com/rockmusic201407",
	    "winners": false
	  },
	  {
	    "id": 105,
	    "title": "林蔭之丘",
	    "track_id": 212469456,
	    "author_name": "林辰",
	    "desc": "以家做背景，寫下許多人心中的感觸，進而將台灣比喻成我們的家，離家代表離開台灣，提醒眾人家的可貴，與台灣的可貴。",
	    "lyrics": "在北方鬱鬱蔥蔥那座山　山脈像讓我依靠的肩膀\n深深的綠葉透著光　鳥鳴聲在雲霧間迴盪\n\n山下的景色不一樣　或許要離家才能算成長\n大地的關懷被遺忘　山神也不再是信仰\n\n曾經試著離開家　以為自己會堅強\n沒想到卻成了遺憾\n親人告別了我　我當時卻不在家\n我從沒想過會這樣\n\n以為離家的遺憾　會讓自己很受傷\n卻讓我變得更堅強\n清晨我一個人　在林蔭的山丘上\n望向我茁壯的地方\n望向我茁壯的地方\n\n許下我最深的願望",
	    "vote_count": 60,
	    "official_url": "https://www.facebook.com/lin.chen.9655",
	    "winners": false
	  },
	  {
	    "id": 27,
	    "title": "浪人",
	    "track_id": 211171150,
	    "author_name": "育緣",
	    "desc": "「流浪教師」的問題全面、久遠，解決之道必須全盤、長遠。",
	    "lyrics": "浪人啊～欲對叨位去   流浪啊～流浪到何時  \n浪人啊～欲對叨位去   漂流啊～漂流過日子\n異鄉～揣無人情味   浪人～攏是不得已  \n月娘～敢欲綴我去   漂流～漂流過日子\n",
	    "vote_count": 17,
	    "official_url": "https://www.facebook.com/dungjye",
	    "winners": false
	  },
	  {
	    "id": 69,
	    "title": "愛 . 因為有你",
	    "track_id": 212071753,
	    "author_name": "陳子文",
	    "desc": "想用最簡單的旋律及這首音樂的氛圍去感受 “希望”與”愛” 並沒有因為種種挫折而離開\n這首音樂前面鋪陳著”等待著”希望的感受，中間段陳述著 “看見了”的感覺，手拉把手讓愛來圍繞在身邊，最後以輕快的的節奏來揮灑人與人、生命與生命那種愛牽繫是永遠存在的\n那種感受最終 是………….”因為有你”\n這首或許也可以搭為競選廣告背景音樂 簡單的旋律 弦樂的可愛 讓人有種能安定人心的感染力。謝謝~",
	    "lyrics": "",
	    "vote_count": 24,
	    "official_url": "https://www.facebook.com/tkomuro56",
	    "winners": false
	  },
	  {
	    "id": 163,
	    "title": "老厝邊",
	    "track_id": 212748566,
	    "author_name": "柯大堡 KoDaBow",
	    "desc": "「呷飽沒？」在台灣的庶民社會裡頭，一直扮演著「Hello!」、「你好！」的角色，那是一種台灣專屬的人情味，淡淡而質樸的問候，也使得台灣普遍擁有著「最美的風景是人」的美名。\n在真實的在地生活裡，「來阮家呷飯啦！」又是更深一層的人情味，遍佈著街頭巷尾、鄉村都市，熱情的邀約親朋好友好厝邊來家裡吃個便飯，唱唱卡拉OK，也是所有台灣人共同有的生活感受，即使離家多年以後回到故鄉，鄰居之間也是一如過往的熱情問候，不會因位時空地點而沖淡了人和人之間的情感。\n更甚者，親自下廚、甚至辦一兩桌菜宴客對台灣社會而言不只是結婚，舉凡退伍、金榜題名、生小孩、等等，只要是開心愉悅的喜事想要和親朋好友分享的時候，就會辦個桌、下個廚，民以食為天的庶民文化在這，體現了感恩、分享的美德，舉世之間，也只有台灣有這樣的美景。\n在這樣的飯宴當中，交流彼此最近生活的近況、關心鄰里大小事、乃至於小道消息等等，某種程度上，這也是台灣在地傳統的交流進步模式之一，而在感受到這樣的文化意涵後，「老厝邊」因此而生。",
	    "lyrics": "喂！呷飽沒？‭                ‬ㄟ～還沒勒\n來阮那呷飯啊！‭              ‬免啦免啦，安捏甲你麻煩\n袂啦！咱作夥啊！‭            ‬嘸係啦！我轉去呷就好啦‭  ‬\n哼三八！咱自己人哩係‭..       ‬\n\n尚好料嘸免看功夫  來阮那就有\n呷飽擱唱歌兼跳舞喔\n免驚會嘸捌  啊較早的朋友\n開講咱厝邊  往過的故事\n\n勇伯啊怹囝嗷讀書啊  事業嘛真嗷募     \n牽乎怹老爸啊一架Benz喔\n阿頂個月  擱起新厝\n阮佇路上相遇  笑講當初煞無人看伊有\n\n勇伯啊！真久沒見了捏！‭       ‬蛤？啊！你轉來了喔！\nwo～氣色這好！真好真好！‭    ‬嘿啊嘿啊！啊汝勒？汝好某？\nOK～袂歹袂歹，嘿呀。‭        ‬好好！真好真好！\n來阮家呷飯啊！作夥作夥齁！\n\n鴨咪仔怹大姊  落尾啊嫁去洛杉磯     \n聽講怹尪係賺了很多錢喔   \n欲等一個金孫等半年啊 見無一面\n剩怹老母啊和伊底厝裡\n\n鴨咪仔！您母啊底休睏喔？‭      ‬汝誰？‭ ‬\n噓，麥甲吵麥甲吵！‭            ‬喔！汝轉來了？\n下暗帶伊來阮家呷飯喔！‭        ‬啊阮灶腳….\n嘿！免煮免煮！先安捏！\n\n唱咱的Melody  心涼啊脾肚開\n老朋友來逗陣  係歡喜啊的事情\n唱咱的Melody  心涼啊脾肚開\n煩惱甲放乎去  腹內係全趣味  \n乎咱  好過日唷\n\n離家多年啊的關心  嘛袂走鐘\n天下間就係台灣最惜情\n街仔頭  巷仔尾  厝邊若親戚那麼親\n常常嘛喚欲辦一桌請汝 \n\n唱咱的Melody  心涼啊脾肚開\n老朋友來逗陣  係歡喜啊的事情\n唱咱的Melody  心涼啊脾肚開\n煩惱甲放乎去  腹內係全趣味 \n\n唱咱的Melody  心涼啊脾肚開\n老朋友來逗陣  係歡喜啊的事情\n唱咱的Melody  心涼啊脾肚開\n從今仔日開始  世界的大門開\n乎咱  行出來去喔 \n\n",
	    "vote_count": 893,
	    "official_url": "https://www.facebook.com/kodabow888",
	    "winners": false
	  },
	  {
	    "id": 46,
	    "title": "看見希望的明天",
	    "track_id": 211898635,
	    "author_name": "姐妹花二重唱",
	    "desc": "就算政黨之間因理念不同而紛爭不斷, 我們可別對台灣這片土地失去信心, 這個大家庭需要你我一起齊心經營, 就讓我一起攜手\"看見希望的明天\", 再度尋找這片台灣美樂地吧。",
	    "lyrics": "看見希望的明天   團名: 姐妹花二重唱\n\n夜就要開始透亮  我不再傷心迷網\n\n紛紛擾擾它從未散場  但是心中絕不失望\n\n路雖然如此漫長  你我也歷盡了滄桑\n\n只要心中還擁有希望  我們就能乘風破浪\n\n\n\n看見希望的明天  隨時陪伴在你身旁\n\n用這雙溫柔的翅膀  一起翱翔帶走絕望\n\n看見希望的明天  傳送給你愛的芬芳\n\n讓美樂地(melody)在心中迴盪  譜出美麗動人的樂章\n\n",
	    "vote_count": 1753,
	    "official_url": "http://facebook.com/little.yiyi.liao",
	    "winners": true
	  },
	  {
	    "id": 36,
	    "title": "正義的花蕊擱再開（台語）",
	    "track_id": 211594073,
	    "author_name": "曲:鄭英傑, 詞:藍惠容 ",
	    "desc": "正義的花蕊擱再開",
	    "lyrics": "秋風涼涼吹湖邊，雨水滴落土，\n楓葉飄飄墜落地，稀微的冬天，\n冬天凋零的花蕊，等待再開時，\n春風笑笑吹溪邊，彩色的春天，    \n自由的民主佇叨位，佇公平選舉，\n正義的花蕊擱再開，像彩色春天。",
	    "vote_count": 46,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 22,
	    "title": "中華民國(台灣)新詞國歌",
	    "track_id": 211101467,
	    "author_name": "詞：鄭英傑\n曲：程懋筠",
	    "desc": "中華民國(台灣)新詞國歌",
	    "lyrics": "公平正義,慈愛和平,\n勇敢努力,不怕困難,\n一步一步,國民進步,\n扶持弱小,愛人如己,\n太陽花一直開,太陽花一直開,\n台灣修憲法,台灣有希望,\n台灣我的國,台灣我的家,\n中華民國,Formosa我的家.\n",
	    "vote_count": 24,
	    "official_url": "https://www.facebook.com/pages/JK-music/980130252027728",
	    "winners": false
	  },
	  {
	    "id": 96,
	    "title": "溫柔的力量 ",
	    "track_id": 212447875,
	    "author_name": "ChuMiKiller Band",
	    "desc": "溫柔的力量, 就像大海能納百川, 能用寬大的胸襟與寬容的態度去接納一切人事物\n溫柔的力量, 溫和中帶著堅定, 可以為了理想勇往直前\n希望透過音樂的力量, 可以喚起大家對這片土地的熱愛與認同",
	    "lyrics": "大海像母親溫柔的手掌  \n山脈像父親可靠的肩膀\n溫暖的陽光 照向四方 \n守護著我們的家\n美麗的島嶼像訂做好的天堂\nOH 海洋    OH 海洋\n藏著無數珍貴的寶藏\n乘風破浪航向遠方 \n尋找一個避風港灣\n前方有燈塔為夢想指引方向\n揮舞著翅膀 自由自在的翱翔\n飛越了屏障 誰也無法阻擋 \n這溫柔的力量\n就讓我們一起 手牽手\n往前走 不回頭\n一起走過每個春夏秋冬\n一起做夢 一起感動\n溫柔的力量永遠為你守候\n風雨過後 總會出現彩虹\n擁抱著夢想 勇敢往前衝\n盡情享受   \n揮舞著翅膀 自由地飛翔\n為了新的理想勇敢去闖\n飛越了屏障 誰也無法阻擋\n這是溫柔的力量\n就讓我們一起 手牽手\n往前走 不回頭\n一起走過每個春夏秋冬\n一起做夢 一起感動\n溫柔的力量永遠為你守候\n風雨過後 總會出現彩虹\n擁抱著夢想 勇敢往前衝\n盡情享受 用力嘶吼\n\n",
	    "vote_count": 1961,
	    "official_url": "",
	    "winners": true
	  },
	  {
	    "id": 31,
	    "title": "幸福的路云云仔行",
	    "track_id": 211594051,
	    "author_name": "小草",
	    "desc": "幸福的路要云云仔行（一步一步慢慢地走）、穩穩仔行。",
	    "lyrics": "恩情像一粒山  穩穩仔徛佇遐 \n世事總是有冷暖啊  無你就無我 \n友情像一條歌  云云仔唱袂煞 \n人生總是愛好好啊拚  有你就有我\n幸福的路做陣行  牽手咱袂變卦 \n雖然辛苦無快活  有你我袂孤單 ",
	    "vote_count": 22,
	    "official_url": "https://www.facebook.com/dungjye",
	    "winners": false
	  },
	  {
	    "id": 13,
	    "title": "夢中桂花香",
	    "track_id": 211101482,
	    "author_name": "江建興",
	    "desc": "",
	    "lyrics": "歸暝的香味吹在心內\n在夢中有故鄉的山\n是父母的關愛跟土地情\n陪伴著離鄉的我\n\n咱門口種的桂花叢\n夜夜阮攏聞著伊的香\n阮要離開的彼一晚\n阮的衫攏是桂花的香\n\n走一條路總也是有坎有坷\n艱苦嘛是會看到笑容\n夢中的桂花香陪伴著我\n思念中的彼片樓窗\n\n昨暝的香味擱入心內在夢中有故鄉的海\n有父母的關愛跟土地情陪伴著夢中的我",
	    "vote_count": 33,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 109,
	    "title": "我願是妳的風景",
	    "track_id": 212469539,
	    "author_name": "羅葉／張彥帆",
	    "desc": "本歌曲歌詞採自羅葉2009年同名詩作。\n羅葉本名羅元輔，早年參與大學校園民主運動及新聞採訪，其詩作充滿對台灣社會的關懷。羅葉雖於2010年英年早逝，其作品至今仍屹立書店架上，持續影響著廣大讀者。《我願是妳的風景》以Google Map的角度，由上而下、由遠而近，俯瞰欣賞他的出生地──花蓮。詩中充滿縱谷、蔗田、地震、颱風、沙河床、奇萊…之印象，放諸全台灣亦準，故多被讀者引喻為對台灣之愛。作曲、演唱者張彥帆以簡單的鋼琴音符，時而高亢、時而低吟，詠嘆抒發詩詞中對我們身處島嶼的依戀。",
	    "lyrics": "想妳的時候我會連線衛星地圖\n自萬呎高空俯瞰妳側臥於島嶼邊緣\n層巒蓊鬱的髮捲，縱谷舒朗的神韻\n礁岩與灘岸聯手勾勒出婀娜軀線\n蔚藍裙襬上飛舞著浪白蕾絲邊\n那樣子斜枕奇萊，看不出是睡或醒\n我只好放大比例尺鷹旋下探\n緩緩迎向妳峽谷明眸的笑靨\n依稀認出激流是高歌，巨石是低吟\n西瓜是妳甜美的詩句隨興寫在沙河床\n颱風是季節捎來的書信，黑潮是項鍊\n地震是亙古的母親時而輕搖妳的夢境\n白雲是浪子──妳漂泊歸來的愛情\n經常站在懸崖上遠眺海面\n鯨豚隱現是他流落異鄉的倒影\n我如此屏息守候而寧願妳未曾察覺\n就像玉米田可以不認識北回歸線\n或許在寂寥的午後，或許夜闌與黎明\n蔗園、部落、林道、峭壁、沖積扇\n默默我願漂流成妳沿途的風景\n\n",
	    "vote_count": 192,
	    "official_url": "https://www.facebook.com/yenfanchang\n\n",
	    "winners": false
	  },
	  {
	    "id": 39,
	    "title": "希望",
	    "track_id": 211594044,
	    "author_name": "KNOCK樂團",
	    "desc": "台灣是我們的家，是我們生長的地方，\n縱使歷經了許多悲傷、衝突、拉扯，\n留下了一些無法抹滅的傷口和瘡疤，\n但也因此，我們更能有意識地，\n感受這片土地所富有的美、好、和溫暖，\n認識自己是誰，找出自己的光芒。 \n\n所以，就放下原有的政黨色彩、放下所有過去的政治鬥爭吧！\n就只需要因為「我們都是台灣這片土地生長茁壯的人」，\n就足夠讓我們可以一起，\n一起守護、期待、創造、迎接，這些讓人充滿希望的，\n我們的家——台灣，的希望！\n\n",
	    "lyrics": "詞. 曲／黃星豪\n編曲／黃星豪、廖辰晏\n主唱／許右欣\n吉他／黃星豪\n烏克麗麗／廖辰晏\n\n這是我們的家 我們的土壤\n每個小枝芽 都在這裡慢慢成長\n這是我們的家 我們的太陽\n給我們溫暖 看不見的黑全都照亮\n把所有的悲傷 一絲不留地遺忘吧\n把往事摺成紙飛機 飛吧\n\n讓我們牽著手 一起守護這個夢\n讓我們帶著笑 迎接未來的美好\n每一天晚上 期待著天上美麗的月光\n灑落下最閃耀的希望\n\n",
	    "vote_count": 270,
	    "official_url": "https://www.facebook.com/KNOCKofficial",
	    "winners": false
	  },
	  {
	    "id": 24,
	    "title": "我們還有夢",
	    "track_id": 211101462,
	    "author_name": "黃信欽",
	    "desc": "謹以此曲獻給堅強勇敢的台灣人民\n",
	    "lyrics": "高聳入雲端的氣流 掙扎在都市的角落\n雄踞著青春的衝動 你我都相同\n加快了速度的節奏 迎面輕吹來的微風\n油然而生的感動 你我都擁有\n時間不為誰而停留 低頭嘆息也沒有用\n今天帶給我的傷痛 提醒我們還有夢\n哦 我們還有夢\n哦 我們還有夢\n\n穿越過紅色的烈火 踏破了寂靜的夜空\n面對著駭人的野獸 也不要退縮\n堅持你純淨的笑容 抵抗那無情的災禍\n反正有我陪著你走 絕不會寂寞\n時間不為誰而停留 低頭嘆息也沒有用\n今天帶給我的傷痛 提醒我們還有夢\n哦 我們還有夢\n哦 我們還有夢",
	    "vote_count": 31,
	    "official_url": "https://www.facebook.com/asin.ohasin",
	    "winners": false
	  },
	  {
	    "id": 87,
	    "title": "嶼民",
	    "track_id": 212447821,
	    "author_name": "勞動服務樂團",
	    "desc": "臺灣過去，有許多值得尊敬的前輩，付出自己的一切，無論是有形生命，抑或默默無聲耕 耘。篳路藍縷，卻願提燈開路，為的是讓同樣生活在這片土地上的人民和子孫，能夠過更美好安定的生活，要我們正視自己的責任和身分：並學習反思 ──究竟生而為一個台灣人的內在價值為何？叫人不捨，這些逐漸被隱沒遺忘的人事物，需要後世緬懷和敬意，不只是一段被束之高閣的塵封過往。課本裡學不到的，也許可以唱給大家聽。引古鑑今，這些人過往守護的核心價值不寐，將火矩傳予新世代的我們，引領出一波波公民覺醒運動，和老百姓對社會議題的重新關注；待革新的挑戰，大家接過了生命的燈，繼續披荊斬棘，邊走，邊唱。",
	    "lyrics": "(河洛語)\n雖然是黑暗暝，倔強的鼓吹花；\n散發著民主的清香。\n行佇這條路，咱舉著太陽花；\n不驚風吹日頭曬。\n\n英文 RAP )\nFeeling bright the light will shine right,\nTo the place we live on, feel the pride,\nOur homeland is surrounding with hope,\nThe mountain, the ocean, the trees and all y’all folks,\nSince every time we try to make a change,\nAnd for this time it’s your only chance.\nStand up for your right is not only a slogan,\nOne time for your mind taking action is golden\n\n(副歌)\n咱攏是臺灣的囝仔，覺醒就要趁今嘛；\n咱攏是臺灣的囝仔，改變未來的希望。\n\n*間奏\n\n(河洛語)\n手中的彩虹旗，敢借問天公伯仔；\n咱甘有什麼不同。\n東部有美麗海岸，馬祖魚守護大海；\n這是子孫萬代站起的所在。\n\n(河洛語 RAP )\n崑濱伯後壁種田種出冠軍好米，\n阿嬤10元便當照顧咱過了舒適。\n陳澄波作畫彼落美麗的諸羅山，\n王金河醫生治療病人的烏腳。\n梅心怡教授舉辦party為人權，\n蔣渭水維護台灣人的民族尊嚴。\n點著白色的蠟燭，咱逗陣來唱歌，\nNylon點燈照光甲咱講欲往叨位走。\n\n*間奏\n\n(河洛語 RAP )\n民主先進站出來，挑戰威權的體制；\n勇敢走向街頭創造一個自由天地。\n鹽寮的序大，為反核代先發聲；\n社會開始思考萬物共生的未來。\n張藥房壁頂畫著一幅圓滿的家園，\n少年囝仔捍衛咱的土地正義。\n花蕊開滿山坪咱著繼續傳承，\n你我作夥守護寶島行出光明前程。\n\n(副歌)\n咱攏是臺灣的囝仔，不驚苦難來拖磨。\n咱攏是臺灣的囝仔，打拼生活向前走。\n\n(黃信介演講片段)\n咱等咧就向前行，向自由行，向民主行！\n\n",
	    "vote_count": 2198,
	    "official_url": "https://www.facebook.com/CommunityService",
	    "winners": true
	  },
	  {
	    "id": 10,
	    "title": "北投少年家",
	    "track_id": 211101489,
	    "author_name": "許偌珩",
	    "desc": "",
	    "lyrics": "自細漢就愛爬爬走 厝邊頭尾攏知影阮的名\n頭前有山 後壁有溫泉 阮家就是住在北投\n\n北投的低厝啊滿滿是\n伊厝阮厝的囡仔 每擺攏嘛歸陣來行\n打來打去 沒代誌就摸阮的頭\n真是啊瘋叮噹\n\n洗溫泉的人客來來去去\n隔壁的阿姨 每擺攏嘛抹甲紅吱吱\n笑來笑去 沒代誌就摸阮的頭\n真是啊瘋叮噹\n\n陰暗的那卡西 遠遠啊傳出來\n唱啊那麼悲哀 哪是要怨嘆什麼\n陰暗的茶店裡面 遠遠啊有人影\n叫啊那麼難聽 那像要喊救人\n\n十七八歲當好大 沒代沒誌擱有查某拉來拉去\n十七八歲當好大 沒代沒誌擱有查某拉來拉去\n\n阮擱是北投的少年家 阮就是自細漢看甲大漢\n阮擱是北投的少年家 阮就是看破啊離開北投\n\n看到北投ㄟ 起來擱落去 起來擱落去 起來擱落下去\n咚.. 咚.. 咚.. 咚.. ",
	    "vote_count": 23,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 152,
	    "title": "寶島的惜情人",
	    "track_id": 212748368,
	    "author_name": "詞：鴻超凡、蕭妤欣 曲：蕭妤欣",
	    "desc": "我們想用這首歌，獻給寶島的惜情人們。\n主歌以國語鼓勵著每顆為這片土地默默付出的心，\n暖陽象徵希望，向陽花代表民主，\n白鴿象徵和平，藍絲緞代表自由，\n無論世界如何瞬息萬變，\n都要勇敢的堅守我們的愛與初衷。\n表達對臺灣的熱愛不能沒有臺語，\n是故副歌以台語搭配琅琅上口好記的歌詞，\n手牽手、走相偎，\n永遠做那個愛台灣的──寶島的惜情人。",
	    "lyrics": "如果冬天的暖陽 不再為你升起\n請栽一盆向陽花 呼喚他甦醒\n如果夏日的白鴿 不再繼續飛行\n請繫一條藍絲緞 幫助他回憶\n\n不會永遠都在黑暗中哭泣\n勇氣會帶領我們找到光明\n人們高亢吶喊的理想\n有天會大聲的唱\n\n一世人 袂做愛土地的囝仔\n無倘放 得來甲咱的手牽緊緊\n唱出咱的愛 永遠走相偎\n每一人 都是寶島的惜情人",
	    "vote_count": 183,
	    "official_url": "https://www.facebook.com/profile.php?id=100000258232419&pnref=story",
	    "winners": false
	  },
	  {
	    "id": 91,
	    "title": "￼￼￼￼￼￼￼￼￼￼￼￼￼￼三面作業",
	    "track_id": 212447845,
	    "author_name": "(Shawn Chang)張介豪",
	    "desc": "馬克・土溫說：\n“對國家忠誠，對政府也忠誠...如果它值得。”\n\n我覺得，不值得效忠的政府，消極的背棄它是不夠的。\n更要以最激進的方式，去推倒它。\n因為民主，是戰鬥的制度。是不斷的爭取而進步的制度。\n\n為台灣民主的未來，我也踏出一步。",
	    "lyrics": "不多夢，不多朋友， \n四小龍 ，桶裡養著的泥鰍。 \n被吃定的泥鰍。\n\n是不同，更沒理由舉手。\n這一篇，三面作業，\n吾放著沒法做。\n\n黑壓壓，\n看不懂，看懂沒用。\n伸手摸，什麼都沒有。\n這箱子裡，只有隻手。\n\n還給我，\n真的自由。\n天枰上，所有人一樣重。\n\n昨天的人為今天的我們掌舵，\n不如換我來做。\n\n一面牆，兩面立場，\n第三面不愛紅太陽。\n這就是我們的框框。\n\n換方向，對準力量，\n不投降。\n\n這一課三面作業，\n吾不要你講。\n三面作業，\n吾答案我想。\n三面作業，\n從現在補上。\n\n啊吾黨，\n不藍綠不橘黃。\n它是所有人的理想。\n\n還給我真的自由。\n還給我真的自由。\n\n不再伺侯。\n這不是運動是戰鬥。",
	    "vote_count": 68,
	    "official_url": "https://www.facebook.com/shawn.chang.1650",
	    "winners": false
	  },
	  {
	    "id": 115,
	    "title": "Sunshine",
	    "track_id": 212582404,
	    "author_name": "SISAY ( 花開)/Amado Maigua",
	    "desc": "Sunshine brighten Taiwan from the sky to provide an energy and harmony",
	    "lyrics": "Amado Maigua / SISAY ",
	    "vote_count": 22,
	    "official_url": "http://www.sisayworld.com",
	    "winners": false
	  },
	  {
	    "id": 161,
	    "title": "自由的白鷺鷥",
	    "track_id": 212748544,
	    "author_name": "葉斯偉 陳品章",
	    "desc": "各行各業都有各自辛苦的地方\n就算書讀的不多\n只要有恆心 不怕艱辛  一定能成功\n勇敢踏出腳步  走向國際\n\n",
	    "lyrics": "惦在這個土地  做著有理想的夢    按怎欲麥繼續行   \n我沒讀冊但是我有打拼  一步一步行  遇到困難我欲沒在驚\n\n嗚～嗚嗚嗚～～嗚嗚～嗚～～嗚～～\n怨天怨地怨嘆怨差   遐麻無卡爪\n\n嗚～嗚嗚嗚～～嗚嗚～嗚～～嗚～～\n偷吃拐騙的日子     你干唔驚\n\n（自由的～白鷺鷥）\n踩出腳步走找  長輩細漢的記憶\n飛向天邊飛到  世界攏A看見 \n用翅膀溫暖像  阿母疼子A心情\n帶我走闖直到  看見自己的名字\n\n那魯灣嘟～伊呀那伊呀嗨\n那魯灣嘟～伊呀那伊呀嗨\n那魯灣嘟～伊呀那伊呀嗨\n\n",
	    "vote_count": 471,
	    "official_url": "https://www.facebook.com/swee7268",
	    "winners": false
	  },
	  {
	    "id": 61,
	    "title": "獨立進行曲",
	    "track_id": 212071651,
	    "author_name": "黃大奎",
	    "desc": "一首充滿批判力道與積極正面能量的「指責式情歌」，\n以情歌暗喻政治，以情歌台獨建國！\n國民黨不倒，台灣不會好；台灣能建國，子孫一定好！\n建國！建國！建國！\n（特此聲明，本人非建國中學畢業，與該校無關。= =）",
	    "lyrics": "尋找一個理由，為何不能逃脫；            \n看不開只是，一個藉口。\n沒有人告訴我，朋友該怎麼做，\n冷漠與逃避，才能解脫！\n\n想要對妳說聲，再會我的愛人！\n我一廂情願，犯下大錯！\n不想浪費時間！沒有曖昧空間！\n獨立或統一，各自選邊！！\n\n啊~~今生無緣~~~\n不再~~~~想著妳！          \n啊~~來生再會，\n我要，學會放棄！\n\n尋找一個理由，為何不能逃脫；           \n看不開只是，一個藉口。\n沒有人告訴我，朋友該怎麼做，\n冷漠與逃避，才能解脫！\n\n想要對妳說聲，再見無緣的人！\n不想再為妳，忍辱吞聲！\n算是我瞎了眼！愛上妳這種人！！\n不再對妳有，任何眷戀！！\n\n啊~~今生無緣~~~\n不再~~~~想著妳！          \n啊~~來生再會，\n我要，學會放棄！\n\n啊~~今生無緣~~~\n不再~~~~想著妳！          \n啊~~來生再會，\n我要，學會獨立！ （啊！） \n\n",
	    "vote_count": 24,
	    "official_url": "",
	    "winners": false
	  },
	  {
	    "id": 157,
	    "title": "社運女孩",
	    "track_id": 212748459,
	    "author_name": "G-Rass",
	    "desc": "一個喜歡Hip hop的男孩遇到了一起參加社運的搖滾主唱女孩,開始互相討論分享彼此喜歡的音樂,男孩總是拿著吉他幫女孩彈奏著她最喜歡的搖滾樂,因為政治理念相合,一起參加許多社運活動,一起大聲訴求,一起熱情吶喊,一起感動彼此,雖然最後女孩出國留學,但這段回憶依舊清晰,於是男孩還是拿起了筆,記錄這一段故事,想對她說nice to meet you ,讓我能夠繼續前進～～",
	    "lyrics": "這是一個輾轉難眠的黑夜失眠的夜坐著醒著怎麼陽光還不出現,我拿起CD聽著久違的RnB,有感而發想起過去的you and me.\n開始的時候是被妳的熱誠打動,我彈著吉他學著試著體會你的感受,妳說妳喜歡Rock’n’Roll是個樂團主唱,I love hip hop喜歡Biggie and 2pac.\n那時的我應該是個Hip hop addict ,彼此交流音樂你開始聽 illmatic, 我第一次拿起吉他吟唱著電台司令,漸漸發現你佔據了我的整個思緒.\nnice to meet you ,總是感到心跳的亂快的,你的微笑讓人忘記了生活的煩惱,社會的紛擾,獲得心靈寄託再也不用每天祈禱.\n\nGirl i love you since the first tome you give a smile , but  don’t ask the reason I can’t tell you why,\nWhen I hold you hand I feel like in wonderland , I feel wonderful if you say you love me too .\n\n在靜坐廣場上我們聽著音樂,不管多久好像都不會覺得想睡,ok,all night keep playing the  music ,DJ iTunes drop the beat don’t stop it.\nShe’s loving 就是這樣子的grooving ,律動的Bass搭配重鼓讓她更加清醒,溫暖的聲音,感動直達心底,譜出浪漫樂曲就像JM彈Gravity.\n我拿起筆開始寫下這記憶中的妳,用社運寫日記大巨蛋還有立院裡,正義與公理我們追求和尋找,融會貫通在寫詞的文字和韻腳.\n能用旋律節奏加上一段詞,來表達共同追尋中的期望值,過往的回憶腦海中依舊不停延續,nice to meet you讓我能夠繼續前進.\n\nGirl i love you since the first tome you give a smile , don’t ask the reason I can’t tell you why,\nWhen I hold you hand I feel like in wonderland , I feel wonderful if you say you love me too .\n\nnice to meet you ,總是感到心跳的亂快的,你的微笑讓人忘記了生活的煩惱,社會的紛擾,獲得心靈寄託再也不用每天祈禱.\n能用旋律節奏加上一段詞,來表達共同追尋中的期望值,過往的回憶腦海中依舊不停延續,nice to meet you讓我能夠繼續前進.\n\nGirl i love you since the first tome you give a smile , don’t ask the reason I can’t tell you why,\nWhen I hold you hand I feel like in wonderland , I feel wonderful if you say you love me too .",
	    "vote_count": 88,
	    "official_url": "https://www.facebook.com/pages/G-Rass/157431664325292?fref=ts",
	    "winners": false
	  },
	  {
	    "id": 11,
	    "title": "生根的煙攤",
	    "track_id": 211101485,
	    "author_name": "許偌珩",
	    "desc": "",
	    "lyrics": "盤山過嶺來到了宜蘭 \n有淡薄啊故事來講\n宜蘭市的康樂街一個老太太\n靠著賣煙來生活\n\n返來故鄉啊 經過康樂街\n老太太已經知影阮要抽什麼牌的煙\n\n經過幾十年 伊攏無遷位 默默啊在賣煙\n生根的煙攤 親像宜蘭人 有個性有耐力\n\n歷史的變化 宜蘭的開墾 永遠攏放袂煞\n歷史的見証 宜蘭的爭取 為著我們的子孫\n\n你不倘忘記 你不倘忘記 老厝邊啊\n你不倘忘記 你不倘忘記 返來擱抽一支煙",
	    "vote_count": 20,
	    "official_url": "",
	    "winners": false
	  }
	];

	module.exports =  datas;


/***/ }
/******/ ]);