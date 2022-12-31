const CACHE_NAME = 'QYstudioBlogCache';

let cachelist = [];

const cachetime = 86400000;

self.CACHE_NAME = 'SWHelperCache';
self.db = {
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

self.addEventListener('install', async function (installEvent) {
    self.skipWaiting();
    installEvent.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(cachelist);
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
    return new Response(`<h1>Service Worker 遇到致命错误</h1>
    <b>${msg}</b>`, { headers: { "content-type": "text/html; charset=utf-8" } })
}
let cdn = {
    "gh": {
        ftft: {
            "url": "https://jsd.iftft.com/gh"
        },
        tianli: {
            "url": "https://cdn1.tianli0.top/gh"
        }
    },
    "combine": {
        ftft: {
            "url": "https://jsd.iftft.com/combine"
        },
        tianli: {
            "url": "https://cdn1.tianli0.top/combine"
        }
    },
    "npm": {
        eleme: {
            "url": "https://npm.elemecdn.com"
        },
        ftft: {
            "url": "https://jsd.iftft.com/npm"
        },
        sourcegcdn: {
            "url": "https://npm.sourcegcdn.com"
        },
        tianli: {
            "url": "https://cdn1.tianli0.top/npm"
        }
    },
    "cdnjs": {
        bootcdn: {
            "url": "https://cdn.bootcdn.net/ajax/libs"
        },
        baomitu: {
            "url": "https://lib.baomitu.com"
        },
        staticfile: {
            "url": "https://cdn.staticfile.org"
        },
        sustech: {
            "url": "https://mirrors.sustech.edu.cn/cdnjs/ajax/libs"
        },
        sourcegcdn: {
            "url": "https://cdnjs.sourcegcdn.com/ajax/libs"
        }   
    }
}
const lfetch = async (urls, url, init) => {
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
        init = init || {}
        init.signal = controller.signal
        return new Promise((resolve, reject) => {
            fetch(urls, init)
                .then(PauseProgress)
                .then(res => {
                    if (res.status == 200) {
                        controller.abort();
                        resolve(res)
                    } else {
                        reject(null)
                    }
                })
        })
    }))
}

let gdt = {

}
const mirror = [
    `https://registry.npmmirror.com/qy-blog/latest`,
    `https://registry.npmjs.org/qy-blog/latest`,
    `https://mirrors.cloud.tencent.com/npm/qy-blog/latest`
]
const broadcast = (channel, data) => {
    let broadcast = new BroadcastChannel(channel);
    return broadcast.postMessage({ type: data })
}
const set_newest_version = async (mirror) => { 
    // 改为最新版本写入数据库
    console.log("[LOG] 开始检查更新.");
    return lfetch(mirror, mirror[0])
        .then(res => res.json())
        .then(async res => {
            let thisVersion = await db.read("blog_version");
            console.info("[INFO] 当前版本: "+ thisVersion);
            console.info("[INFO] 最新版本: "+res.version);
            if (thisVersion != res.version) {
                // 版本有更新 向页面展示
                broadcast("Blog Update", "REFRESH");
            }
            await db.write('blog_version', res.version);
            return;
        });
}

setInterval(async() => {
    await set_newest_version(mirror);
}, 30*1000);

setTimeout(async() => { 
    await set_newest_version(mirror);
}, 5000)


const handle = async function (req) {
    const urlStr = req.url
    const urlObj = new URL(urlStr)
    const port = urlObj.port
    const domain = urlObj.hostname;
    const urlPath = urlObj.pathname;
    let urls = []

    if (req.method == "GET" && (domain == "www.qystu.cc" || domain == "localhost")) {
        /* 是 Blog & 且资源为 Get */
        /* 根据 Blog 的路径情况修改了下 fullpath 函数 */
        const fullpath = (path) => {
            path = path.split('?')[0].split('#')[0]
            if (path.match(/\/$/)) {
                path += 'index.html'
            }
            if (!path.match(/\.[a-zA-Z]+$/)) {
                path += '/index.html'
            }
            return path
        }
        const generate_blog_urls = (packagename, blogversion, path, static) => {
            var npmmirror;
            if (static == 0) {
                // HTML 文件
                npmmirror = [
                    `https://npm.elemecdn.com/${packagename}@${blogversion}/public`,
                    `https://cdn.tianli0.top/npm/${packagename}@${blogversion}/public`,
                    `https://jsd.iftft.com/npm/${packagename}@${blogversion}/public`
                ]
            } else {
                // 其他资源文件
                npmmirror = [
                    `https://npm.elemecdn.com/${packagename}@${blogversion}/public`,
                    `https://cdn.tianli0.top/npm/${packagename}@${blogversion}/public`,
                    `https://jsd.iftft.com/npm/${packagename}@${blogversion}/public`
                ]
            }
            for (var i in npmmirror) {
                npmmirror[i] += path
            }
            return npmmirror
        }
        if (fullpath(urlPath).match(/\.[a-zA-Z]+$/)[0] == ".html") {
            /* 只拦截 HTML 文件 */
            return lfetch(generate_blog_urls('qy-blog',await db.read('blog_version') || '0.1.7',fullpath(urlPath),0))
            .then(res=>res.arrayBuffer())
            .then(buffer=>new Response(buffer,{headers:{"Content-Type":"text/html;charset=utf-8"}})
            )// rewrite header
        } else {
            /* 拦截其他文件，不用处理 Headers */
            return lfetch(generate_blog_urls('qy-blog',await db.read('blog_version') || '0.1.7',fullpath(urlPath), 0))
            // .then(res=>res.arrayBuffer())
            // .then(buffer=>new Response(buffer,{headers:{"Content-Type":"text/html;charset=utf-8"}})
            // )// rewrite header
        }
    }

    for (let i in cdn) {
        for (let j in cdn[i]) {
            if (domain == cdn[i][j].url.split('https://')[1].split('/')[0] && urlStr.match(cdn[i][j].url)) {
                urls = []
                for (let k in cdn[i]) {
                    urls.push(urlStr.replace(cdn[i][j].url, cdn[i][k].url))
                }
                if (urlStr.indexOf('@latest/') > -1) {
                    return lfetch(urls, urlStr)
                } else {
                    return caches.match(req).then(function (resp) {
                        return resp || lfetch(urls, urlStr).then(function (res) {
                            return caches.open(CACHE_NAME).then(function (cache) {
                                cache.put(req, res.clone());
                                return res;
                            });
                        });
                    })
                }
            }
        }
    }
    return fetch(req).then(function (res) {
        if (!res) { throw 'error' } //1
        return caches.open(CACHE_NAME).then(function (cache) {
            cache.delete(req);
            cache.put(req, res.clone());
            return res;
        });
    }).catch(function (err) {
        return caches.match(req).then(function (resp) {
            return resp || caches.match(new Request('/offline/')) //2
        })
    })
}