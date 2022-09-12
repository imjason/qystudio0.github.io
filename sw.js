const config = {
    dev: {
        blog: false,
        accelerator: false
    },
    cache: {
        name: "QYstudioBlogCache",
        enabled: true
    },
    accelerator: [
        //加速组，同一组内的url会被并发请求其余的url
        //JsDelivr Github
        [
            "https://cdn1.tianli0.top/gh",
            "https://cdn.oplog.cn/gh",
            "https://jsd.8b9.cn/gh"
        ],
        //JsDelivr Combine
        [
            "https://cdn1.tianli0.top/combine",
            "https://cdn.oplog.cn/combine",
            "https://jsd.8b9.cn/combine"
        ],
        //NPM
        [
            "https://npm.elemecdn.com",
            "https://cdn.oplog.cn/npm",
            "https://jsd.8b9.cn/npm",
            "https://adn.arcitcgn.cn/npm",
            "https://cdn.cnortles.top/npm",
            "https://cdn1.tianli0.top/npm",
            "https://unpkg.com",
            "https://npm.sourcegcdn.com"
        ],
        //cdnjs
        [
            "https://cdn.bootcdn.net/ajax/libs",
            "https://lib.baomitu.com",
            "https://cdn.staticfile.org",
            "https://mirrors.sustech.edu.cn/cdnjs/ajax/libs",
            "https://cdnjs.sourcegcdn.com/ajax/libs"
        ]
    ],
    blog: {
        accelerator: true,
        origin: [
            "qystudio.ltd",
            "qystu.cc"
        ],
        mode: "npm",//加速模式：mirror|npm
        mirrors: [
            "qyblog.qystudio.workers.dev",
            "qy.beixibaobao.com"
        ],
        npm: {
            accelerator: true,
            package: "qy-blog",
            version: "0.1.7"
        }
    }
}

config.blog.npm.urls = [
    `https://npm.elemecdn.com/${config.blog.npm.package}@${config.blog.npm.version}/public`,
    `https://cdn.tianli0.top/npm/${config.blog.npm.package}@${config.blog.npm.version}/public`,
    `https://jsd.8b9.cn/npm/${config.blog.npm.package}@${config.blog.npm.version}/public`,
    `https://adn.arcitcgn.cn/npm/${config.blog.npm.package}@${config.blog.npm.version}/public`
]

const mirror = [
    `https://registry.npmmirror.com/qy-blog/latest`,
    `https://registry.npmjs.org/qy-blog/latest`,
    `https://mirrors.cloud.tencent.com/npm/qy-blog/latest`
]

//以下源代码，看不懂勿动
const get_newest_version = async (mirror) => {
    return lfetch(mirror, mirror[0])
        .then(res => res.json())
        .then(res.version)
}
self.db = { //全局定义db,只要read和write,看不懂可以略过
    read: (key, config) => {
        if (!config) { config = { type: "text" } }
        return new Promise((resolve, reject) => {
            caches.open(CACHE_NAME).then(cache => {
                cache.match(new Request(`https://LOCALCACHE/${encodeURIComponent(key)}`)).then(function (res) {
                    if (!res) resolve(null)
                    res.text().then(text => resolve(text))
                }).catch(() => {
                    resolve(null)
                })
            })
        })
    },
    write: (key, value) => {
        return new Promise((resolve, reject) => {
            caches.open(CACHE_NAME).then(function (cache) {
                cache.put(new Request(`https://LOCALCACHE/${encodeURIComponent(key)}`), new Response(value));
                resolve()
            }).catch(() => {
                reject()
            })
        })
    }
}

const set_newest_version = async (mirror) => { //改为最新版本写入数据库
    return lfetch(mirror, mirror[0])
        .then(res => res.json()) //JSON Parse
        .then(async res => {
            await db.write('blog_version', res.version) //写入
            return;
        })
}

setInterval(async() => {
    await set_newest_version(mirror) //定时更新,一分钟一次
}, 60*1000);

setTimeout(async() => { 
    await set_newest_version(mirror)//打开五秒后更新,避免堵塞
},5000)


self.addEventListener('install', async function (installEvent) {
    self.skipWaiting();
    installEvent.waitUntil(
        caches.open(config.cache.name)
            .then(cache => {
                return cache.addAll([]);
            })
    );
});
self.addEventListener('fetch', async event => {
    try {
        event.respondWith(handle(event.request))
    } catch (msg) {
        event.respondWith(handleerr(event.request, msg))
    }
});
const handleerr = async (req, msg) => {
    return new Response(`<h1>QYBlogHelper Error</h1>
    <b>${msg}</b>`, { headers: { "content-type": "text/html; charset=utf-8" } })
}
const handle = async (req) => {
    const urlObj = new URL(req.url);
    const urlStr = urlObj.toString();
    const urlPath = urlObj.pathname;
    const query = (q) => urlObj.searchParams.get(q);
    const domain = urlObj.hostname;
    //accelerator 加速
    let ansUrl = [];
    config.accelerator.forEach(group => {
        group.forEach(url => {
            if (urlStr.match(url)) {
                group.forEach(Aurl => {
                    ansUrl.push(urlStr.replace(url, Aurl))
                })
            }
        })
    })
    if (ansUrl.length > 0) {
        return caches.open(config.cache.name).then(cache => {
            return cache.match(urlStr).then(res => {
                if (res) return res;
                return lfetch(ansUrl, urlStr).then(async res => {
                    if (config.cache.enabled) {
                        await caches.open(config.cache.name).then(cache => {
                            cache.put(req, res.clone())
                        })
                    }
                    return res
                })
            })
        })
    }
    //blog 加速
    if (config.blog.accelerator) {
        if (config.blog.origin.includes(domain)) {
            return caches.open(config.cache.name).then(cache => {
                return cache.match(urlStr).then(res => {
                    return new Promise((resolve, reject) => {
                        if (res) {
                            setTimeout(() => {
                                resolve(res)
                            }, 20);
                        }
                        setTimeout(() => {
                            if (config.blog.mode === "mirror") {
                                config.blog.mirrors.forEach(mirror => {
                                    ansUrl.push(urlStr.replace(domain, mirror))
                                })

                            }
                            if (config.blog.mode === "npm") {
                                config.blog.npm.urls.forEach(url => {
                                    ansUrl.push(npm_prefix(url, urlObj))
                                })
                            }
                            ansUrl.push(urlStr)
                            lfetch(ansUrl, urlStr).then(async res => {
                                let newRes;
                                if (npm_prefix('', urlObj).endsWith('.html')) {
                                    newRes = new Response(await res.arrayBuffer(), {
                                        headers: {
                                            'content-type': 'text/html; charset=utf-8',
                                            'cache-control': 'max-age=0',
                                            "Server": "QYstudioBlogHelper"
                                        }
                                    })
                                } else {
                                    newRes = res.clone()
                                }
                                if (config.cache.enabled) {
                                    await caches.open(config.cache.name).then(async cache => {
                                        cache.put(req, newRes.clone())
                                    })
                                }
                                resolve(newRes)
                            })
                        }, 0);
                    })
                })
            })
        }
    }

    return fetch(req);
}



//Function 功能区
const npm_prefix = (url, urlObj) => {
    let path = urlObj.pathname.split("#")[0];
    if (path.endsWith("/")) path += "index"
    if (!path.split('/')[path.split('/').length - 1].includes(".")) {
        path += ".html"
    }
    return url + path
}
const lfetch = async (urls, url) => {
    let controller = new AbortController();
    const PauseProgress = async (res) => {
        return new Response(await (res).arrayBuffer(), { status: res.status, headers: res.headers });
    };
    if (!Promise.any) {
        Promise.any = function (promises) {
            return new Promise((resolve, reject) => {
                promises = Array.isArray(promises) ? promises : []
                let len = promises.length
                let errs = []
                if (len === 0) return reject(new AggregateError('All promises were rejected'))
                promises.forEach((promise) => {
                    promise.then(value => {
                        resolve(value)
                    }, err => {
                        len--
                        errs.push(err)
                        if (len === 0) {
                            reject(new AggregateError(errs))
                        }
                    })
                })
            })
        }
    }
    return Promise.any(urls.map(urls => {
        return new Promise((resolve, reject) => {
            fetch(urls, {
                signal: controller.signal
            })
                .then(PauseProgress)
                .then(res => {
                    if (res.status == 200) {
                        controller.abort();
                        resolve(res)
                    } else {
                        reject(res)
                    }
                })
        })
    }))
}