let Parallax={options:{}};Parallax.options.speed=.25,Parallax.options.zIndex=-100,Parallax.options.fade=1500,Parallax.slidein=()=>{let a=Parallax.mirrors[0].slider;Parallax.mirrors.length>=2&&(a=Parallax.mirrors[1].slider);var l=parseFloat(a.style.opacity);1!==l?Parallax.mirrors.length>=2?(l+=.1,a.style.opacity=l,setTimeout(Parallax.slidein,Parallax.options.fade/10)):a.style.opacity=1:Parallax.mirrors.length>=2&&(Parallax.mirrors[0].mirror.remove(),Parallax.mirrors.shift())},Parallax.start=()=>{let a=document.createElement("div");a.classList.add("parallax-mirror"),a.style.visibility="hidden",a.style.zIndex=Parallax.options.zIndex,a.style.position="fixed",a.style.top=0,a.style.left=0,a.style.overflow="hidden",Parallax.window.appendChild(a);let l=document.createElement("img");l.src=Parallax.options.src,l.alt="parallax",l.classList.add("parallax-slider"),l.style.opacity=0,a.appendChild(l),Parallax.mirrors||(Parallax.mirrors=[]);let o={};o.mirror=a,o.slider=l,Parallax.mirrors.push(o),Parallax.slidein(),l.addEventListener("load",(function(){Parallax.update()}),!1)},Parallax.init=()=>{function a(){Parallax.wH=document.documentElement.clientHeight,Parallax.wW=document.documentElement.clientWidth}function l(){var a;return window.pageYOffset?a=window.pageYOffset:document.compatMode&&"BackCompat"!=document.compatMode?a=document.documentElement.scrollTop:document.body&&(a=document.body.scrollTop),a}window.addEventListener("resize",(function(){a(),Parallax.update()}),!1),a();let o=-1;!function a(){const t=l();o!==t&&(o=t,function(){const a=l();Parallax.sT=Math.max(0,a),Parallax.sL=Math.max(0,document.body.scrollLeft),Parallax.overScroll=Math.min(a,0)}(),Parallax.update()),window.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame,window.requestAnimationFrame(a)}()},Parallax.refreshItem=a=>{Parallax.options.aspectRatio=a.naturalWidth/(a.naturalHeight||1);const l=Parallax.options.aspectRatio||1;Parallax.options.boxWidth=Parallax.window.clientWidth,Parallax.options.boxHeight=Parallax.window.clientHeight,Parallax.options.boxOffsetTop=Parallax.window.scrollTop,Parallax.options.boxOffsetLeft=Parallax.window.scrollLeft,Parallax.options.boxOffsetBottom=Parallax.options.boxOffsetTop+Parallax.options.boxHeight;const o=Parallax.wH,t=Parallax.options.boxOffsetTop,r=Math.max(Parallax.options.boxOffsetTop+Parallax.options.boxHeight-o,0),i=Parallax.options.boxHeight+(t-r)*(1-Parallax.options.speed)|0,e=(Parallax.options.boxOffsetTop-t)*(1-Parallax.options.speed)|0;let s;Parallax.options.boxWidth<i*l?(Parallax.options.imageWidth=i*l|0,Parallax.options.imageHeight=i,Parallax.options.offsetBaseTop=e,s=Parallax.options.imageWidth-Parallax.options.boxWidth,Parallax.options.offsetLeft=-s/2|0):(Parallax.options.imageWidth=Parallax.options.boxWidth,Parallax.options.imageHeight=Parallax.options.boxWidth/l|0,Parallax.options.offsetLeft=0,s=Parallax.options.imageHeight-i,Parallax.options.offsetBaseTop=e-s/2|0)},Parallax.renderItem=(a,l)=>{const o=Parallax.sT,t=Parallax.sL,r=o+Parallax.wH;Parallax.options.boxOffsetBottom>o&&Parallax.options.boxOffsetTop<=r?(Parallax.options.visibility="visible",Parallax.options.mirrorTop=Parallax.options.boxOffsetTop-o,Parallax.options.mirrorLeft=Parallax.options.boxOffsetLeft-t,Parallax.options.offsetTop=Parallax.options.offsetBaseTop-Parallax.options.mirrorTop*(1-Parallax.options.speed)):Parallax.options.visibility="hidden",a.style.transform="translate3d("+Parallax.options.mirrorLeft+"px, "+Parallax.options.mirrorTop+"px, 0px)",a.style.visibility=Parallax.options.visibility,a.style.height=Parallax.options.boxHeight+"px",a.style.width=Parallax.options.boxWidth+"px",l.style.transform="translate3d("+Parallax.options.offsetLeft+"px, "+Parallax.options.offsetTop+"px, 0px)",l.style.position="absolute",l.style.height=Parallax.options.imageHeight+"px",l.style.width=Parallax.options.imageWidth+"px",l.style.maxWidth="none"},Parallax.update=()=>{Parallax.mirrors&&Parallax.mirrors.forEach((a=>{Parallax.refreshItem(a.slider),Parallax.renderItem(a.mirror,a.slider)}))};