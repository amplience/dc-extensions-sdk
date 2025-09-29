(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.dcExtensionsSdk = {}));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    (function(global) {
      /**
       * Polyfill URLSearchParams
       *
       * Inspired from : https://github.com/WebReflection/url-search-params/blob/master/src/url-search-params.js
       */

      var checkIfIteratorIsSupported = function() {
        try {
          return !!Symbol.iterator;
        } catch (error) {
          return false;
        }
      };


      var iteratorSupported = checkIfIteratorIsSupported();

      var createIterator = function(items) {
        var iterator = {
          next: function() {
            var value = items.shift();
            return { done: value === void 0, value: value };
          }
        };

        if (iteratorSupported) {
          iterator[Symbol.iterator] = function() {
            return iterator;
          };
        }

        return iterator;
      };

      /**
       * Search param name and values should be encoded according to https://url.spec.whatwg.org/#urlencoded-serializing
       * encodeURIComponent() produces the same result except encoding spaces as `%20` instead of `+`.
       */
      var serializeParam = function(value) {
        return encodeURIComponent(value).replace(/%20/g, '+');
      };

      var deserializeParam = function(value) {
        return decodeURIComponent(String(value).replace(/\+/g, ' '));
      };

      var polyfillURLSearchParams = function() {

        var URLSearchParams = function(searchString) {
          Object.defineProperty(this, '_entries', { writable: true, value: {} });
          var typeofSearchString = typeof searchString;

          if (typeofSearchString === 'undefined') ; else if (typeofSearchString === 'string') {
            if (searchString !== '') {
              this._fromString(searchString);
            }
          } else if (searchString instanceof URLSearchParams) {
            var _this = this;
            searchString.forEach(function(value, name) {
              _this.append(name, value);
            });
          } else if ((searchString !== null) && (typeofSearchString === 'object')) {
            if (Object.prototype.toString.call(searchString) === '[object Array]') {
              for (var i = 0; i < searchString.length; i++) {
                var entry = searchString[i];
                if ((Object.prototype.toString.call(entry) === '[object Array]') || (entry.length !== 2)) {
                  this.append(entry[0], entry[1]);
                } else {
                  throw new TypeError('Expected [string, any] as entry at index ' + i + ' of URLSearchParams\'s input');
                }
              }
            } else {
              for (var key in searchString) {
                if (searchString.hasOwnProperty(key)) {
                  this.append(key, searchString[key]);
                }
              }
            }
          } else {
            throw new TypeError('Unsupported input\'s type for URLSearchParams');
          }
        };

        var proto = URLSearchParams.prototype;

        proto.append = function(name, value) {
          if (name in this._entries) {
            this._entries[name].push(String(value));
          } else {
            this._entries[name] = [String(value)];
          }
        };

        proto.delete = function(name) {
          delete this._entries[name];
        };

        proto.get = function(name) {
          return (name in this._entries) ? this._entries[name][0] : null;
        };

        proto.getAll = function(name) {
          return (name in this._entries) ? this._entries[name].slice(0) : [];
        };

        proto.has = function(name) {
          return (name in this._entries);
        };

        proto.set = function(name, value) {
          this._entries[name] = [String(value)];
        };

        proto.forEach = function(callback, thisArg) {
          var entries;
          for (var name in this._entries) {
            if (this._entries.hasOwnProperty(name)) {
              entries = this._entries[name];
              for (var i = 0; i < entries.length; i++) {
                callback.call(thisArg, entries[i], name, this);
              }
            }
          }
        };

        proto.keys = function() {
          var items = [];
          this.forEach(function(value, name) {
            items.push(name);
          });
          return createIterator(items);
        };

        proto.values = function() {
          var items = [];
          this.forEach(function(value) {
            items.push(value);
          });
          return createIterator(items);
        };

        proto.entries = function() {
          var items = [];
          this.forEach(function(value, name) {
            items.push([name, value]);
          });
          return createIterator(items);
        };

        if (iteratorSupported) {
          proto[Symbol.iterator] = proto.entries;
        }

        proto.toString = function() {
          var searchArray = [];
          this.forEach(function(value, name) {
            searchArray.push(serializeParam(name) + '=' + serializeParam(value));
          });
          return searchArray.join('&');
        };


        global.URLSearchParams = URLSearchParams;
      };

      var checkIfURLSearchParamsSupported = function() {
        try {
          var URLSearchParams = global.URLSearchParams;

          return (new URLSearchParams('?a=1').toString() === 'a=1') && (typeof URLSearchParams.prototype.set === 'function');
        } catch (e) {
          return false;
        }
      };

      if (!checkIfURLSearchParamsSupported()) {
        polyfillURLSearchParams();
      }

      var proto = global.URLSearchParams.prototype;

      if (typeof proto.sort !== 'function') {
        proto.sort = function() {
          var _this = this;
          var items = [];
          this.forEach(function(value, name) {
            items.push([name, value]);
            if (!_this._entries) {
              _this.delete(name);
            }
          });
          items.sort(function(a, b) {
            if (a[0] < b[0]) {
              return -1;
            } else if (a[0] > b[0]) {
              return +1;
            } else {
              return 0;
            }
          });
          if (_this._entries) { // force reset because IE keeps keys index
            _this._entries = {};
          }
          for (var i = 0; i < items.length; i++) {
            this.append(items[i][0], items[i][1]);
          }
        };
      }

      if (typeof proto._fromString !== 'function') {
        Object.defineProperty(proto, '_fromString', {
          enumerable: false,
          configurable: false,
          writable: false,
          value: function(searchString) {
            if (this._entries) {
              this._entries = {};
            } else {
              var keys = [];
              this.forEach(function(value, name) {
                keys.push(name);
              });
              for (var i = 0; i < keys.length; i++) {
                this.delete(keys[i]);
              }
            }

            searchString = searchString.replace(/^\?/, '');
            var attributes = searchString.split('&');
            var attribute;
            for (var i = 0; i < attributes.length; i++) {
              attribute = attributes[i].split('=');
              this.append(
                deserializeParam(attribute[0]),
                (attribute.length > 1) ? deserializeParam(attribute[1]) : ''
              );
            }
          }
        });
      }

      // HTMLAnchorElement

    })(
      (typeof commonjsGlobal !== 'undefined') ? commonjsGlobal
        : ((typeof window !== 'undefined') ? window
        : ((typeof self !== 'undefined') ? self : commonjsGlobal))
    );

    (function(global) {
      /**
       * Polyfill URL
       *
       * Inspired from : https://github.com/arv/DOM-URL-Polyfill/blob/master/src/url.js
       */

      var checkIfURLIsSupported = function() {
        try {
          var u = new global.URL('b', 'http://a');
          u.pathname = 'c%20d';
          return (u.href === 'http://a/c%20d') && u.searchParams;
        } catch (e) {
          return false;
        }
      };


      var polyfillURL = function() {
        var _URL = global.URL;

        var URL = function(url, base) {
          if (typeof url !== 'string') url = String(url);

          // Only create another document if the base is different from current location.
          var doc = document, baseElement;
          if (base && (global.location === void 0 || base !== global.location.href)) {
            doc = document.implementation.createHTMLDocument('');
            baseElement = doc.createElement('base');
            baseElement.href = base;
            doc.head.appendChild(baseElement);
            try {
              if (baseElement.href.indexOf(base) !== 0) throw new Error(baseElement.href);
            } catch (err) {
              throw new Error('URL unable to set base ' + base + ' due to ' + err);
            }
          }

          var anchorElement = doc.createElement('a');
          anchorElement.href = url;
          if (baseElement) {
            doc.body.appendChild(anchorElement);
            anchorElement.href = anchorElement.href; // force href to refresh
          }

          if (anchorElement.protocol === ':' || !/:/.test(anchorElement.href)) {
            throw new TypeError('Invalid URL');
          }

          Object.defineProperty(this, '_anchorElement', {
            value: anchorElement
          });


          // create a linked searchParams which reflect its changes on URL
          var searchParams = new global.URLSearchParams(this.search);
          var enableSearchUpdate = true;
          var enableSearchParamsUpdate = true;
          var _this = this;
          ['append', 'delete', 'set'].forEach(function(methodName) {
            var method = searchParams[methodName];
            searchParams[methodName] = function() {
              method.apply(searchParams, arguments);
              if (enableSearchUpdate) {
                enableSearchParamsUpdate = false;
                _this.search = searchParams.toString();
                enableSearchParamsUpdate = true;
              }
            };
          });

          Object.defineProperty(this, 'searchParams', {
            value: searchParams,
            enumerable: true
          });

          var search = void 0;
          Object.defineProperty(this, '_updateSearchParams', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: function() {
              if (this.search !== search) {
                search = this.search;
                if (enableSearchParamsUpdate) {
                  enableSearchUpdate = false;
                  this.searchParams._fromString(this.search);
                  enableSearchUpdate = true;
                }
              }
            }
          });
        };

        var proto = URL.prototype;

        var linkURLWithAnchorAttribute = function(attributeName) {
          Object.defineProperty(proto, attributeName, {
            get: function() {
              return this._anchorElement[attributeName];
            },
            set: function(value) {
              this._anchorElement[attributeName] = value;
            },
            enumerable: true
          });
        };

        ['hash', 'host', 'hostname', 'port', 'protocol']
          .forEach(function(attributeName) {
            linkURLWithAnchorAttribute(attributeName);
          });

        Object.defineProperty(proto, 'search', {
          get: function() {
            return this._anchorElement['search'];
          },
          set: function(value) {
            this._anchorElement['search'] = value;
            this._updateSearchParams();
          },
          enumerable: true
        });

        Object.defineProperties(proto, {

          'toString': {
            get: function() {
              var _this = this;
              return function() {
                return _this.href;
              };
            }
          },

          'href': {
            get: function() {
              return this._anchorElement.href.replace(/\?$/, '');
            },
            set: function(value) {
              this._anchorElement.href = value;
              this._updateSearchParams();
            },
            enumerable: true
          },

          'pathname': {
            get: function() {
              return this._anchorElement.pathname.replace(/(^\/?)/, '/');
            },
            set: function(value) {
              this._anchorElement.pathname = value;
            },
            enumerable: true
          },

          'origin': {
            get: function() {
              // get expected port from protocol
              var expectedPort = { 'http:': 80, 'https:': 443, 'ftp:': 21 }[this._anchorElement.protocol];
              // add port to origin if, expected port is different than actual port
              // and it is not empty f.e http://foo:8080
              // 8080 != 80 && 8080 != ''
              var addPortToOrigin = this._anchorElement.port != expectedPort &&
                this._anchorElement.port !== '';

              return this._anchorElement.protocol +
                '//' +
                this._anchorElement.hostname +
                (addPortToOrigin ? (':' + this._anchorElement.port) : '');
            },
            enumerable: true
          },

          'password': { // TODO
            get: function() {
              return '';
            },
            set: function(value) {
            },
            enumerable: true
          },

          'username': { // TODO
            get: function() {
              return '';
            },
            set: function(value) {
            },
            enumerable: true
          },
        });

        URL.createObjectURL = function(blob) {
          return _URL.createObjectURL.apply(_URL, arguments);
        };

        URL.revokeObjectURL = function(url) {
          return _URL.revokeObjectURL.apply(_URL, arguments);
        };

        global.URL = URL;

      };

      if (!checkIfURLIsSupported()) {
        polyfillURL();
      }

      if ((global.location !== void 0) && !('origin' in global.location)) {
        var getOrigin = function() {
          return global.location.protocol + '//' + global.location.hostname + (global.location.port ? (':' + global.location.port) : '');
        };

        try {
          Object.defineProperty(global.location, 'origin', {
            get: getOrigin,
            enumerable: true
          });
        } catch (e) {
          setInterval(function() {
            global.location.origin = getOrigin();
          }, 100);
        }
      }

    })(
      (typeof commonjsGlobal !== 'undefined') ? commonjsGlobal
        : ((typeof window !== 'undefined') ? window
        : ((typeof self !== 'undefined') ? self : commonjsGlobal))
    );

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics$1 = function(d, b) {
        extendStatics$1 = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics$1(d, b);
    };

    function __extends$1(d, b) {
        extendStatics$1(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign$1 = function() {
        __assign$1 = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign$1.apply(this, arguments);
    };

    /**
     * The set of possible message types.
     */
    var MESSAGE_TYPE;
    (function (MESSAGE_TYPE) {
        MESSAGE_TYPE["SUBSCRIBE"] = "subscribe";
        MESSAGE_TYPE["EMIT"] = "emit";
        MESSAGE_TYPE["REQUEST"] = "request";
        MESSAGE_TYPE["RESOLVE"] = "resolve";
        MESSAGE_TYPE["REJECT"] = "reject";
    })(MESSAGE_TYPE || (MESSAGE_TYPE = {}));
    /**
     * The set of internally used event triggers that can be bound to.
     */
    var MC_EVENTS;
    (function (MC_EVENTS) {
        MC_EVENTS["HANDSHAKE"] = "mc-handshake";
        MC_EVENTS["CONNECTED"] = "mc-connected";
        MC_EVENTS["DISCONNECTED"] = "mc-disconnected";
        MC_EVENTS["CONNECTION_TIMEOUT"] = "mc-connection-timeout";
    })(MC_EVENTS || (MC_EVENTS = {}));
    /**
     * Connection Base Class.
     *
     * It is used to provide the shared functionality of [[ServerConnection]] and [[ClientConnection]]
     *
     */
    var Connection = /** @class */ (function () {
        /**
         * Creates a Connection instance.
         * @param options Connection configuration options
         * @param options.timeout Default request timeout (ms). This will trigger a reject on a any request that takes longer than this value. 200ms by default.
         * @param options.connectionTimeout Connection timeout (ms). This will trigger the CONNECTION_TIMEOUT if a connection hasn't been established by this time.
         * @param options.debug Enabling uses console.log to output what MC is doing behind the scenes. Used for debugging. Disabled by default.
         * @param options.onload Uses the onload event of an iframe to trigger the process for creating a connection. If set to false the connection process needs to be triggered manually. Note a connection will only work if the child frame has loaded. Enabled by default.
         * @param options.targetOrigin Limits the iframe to send messages to only the specified origins. '*' by Default.
         * @param options.clientInitiates Awaits an postMessage (init) trigger from the child before it sets up and sends the MessageChannel port to the child. false by Default.
         */
        function Connection(options) {
            if (options === void 0) { options = {}; }
            /**
             * Indicates if a connection has been established
             */
            this.connected = false;
            this.backlog = [];
            this.promises = {};
            this.emitters = {};
            this.connectionStep = '';
            this.defaultOptions = {
                window: window,
                connectionTimeout: 2000,
                timeout: 200,
                debug: false,
                onload: true,
                clientInitiates: false,
                targetOrigin: '*'
            };
            this.options = __assign$1({}, this.defaultOptions, options);
        }
        /**
         * This method will emit an event to its counterpart.
         * @param event The name of the event to emit.
         * @param payload Payload to be sent with the event.
         * @return Returns Connection instance.
         */
        Connection.prototype.emit = function (event, payload) {
            this.message({
                type: MESSAGE_TYPE.EMIT,
                event: event,
                payload: payload
            });
            return this;
        };
        /**
         * Bind a callback to an event.
         * @param event The name of the event to listen for.
         * @param callback The function to call when the event is fired.
         * @return Returns Connection instance.
         */
        Connection.prototype.on = function (event, callback) {
            if (this.emitters[event] && Array.isArray(this.emitters[event])) {
                this.emitters[event].push(callback);
            }
            else {
                this.emitters[event] = [callback];
            }
            return this;
        };
        /**
         * Make a request of the counterpart. It will automatically reject the promise if the timeout time is exceeded.
         * @param event The name of the event to emit
         * @param payload Payload to be sent with the request
         * @param options
         * @param options.timeout Override for the default promise timeout, can be an interger or false
         * @returns A promise that can resolve with any payload
         */
        Connection.prototype.request = function (event, payload, options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            return new Promise(function (resolve, reject) {
                var uuid = _this.uuidv4();
                var timeout = _this.getRequestTimeout(options.timeout);
                var ct;
                if (timeout !== false && typeof timeout === 'number') {
                    ct = window.setTimeout(function () { return reject('timeout'); }, timeout);
                }
                _this.promises[uuid] = {
                    resolve: function (resolvedData) {
                        resolve(resolvedData);
                        if (ct) {
                            clearTimeout(ct);
                        }
                    },
                    reject: function (error) {
                        reject(error);
                        if (ct) {
                            clearTimeout(ct);
                        }
                    }
                };
                _this.message({
                    type: MESSAGE_TYPE.REQUEST,
                    event: event,
                    id: uuid,
                    payload: payload
                });
            });
        };
        /**
         * Close the port being used to communicate. It will prevent any further messages being sent or received.
         */
        Connection.prototype.close = function () {
            if (this.connected) {
                this.port.close();
                this.connected = false;
            }
            if (this.messageListener) {
                this.options.window.removeEventListener('message', this.messageListener, false);
            }
        };
        Connection.prototype.setConnectionTimeout = function () {
            var _this = this;
            clearTimeout(this.connectionTimeout);
            if (this.options.connectionTimeout !== false) {
                this.connectionTimeout = window.setTimeout(function () {
                    if (_this.messageListener) {
                        _this.options.window.removeEventListener('message', _this.messageListener, false);
                    }
                    _this.handleMessage({
                        type: MESSAGE_TYPE.EMIT,
                        event: MC_EVENTS.CONNECTION_TIMEOUT,
                        payload: { message: 'Connection timed out while ' + _this.connectionStep }
                    });
                }, Number(this.options.connectionTimeout));
            }
        };
        Connection.prototype.uuidv4 = function () {
            var crypt = window.crypto || window.msCrypto;
            return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
                return (c ^ (crypt.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16);
            });
        };
        Connection.prototype.clearConnectionTimeout = function () {
            clearTimeout(this.connectionTimeout);
        };
        Connection.prototype.initPortEvents = function () {
            var _this = this;
            this.port.onmessage = function (message) {
                _this.handleMessage(message.data);
            };
            this.port.onmessageerror = function (error) {
                _this.handleError(error);
            };
        };
        Connection.prototype.finishInit = function () {
            this.connected = true;
            this.clearConnectionTimeout();
            if (this.options.debug) {
                console.log("Finished connection on " + (this.isClient() ? 'client' : 'server'));
            }
            this.emit(MC_EVENTS.CONNECTED);
            this.completeBacklog();
        };
        Connection.prototype.completeBacklog = function () {
            var _this = this;
            this.backlog.forEach(function (message) {
                _this.portMessage(message);
            });
            this.backlog = [];
        };
        Connection.prototype.handleError = function (error) {
            if (this.options.debug) {
                console.error(error);
            }
        };
        Connection.prototype.handleMessage = function (message) {
            var _this = this;
            if (this.options.debug) {
                console.log("handle by " + (this.isClient() ? 'client' : 'server') + " - [" + message.type + "] \"" + message.event + "\", payload: ", message.payload);
            }
            switch (message.type) {
                case MESSAGE_TYPE.EMIT:
                    if (!this.emitters[message.event] || !Array.isArray(this.emitters[message.event])) {
                        return;
                    }
                    this.emitters[message.event].forEach(function (cb) { return cb(message.payload); });
                    break;
                case MESSAGE_TYPE.REQUEST:
                    if (!this.emitters[message.event] || !Array.isArray(this.emitters[message.event])) {
                        return;
                    }
                    this.emitters[message.event].forEach(function (cb) {
                        return cb(message.payload, function (payload) {
                            _this.message({
                                id: message.id,
                                type: MESSAGE_TYPE.RESOLVE,
                                event: message.event,
                                payload: payload
                            });
                        }, function (payload) {
                            _this.message({
                                id: message.id,
                                type: MESSAGE_TYPE.REJECT,
                                event: message.event,
                                payload: payload
                            });
                        });
                    });
                    break;
                case MESSAGE_TYPE.RESOLVE:
                    if (!this.promises[message.id]) {
                        return;
                    }
                    this.promises[message.id].resolve(message.payload);
                    delete this.promises[message.id];
                    break;
                case MESSAGE_TYPE.REJECT:
                    if (!this.promises[message.id]) {
                        return;
                    }
                    this.promises[message.id].reject(message.payload);
                    delete this.promises[message.id];
                    break;
            }
        };
        Connection.prototype.getRequestTimeout = function (timeout) {
            if (typeof timeout === 'number' && timeout >= 0) {
                return timeout;
            }
            else if (typeof timeout === 'number') {
                return 0;
            }
            else if (timeout === true) {
                return this.options.timeout;
            }
            else if (timeout === false) {
                return false;
            }
            else {
                return this.options.timeout;
            }
        };
        Connection.prototype.isClient = function () {
            return false;
        };
        Connection.prototype.message = function (message) {
            var force = false;
            if (message.event === MC_EVENTS.HANDSHAKE ||
                message.event === MC_EVENTS.CONNECTED ||
                message.event === MC_EVENTS.DISCONNECTED) {
                force = true;
            }
            if (!this.connected && !force) {
                this.backlog.push(message);
            }
            else if (this.port) {
                this.portMessage(message);
            }
        };
        Connection.prototype.portMessage = function (message) {
            if (this.options.debug) {
                console.log("send from " + (this.isClient() ? 'client' : 'server') + " - [" + message.type + "] \"" + message.event + "\", payload: ", message.payload);
            }
            this.port.postMessage(message);
        };
        return Connection;
    }());

    var CONNECTION_STEPS;
    (function (CONNECTION_STEPS) {
        CONNECTION_STEPS["CONNECTION"] = "waiting for connection.";
        CONNECTION_STEPS["IFRAME_LOADING"] = "waiting for iframe to load.";
        CONNECTION_STEPS["INITIATION_FROM_CLIENT"] = "waiting for initiation from client.";
    })(CONNECTION_STEPS || (CONNECTION_STEPS = {}));
    /**
     * The parent side of the connection.
     */
    var ServerConnection = /** @class */ (function (_super) {
        __extends$1(ServerConnection, _super);
        /**
         *
         * @param frame The iframe target to setup the connection on.
         * @param options Connection configuration options.
         * @param options.timeout Default request timeout (ms). This will trigger a reject on a any request that takes longer than this value. 200ms by default.
         * @param options.connectionTimeout Connection timeout (ms). This will trigger the CONNECTION_TIMEOUT if a connection hasn't been established by this time.
         * @param options.debug Enabling uses console.log to output what MC is doing behind the scenes. Used for debugging. Disabled by default.
         * @param options.onload Uses the onload event of an iframe to trigger the process for creating a connection. If set to false the connection process needs to be triggered manually. Note a connection will only work if the child frame has loaded. Enabled by default.
         * @param options.targetOrigin Limits the iframe to send messages to only the specified origins. '*' by Default.
         * @param options.clientInitiates Awaits an postMessage (init) trigger from the child before it sets up and sends the MessageChannel port to the child. false by Default.
         */
        function ServerConnection(frame, options) {
            if (options === void 0) { options = {}; }
            var _this = _super.call(this, options) || this;
            _this.frame = frame;
            _this.connectionStep = CONNECTION_STEPS.CONNECTION;
            if (_this.options.onload) {
                _this.setupLoadInit();
            }
            if (_this.options.clientInitiates) {
                _this.setupClientInit();
            }
            _this.setConnectionTimeout();
            _this.on(MC_EVENTS.DISCONNECTED, function () { return _this.close(); });
            return _this;
        }
        ServerConnection.prototype.clientInitiation = function (e) {
            if (e.data === this.id) {
                this.connectionStep = CONNECTION_STEPS.CONNECTION;
                this.setConnectionTimeout();
                this.options.window.removeEventListener('message', this.messageListener, false);
                if (this.options.debug) {
                    console.log('Server: Client triggered initiation');
                }
                this.init();
            }
        };
        ServerConnection.prototype.setupLoadInit = function () {
            var _this = this;
            this.connectionStep = CONNECTION_STEPS.IFRAME_LOADING;
            this.frame.addEventListener('load', function () {
                _this.connectionStep = _this.options.clientInitiates
                    ? CONNECTION_STEPS.INITIATION_FROM_CLIENT
                    : CONNECTION_STEPS.CONNECTION;
                _this.setConnectionTimeout();
                _this.init();
            });
        };
        ServerConnection.prototype.setupClientInit = function () {
            var _this = this;
            this.connectionStep = CONNECTION_STEPS.INITIATION_FROM_CLIENT;
            this.id = this.uuidv4();
            var url = new URL(this.frame.src);
            url.searchParams.set('mc-name', this.id);
            this.frame.src = url.toString();
            this.messageListener = function (e) { return _this.clientInitiation(e); };
            this.options.window.addEventListener('message', this.messageListener);
        };
        /**
         * Used to trigger the initiation of a connection manually. To be used if the onload, and clientInitiates options are disabled.
         */
        ServerConnection.prototype.init = function () {
            if (!this.frame.contentWindow || !this.frame.src || this.connected) {
                return false;
            }
            this.setupChannel();
            this.initPortEvents();
            this.listenForHandshake();
            this.sendPortToClient(this.frame.contentWindow);
        };
        ServerConnection.prototype.sendPortToClient = function (client) {
            client.postMessage(null, this.options.targetOrigin ? this.options.targetOrigin : '*', [
                this.channel.port2
            ]);
        };
        ServerConnection.prototype.listenForHandshake = function () {
            var _this = this;
            this.on(MC_EVENTS.HANDSHAKE, function (payload, resolve) {
                resolve(payload);
                _this.finishInit();
            });
        };
        ServerConnection.prototype.setupChannel = function () {
            this.channel = new MessageChannel();
            this.port = this.channel.port1;
        };
        return ServerConnection;
    }(Connection));

    var CONNECTION_STEPS$1;
    (function (CONNECTION_STEPS) {
        CONNECTION_STEPS["CONNECTION"] = "waiting for connection.";
        CONNECTION_STEPS["HANDSHAKE"] = "waiting for handshake.";
    })(CONNECTION_STEPS$1 || (CONNECTION_STEPS$1 = {}));
    /**
     * The child side of a connection.
     */
    var ClientConnection = /** @class */ (function (_super) {
        __extends$1(ClientConnection, _super);
        function ClientConnection(options) {
            if (options === void 0) { options = {}; }
            var _this = _super.call(this, options) || this;
            _this.messageListener = function (e) { return _this.messageHandler(e); };
            _this.options.window.addEventListener('message', _this.messageListener);
            if (_this.options.connectionTimeout !== false) {
                _this.connectionStep = CONNECTION_STEPS$1.CONNECTION;
                _this.setConnectionTimeout();
            }
            return _this;
        }
        ClientConnection.prototype.init = function () {
            var url = new URL(this.options.window.location.toString());
            this.id = url.searchParams.get('mc-name');
            if (this.options.debug) {
                console.log('Client: sent postMessage value:', this.id);
            }
            this.options.window.parent.postMessage(this.id, this.options.targetOrigin);
        };
        ClientConnection.prototype.messageHandler = function (e) {
            if (e.ports[0]) {
                this.port = e.ports[0];
                this.initPortEvents();
                this.listenForHandshake();
                this.options.window.removeEventListener('message', this.messageListener);
            }
        };
        ClientConnection.prototype.listenForHandshake = function () {
            var _this = this;
            if (this.options.connectionTimeout !== false) {
                this.connectionStep = CONNECTION_STEPS$1.HANDSHAKE;
                this.setConnectionTimeout();
            }
            this.request(MC_EVENTS.HANDSHAKE, null, { timeout: false })
                .then(function () {
                _this.addBeforeUnloadEvent();
                _this.finishInit();
            })
                .catch(function (e) {
                _this.handleError(e);
            });
        };
        ClientConnection.prototype.addBeforeUnloadEvent = function () {
            var _this = this;
            this.options.window.addEventListener('beforeunload', function (event) {
                _this.emit(MC_EVENTS.DISCONNECTED);
                _this.close();
            });
        };
        ClientConnection.prototype.isClient = function () {
            return true;
        };
        return ClientConnection;
    }(Connection));

    var ERRORS_INIT;
    (function (ERRORS_INIT) {
        /**
         * We failed to fetch all the necessary data for displaying a custom control
         */
        ERRORS_INIT["CONTEXT"] = "Failed to fetch context for UI Extension";
        /**
         * Extension failed to connect to Dynamic content
         */
        ERRORS_INIT["CONNECTION_TIMEOUT"] = "Failed to establish connection to DC Application";
    })(ERRORS_INIT || (ERRORS_INIT = {}));
    var ERRORS_CONTENT_ITEM;
    (function (ERRORS_CONTENT_ITEM) {
        /**
         * Must supply content type ids in order to fetch a content item/reference
         */
        ERRORS_CONTENT_ITEM["NO_IDS"] = "Please provide content type ids";
    })(ERRORS_CONTENT_ITEM || (ERRORS_CONTENT_ITEM = {}));
    var ERRORS_FRAME;
    (function (ERRORS_FRAME) {
        /**
         * Must supply a number or nothing, this normally means you've provided a type setHeight can't handle
         */
        ERRORS_FRAME["SET_HEIGHT_NUMBER"] = "setHeight() only accepts an optional number argument";
    })(ERRORS_FRAME || (ERRORS_FRAME = {}));
    var FORM;
    (function (FORM) {
        /**
         * This normally means you're in a context where there is no model to return i.e Schema Editor
         */
        FORM["NO_MODEL"] = "Unable to retrieve form model as form context does not have an active model.";
    })(FORM || (FORM = {}));
    var EXTENSION;
    (function (EXTENSION) {
        /**
         * This means you are trying to load an extension that isn't supported by this SDK version
         */
        EXTENSION["UNSUPPORTED_EXTENSION"] = "Unsupported extension";
    })(EXTENSION || (EXTENSION = {}));
    var APPLICATION_NAVIGATOR;
    (function (APPLICATION_NAVIGATOR) {
        /**
         * The location href must include a #!
         */
        APPLICATION_NAVIGATOR["MUST_INCLUDE_HASH_BANG"] = "locationHref must include a hash bang (#!)";
    })(APPLICATION_NAVIGATOR || (APPLICATION_NAVIGATOR = {}));

    var CONTEXT;
    (function (CONTEXT) {
        CONTEXT["GET"] = "context-get";
    })(CONTEXT || (CONTEXT = {}));
    var CONTENT_ITEM;
    (function (CONTENT_ITEM) {
        CONTENT_ITEM["GET"] = "content-item-get";
    })(CONTENT_ITEM || (CONTENT_ITEM = {}));
    var MEDIA_LINK;
    (function (MEDIA_LINK) {
        MEDIA_LINK["IMAGE_GET"] = "media-image-get";
        MEDIA_LINK["VIDEO_GET"] = "media-video-get";
        MEDIA_LINK["GET"] = "media-get";
    })(MEDIA_LINK || (MEDIA_LINK = {}));
    var CONTENT_LINK;
    (function (CONTENT_LINK) {
        CONTENT_LINK["CONTENT_GET"] = "content-link-get";
    })(CONTENT_LINK || (CONTENT_LINK = {}));
    var CONTENT_REFERENCE;
    (function (CONTENT_REFERENCE) {
        CONTENT_REFERENCE["CONTENT_REF_GET"] = "content-reference-get";
    })(CONTENT_REFERENCE || (CONTENT_REFERENCE = {}));
    var FIELD;
    (function (FIELD) {
        FIELD["MODEL_GET"] = "field-model-get";
        FIELD["MODEL_SET"] = "field-model-set";
        FIELD["MODEL_RESET"] = "field-model-reset";
        FIELD["MODEL_IS_VALID"] = "field-model-is-valid";
        FIELD["MODEL_VALIDATE"] = "field-model-validate";
        FIELD["SCHEMA_GET"] = "field-schema-get";
        FIELD["PATH_GET"] = "field-path-get";
    })(FIELD || (FIELD = {}));
    var CONTENT_EDITOR_FORM;
    (function (CONTENT_EDITOR_FORM) {
        CONTENT_EDITOR_FORM["CONTENT_EDITOR_FORM_GET"] = "content-editor-model-get";
        CONTENT_EDITOR_FORM["CONTENT_EDITOR_FORM_SET"] = "content-editor-model-set";
        CONTENT_EDITOR_FORM["CONTENT_EDITOR_FORM_VALIDATE"] = "content-editor-model-validate";
        CONTENT_EDITOR_FORM["CONTENT_EDITOR_FORM_IS_VALID"] = "content-editor-model-is-valid";
        CONTENT_EDITOR_FORM["CONTENT_EDITOR_MODEL_CHANGE"] = "content-editor-model-change";
    })(CONTENT_EDITOR_FORM || (CONTENT_EDITOR_FORM = {}));
    var FORM$1;
    (function (FORM) {
        FORM["READ_ONLY"] = "form-read-only-change";
        FORM["GET_FORM_MODEL"] = "form-model-get";
        FORM["FORM_VALUE_CHANGE"] = "form-value-change";
    })(FORM$1 || (FORM$1 = {}));
    var FRAME;
    (function (FRAME) {
        FRAME["HEIGHT_GET"] = "height-get";
        FRAME["HEIGHT_SET"] = "height-set";
    })(FRAME || (FRAME = {}));
    var ASSETS;
    (function (ASSETS) {
        ASSETS["GET_BY_ID"] = "get-asset-by-id";
    })(ASSETS || (ASSETS = {}));
    var WORKFLOWS;
    (function (WORKFLOWS) {
        WORKFLOWS["GET_ALL_WORKFLOWS"] = "get-workflows";
    })(WORKFLOWS || (WORKFLOWS = {}));
    var CONTENT_TYPES;
    (function (CONTENT_TYPES) {
        CONTENT_TYPES["GET_BY_URI"] = "get-content-type-by-uri";
        CONTENT_TYPES["GET_BY_URIS"] = "get-content-type-by-uris";
    })(CONTENT_TYPES || (CONTENT_TYPES = {}));
    var CONTENT_ITEM_NAVIGATOR;
    (function (CONTENT_ITEM_NAVIGATOR) {
        CONTENT_ITEM_NAVIGATOR["NAVIGATE_TO_NESTED"] = "navigate-to-nested";
    })(CONTENT_ITEM_NAVIGATOR || (CONTENT_ITEM_NAVIGATOR = {}));

    /**
     * @hidden
     */
    var HttpMethod;
    (function (HttpMethod) {
        HttpMethod["GET"] = "GET";
        HttpMethod["POST"] = "POST";
        HttpMethod["PUT"] = "PUT";
        HttpMethod["PATCH"] = "PATCH";
        HttpMethod["DELETE"] = "DELETE";
    })(HttpMethod || (HttpMethod = {}));
    /**
     * Client to be used with [dc-management-sdk-js](https://github.com/amplience/dc-management-sdk-js)
     *
     * You must have enabled your extension in Dynamic Content for this service to work
     *
     * ```typescript
     * import { init } from 'dc-extensions-sdk';
     * import { DynamicContent } from "dc-management-sdk-js";
     *
     * const dcExtension = await init();
     * const dcManagement = new DynamicContent(
     *  {},
     *  {},
     *  dcExtension.client
     * );
     *
     * const hubs = await dcManagement.hubs.list();
     * ```
     */
    var HttpClient = /** @class */ (function () {
        function HttpClient(connection) {
            this.connection = connection;
            this.DEFAULT_ERROR = {
                status: 403,
                data: {
                    errors: [
                        {
                            code: 'UNKNOWN',
                            level: 'ERROR',
                            message: 'Unknown error',
                        },
                    ],
                },
            };
        }
        HttpClient.prototype.request = function (config) {
            return __awaiter(this, void 0, void 0, function () {
                var response, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.connection.request('dc-management-sdk-js:request', {
                                    data: config.data,
                                    method: config.method,
                                    headers: config.headers,
                                    url: config.url,
                                })];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, {
                                    data: response.data,
                                    status: response.status,
                                }];
                        case 2:
                            error_1 = _a.sent();
                            if (error_1) {
                                return [2 /*return*/, {
                                        data: error_1 === null || error_1 === void 0 ? void 0 : error_1.data,
                                        status: error_1 === null || error_1 === void 0 ? void 0 : error_1.status,
                                    }];
                            }
                            return [2 /*return*/, this.DEFAULT_ERROR];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return HttpClient;
    }());

    var USERS_URL = 'https://auth.amplience.net/users';

    var ACTIONS;
    (function (ACTIONS) {
        ACTIONS["QUERY"] = "dc-management-sdk-js:graphql-query";
        ACTIONS["MUTATION"] = "dc-management-sdk-js:graphql-mutation";
    })(ACTIONS || (ACTIONS = {}));
    var GraphQlClient = /** @class */ (function () {
        function GraphQlClient(connection) {
            this.connection = connection;
            this.DEFAULT_ERROR = {
                status: 403,
                data: {
                    errors: [
                        {
                            code: 'UNKNOWN',
                            level: 'ERROR',
                            message: 'Unknown error',
                        },
                    ],
                },
            };
        }
        GraphQlClient.prototype.query = function (query, vars) {
            return __awaiter(this, void 0, void 0, function () {
                var data, e_1, _a, data, status_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.connection.request(ACTIONS.QUERY, {
                                    query: query,
                                    vars: vars,
                                })];
                        case 1:
                            data = (_b.sent()).data;
                            return [2 /*return*/, data];
                        case 2:
                            e_1 = _b.sent();
                            if (e_1) {
                                _a = e_1, data = _a.data, status_1 = _a.status;
                                return [2 /*return*/, { data: data, status: status_1 }];
                            }
                            return [2 /*return*/, this.DEFAULT_ERROR];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        GraphQlClient.prototype.mutation = function (mutation, vars) {
            return __awaiter(this, void 0, void 0, function () {
                var data, e_2, _a, data, status_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.connection.request(ACTIONS.MUTATION, {
                                    mutation: mutation,
                                    vars: vars,
                                })];
                        case 1:
                            data = (_b.sent()).data;
                            return [2 /*return*/, data];
                        case 2:
                            e_2 = _b.sent();
                            if (e_2) {
                                _a = e_2, data = _a.data, status_2 = _a.status;
                                return [2 /*return*/, { data: data, status: status_2 }];
                            }
                            return [2 /*return*/, this.DEFAULT_ERROR];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return GraphQlClient;
    }());

    var orgUsersQuery = "\n  query getOrganizationMembersByOrgId($orgId: ID!, $first: Int!, $after: String) {\n    node(id: $orgId) {\n      id\n      ... on Organization {\n        id\n        members(first: $first, after: $after) {\n          edges {\n            node {\n              id\n              email\n              picture\n              name\n            }\n          }\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            startCursor\n            endCursor\n          }\n        }\n      }\n    }\n  }";
    var Users = /** @class */ (function () {
        function Users(connection, hub) {
            this.hub = hub;
            this.httpClient = new HttpClient(connection);
            this.graphQlClient = new GraphQlClient(connection);
        }
        Users.prototype.list = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, orgUsers, authUsers, includesUser, uniqueByEmail;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, Promise.all([this.getOrgUsers(), this.getAuthUsers()])];
                        case 1:
                            _a = _b.sent(), orgUsers = _a[0], authUsers = _a[1];
                            includesUser = function (users, user) {
                                return Boolean(users.find(function (_a) {
                                    var email = _a.email;
                                    return email === user.email;
                                }));
                            };
                            uniqueByEmail = function (users, user) {
                                return includesUser(users, user) ? users : __spreadArrays(users, [user]);
                            };
                            return [2 /*return*/, __spreadArrays(orgUsers, authUsers).map(this.transformUser).reduce(uniqueByEmail, [])];
                    }
                });
            });
        };
        Users.prototype.getAuthUsers = function () {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var response, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.httpClient.request({
                                    url: USERS_URL,
                                    method: HttpMethod.GET,
                                })];
                        case 1:
                            response = _b.sent();
                            if (response.status !== 200) {
                                throw new Error("API responded with a non 200 status code. Error: " + (response.data || "status code " + response.status));
                            }
                            return [2 /*return*/, ((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.data) || []];
                        case 2:
                            error_1 = _b.sent();
                            throw new Error("Unable to get users: " + (error_1 === null || error_1 === void 0 ? void 0 : error_1.message));
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        Users.prototype.getOrgUsers = function (after) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var organisationId, vars, response, members, _b, hasNextPage, endCursor, otherMembers, _c, error_2;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            organisationId = this.hub.organizationId;
                            if (!organisationId) {
                                return [2 /*return*/, []];
                            }
                            vars = __assign({ orgId: btoa("Organization:" + organisationId), first: 100 }, (after ? { after: after } : null));
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 6, , 7]);
                            return [4 /*yield*/, this.graphQlClient.query(orgUsersQuery, vars)];
                        case 2:
                            response = (_d.sent());
                            members = (_a = response === null || response === void 0 ? void 0 : response.node) === null || _a === void 0 ? void 0 : _a.members;
                            if (!members) {
                                return [2 /*return*/, []];
                            }
                            _b = members.pageInfo, hasNextPage = _b.hasNextPage, endCursor = _b.endCursor;
                            if (!hasNextPage) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.getOrgUsers(endCursor)];
                        case 3:
                            _c = _d.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            _c = [];
                            _d.label = 5;
                        case 5:
                            otherMembers = _c;
                            return [2 /*return*/, __spreadArrays(members.edges.reduce(this.transformMembersToAuthUsers, []), otherMembers)];
                        case 6:
                            error_2 = _d.sent();
                            return [2 /*return*/, []];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        Users.prototype.transformMembersToAuthUsers = function (members, _a) {
            var member = _a.node;
            var parsedId = atob(member.id);
            var uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
            var userId = parsedId.match(uuidRegex);
            return userId
                ? __spreadArrays(members, [
                    {
                        id: userId[0].toLowerCase(),
                        attributes: {
                            email: member.email,
                            'first-name': member.name,
                            'last-name': '',
                        },
                    },
                ]) : members;
        };
        Users.prototype.transformUser = function (authUser) {
            return {
                id: authUser.id,
                firstName: authUser.attributes['first-name'],
                lastName: authUser.attributes['last-name'],
                email: authUser.attributes.email,
            };
        };
        return Users;
    }());

    function isContextObject(context) {
        var _a, _b;
        return ((_b = (_a = context) === null || _a === void 0 ? void 0 : _a.params) === null || _b === void 0 ? void 0 : _b.installation) !== undefined;
    }
    var Extension = /** @class */ (function () {
        function Extension(options, context) {
            this.options = options;
            var hub = context.hub;
            this.connection = this.options.connection;
            this.client = new HttpClient(this.connection);
            this.users = new Users(this.connection, hub);
            this.setupContext(context);
        }
        return Extension;
    }());

    function isContentEditorContextObject(context) {
        var _a;
        if (!isContextObject(context)) {
            return false;
        }
        var isContentEditor = context.category === 'CONTENT_EDITOR';
        var hasInstanceParams = ((_a = context === null || context === void 0 ? void 0 : context.params) === null || _a === void 0 ? void 0 : _a.instance) !== undefined;
        var contextHasProp = function (prop) { return context[prop] !== undefined; };
        var requiredProps = [
            'contentItemId',
            'schema',
            'locales',
            'readOnly',
            'stagingEnvironment',
            'visualisation',
            'hub',
        ];
        return isContentEditor && hasInstanceParams && requiredProps.every(contextHasProp);
    }

    var ContentEditorForm = /** @class */ (function () {
        function ContentEditorForm(connection, readOnly) {
            var _this = this;
            this.connection = connection;
            this.readOnly = readOnly;
            this.onChangeStack = [];
            this.onModelStack = [];
            this.connection.on(FORM$1.READ_ONLY, function (readonly) {
                _this.readOnly = readonly;
                _this.onChangeStack.forEach(function (cb) { return cb(_this.readOnly); });
            });
            this.connection.on(CONTENT_EDITOR_FORM.CONTENT_EDITOR_MODEL_CHANGE, function (_a) {
                var errors = _a.errors, content = _a.content;
                _this.onModelStack.forEach(function (cb) { return cb(errors, content); });
            });
        }
        /**
         * Check the validation of your model. Returns an array containing any JSON Schema errors found.
         *
         * @param model The model you wish to test
         *
         * If you want to validate a field model and get back an  error report [[ErrorReport]]
         *
         * ### Example
         * ```typescript
         * const errors = await sdk.form.validate({ title: 'Hello World' })});
         *
         * if (errors && errors.length) {
         *   errors.forEach(error => console.log(error));
         * } else {
         *   // valid
         * }
         * ```
         */
        ContentEditorForm.prototype.validate = function (model) {
            return __awaiter(this, void 0, void 0, function () {
                var errors;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.request(CONTENT_EDITOR_FORM.CONTENT_EDITOR_FORM_VALIDATE, model)];
                        case 1:
                            errors = _a.sent();
                            return [2 /*return*/, errors && errors.length ? errors : undefined];
                    }
                });
            });
        };
        /**
         * Check if your model is valid
         *
         * @param model The model you wish to test
         *
         * Gives the current validity of the form returns a boolean
         *
         * ### Example
         * ```typescript
         * const isValid = await sdk.form.isValid({ title: 'Hello World' })
         *
         * console.log(isValid) // false
         * ```
         */
        ContentEditorForm.prototype.isValid = function (model) {
            return __awaiter(this, void 0, void 0, function () {
                var isValid;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.request(CONTENT_EDITOR_FORM.CONTENT_EDITOR_FORM_IS_VALID, model)];
                        case 1:
                            isValid = _a.sent();
                            return [2 /*return*/, isValid];
                    }
                });
            });
        };
        /**
         * Set the current model state
         *
         * @param value to set as model
         * @returns an array containing any JSON Schema errors found.
         *
         * ### Example
         * ```typescript
         * const sdk = await init();
         *  try {
         *     await sdk.form.setValue({ title: 'hello world' });
         *  } catch (errors) {
         *    if (errors.length) {
         *       console.log(errors);
         *    }
         *  }
         * ```
         */
        ContentEditorForm.prototype.setValue = function (value) {
            return __awaiter(this, void 0, void 0, function () {
                var errors;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.request(CONTENT_EDITOR_FORM.CONTENT_EDITOR_FORM_SET, value)];
                        case 1:
                            errors = _a.sent();
                            if (errors && errors.length) {
                                return [2 /*return*/, Promise.reject(errors)];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get the current model state of all the fields in the form.
         *
         * @type FormModel is the entire parent model that will be a peer to this extension
         *
         * ### Example
         * ```typescript
         * try {
         *   const value = await sdk.form.getValue();
         *
         *   console.log(value)
         * } catch (e) {
         *   // In a context where there is no form model
         * }
         * ```
         */
        ContentEditorForm.prototype.getValue = function () {
            return __awaiter(this, void 0, void 0, function () {
                var value, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.connection.request(CONTENT_EDITOR_FORM.CONTENT_EDITOR_FORM_GET)];
                        case 1:
                            value = _a.sent();
                            return [2 /*return*/, value];
                        case 2:
                            e_1 = _a.sent();
                            throw new Error(FORM.NO_MODEL);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         *
         * Allows you to provide a callback to be executed after the readonly state changes. This method can be chained to append multiple callbacks.
         *
         * @param cb Callback function that executes upon readonly state change.
         *
         * @returns [[ContentEditorForm]]
         *
         * ### Example
         * ```typescript
         * const container = document.querySelector('.container');
         * const inputs = Array.from(document.querySelectorAll('input'));
         *
         * sdk.form
         *  .onReadOnlyChange(setReadOnlyClass)
         *  .onReadOnlyChange(disableInputs)
         *
         * function disableInputs(readOnly)  {
         *   inputs.forEach(input => {
         *     input.style.pointerEvents = readOnly ? 'none' : ''
         *   })
         * }
         *
         * function setReadOnlyClass(readOnly) {
         *   container.classList[readOnly ? 'add' : 'remove']('read-only')
         * }
         * ```
         */
        ContentEditorForm.prototype.onReadOnlyChange = function (cb) {
            this.onChangeStack.push(cb);
            return this;
        };
        /**
         *
         * On changes to the model not explicitly handled by the extension, this method will be called in order to keep model in sync with Dynamic Content
         *
         * @param cb Callback function that executes upon model change.
         * @returns {Function} unsubscribe callback
         *
         * ## Example
         *
         * ```typescript
         * let currentModel;
         *
         * sdk.form.onModelChange(model => {
         *  currentModel = model;
         * });
         *
         * const unsubscribe = sdk.form.onModelChange((errors, model) => {
         *  setErrors(errors);
         *  setModel(model)
         * });
         *
         * unsubscribe()
         * ```
         */
        ContentEditorForm.prototype.onModelChange = function (cb) {
            var _this = this;
            this.onModelStack.push(cb);
            var unsubscribe = function () {
                var index = _this.onModelStack.indexOf(cb);
                if (index !== -1) {
                    _this.onModelStack.splice(index, 1);
                }
            };
            return unsubscribe;
        };
        return ContentEditorForm;
    }());

    var ContentItem = /** @class */ (function () {
        /**
         * Content Item - Used for retrieving Content Items.
         *
         * @param connection message-event-channel connection
         */
        function ContentItem(connection) {
            this.connection = connection;
        }
        /**
         *
         * @type ContentItemBody defines the shape of the data that is expected to be returned in the Content Item body
         *
         * Use to fetch the Content Item that is currently being edited. Returns a promise which will resolve to a [[ContentItemModel]]
         *
         * ### Example
         * ```typescript
         * try {
         *   const contentItem = await sdk.contentItem.getCurrent();
         *
         *   console.log(contentItem)
         * } catch (e) {
         *   // In a context where contentItem doesn't exist yet
         * }
         *
         * ```
         */
        ContentItem.prototype.getCurrent = function () {
            return __awaiter(this, void 0, void 0, function () {
                var contentItem;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.request(CONTENT_ITEM.GET)];
                        case 1:
                            contentItem = _a.sent();
                            return [2 /*return*/, contentItem];
                    }
                });
            });
        };
        return ContentItem;
    }());

    var ContentLink = /** @class */ (function () {
        /**
         * Content Link - Use to open the content browser.
         *
         * @param connection message-event-channel connection
         */
        function ContentLink(connection) {
            this.connection = connection;
        }
        /**
         * This method will trigger a content browser. It returns a promise that will resolve to the chosen Content References.
         *
         * @param contentTypeIds list of Content Type Ids to filter the Content Browser by.
         * @param options.max Max amount of selected contnet links
         * @param options.pointer The JSON path of the selected field
         *
         * ### Example
         * ```typescript
         * const enums = sdk.field.schema.allOf[1].properties.contentType.enum;
         * const contentLink = await sdk.contentLink.getMultiple(enums);
         *
         * console.log(contentLink);
         * ```
         */
        ContentLink.prototype.getMultiple = function (contentTypeIds, options) {
            var defaultOptions = {
                max: null
            };
            var mergedOptions = __assign(__assign({}, defaultOptions), options);
            return this.fetchLinks(contentTypeIds, mergedOptions.pointer, mergedOptions.max);
        };
        /**
         * This method will trigger a content browser. It returns a promise that will resolve to the chosen Content Link.
         *
         * @param contentTypeIds list of Content Type Ids to filter the Content Browser by.
         *
         * ### Example
         * ```typescript
         * const enums = sdk.field.schema.allOf[1].properties.contentType.enum;
         * const contentLink = await sdk.contentLink.get(enums);
         *
         * console.log(contentLink);
         * ```
         */
        ContentLink.prototype.get = function (contentTypeIds, pointer) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.fetchLinks(contentTypeIds, pointer)];
                });
            });
        };
        ContentLink.prototype.fetchLinks = function (contentTypeIds, pointer, max) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    if (!contentTypeIds || !Array.isArray(contentTypeIds) || !contentTypeIds.length) {
                        throw new Error(ERRORS_CONTENT_ITEM.NO_IDS);
                    }
                    response = __assign({ contentTypeIds: contentTypeIds,
                        pointer: pointer }, ((max !== undefined && { max: max }) || {}));
                    return [2 /*return*/, this.connection.request(CONTENT_LINK.CONTENT_GET, response, {
                            timeout: false,
                        })];
                });
            });
        };
        return ContentLink;
    }());

    var ContentReference = /** @class */ (function () {
        /**
         * Content Link - Use to open the content browser.
         *
         * @param connection message-event-channel connection
         */
        function ContentReference(connection) {
            this.connection = connection;
        }
        /**
         * This method will trigger a content browser. It returns a promise that will resolve to the chosen Content References.
         *
         * @param contentTypeIds list of Content Type Ids to filter the Content Browser by.
         * @param options.max Max amount of selected contnet references
         * @param options.pointer The JSON path of the selected field
         *
         * ### Example
         * ```typescript
         * const enums = sdk.field.schema.allOf[1].properties.contentType.enum;
         * const contentRef = await sdk.contentReference.get(enums);
         *
         * console.log(contentRef);
         * ```
         */
        ContentReference.prototype.getMultiple = function (contentTypeIds, options) {
            var defaultOptions = {
                max: null
            };
            var mergedOptions = __assign(__assign({}, defaultOptions), options);
            return this.fetchReferences(contentTypeIds, mergedOptions.pointer, mergedOptions.max);
        };
        /**
         * This method will trigger a content browser. It returns a promise that will resolve to the chosen Content Reference.
         *
         * @param contentTypeIds list of Content Type Ids to filter the Content Browser by.
         *
         * ### Example
         * ```typescript
         * const enums = sdk.field.schema.allOf[1].properties.contentType.enum;
         * const contentRef = await sdk.contentReference.get(enums);
         *
         * console.log(contentRef);
         * ```
         */
        ContentReference.prototype.get = function (contentTypeIds, pointer) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.fetchReferences(contentTypeIds, pointer)];
                });
            });
        };
        ContentReference.prototype.fetchReferences = function (contentTypeIds, pointer, max) {
            if (!contentTypeIds || !Array.isArray(contentTypeIds) || !contentTypeIds.length) {
                throw new Error(ERRORS_CONTENT_ITEM.NO_IDS);
            }
            var response = __assign({ contentTypeIds: contentTypeIds,
                pointer: pointer }, ((max !== undefined && { max: max }) || {}));
            return this.connection.request(CONTENT_REFERENCE.CONTENT_REF_GET, response, {
                timeout: false,
            });
        };
        return ContentReference;
    }());

    var MediaLink = /** @class */ (function () {
        /**
         * Media Link - Use to open the media browser.
         *
         * @param connection message-event-channel connection
         */
        function MediaLink(connection) {
            this.connection = connection;
        }
        /**
         * This method will trigger opening the media browser. It returns a promise that will resolve to the chosen Image or Video Link.
         *
         * Example of fetching media from DC
         * ```typescript
         * try {
         *   // open browser and waits for media browser
         *   // returns object that should be saved to the model
         *   const video = await sdk.mediaLink.get()
         *
         * } catch (e) {
         *   // no media returned
         * }
         * ```
         */
        MediaLink.prototype.get = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.connection.request(MEDIA_LINK.GET, null, {
                            timeout: false,
                        })];
                });
            });
        };
        /**
         * This method will trigger opening the media overlay. It returns a promise that will resolve to the chosen Image and Video Links.
         *
         * Example of fetching an media from DC
         * ```typescript
         * try {
         *   // open browser and waits for media selection
         *   // returns object that should be saved to the model
         *   const media = await sdk.mediaLink.getMultiple({ max: 10 })
         *
         * } catch (e) {
         *   // no media returned
         * }
         * ```
         */
        MediaLink.prototype.getMultiple = function (_a) {
            var _b = _a === void 0 ? { max: null } : _a, max = _b.max;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_c) {
                    return [2 /*return*/, this.connection.request(MEDIA_LINK.GET, { max: max }, {
                            timeout: false,
                        })];
                });
            });
        };
        /**
         * This method will trigger an image browser. It returns a promise that will resolve to the chosen Image Link.
         *
         * Example of fetching an image from DC
         * ```typescript
         * try {
         *   // open browser and waits for image
         *   // returns object that should be saved to the model
         *   const image = await sdk.mediaLink.getImage()
         *
         * } catch (e) {
         *   // no image returned
         * }
         * ```
         *
         * Example of displaying a image in your custom control
         *
         * ```typescript
         * import { init } from 'dc-extensions-sdk';
         * import { Image: ImageBuilder } from 'dc-delivery-sdk-js';
         *
         * async function start() {
         *   const sdk = await init();
         *   const img = document.querySelector('img');
         *   const button = document.querySelector('button')
         *
         *   function onClick() {
         *     sdk.mediaLink
         *      .getImage()
         *      .then(image => {
         *         setImage(image)
         *       })
         *      .catch(err => console.log('not selected'));
         *   }
         *
         *   function setImage(image) {
         *      img.src = (
         *         new ImageBuilder(image, { stagingEnvironment: sdk.stagingEnvironment })
         *         .url()
         *         .build()
         *      )
         *   }
         *
         *   button.onclick = onClick;
         * }
         *
         * start()
         * ```
         */
        MediaLink.prototype.getImage = function () {
            return this.connection.request(MEDIA_LINK.IMAGE_GET, null, {
                timeout: false,
            });
        };
        /**
         * This method will trigger an image browser. It returns a promise that will resolve to the chosen Image Links.
         *
         * Example of fetching an image from DC
         * ```typescript
         * try {
         *   // open browser and waits for image
         *   // returns object that should be saved to the model
         *   const images = await sdk.mediaLink.getImages({ max: 10 })
         *
         * } catch (e) {
         *   // no image returned
         * }
         * ```
         */
        MediaLink.prototype.getImages = function (_a) {
            var _b = _a === void 0 ? { max: null } : _a, max = _b.max;
            return this.connection.request(MEDIA_LINK.IMAGE_GET, { max: max }, { timeout: false });
        };
        /**
         * This method will trigger a video browser. It returns a promise that will resolve to the chosen Video Link.
         *
         * Example of fetching an video from DC
         * ```typescript
         * try {
         *   // open browser and waits for video
         *   // returns object that should be saved to the model
         *   const video = await sdk.mediaLink.getVideo()
         *
         * } catch (e) {
         *   // no video returned
         * }
         * ```
         */
        MediaLink.prototype.getVideo = function () {
            return this.connection.request(MEDIA_LINK.VIDEO_GET, null, {
                timeout: false,
            });
        };
        /**
         * This method will trigger a video browser. It returns a promise that will resolve to the chosen Video Links.
         *
         * Example of fetching an video from DC
         * ```typescript
         * try {
         *   // open browser and waits for video
         *   // returns object that should be saved to the model
         *   const videos = await sdk.mediaLink.getVideos()
         *
         * } catch (e) {
         *   // no video returned
         * }
         * ```
         */
        MediaLink.prototype.getVideos = function (_a) {
            var _b = _a === void 0 ? { max: null } : _a, max = _b.max;
            return this.connection.request(MEDIA_LINK.VIDEO_GET, { max: max }, {
                timeout: false,
            });
        };
        return MediaLink;
    }());

    var Assets = /** @class */ (function () {
        /**
         * Assets - Used for retrieving assets.
         *
         * @param connection message-event-channel connection
         */
        function Assets(connection) {
            this.connection = connection;
        }
        /**
         * Get an asset by id
         *
         *
         * ### Example
         * ```typescript
         * try {
         *   const asset = await sdk.asset.getById('123-456');
         *
         *   console.log(asset)
         * } catch (e) {
         *   // Could not get asset
         *   ...
         * }
         *
         * ```
         */
        Assets.prototype.getById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.connection.request(ASSETS.GET_BY_ID, id)];
                });
            });
        };
        return Assets;
    }());

    var ContentEditorApplicationNavigator = /** @class */ (function () {
        function ContentEditorApplicationNavigator(connection) {
            this.connection = connection;
        }
        /**
         *
         * @param contentItemId - content item you're wanting to navigate to
         * @param contentTypeUri - content type uri from a schema id
         *
         * Used to navigate to nested content item
         *
         */
        ContentEditorApplicationNavigator.prototype.editContentItem = function (contentItemId, contentTypeUri) {
            return this.connection.request(CONTENT_ITEM_NAVIGATOR.NAVIGATE_TO_NESTED, {
                uri: contentTypeUri,
                id: contentItemId,
            });
        };
        return ContentEditorApplicationNavigator;
    }());

    var ContentTypes = /** @class */ (function () {
        function ContentTypes(connection) {
            this.connection = connection;
        }
        /**
         *
         * @param uri schema id / content type uri
         *
         * Used to get content type settings for a schema
         *
         * @returns [[Promise<ContentTypeModel>]]
         *
         * ### Example
         *
         * ```typescript
         * const contentType = sdk.contentTypes.getByUri('https://example-schema.com/blog.json')
         *
         * console.log(contentType)
         * ```
         * @returns
         */
        ContentTypes.prototype.getByUri = function (uri) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.connection.request(CONTENT_TYPES.GET_BY_URI, { uri: uri })];
                });
            });
        };
        /**
         *
         * @param uri list of schema id / content type uri
         *
         * Used to get content type settings for a schema
         *
         * @returns [[Promise<ContentTypeModel[]>]]
         *
         * ### Example
         *
         * ```typescript
         * const contentTypes = sdk.contentTypes.getByUri(['https://example-schema.com/blog.json', 'https://example-schema.com/user.json'])
         *
         * console.log(contentTypes)
         * ```
         * @returns
         */
        ContentTypes.prototype.getByUris = function (uris) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.connection.request(CONTENT_TYPES.GET_BY_URIS, { uris: uris })];
                });
            });
        };
        return ContentTypes;
    }());

    var Workflows = /** @class */ (function () {
        function Workflows(connection) {
            this.connection = connection;
        }
        /**
         *
         * @returns Workflow
         *
         * Used to fetch all workflows for a given hub. Returns a promise which will resolve to a [[WorkflowModel[]]]
         *
         * ### Example
         *
         * ```typescript
         * const workflows = await sdk.workflows.getAll()
         *
         * console.log(workflows)
         * ```
         *
         */
        Workflows.prototype.getAll = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.connection.request(WORKFLOWS.GET_ALL_WORKFLOWS)];
                });
            });
        };
        return Workflows;
    }());

    var ContentEditorExtension = /** @class */ (function (_super) {
        __extends(ContentEditorExtension, _super);
        function ContentEditorExtension(options, context) {
            var _this = _super.call(this, options, context) || this;
            _this.mediaLink = new MediaLink(_this.connection);
            _this.contentLink = new ContentLink(_this.connection);
            _this.contentReference = new ContentReference(_this.connection);
            _this.contentTypes = new ContentTypes(_this.connection);
            _this.workflows = new Workflows(_this.connection);
            return _this;
        }
        ContentEditorExtension.prototype.setupContext = function (context) {
            var schema = context.schema, params = context.params, locales = context.locales, stagingEnvironment = context.stagingEnvironment, readOnly = context.readOnly, visualisation = context.visualisation, hub = context.hub, collapseByDefault = context.collapseByDefault;
            this.assets = new Assets(this.connection);
            this.contentItem = new ContentItem(this.connection);
            this.schema = schema;
            this.form = new ContentEditorForm(this.connection, readOnly);
            this.params = params;
            this.locales = locales;
            this.visualisation = visualisation;
            this.stagingEnvironment = stagingEnvironment;
            this.collapseByDefault = collapseByDefault;
            this.hub = hub;
            this.applicationNavigator = new ContentEditorApplicationNavigator(this.connection);
        };
        return ContentEditorExtension;
    }(Extension));

    function isContentFieldContextObject(context) {
        var _a;
        if (!isContextObject(context)) {
            return false;
        }
        var isContentField = context.category === 'CONTENT_FIELD';
        var hasInstanceParams = ((_a = context === null || context === void 0 ? void 0 : context.params) === null || _a === void 0 ? void 0 : _a.instance) !== undefined;
        var contextHasProp = function (prop) { return context[prop] !== undefined; };
        var requiredProps = [
            'contentItemId',
            'fieldSchema',
            'locales',
            'readOnly',
            'stagingEnvironment',
            'visualisation',
            'hub',
        ];
        return isContentField && hasInstanceParams && requiredProps.every(contextHasProp);
    }

    var Field = /** @class */ (function () {
        /**
         * Allows you to perform actions on the field that is being edited.
         *
         * @param connection message-event-channel connection
         * @param schema JSON Schema of the field
         */
        function Field(connection, schema) {
            this.connection = connection;
            this.schema = schema;
        }
        /**
         * Fetch the value of the field
         *
         * ### Example
         * ```typescript
         * const value = await sdk.field.getValue()
         *
         * console.log(value)
         * ```
         */
        Field.prototype.getValue = function () {
            return this.connection.request(FIELD.MODEL_GET);
        };
        /**
         * Change the value of the field
         *
         * @param value The new value you want to set on the field
         * @throws Errors are thrown If the value is not set it throws an array of [[ErrorReport]]
         * @returns
         *
         * ### Example
         * ```typescript
         * try {
         *  await sdk.field.setValue({ propertyName1: 'hello world' })
         * } catch(errors) {
         *  // failed to set value returns error report
         * }
         * ```
         */
        Field.prototype.setValue = function (value) {
            return __awaiter(this, void 0, void 0, function () {
                var errors;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.request(FIELD.MODEL_SET, value)];
                        case 1:
                            errors = _a.sent();
                            if (errors && errors.length) {
                                return [2 /*return*/, Promise.reject(errors)];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Fetch the path to the field
         *
         * ### Example
         * ```typescript
         * const path = await sdk.field.getPath();
         *
         * console.log(path);
         * ```
         */
        Field.prototype.getPath = function () {
            return this.connection.request(FIELD.PATH_GET);
        };
        /**
         * Check if your value is valid
         *
         * @param value The value you wish to test
         *
         * Gives the current validity of the field returns a boolean
         *
         * ### Example
         * ```typescript
         * const isValid = await sdk.field.isValid()
         *
         * console.log(isValid) // false
         * ```
         */
        Field.prototype.isValid = function (value) {
            return __awaiter(this, void 0, void 0, function () {
                var isValid;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.request(FIELD.MODEL_IS_VALID, value)];
                        case 1:
                            isValid = _a.sent();
                            return [2 /*return*/, isValid];
                    }
                });
            });
        };
        /**
         * Check the validation of your value. Returns an array containing any JSON Schema errors found.
         *
         * @param value The value you whish to test
         *
         * If you want to validate a field model and get back an  error reports [[ErrorReport]]
         *
         * ### Example
         * ```typescript
         * const errors = await sdk.field.validate();
         *
         * if (errors && errors.length) {
         *   errors.forEach(error => console.log(error));
         * } else {
         *   // valid
         * }
         * ```
         */
        Field.prototype.validate = function (value) {
            return __awaiter(this, void 0, void 0, function () {
                var errors;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.connection.request(FIELD.MODEL_VALIDATE, value)];
                        case 1:
                            errors = _a.sent();
                            return [2 /*return*/, errors && errors.length ? errors : undefined];
                    }
                });
            });
        };
        /**
         * Reset the value to the previously loaded state
         *
         * ### Example
         * ```typescript
         * const resetValue = await sdk.field.reset()
         *
         * // will be empty content or last saved content
         * console.log(resetValue)
         * ```
         */
        Field.prototype.reset = function () {
            return this.connection.request(FIELD.MODEL_RESET);
        };
        return Field;
    }());

    var Form = /** @class */ (function () {
        function Form(connection, readOnly) {
            var _this = this;
            this.connection = connection;
            this.readOnly = readOnly;
            this.readOnlyObservers = [];
            this.formValueObservers = [];
            this.connection.on(FORM$1.READ_ONLY, function (readonly) {
                _this.readOnly = readonly;
                _this.readOnlyObservers.forEach(function (cb) { return cb(_this.readOnly); });
            });
            this.connection.on(FORM$1.FORM_VALUE_CHANGE, function (formModel) {
                return _this.formValueObservers.forEach(function (cb) { return cb(formModel); });
            });
        }
        /**
         *
         * Allows you to provide a callback to be executed after the readonly state changes. This method can be chained to append multiple callbacks.
         *
         * @param cb Callback function that executes upon readonly state change.
         *
         * @returns [[Form]]
         *
         * ### Example
         * ```typescript
         * const container = document.querySelector('.container');
         * const inputs = Array.from(document.querySelectorAll('input'));
         *
         * sdk.form
         *  .onReadOnlyChange(setReadOnlyClass)
         *  .onReadOnlyChange(disableInputs)
         *
         * function disableInputs(readOnly)  {
         *   inputs.forEach(input => {
         *     input.style.pointerEvents = readOnly ? 'none' : ''
         *   })
         * }
         *
         * function setReadOnlyClass(readOnly) {
         *   container.classList[readOnly ? 'add' : 'remove']('read-only')
         * }
         * ```
         */
        Form.prototype.onReadOnlyChange = function (cb) {
            this.readOnlyObservers.push(cb);
            return this;
        };
        /**
         * Get the current model state of all the fields in the form.
         *
         * @type FormModel is the entire parent model that will be a peer to this extension
         *
         * ### Example
         * ```typescript
         * try {
         *   const value = await sdk.form.getValue();
         *
         *   console.log(value)
         * } catch (e) {
         *   // In a context where there is no form model
         * }
         * ```
         */
        Form.prototype.getValue = function () {
            return __awaiter(this, void 0, void 0, function () {
                var value, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.connection.request(FORM$1.GET_FORM_MODEL)];
                        case 1:
                            value = _a.sent();
                            return [2 /*return*/, value];
                        case 2:
                            e_1 = _a.sent();
                            throw new Error(FORM.NO_MODEL);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         *
         * Allows you to provide a callback to be executed after the form value changes. This method can be chained to append multiple callbacks.
         *
         * @param cb Callback function that executes upon form value change.
         *
         * @returns [[Form]]
         *
         * ### Example
         * ```typescript
         * const container = document.querySelector('.container');
         * const submitBtn = document.querySelector('.submitBtn');
         *
         * sdk.form
         *  .onFormValueChange(setActiveClass)
         *  .onFormValueChange(enableSubmit);
         *
         * function enableSubmit(formValue)  {
         *   const isEmpty = Object.keys(formValue).length === 0;
         *   submitBtn.disabled = isEmpty;
         * }
         *
         * function setActiveClass(formValue) {
         *   const hasTitle formValue?.title !== undefined;
         *   container.classList[hasTitle ? 'add' : 'remove']('active');
         * }
         * ```
         */
        Form.prototype.onFormValueChange = function (cb) {
            this.formValueObservers.push(cb);
            return this;
        };
        return Form;
    }());

    var Frame = /** @class */ (function () {
        /**
         * Use in order to control the re-sizing of the Extension
         *
         * @param connection message-event-channel connection
         * @param win override the default window object
         */
        function Frame(connection, win) {
            var _this = this;
            if (win === void 0) { win = window; }
            this.connection = connection;
            this.win = win;
            this.isAutoResizing = false;
            this.observer = new MutationObserver(function () { return _this.updateHeight(); });
            var frameLoaded = new Promise(function (resolve) {
                if (win.document.readyState === 'complete') {
                    resolve(true);
                }
                win.addEventListener('load', function () {
                    resolve(true);
                });
            });
            this.connection.on(FRAME.HEIGHT_GET, function (_payload, resolve) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, frameLoaded];
                        case 1:
                            _a.sent();
                            resolve(this.getHeight());
                            return [2 /*return*/];
                    }
                });
            }); });
            this.updateHeightHandler = this.updateHeight.bind(this);
        }
        /**
         * Get the height of the Extension
         *
         * Returns the extensions total height
         *
         * ### Example
         * ```typescript
         * const height = sdk.frame.getHeight()
         *
         * // 200
         * console.log(height)
         * ```
         */
        Frame.prototype.getHeight = function () {
            var documentElement = this.win.document.documentElement;
            if (documentElement) {
                var height = documentElement.getBoundingClientRect().height;
                return height;
            }
            return 0;
        };
        /**
         * Set the height of the frame to the height of the Extension. Can optionally override the measured height with a defined value.
         *
         * @param height - should be used if you want to override the calculated height of your extension
         *
         * If no height is passed it will try get the extension height or default to 0
         *
         * ### Example
         *
         * ```typescript
         * // sets height to extension height
         * sdk.frame.setHeight()
         * // sets height to 200
         * sdk.frame.setHeight(200)
         * ```
         */
        Frame.prototype.setHeight = function (height) {
            if (height !== undefined && typeof height !== 'number') {
                throw new TypeError(ERRORS_FRAME.SET_HEIGHT_NUMBER);
            }
            var h = height === undefined ? this.getHeight() : height;
            this.previousHeight = height;
            this.connection.emit(FRAME.HEIGHT_SET, h < 0 ? 0 : h);
        };
        /**
         * Starts the auto-resizer
         *
         * It creates an event listener on resize and creates a mutation observer that updates
         * the height when the body height changes you should clean up from this function on unmount
         * to avoid memory leaks
         *
         * If called when already active it does nothing
         *
         * ### Example
         * ```typescript
         * sdk.frame.startAutoResizer();
         * ```
         */
        Frame.prototype.startAutoResizer = function () {
            if (this.isAutoResizing) {
                return;
            }
            this.isAutoResizing = true;
            this.observer.observe(this.win.document.body, {
                attributes: true,
                childList: true,
                subtree: true,
                characterData: true,
            });
            this.win.addEventListener('resize', this.updateHeightHandler);
        };
        /**
         * Stops the auto-resizer
         *
         * It tears down the event listeners and observers created from startAutoResizer should be
         * called when you want to mannaully handle the height or when unmounting
         *
         * If called without autoResizer being active it does nothing
         *
         * ### Example
         * ```typescript
         * sdk.frame.stopAutoResizer();
         * ```
         */
        Frame.prototype.stopAutoResizer = function () {
            if (!this.isAutoResizing) {
                return;
            }
            this.isAutoResizing = false;
            this.observer.disconnect();
            this.win.removeEventListener('resize', this.updateHeightHandler);
        };
        Frame.prototype.updateHeight = function () {
            var height = this.getHeight();
            if (height === this.previousHeight) {
                return;
            }
            this.setHeight(height);
        };
        return Frame;
    }());

    var ContentFieldExtension = /** @class */ (function (_super) {
        __extends(ContentFieldExtension, _super);
        function ContentFieldExtension(options, context) {
            var _this = _super.call(this, options, context) || this;
            _this.mediaLink = new MediaLink(_this.connection);
            _this.contentLink = new ContentLink(_this.connection);
            _this.contentReference = new ContentReference(_this.connection);
            _this.contentTypes = new ContentTypes(_this.connection);
            _this.workflows = new Workflows(_this.connection);
            _this.frame = new Frame(_this.connection, options.window);
            return _this;
        }
        ContentFieldExtension.prototype.setupContext = function (context) {
            var fieldSchema = context.fieldSchema, params = context.params, locales = context.locales, stagingEnvironment = context.stagingEnvironment, readOnly = context.readOnly, visualisation = context.visualisation, hub = context.hub, collapseByDefault = context.collapseByDefault;
            this.assets = new Assets(this.connection);
            this.contentItem = new ContentItem(this.connection);
            this.field = new Field(this.connection, fieldSchema);
            this.form = new Form(this.connection, readOnly);
            this.applicationNavigator = new ContentEditorApplicationNavigator(this.connection);
            this.params = params;
            this.locales = locales;
            this.visualisation = visualisation;
            this.stagingEnvironment = stagingEnvironment;
            this.collapseByDefault = collapseByDefault;
            this.hub = hub;
        };
        return ContentFieldExtension;
    }(Extension));

    function isDashboardContextObject(context) {
        return (isContextObject(context) &&
            context.category === 'DASHBOARD' &&
            context.locationHref !== undefined &&
            (context.hub !== undefined ||
                context.hubId !== undefined));
    }

    var LOCATION_HREF;
    (function (LOCATION_HREF) {
        LOCATION_HREF["HASH_BANG"] = "#!";
    })(LOCATION_HREF || (LOCATION_HREF = {}));

    var BaseNavigator = /** @class */ (function () {
        function BaseNavigator(locationHref, window) {
            this.locationHref = locationHref;
            this.window = window;
        }
        BaseNavigator.prototype.navigate = function (templatedUri, options) {
            if (options === void 0) { options = {}; }
            var base = this.getBaseHref();
            return this.processHref("" + base + templatedUri, options);
        };
        BaseNavigator.prototype.processHref = function (href, options) {
            if (options === void 0) { options = {}; }
            if (options.returnHref) {
                return href;
            }
            this.window.parent.location.href = href;
        };
        BaseNavigator.prototype.getBaseHref = function () {
            if (this.locationHref.indexOf(LOCATION_HREF.HASH_BANG) === -1) {
                throw new Error(APPLICATION_NAVIGATOR.MUST_INCLUDE_HASH_BANG);
            }
            var _a = this.locationHref.split(LOCATION_HREF.HASH_BANG), baseUrl = _a[0], hash = _a[1];
            var hubName = hash.split('/')[1];
            return "" + baseUrl + LOCATION_HREF.HASH_BANG + "/" + hubName;
        };
        return BaseNavigator;
    }());

    var ApplicationNavigator = /** @class */ (function () {
        function ApplicationNavigator(locationHref, window) {
            this.navigationService = new BaseNavigator(locationHref, window);
        }
        ApplicationNavigator.prototype.openEventsCalendar = function (options) {
            if (options === void 0) { options = {}; }
            return this.navigationService.navigate("/planning/events/calendar", options);
        };
        ApplicationNavigator.prototype.openEventsTimeline = function (options) {
            if (options === void 0) { options = {}; }
            return this.navigationService.navigate("/planning/events/timeline", options);
        };
        ApplicationNavigator.prototype.openEventsList = function (options) {
            if (options === void 0) { options = {}; }
            return this.navigationService.navigate("/planning/events/list", options);
        };
        ApplicationNavigator.prototype.openEvent = function (event, options) {
            if (options === void 0) { options = {}; }
            return this.navigationService.navigate("/planning/event/" + event.id, options);
        };
        ApplicationNavigator.prototype.openEdition = function (edition, options) {
            if (options === void 0) { options = {}; }
            return this.navigationService.navigate("/planning/edition/" + edition.eventId + "/" + edition.id + "/", options);
        };
        ApplicationNavigator.prototype.openContentLibrary = function (options) {
            if (options === void 0) { options = {}; }
            return this.navigationService.navigate("/authoring/content-items", options);
        };
        ApplicationNavigator.prototype.openContentItem = function (contentItem, options) {
            if (options === void 0) { options = {}; }
            return this.navigationService.navigate("/authoring/content-item/edit/" + contentItem.id, options);
        };
        return ApplicationNavigator;
    }());

    var DashboardExtension = /** @class */ (function (_super) {
        __extends(DashboardExtension, _super);
        function DashboardExtension(options, context) {
            return _super.call(this, options, context) || this;
        }
        DashboardExtension.prototype.setupContext = function (context) {
            var hubId = context.hubId, hub = context.hub, locationHref = context.locationHref, params = context.params;
            this.hub = hub;
            this.hubId = hubId;
            this.locationHref = locationHref;
            this.params = params;
            this.applicationNavigator = new ApplicationNavigator(this.locationHref, this.options.window);
        };
        return DashboardExtension;
    }(Extension));

    function extensionFactory(context, options) {
        var extension;
        if (isContentFieldContextObject(context)) {
            extension = new ContentFieldExtension(options, context);
        }
        if (isDashboardContextObject(context)) {
            extension = new DashboardExtension(options, context);
        }
        if (isContentEditorContextObject(context)) {
            extension = new ContentEditorExtension(options, context);
        }
        if (!extension) {
            throw new Error(EXTENSION.UNSUPPORTED_EXTENSION);
        }
        return extension;
    }

    var defaultOptions = {
        window: window,
        connectionTimeout: false,
        timeout: false,
        debug: false,
    };
    /**
     * The method that starts it all
     *
     * @type FieldType This is the field model that the extension is acting on
     * @type Params The installation parameters and instance parameters provided from Dynamic Content
     * @param options The configuration object to change the behaviour of the extension
     *
     * @return Returns a promise that will resolve with a new [[SDK]] instance
     *
     * ```typescript
     * import { init } from 'dc-extensions-sdk';
     *
     * async function initialize() {
     *  const contentFieldExtension = await <ContentFieldExtension>init();
     *
     *  //.. setup extension
     * }
     * ```
     */
    function init(options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var mergedOptions, connection;
            var _this = this;
            return __generator(this, function (_a) {
                mergedOptions = __assign(__assign({}, defaultOptions), options);
                connection = new ClientConnection(mergedOptions);
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            connection.init();
                            connection.on(MC_EVENTS.CONNECTED, function () { return __awaiter(_this, void 0, void 0, function () {
                                var context, e_1, extension;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            return [4 /*yield*/, connection.request(CONTEXT.GET, null, { timeout: false })];
                                        case 1:
                                            context = _a.sent();
                                            return [3 /*break*/, 3];
                                        case 2:
                                            e_1 = _a.sent();
                                            reject(new Error(ERRORS_INIT.CONTEXT));
                                            return [3 /*break*/, 3];
                                        case 3:
                                            try {
                                                extension = extensionFactory(context, __assign({ connection: connection }, mergedOptions));
                                                resolve(extension);
                                            }
                                            catch (e) {
                                                reject(e);
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            connection.on(MC_EVENTS.CONNECTION_TIMEOUT, function () {
                                reject(new Error(ERRORS_INIT.CONNECTION_TIMEOUT));
                            });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    }

    exports.ContentEditorExtension = ContentEditorExtension;
    exports.ContentFieldExtension = ContentFieldExtension;
    exports.DashboardExtension = DashboardExtension;
    exports.init = init;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=dc-extensions-sdk.umd.js.map
