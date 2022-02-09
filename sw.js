"use strict";var precacheConfig=[["/404.html","2fe657013074e0d322b30e7735fda29a"],["/about/index.html","8e13fd1958da283bf0950dd1755488e8"],["/ac/index.html","2d9b0d9a89e8664e188fede2f6c3058d"],["/archives/2021/02/index.html","6809bd70249125f76bdf462d301bbd66"],["/archives/2021/03/index.html","3b32e280604df2f57c9383c2c4a244f1"],["/archives/2021/04/index.html","d63de9363e6e849e6c959f917cf07745"],["/archives/2021/05/index.html","d7808949bea766c035833398046eabde"],["/archives/2021/06/index.html","655833c33cd7e3fff28df85804008b41"],["/archives/2021/08/index.html","2aa893853dddab3620eee274c5b9ca0c"],["/archives/2021/09/index.html","2d91b79b1e8838e5613328051d5dfcaf"],["/archives/2021/10/index.html","d74766fe9db41e60a8c114c4cb69c609"],["/archives/2021/12/index.html","822ab985a1c201ef69f73c8b14f779e8"],["/archives/2021/index.html","4b50e7ece2893f0e53c39b62afaf69b9"],["/archives/2021/page/2/index.html","5fed623b03a61a62920ea7a7b119a107"],["/archives/2022/01/index.html","8fd9f2b7d0b71435b468ef483e66bbc9"],["/archives/2022/index.html","9486cc7e80a7be7ee7fdece9e9f468dd"],["/archives/index.html","cc711f574897dbdd20fecc7a9583f1fa"],["/archives/page/2/index.html","dc324916c51788b7f148f99b77c1eb29"],["/artitalk/index.html","ecedba03ec188ae48847f9b52b01650d"],["/c/mf.html","6dedfb567986585004b750b11d5a22fe"],["/c/yszq.html","ad7eead0a95ee69785a49d98d91cf339"],["/categories/index.html","e68f62c9fdb8c983897d4b402eecf77c"],["/categories/software/index.html","dbcc037f8513a0bf02abfecca80b95f2"],["/categories/tools/index.html","23e6ecff5cadc423027796d8f3a14e3c"],["/categories/web/index.html","d4a02abac417ba0f98ce343c54727588"],["/categories/前端/index.html","24bdae90979800afe3be339f1208cd34"],["/categories/系统/index.html","11ebb14ec189edd9967ee98a0bb7f55a"],["/covid19/index.html","6dfb5b0d07b999024512e282d1ff8c96"],["/css/first.css","d08854fb51884a85521f2f9ec32df92a"],["/css/hbe.style.css","a8bc819e01e001d3bc6ae03a2afad957"],["/css/message.css","ca2f839e9a41207ce4d486b75b0dc926"],["/css/style.css","60a2077cc1b05419fa53af291b93ad77"],["/diyc/index.html","f15d77838832fdf432e916a41920a18d"],["/index.html","87cfaab153cf67f7e1cd6d50856b2a5a"],["/js/app.js","1d89572478e404ab7f1eb831bc69bb2c"],["/js/iconfontInkss.js","f5d1775fcfe8f85508c40c16a6337119"],["/js/plugins/aplayer.js","40a083642ab212371216044672d6f0d4"],["/js/plugins/contributors.js","50566ed7a65c7a8ed00f81ac7e296ebd"],["/js/plugins/friends.js","a4a917ec8d015ae87ec4104fb53a4d6c"],["/js/plugins/parallax.js","8bf0ab10d50243ae87016af576642cdc"],["/js/plugins/rightMenu.js","ac2eff45f2196210798a758e07573f42"],["/js/plugins/sites.js","f2bbc29a32077a3cbfff221fc9637027"],["/js/search/hexo.js","a79c455b734acb6e7067d785ce4d5ed5"],["/js/thirdparty/message.js","a05a127c793145cec6b721f14fced3e5"],["/js/thirdparty/valine.js","15d0f1f9d975de124ef5389385961992"],["/lib/hbe.js","4a7e94ac7224adfce4b0572ca5c57fef"],["/links/index.html","9be8f53fa34eb76e9de80c127d46f4f7"],["/messages/index.html","a699fe9f30cd3b3cb9c7a18ba001de95"],["/navigation/css/bootstrap.min.css","725ad7c0dd95693660a92bea0eb73e5a"],["/navigation/css/fonts/fontawesome/css/all.min.css","76cb46c10b6c0293433b371bae2414b2"],["/navigation/css/fonts/fontawesome/css/webfonts/fa-brands-400.eot","c1868c9545d2de1cf8488f1dadd8c9d0"],["/navigation/css/fonts/fontawesome/css/webfonts/fa-brands-400.svg","0cb5a5c0d251c109458c85c6afeffbaa"],["/navigation/css/fonts/fontawesome/css/webfonts/fa-brands-400.ttf","13685372945d816a2b474fc082fd9aaa"],["/navigation/css/fonts/fontawesome/css/webfonts/fa-brands-400.woff","ec3cfddedb8bebd2d7a3fdf511f7c1cc"],["/navigation/css/fonts/fontawesome/css/webfonts/fa-brands-400.woff2","a06da7f0950f9dd366fc9db9d56d618a"],["/navigation/css/fonts/fontawesome/css/webfonts/fa-regular-400.eot","261d666b0147c6c5cda07265f98b8f8c"],["/navigation/css/fonts/fontawesome/css/webfonts/fa-regular-400.svg","89ffa3aba80d30ee0a9371b25c968bbb"],["/navigation/css/fonts/fontawesome/css/webfonts/fa-regular-400.ttf","db78b9359171f24936b16d84f63af378"],["/navigation/css/fonts/fontawesome/css/webfonts/fa-regular-400.woff","f89ea91ecd1ca2db7e09baa2c4b156d1"],["/navigation/css/fonts/fontawesome/css/webfonts/fa-regular-400.woff2","c20b5b7362d8d7bb7eddf94344ace33e"],["/navigation/css/fonts/fontawesome/css/webfonts/fa-solid-900.eot","a0369ea57eb6d3843d6474c035111f29"],["/navigation/css/fonts/fontawesome/css/webfonts/fa-solid-900.svg","ec763292e583294612f124c0b0def500"],["/navigation/css/fonts/fontawesome/css/webfonts/fa-solid-900.ttf","1ab236ed440ee51810c56bd16628aef0"],["/navigation/css/fonts/fontawesome/css/webfonts/fa-solid-900.woff","bea989e82b07e9687c26fc58a4805021"],["/navigation/css/fonts/fontawesome/css/webfonts/fa-solid-900.woff2","b15db15f746f29ffa02638cb455b8ec0"],["/navigation/css/fonts/fontawesome/webfonts/fa-brands-400.eot","c1868c9545d2de1cf8488f1dadd8c9d0"],["/navigation/css/fonts/fontawesome/webfonts/fa-brands-400.svg","0cb5a5c0d251c109458c85c6afeffbaa"],["/navigation/css/fonts/fontawesome/webfonts/fa-brands-400.ttf","13685372945d816a2b474fc082fd9aaa"],["/navigation/css/fonts/fontawesome/webfonts/fa-brands-400.woff","ec3cfddedb8bebd2d7a3fdf511f7c1cc"],["/navigation/css/fonts/fontawesome/webfonts/fa-brands-400.woff2","a06da7f0950f9dd366fc9db9d56d618a"],["/navigation/css/fonts/fontawesome/webfonts/fa-regular-400.eot","261d666b0147c6c5cda07265f98b8f8c"],["/navigation/css/fonts/fontawesome/webfonts/fa-regular-400.svg","89ffa3aba80d30ee0a9371b25c968bbb"],["/navigation/css/fonts/fontawesome/webfonts/fa-regular-400.ttf","db78b9359171f24936b16d84f63af378"],["/navigation/css/fonts/fontawesome/webfonts/fa-regular-400.woff","f89ea91ecd1ca2db7e09baa2c4b156d1"],["/navigation/css/fonts/fontawesome/webfonts/fa-regular-400.woff2","c20b5b7362d8d7bb7eddf94344ace33e"],["/navigation/css/fonts/fontawesome/webfonts/fa-solid-900.eot","a0369ea57eb6d3843d6474c035111f29"],["/navigation/css/fonts/fontawesome/webfonts/fa-solid-900.svg","ec763292e583294612f124c0b0def500"],["/navigation/css/fonts/fontawesome/webfonts/fa-solid-900.ttf","1ab236ed440ee51810c56bd16628aef0"],["/navigation/css/fonts/fontawesome/webfonts/fa-solid-900.woff","bea989e82b07e9687c26fc58a4805021"],["/navigation/css/fonts/fontawesome/webfonts/fa-solid-900.woff2","b15db15f746f29ffa02638cb455b8ec0"],["/navigation/css/fonts/linecons/css/linecons-codes.css","71e3c4cb86ec1bbd36d65c33a692b2ce"],["/navigation/css/fonts/linecons/css/linecons-embedded.css","c0e89fb3f71d0a1001cc2d7b3efbeb34"],["/navigation/css/fonts/linecons/css/linecons-ie7-codes.css","b0187b7583a581b6c82501ab4769f95f"],["/navigation/css/fonts/linecons/css/linecons-ie7.css","72f0c9a6deebca201da8a881fd92744f"],["/navigation/css/fonts/linecons/css/linecons.min.css","d5c02440177578aeb99acc596a4a9f90"],["/navigation/css/fonts/linecons/font/linecons.eot","4bf49170be78e2d00c14713c6e8c6129"],["/navigation/css/fonts/linecons/font/linecons.svg","34af242ca498bf94203e488bf4479e38"],["/navigation/css/fonts/linecons/font/linecons.ttf","1238c93be90d200cede56f6ccb374c67"],["/navigation/css/fonts/linecons/font/linecons.woff","9c45ff1c4d1c170f1a4025de9be5e111"],["/navigation/css/hclonely.css","84537ca615287dbc53ed0a871c473a86"],["/navigation/css/nav.min.css","f57b436a8964058a2979daf5f0efa790"],["/navigation/css/xenon-components.min.css","5e705600a435073fa59e50f75b029965"],["/navigation/css/xenon-core.min.css","f7b1467ec78d27416d6bd1684acd444a"],["/navigation/css/xenon-forms.min.css","3d5eb8c9ce52c12e611934812a86e6b5"],["/navigation/css/xenon-skins.min.css","f8a65e7f1fce70facf2758756db85481"],["/navigation/css/xenon.min.css","5d2ce53d9906e5a674931b020dd19a15"],["/navigation/images/favicon.png","831793361f36a5524d7c2c8e5a5e791c"],["/navigation/images/flags/flag-cn.png","aec786dd377f7498121b2b989285de13"],["/navigation/images/flags/flag-us.png","4e484b374a934ec7a0c318fa3039a18f"],["/navigation/images/logo-collapsed@2x.png","5a7921ae91c9497d9c479db2ed247271"],["/navigation/images/logo@2x.png","7dff419a181fc2ee0d21e7759b9fdff5"],["/navigation/images/logo_dark@2x.png","7618f56d3783393049d5486b34c83f1b"],["/navigation/images/logos/github.png","3ca867b4d49b00409911b0e7d221993d"],["/navigation/images/logos/myblog.png","c65b405af280672770a5e68dbc602608"],["/navigation/images/off_on.png","1bdd36870ded5c5d39e24fcdc65b0cb5"],["/navigation/images/search_icon.png","73b5f23fe9023e21c9d90b25d73f3881"],["/navigation/images/webstack_banner_cn.png","49008f34a922e970792cacb5d17b51a0"],["/navigation/images/webstack_icon_producthunt.png","2ba473dc05e96515bb57a7bb00c4d703"],["/navigation/index.html","d8c8702cc1ea23ac1b031a44998fba30"],["/navigation/js/TweenMax.min.js","66983609e962b2c2cad05c9313a52698"],["/navigation/js/bootstrap.min.js","c29f095fbfcfe525181b8b03e1c16dd3"],["/navigation/js/footer.js","e24dd871e99d0873276605e03e7017a6"],["/navigation/js/header.js","c471b261914e5a90ef9470ec747cc723"],["/navigation/js/html5shiv.min.js","3044234175ac91f49b03ff999c592b85"],["/navigation/js/joinable.js","0a92da519b032a99d687908ec1739555"],["/navigation/js/jquery-1.11.1.min.js","8101d596b2b8fa35fe3a634ea342d7c3"],["/navigation/js/lozad.min.js","99bb52aa8880eec26724eb3ee768e45d"],["/navigation/js/resizeable.js","9df2bd66e7e7b427f3a5db0a30162232"],["/navigation/js/resizeable.min.js","3380803e7a9adad960afa03edd480116"],["/navigation/js/respond.min.js","afc1984a3d17110449dc90cf22de0c27"],["/navigation/js/xenon-api.min.js","44168f181e33f28e60a465f0d51459e2"],["/navigation/js/xenon-custom.min.js","aea2bc463105aa44d1eacb38889d9e36"],["/navigation/js/xenon-toggles.min.js","2f2079659b485a823eed4ef08afe4479"],["/note/bt/index.html","2510c5b45a017066023e7dfa974ffe85"],["/note/index.html","3c3f38a5e7469c42a1d96302ebc7965d"],["/note/python/1/index.html","b25ad8bba10555dde28ad79fb47f2262"],["/note/python/index.html","b1fdd855fced41450df934e426f4e826"],["/note/sweetalert/index.html","ef3523578220dd03c207d0ccd87ec327"],["/note/volantis/index.html","4f0549cb93e798f19b75ae35513d10c0"],["/notebook/index.html","bd9cfe2d6676acf97ae66829419cd3d8"],["/page/2/index.html","7f0a47df738123b9f35f6180fa7d16b6"],["/page/3/index.html","eb8e00904a42b08bc56d3163847a2597"],["/posts/14158.html","7d2d40cc2ee48d633e945a18f310c28e"],["/posts/14166.html","297d010298912280fb789fc5fe935995"],["/posts/18567.html","909805c4a28c5e682c5fc4e8d3980a4a"],["/posts/25250.html","dbe5fa7bb34ea900e23983330e3a86e6"],["/posts/32661.html","db6e7c44933ec8426317f44ff527f39b"],["/posts/35934.html","5006f7bf898f2238a42a7ebe2d7d5656"],["/posts/42493.html","811786cf7ce994668c23cbc8d7b1844a"],["/posts/48475.html","af796da06e5c1362d743cb5513ddd2c5"],["/posts/48495.html","eb4e93db008420e079c59ae632230e8f"],["/posts/51935.html","b914200055ee7545f4e3d657a416fe5d"],["/posts/59121.html","f9f6a80a5c673bf975d76b2757ba4c7d"],["/posts/61939.html","a7d35cdecf582c06c68e688614f79576"],["/posts/63659.html","c358d70d07274319e997ded537d21e29"],["/posts/64280.html","fb9537e306f85cda8ca01958da5bf16c"],["/posts/78415.html","4cfb7cd46f8183cf68541a02e5d4096c"],["/setting/index.html","6f92b3e880588b82af9cb23c44d3f607"],["/sw-register.js","0b3d674126f52b5f78d0226a174750e8"],["/tags/IObit/index.html","2a260a69cb8505d562d67a1b7dfe6bc0"],["/tags/PPT/index.html","3c8baee89200a9c7dd5410f867711d56"],["/tags/WPS/index.html","40e6c70457c477928744781d3c45b6d9"],["/tags/hexo/index.html","8a446be763e24d3920cbca81a60e2ea5"],["/tags/software/index.html","30d65a0212d36d509b06ba0b56c52457"],["/tags/tools/index.html","99afb1abd11f19f9f8a0fb8001e6c1ef"],["/tags/windows/index.html","1005209eec200c216a7a52e95bfd9577"],["/tags/前端/index.html","1771bdfcd773d4df4469b59cd7023968"],["/tags/华为/index.html","55c4139f45d881092a9f98b13508a3bd"],["/tags/博客/index.html","38ba5bea97d057dbf511806a79365562"],["/tags/卸载/index.html","ca8c6e0e380dc0a300a71284e5e275d2"],["/tags/去广告/index.html","1268f67ca4894025fdbd9e4862fccf88"],["/tags/图床/index.html","d40b154b2053dacdf7dc472b4647be9f"],["/tags/安全/index.html","22445a2decaa50695cad4b3bd8099b95"],["/tags/建站/index.html","403c7e42853e5a0dcbd917172e3fb99a"],["/tags/服务器/index.html","7a9152943513c77320a241afa49f4ffa"],["/tags/欧拉/index.html","42130c36675341e8d10e74586cd03f2e"],["/tags/系统/index.html","9c6e8f17de7e1d79ecc26d52e9932084"],["/tags/跳转/index.html","70408cb759e9acfc1b18d1e25d5ea49d"],["/tags/软件/index.html","a31047d35a77bf8aa50b345c1a7064fa"],["/thirdparty/APlayer/APlayer.min.css","0cc55b48fc4576b3c7e4e880a2cc3add"],["/thirdparty/APlayer/APlayer.min.js","cc0f471e640de0ebd2fab5ebeb52cf0a"],["/thirdparty/FancyBox/fancybox.css","65aeb69d2e4c11e7b8fc6eea3591a2a5"],["/thirdparty/FancyBox/fancybox.umd.js","80904301ee5d7391fa122063fea764e9"],["/thirdparty/font-awesome-animation.min.css","42cf79d0f68da880d51392766a84181d"],["/thirdparty/lazyload.min.js","9482135b153ecac4887c8e2684c3ee58"],["/thirdparty/pjax.min.js","d810aff16a7f45392bdeec5493ebee8e"]],cacheName="sw-precache-v3--"+(self.registration?self.registration.scope:""),firstRegister=1,ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=a),n.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then((function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})})):Promise.resolve(e)},createCacheKey=function(e,a,n,s){var c=new URL(e);return s&&c.pathname.match(s)||(c.search+=(c.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(n)),c.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var n=new URL(a).pathname;return e.some((function(e){return n.match(e)}))},stripIgnoredUrlParameters=function(e,a){var n=new URL(e);return n.hash="",n.search=n.search.slice(1).split("&").map((function(e){return e.split("=")})).filter((function(e){return a.every((function(a){return!a.test(e[0])}))})).map((function(e){return e.join("=")})).join("&"),n.toString()},hashParamName=(addDirectoryIndex=function(e,a){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=a),n.toString()},"_sw-precache"),urlsToCacheKeys=new Map(precacheConfig.map((function(e){var a=e[0],n=e[1],s=new URL(a,self.location),c=createCacheKey(s,hashParamName,n,!1);return[s.toString(),c]})));function setOfCachedUrls(e){return e.keys().then((function(e){return e&&e.length>0&&(firstRegister=0),e.map((function(e){return e.url}))})).then((function(e){return new Set(e)}))}self.addEventListener("install",(function(e){e.waitUntil(caches.open(cacheName).then((function(e){return setOfCachedUrls(e).then((function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map((function(n){if(!a.has(n)){var s=new Request(n,{credentials:"same-origin"});return fetch(s).then((function(a){if(!a.ok)throw new Error("Request for "+n+" returned a response with status "+a.status);return cleanResponse(a).then((function(a){return e.put(n,a)}))}))}})))}))})).then((function(){return self.skipWaiting()})))})),self.addEventListener("activate",(function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then((function(e){return e.keys().then((function(n){return Promise.all(n.map((function(n){if(!a.has(n.url))return e.delete(n)})))}))})).then((function(){return self.clients.claim()})).then((function(){if(!firstRegister)return self.clients.matchAll().then((function(e){e&&e.length&&e.forEach((function(e){e.postMessage("sw.update")}))}))})))})),self.addEventListener("fetch",(function(e){if("GET"===e.request.method){var a,n=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),s="index.html";(a=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,s),a=urlsToCacheKeys.has(n));0,a&&e.respondWith(caches.open(cacheName).then((function(e){return e.match(urlsToCacheKeys.get(n)).then((function(e){if(e)return e;throw Error("The cached response that was expected is missing.")}))})).catch((function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)})))}}));