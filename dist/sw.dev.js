"use strict";

var config = {
  dev: {
    blog: false,
    accelerator: false
  },
  cache: {
    name: "QYstudioBlogCache",
    enabled: true
  },
  accelerator: [//加速组，同一组内的url会被并发请求其余的url
  //JsDelivr Github
  ["https://cdn1.tianli0.top/gh", "https://cdn.oplog.cn/gh", "https://jsd.8b9.cn/gh"], //JsDelivr Combine
  ["https://cdn1.tianli0.top/combine", "https://cdn.oplog.cn/combine", "https://jsd.8b9.cn/combine"], //NPM
  ["https://npm.elemecdn.com", "https://cdn.oplog.cn/npm", "https://jsd.8b9.cn/npm", "https://adn.arcitcgn.cn/npm", "https://cdn.cnortles.top/npm", "https://cdn1.tianli0.top/npm", "https://unpkg.com", "https://npm.sourcegcdn.com"], //cdnjs
  ["https://cdn.bootcdn.net/ajax/libs", "https://lib.baomitu.com", "https://cdn.staticfile.org", "https://mirrors.sustech.edu.cn/cdnjs/ajax/libs", "https://cdnjs.sourcegcdn.com/ajax/libs"]],
  blog: {
    accelerator: true,
    origin: ["qystudio.ltd", "qystu.cc"],
    mode: "npm",
    //加速模式：mirror|npm
    mirrors: ["qyblog.qystudio.workers.dev", "qy.beixibaobao.com"],
    npm: {
      accelerator: true,
      "package": "qy-blog",
      version: "0.1.7"
    }
  }
};
config.blog.npm.urls = ["https://npm.elemecdn.com/".concat(config.blog.npm["package"], "@").concat(config.blog.npm.version, "/public"), "https://cdn.tianli0.top/npm/".concat(config.blog.npm["package"], "@").concat(config.blog.npm.version, "/public"), "https://jsd.8b9.cn/npm/".concat(config.blog.npm["package"], "@").concat(config.blog.npm.version, "/public"), "https://adn.arcitcgn.cn/npm/".concat(config.blog.npm["package"], "@").concat(config.blog.npm.version, "/public")];
var mirror = ["https://registry.npmmirror.com/qy-blog/latest", "https://registry.npmjs.org/qy-blog/latest", "https://mirrors.cloud.tencent.com/npm/qy-blog/latest"]; //以下源代码，看不懂勿动

var get_newest_version = function get_newest_version(mirror) {
  return regeneratorRuntime.async(function get_newest_version$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", lfetch(mirror, mirror[0]).then(function (res) {
            return res.json();
          }).then(res.version));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

self.db = {
  //全局定义db,只要read和write,看不懂可以略过
  read: function read(key, config) {
    if (!config) {
      config = {
        type: "text"
      };
    }

    return new Promise(function (resolve, reject) {
      caches.open(CACHE_NAME).then(function (cache) {
        cache.match(new Request("https://LOCALCACHE/".concat(encodeURIComponent(key)))).then(function (res) {
          if (!res) resolve(null);
          res.text().then(function (text) {
            return resolve(text);
          });
        })["catch"](function () {
          resolve(null);
        });
      });
    });
  },
  write: function write(key, value) {
    return new Promise(function (resolve, reject) {
      caches.open(CACHE_NAME).then(function (cache) {
        cache.put(new Request("https://LOCALCACHE/".concat(encodeURIComponent(key))), new Response(value));
        resolve();
      })["catch"](function () {
        reject();
      });
    });
  }
};

var set_newest_version = function set_newest_version(mirror) {
  return regeneratorRuntime.async(function set_newest_version$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", lfetch(mirror, mirror[0]).then(function (res) {
            return res.json();
          }) //JSON Parse
          .then(function _callee(res) {
            return regeneratorRuntime.async(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return regeneratorRuntime.awrap(db.write('blog_version', res.version));

                  case 2:
                    return _context2.abrupt("return");

                  case 3:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          }));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

setInterval(function _callee2() {
  return regeneratorRuntime.async(function _callee2$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(set_newest_version(mirror));

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
}, 60 * 1000);
setTimeout(function _callee3() {
  return regeneratorRuntime.async(function _callee3$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(set_newest_version(mirror));

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  });
}, 5000);
self.addEventListener('install', function _callee4(installEvent) {
  return regeneratorRuntime.async(function _callee4$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          self.skipWaiting();
          installEvent.waitUntil(caches.open(config.cache.name).then(function (cache) {
            return cache.addAll([]);
          }));

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  });
});
self.addEventListener('fetch', function _callee5(event) {
  return regeneratorRuntime.async(function _callee5$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          try {
            event.respondWith(handle(event.request));
          } catch (msg) {
            event.respondWith(handleerr(event.request, msg));
          }

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
});

var handleerr = function handleerr(req, msg) {
  return regeneratorRuntime.async(function handleerr$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          return _context8.abrupt("return", new Response("<h1>QYBlogHelper Error</h1>\n    <b>".concat(msg, "</b>"), {
            headers: {
              "content-type": "text/html; charset=utf-8"
            }
          }));

        case 1:
        case "end":
          return _context8.stop();
      }
    }
  });
};

var handle = function handle(req) {
  var urlObj, urlStr, urlPath, query, domain, ansUrl;
  return regeneratorRuntime.async(function handle$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          urlObj = new URL(req.url);
          urlStr = urlObj.toString();
          urlPath = urlObj.pathname;

          query = function query(q) {
            return urlObj.searchParams.get(q);
          };

          domain = urlObj.hostname; //accelerator 加速

          ansUrl = [];
          config.accelerator.forEach(function (group) {
            group.forEach(function (url) {
              if (urlStr.match(url)) {
                group.forEach(function (Aurl) {
                  ansUrl.push(urlStr.replace(url, Aurl));
                });
              }
            });
          });

          if (!(ansUrl.length > 0)) {
            _context12.next = 9;
            break;
          }

          return _context12.abrupt("return", caches.open(config.cache.name).then(function (cache) {
            return cache.match(urlStr).then(function (res) {
              if (res) return res;
              return lfetch(ansUrl, urlStr).then(function _callee6(res) {
                return regeneratorRuntime.async(function _callee6$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        if (!config.cache.enabled) {
                          _context9.next = 3;
                          break;
                        }

                        _context9.next = 3;
                        return regeneratorRuntime.awrap(caches.open(config.cache.name).then(function (cache) {
                          cache.put(req, res.clone());
                        }));

                      case 3:
                        return _context9.abrupt("return", res);

                      case 4:
                      case "end":
                        return _context9.stop();
                    }
                  }
                });
              });
            });
          }));

        case 9:
          if (!config.blog.accelerator) {
            _context12.next = 12;
            break;
          }

          if (!config.blog.origin.includes(domain)) {
            _context12.next = 12;
            break;
          }

          return _context12.abrupt("return", caches.open(config.cache.name).then(function (cache) {
            return cache.match(urlStr).then(function (res) {
              return new Promise(function (resolve, reject) {
                if (res) {
                  setTimeout(function () {
                    resolve(res);
                  }, 20);
                }

                setTimeout(function () {
                  if (config.blog.mode === "mirror") {
                    config.blog.mirrors.forEach(function (mirror) {
                      ansUrl.push(urlStr.replace(domain, mirror));
                    });
                  }

                  if (config.blog.mode === "npm") {
                    config.blog.npm.urls.forEach(function (url) {
                      ansUrl.push(npm_prefix(url, urlObj));
                    });
                  }

                  ansUrl.push(urlStr);
                  lfetch(ansUrl, urlStr).then(function _callee8(res) {
                    var newRes;
                    return regeneratorRuntime.async(function _callee8$(_context11) {
                      while (1) {
                        switch (_context11.prev = _context11.next) {
                          case 0:
                            if (!npm_prefix('', urlObj).endsWith('.html')) {
                              _context11.next = 9;
                              break;
                            }

                            _context11.t0 = Response;
                            _context11.next = 4;
                            return regeneratorRuntime.awrap(res.arrayBuffer());

                          case 4:
                            _context11.t1 = _context11.sent;
                            _context11.t2 = {
                              headers: {
                                'content-type': 'text/html; charset=utf-8',
                                'cache-control': 'max-age=0',
                                "Server": "QYstudioBlogHelper"
                              }
                            };
                            newRes = new _context11.t0(_context11.t1, _context11.t2);
                            _context11.next = 10;
                            break;

                          case 9:
                            newRes = res.clone();

                          case 10:
                            if (!config.cache.enabled) {
                              _context11.next = 13;
                              break;
                            }

                            _context11.next = 13;
                            return regeneratorRuntime.awrap(caches.open(config.cache.name).then(function _callee7(cache) {
                              return regeneratorRuntime.async(function _callee7$(_context10) {
                                while (1) {
                                  switch (_context10.prev = _context10.next) {
                                    case 0:
                                      cache.put(req, newRes.clone());

                                    case 1:
                                    case "end":
                                      return _context10.stop();
                                  }
                                }
                              });
                            }));

                          case 13:
                            resolve(newRes);

                          case 14:
                          case "end":
                            return _context11.stop();
                        }
                      }
                    });
                  });
                }, 0);
              });
            });
          }));

        case 12:
          return _context12.abrupt("return", fetch(req));

        case 13:
        case "end":
          return _context12.stop();
      }
    }
  });
}; //Function 功能区


var npm_prefix = function npm_prefix(url, urlObj) {
  var path = urlObj.pathname.split("#")[0];
  if (path.endsWith("/")) path += "index";

  if (!path.split('/')[path.split('/').length - 1].includes(".")) {
    path += ".html";
  }

  return url + path;
};

var lfetch = function lfetch(urls, url) {
  var controller, PauseProgress;
  return regeneratorRuntime.async(function lfetch$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          controller = new AbortController();

          PauseProgress = function PauseProgress(res) {
            return regeneratorRuntime.async(function PauseProgress$(_context13) {
              while (1) {
                switch (_context13.prev = _context13.next) {
                  case 0:
                    _context13.t0 = Response;
                    _context13.next = 3;
                    return regeneratorRuntime.awrap(res.arrayBuffer());

                  case 3:
                    _context13.t1 = _context13.sent;
                    _context13.t2 = {
                      status: res.status,
                      headers: res.headers
                    };
                    return _context13.abrupt("return", new _context13.t0(_context13.t1, _context13.t2));

                  case 6:
                  case "end":
                    return _context13.stop();
                }
              }
            });
          };

          if (!Promise.any) {
            Promise.any = function (promises) {
              return new Promise(function (resolve, reject) {
                promises = Array.isArray(promises) ? promises : [];
                var len = promises.length;
                var errs = [];
                if (len === 0) return reject(new AggregateError('All promises were rejected'));
                promises.forEach(function (promise) {
                  promise.then(function (value) {
                    resolve(value);
                  }, function (err) {
                    len--;
                    errs.push(err);

                    if (len === 0) {
                      reject(new AggregateError(errs));
                    }
                  });
                });
              });
            };
          }

          return _context14.abrupt("return", Promise.any(urls.map(function (urls) {
            return new Promise(function (resolve, reject) {
              fetch(urls, {
                signal: controller.signal
              }).then(PauseProgress).then(function (res) {
                if (res.status == 200) {
                  controller.abort();
                  resolve(res);
                } else {
                  reject(res);
                }
              });
            });
          })));

        case 4:
        case "end":
          return _context14.stop();
      }
    }
  });
};
