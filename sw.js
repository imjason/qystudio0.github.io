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
            "https://cdn.jsdelivr.net/gh",
            "https://cdn1.tianli0.top/gh",
            "https://cdn.oplog.cn/gh",
          	"https://cdn.cnortles.top/gh",
            "https://jsdelivr.panbaidu.cn/gh"
        ],
        //JsDelivr Combine
        [
            "https://cdn.jsdelivr.net/combine",
            "https://cdn1.tianli0.top/combine",
            "https://cdn.oplog.cn/combine",
          	"https://cdn.cnortles.top/combine",
            "https://jsdelivr.panbaidu.cn/combine"
        ],
        //NPM
        [
            "https://cdn.jsdelivr.net/npm",
            "https://npm.elemecdn.com",
            "https://cdn1.tianli0.top/npm",
            "https://cdn.oplog.cn/npm",
            "https://unpkg.zhimg.com",
          	"https://cdn.cnortles.top/npm",
            "https://unpkg.com",
            "https://code.bdstatic.com/npm",
            "https://jsdelivr.panbaidu.cn/npm"
        ]

    ],
    blog: {
        accelerator: true,
        origin: [
            "qystudio.ltd",
            "ayrwjs-ofueyd-4000.preview.myide.io"
        ],
        mode: "npm",//加速模式：mirror|npm
        mirrors: [
            "vercel.qystudio.ltd",
            "cf.qystudio.ltd",
            "qyblog.qystudio.workers.dev",
            "qy.beixibaobao.com"
        ],
        npm: {
            accelerator: true,
            package: "qy-blog",
            version: "0.0.4"
        }
    }
}

config.blog.npm.urls = [

    `https://npm.elemecdn.com/${config.blog.npm.package}@${config.blog.npm.version}/public`,
    `https://cdn.tianli0.top/npm/${config.blog.npm.package}@${config.blog.npm.version}/public`,
    `https://cdn.oplog.cn/npm/${config.blog.npm.package}@${config.blog.npm.version}/public`,
    `https://cdn.jsdelivr.net/npm/${config.blog.npm.package}@${config.blog.npm.version}/public`,
  	`https://cdn.cnortles.top/npm/${config.blog.npm.package}@${config.blog.npm.version}/public`,
    `https://unpkg.com/${config.blog.npm.package}@${config.blog.npm.version}/public`,
  	`https://jsdelivr.panbaidu.cn/npm/${config.blog.npm.package}@${config.blog.npm.version}/public`
]




//以下源代码，看不懂勿动


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
    return new Response(`<h1>Redish101BlogHelper Error</h1>
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
                                            "Server": "Redish101BlogHelper"
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