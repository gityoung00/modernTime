(window.webpackJsonp=window.webpackJsonp||[]).push([[0,58,59],{186:function(e,t,r){"use strict";function n(e,t,r,n,s,i,a,o){var u,h="function"==typeof e?e.options:e;if(t&&(h.render=t,h.staticRenderFns=r,h._compiled=!0),n&&(h.functional=!0),i&&(h._scopeId="data-v-"+i),a?(u=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),s&&s.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(a)},h._ssrRegister=u):s&&(u=o?function(){s.call(this,(h.functional?this.parent:this).$root.$options.shadowRoot)}:s),u)if(h.functional){h._injectStyles=u;var c=h.render;h.render=function(e,t){return u.call(t),c(e,t)}}else{var f=h.beforeCreate;h.beforeCreate=f?[].concat(f,u):[u]}return{exports:e,options:h}}r.d(t,"a",(function(){return n}))},188:function(e,t,r){var n=r(2),s=r(37),i=r(71),a=r(36),o=n("".charAt),u=n("".charCodeAt),h=n("".slice),c=function(e){return function(t,r){var n,c,f=i(a(t)),l=s(r),p=f.length;return l<0||l>=p?e?"":void 0:(n=u(f,l))<55296||n>56319||l+1===p||(c=u(f,l+1))<56320||c>57343?e?o(f,l):n:e?h(f,l,l+2):c-56320+(n-55296<<10)+65536}};e.exports={codeAt:c(!1),charAt:c(!0)}},204:function(e,t,r){r(312)},312:function(e,t,r){"use strict";r(313);var n,s=r(39),i=r(6),a=r(85),o=r(4),u=r(75),h=r(2),c=r(12),f=r(314),l=r(86),p=r(7),g=r(315),m=r(316),d=r(89),v=r(188).codeAt,w=r(321),b=r(71),y=r(24),P=r(88),S=r(84),U=r(22),R=U.set,k=U.getterFor("URL"),q=S.URLSearchParams,H=S.getState,A=o.URL,L=o.TypeError,x=o.parseInt,B=Math.floor,C=Math.pow,I=h("".charAt),_=h(/./.exec),j=h([].join),O=h(1..toString),F=h([].pop),$=h([].push),E=h("".replace),z=h([].shift),T=h("".split),J=h("".slice),M=h("".toLowerCase),N=h([].unshift),G=/[a-z]/i,V=/[\d+-.a-z]/i,X=/\d/,D=/^0x/i,K=/^[0-7]+$/,Q=/^\d+$/,W=/^[\da-f]+$/i,Y=/[\0\t\n\r #%/:<>?@[\\\]^|]/,Z=/[\0\t\n\r #/:<>?@[\\\]^|]/,ee=/^[\u0000-\u0020]+|[\u0000-\u0020]+$/g,te=/[\t\n\r]/g,re=function(e){var t,r,n,s;if("number"==typeof e){for(t=[],r=0;r<4;r++)N(t,e%256),e=B(e/256);return j(t,".")}if("object"==typeof e){for(t="",n=function(e){for(var t=null,r=1,n=null,s=0,i=0;i<8;i++)0!==e[i]?(s>r&&(t=n,r=s),n=null,s=0):(null===n&&(n=i),++s);return s>r&&(t=n,r=s),t}(e),r=0;r<8;r++)s&&0===e[r]||(s&&(s=!1),n===r?(t+=r?":":"::",s=!0):(t+=O(e[r],16),r<7&&(t+=":")));return"["+t+"]"}return e},ne={},se=g({},ne,{" ":1,'"':1,"<":1,">":1,"`":1}),ie=g({},se,{"#":1,"?":1,"{":1,"}":1}),ae=g({},ie,{"/":1,":":1,";":1,"=":1,"@":1,"[":1,"\\":1,"]":1,"^":1,"|":1}),oe=function(e,t){var r=v(e,0);return r>32&&r<127&&!p(t,e)?e:encodeURIComponent(e)},ue={ftp:21,file:null,http:80,https:443,ws:80,wss:443},he=function(e,t){var r;return 2==e.length&&_(G,I(e,0))&&(":"==(r=I(e,1))||!t&&"|"==r)},ce=function(e){var t;return e.length>1&&he(J(e,0,2))&&(2==e.length||"/"===(t=I(e,2))||"\\"===t||"?"===t||"#"===t)},fe=function(e){return"."===e||"%2e"===M(e)},le={},pe={},ge={},me={},de={},ve={},we={},be={},ye={},Pe={},Se={},Ue={},Re={},ke={},qe={},He={},Ae={},Le={},xe={},Be={},Ce={},Ie=function(e,t,r){var n,s,i,a=b(e);if(t){if(s=this.parse(a))throw L(s);this.searchParams=null}else{if(void 0!==r&&(n=new Ie(r,!0)),s=this.parse(a,null,n))throw L(s);(i=H(new q)).bindURL(this),this.searchParams=i}};Ie.prototype={type:"URL",parse:function(e,t,r){var s,i,a,o,u,h=this,c=t||le,f=0,l="",g=!1,v=!1,w=!1;for(e=b(e),t||(h.scheme="",h.username="",h.password="",h.host=null,h.port=null,h.path=[],h.query=null,h.fragment=null,h.cannotBeABaseURL=!1,e=E(e,ee,"")),e=E(e,te,""),s=m(e);f<=s.length;){switch(i=s[f],c){case le:if(!i||!_(G,i)){if(t)return"Invalid scheme";c=ge;continue}l+=M(i),c=pe;break;case pe:if(i&&(_(V,i)||"+"==i||"-"==i||"."==i))l+=M(i);else{if(":"!=i){if(t)return"Invalid scheme";l="",c=ge,f=0;continue}if(t&&(h.isSpecial()!=p(ue,l)||"file"==l&&(h.includesCredentials()||null!==h.port)||"file"==h.scheme&&!h.host))return;if(h.scheme=l,t)return void(h.isSpecial()&&ue[h.scheme]==h.port&&(h.port=null));l="","file"==h.scheme?c=ke:h.isSpecial()&&r&&r.scheme==h.scheme?c=me:h.isSpecial()?c=be:"/"==s[f+1]?(c=de,f++):(h.cannotBeABaseURL=!0,$(h.path,""),c=xe)}break;case ge:if(!r||r.cannotBeABaseURL&&"#"!=i)return"Invalid scheme";if(r.cannotBeABaseURL&&"#"==i){h.scheme=r.scheme,h.path=d(r.path),h.query=r.query,h.fragment="",h.cannotBeABaseURL=!0,c=Ce;break}c="file"==r.scheme?ke:ve;continue;case me:if("/"!=i||"/"!=s[f+1]){c=ve;continue}c=ye,f++;break;case de:if("/"==i){c=Pe;break}c=Le;continue;case ve:if(h.scheme=r.scheme,i==n)h.username=r.username,h.password=r.password,h.host=r.host,h.port=r.port,h.path=d(r.path),h.query=r.query;else if("/"==i||"\\"==i&&h.isSpecial())c=we;else if("?"==i)h.username=r.username,h.password=r.password,h.host=r.host,h.port=r.port,h.path=d(r.path),h.query="",c=Be;else{if("#"!=i){h.username=r.username,h.password=r.password,h.host=r.host,h.port=r.port,h.path=d(r.path),h.path.length--,c=Le;continue}h.username=r.username,h.password=r.password,h.host=r.host,h.port=r.port,h.path=d(r.path),h.query=r.query,h.fragment="",c=Ce}break;case we:if(!h.isSpecial()||"/"!=i&&"\\"!=i){if("/"!=i){h.username=r.username,h.password=r.password,h.host=r.host,h.port=r.port,c=Le;continue}c=Pe}else c=ye;break;case be:if(c=ye,"/"!=i||"/"!=I(l,f+1))continue;f++;break;case ye:if("/"!=i&&"\\"!=i){c=Pe;continue}break;case Pe:if("@"==i){g&&(l="%40"+l),g=!0,a=m(l);for(var y=0;y<a.length;y++){var P=a[y];if(":"!=P||w){var S=oe(P,ae);w?h.password+=S:h.username+=S}else w=!0}l=""}else if(i==n||"/"==i||"?"==i||"#"==i||"\\"==i&&h.isSpecial()){if(g&&""==l)return"Invalid authority";f-=m(l).length+1,l="",c=Se}else l+=i;break;case Se:case Ue:if(t&&"file"==h.scheme){c=He;continue}if(":"!=i||v){if(i==n||"/"==i||"?"==i||"#"==i||"\\"==i&&h.isSpecial()){if(h.isSpecial()&&""==l)return"Invalid host";if(t&&""==l&&(h.includesCredentials()||null!==h.port))return;if(o=h.parseHost(l))return o;if(l="",c=Ae,t)return;continue}"["==i?v=!0:"]"==i&&(v=!1),l+=i}else{if(""==l)return"Invalid host";if(o=h.parseHost(l))return o;if(l="",c=Re,t==Ue)return}break;case Re:if(!_(X,i)){if(i==n||"/"==i||"?"==i||"#"==i||"\\"==i&&h.isSpecial()||t){if(""!=l){var U=x(l,10);if(U>65535)return"Invalid port";h.port=h.isSpecial()&&U===ue[h.scheme]?null:U,l=""}if(t)return;c=Ae;continue}return"Invalid port"}l+=i;break;case ke:if(h.scheme="file","/"==i||"\\"==i)c=qe;else{if(!r||"file"!=r.scheme){c=Le;continue}if(i==n)h.host=r.host,h.path=d(r.path),h.query=r.query;else if("?"==i)h.host=r.host,h.path=d(r.path),h.query="",c=Be;else{if("#"!=i){ce(j(d(s,f),""))||(h.host=r.host,h.path=d(r.path),h.shortenPath()),c=Le;continue}h.host=r.host,h.path=d(r.path),h.query=r.query,h.fragment="",c=Ce}}break;case qe:if("/"==i||"\\"==i){c=He;break}r&&"file"==r.scheme&&!ce(j(d(s,f),""))&&(he(r.path[0],!0)?$(h.path,r.path[0]):h.host=r.host),c=Le;continue;case He:if(i==n||"/"==i||"\\"==i||"?"==i||"#"==i){if(!t&&he(l))c=Le;else if(""==l){if(h.host="",t)return;c=Ae}else{if(o=h.parseHost(l))return o;if("localhost"==h.host&&(h.host=""),t)return;l="",c=Ae}continue}l+=i;break;case Ae:if(h.isSpecial()){if(c=Le,"/"!=i&&"\\"!=i)continue}else if(t||"?"!=i)if(t||"#"!=i){if(i!=n&&(c=Le,"/"!=i))continue}else h.fragment="",c=Ce;else h.query="",c=Be;break;case Le:if(i==n||"/"==i||"\\"==i&&h.isSpecial()||!t&&("?"==i||"#"==i)){if(".."===(u=M(u=l))||"%2e."===u||".%2e"===u||"%2e%2e"===u?(h.shortenPath(),"/"==i||"\\"==i&&h.isSpecial()||$(h.path,"")):fe(l)?"/"==i||"\\"==i&&h.isSpecial()||$(h.path,""):("file"==h.scheme&&!h.path.length&&he(l)&&(h.host&&(h.host=""),l=I(l,0)+":"),$(h.path,l)),l="","file"==h.scheme&&(i==n||"?"==i||"#"==i))for(;h.path.length>1&&""===h.path[0];)z(h.path);"?"==i?(h.query="",c=Be):"#"==i&&(h.fragment="",c=Ce)}else l+=oe(i,ie);break;case xe:"?"==i?(h.query="",c=Be):"#"==i?(h.fragment="",c=Ce):i!=n&&(h.path[0]+=oe(i,ne));break;case Be:t||"#"!=i?i!=n&&("'"==i&&h.isSpecial()?h.query+="%27":h.query+="#"==i?"%23":oe(i,ne)):(h.fragment="",c=Ce);break;case Ce:i!=n&&(h.fragment+=oe(i,se))}f++}},parseHost:function(e){var t,r,n;if("["==I(e,0)){if("]"!=I(e,e.length-1))return"Invalid host";if(!(t=function(e){var t,r,n,s,i,a,o,u=[0,0,0,0,0,0,0,0],h=0,c=null,f=0,l=function(){return I(e,f)};if(":"==l()){if(":"!=I(e,1))return;f+=2,c=++h}for(;l();){if(8==h)return;if(":"!=l()){for(t=r=0;r<4&&_(W,l());)t=16*t+x(l(),16),f++,r++;if("."==l()){if(0==r)return;if(f-=r,h>6)return;for(n=0;l();){if(s=null,n>0){if(!("."==l()&&n<4))return;f++}if(!_(X,l()))return;for(;_(X,l());){if(i=x(l(),10),null===s)s=i;else{if(0==s)return;s=10*s+i}if(s>255)return;f++}u[h]=256*u[h]+s,2!=++n&&4!=n||h++}if(4!=n)return;break}if(":"==l()){if(f++,!l())return}else if(l())return;u[h++]=t}else{if(null!==c)return;f++,c=++h}}if(null!==c)for(a=h-c,h=7;0!=h&&a>0;)o=u[h],u[h--]=u[c+a-1],u[c+--a]=o;else if(8!=h)return;return u}(J(e,1,-1))))return"Invalid host";this.host=t}else if(this.isSpecial()){if(e=w(e),_(Y,e))return"Invalid host";if(null===(t=function(e){var t,r,n,s,i,a,o,u=T(e,".");if(u.length&&""==u[u.length-1]&&u.length--,(t=u.length)>4)return e;for(r=[],n=0;n<t;n++){if(""==(s=u[n]))return e;if(i=10,s.length>1&&"0"==I(s,0)&&(i=_(D,s)?16:8,s=J(s,8==i?1:2)),""===s)a=0;else{if(!_(10==i?Q:8==i?K:W,s))return e;a=x(s,i)}$(r,a)}for(n=0;n<t;n++)if(a=r[n],n==t-1){if(a>=C(256,5-t))return null}else if(a>255)return null;for(o=F(r),n=0;n<r.length;n++)o+=r[n]*C(256,3-n);return o}(e)))return"Invalid host";this.host=t}else{if(_(Z,e))return"Invalid host";for(t="",r=m(e),n=0;n<r.length;n++)t+=oe(r[n],ne);this.host=t}},cannotHaveUsernamePasswordPort:function(){return!this.host||this.cannotBeABaseURL||"file"==this.scheme},includesCredentials:function(){return""!=this.username||""!=this.password},isSpecial:function(){return p(ue,this.scheme)},shortenPath:function(){var e=this.path,t=e.length;!t||"file"==this.scheme&&1==t&&he(e[0],!0)||e.length--},serialize:function(){var e=this,t=e.scheme,r=e.username,n=e.password,s=e.host,i=e.port,a=e.path,o=e.query,u=e.fragment,h=t+":";return null!==s?(h+="//",e.includesCredentials()&&(h+=r+(n?":"+n:"")+"@"),h+=re(s),null!==i&&(h+=":"+i)):"file"==t&&(h+="//"),h+=e.cannotBeABaseURL?a[0]:a.length?"/"+j(a,"/"):"",null!==o&&(h+="?"+o),null!==u&&(h+="#"+u),h},setHref:function(e){var t=this.parse(e);if(t)throw L(t);this.searchParams.update()},getOrigin:function(){var e=this.scheme,t=this.port;if("blob"==e)try{return new _e(e.path[0]).origin}catch(e){return"null"}return"file"!=e&&this.isSpecial()?e+"://"+re(this.host)+(null!==t?":"+t:""):"null"},getProtocol:function(){return this.scheme+":"},setProtocol:function(e){this.parse(b(e)+":",le)},getUsername:function(){return this.username},setUsername:function(e){var t=m(b(e));if(!this.cannotHaveUsernamePasswordPort()){this.username="";for(var r=0;r<t.length;r++)this.username+=oe(t[r],ae)}},getPassword:function(){return this.password},setPassword:function(e){var t=m(b(e));if(!this.cannotHaveUsernamePasswordPort()){this.password="";for(var r=0;r<t.length;r++)this.password+=oe(t[r],ae)}},getHost:function(){var e=this.host,t=this.port;return null===e?"":null===t?re(e):re(e)+":"+t},setHost:function(e){this.cannotBeABaseURL||this.parse(e,Se)},getHostname:function(){var e=this.host;return null===e?"":re(e)},setHostname:function(e){this.cannotBeABaseURL||this.parse(e,Ue)},getPort:function(){var e=this.port;return null===e?"":b(e)},setPort:function(e){this.cannotHaveUsernamePasswordPort()||(""==(e=b(e))?this.port=null:this.parse(e,Re))},getPathname:function(){var e=this.path;return this.cannotBeABaseURL?e[0]:e.length?"/"+j(e,"/"):""},setPathname:function(e){this.cannotBeABaseURL||(this.path=[],this.parse(e,Ae))},getSearch:function(){var e=this.query;return e?"?"+e:""},setSearch:function(e){""==(e=b(e))?this.query=null:("?"==I(e,0)&&(e=J(e,1)),this.query="",this.parse(e,Be)),this.searchParams.update()},getSearchParams:function(){return this.searchParams.facade},getHash:function(){var e=this.fragment;return e?"#"+e:""},setHash:function(e){""!=(e=b(e))?("#"==I(e,0)&&(e=J(e,1)),this.fragment="",this.parse(e,Ce)):this.fragment=null},update:function(){this.query=this.searchParams.serialize()||null}};var _e=function(e){var t=l(this,je),r=P(arguments.length,1)>1?arguments[1]:void 0,n=R(t,new Ie(e,!1,r));i||(t.href=n.serialize(),t.origin=n.getOrigin(),t.protocol=n.getProtocol(),t.username=n.getUsername(),t.password=n.getPassword(),t.host=n.getHost(),t.hostname=n.getHostname(),t.port=n.getPort(),t.pathname=n.getPathname(),t.search=n.getSearch(),t.searchParams=n.getSearchParams(),t.hash=n.getHash())},je=_e.prototype,Oe=function(e,t){return{get:function(){return k(this)[e]()},set:t&&function(e){return k(this)[t](e)},configurable:!0,enumerable:!0}};if(i&&(f(je,"href",Oe("serialize","setHref")),f(je,"origin",Oe("getOrigin")),f(je,"protocol",Oe("getProtocol","setProtocol")),f(je,"username",Oe("getUsername","setUsername")),f(je,"password",Oe("getPassword","setPassword")),f(je,"host",Oe("getHost","setHost")),f(je,"hostname",Oe("getHostname","setHostname")),f(je,"port",Oe("getPort","setPort")),f(je,"pathname",Oe("getPathname","setPathname")),f(je,"search",Oe("getSearch","setSearch")),f(je,"searchParams",Oe("getSearchParams")),f(je,"hash",Oe("getHash","setHash"))),c(je,"toJSON",(function(){return k(this).serialize()}),{enumerable:!0}),c(je,"toString",(function(){return k(this).serialize()}),{enumerable:!0}),A){var Fe=A.createObjectURL,$e=A.revokeObjectURL;Fe&&c(_e,"createObjectURL",u(Fe,A)),$e&&c(_e,"revokeObjectURL",u($e,A))}y(_e,"URL"),s({global:!0,constructor:!0,forced:!a,sham:!i},{URL:_e})},313:function(e,t,r){"use strict";var n=r(188).charAt,s=r(71),i=r(22),a=r(80),o=i.set,u=i.getterFor("String Iterator");a(String,"String",(function(e){o(this,{type:"String Iterator",string:s(e),index:0})}),(function(){var e,t=u(this),r=t.string,s=t.index;return s>=r.length?{value:void 0,done:!0}:(e=n(r,s),t.index+=e.length,{value:e,done:!1})}))},314:function(e,t,r){var n=r(82),s=r(8);e.exports=function(e,t,r){return r.get&&n(r.get,t,{getter:!0}),r.set&&n(r.set,t,{setter:!0}),s.f(e,t,r)}},315:function(e,t,r){"use strict";var n=r(6),s=r(2),i=r(10),a=r(3),o=r(78),u=r(83),h=r(81),c=r(38),f=r(76),l=Object.assign,p=Object.defineProperty,g=s([].concat);e.exports=!l||a((function(){if(n&&1!==l({b:1},l(p({},"a",{enumerable:!0,get:function(){p(this,"b",{value:3,enumerable:!1})}}),{b:2})).b)return!0;var e={},t={},r=Symbol();return e[r]=7,"abcdefghijklmnopqrst".split("").forEach((function(e){t[e]=e})),7!=l({},e)[r]||"abcdefghijklmnopqrst"!=o(l({},t)).join("")}))?function(e,t){for(var r=c(e),s=arguments.length,a=1,l=u.f,p=h.f;s>a;)for(var m,d=f(arguments[a++]),v=l?g(o(d),l(d)):o(d),w=v.length,b=0;w>b;)m=v[b++],n&&!i(p,d,m)||(r[m]=d[m]);return r}:l},316:function(e,t,r){"use strict";var n=r(75),s=r(10),i=r(38),a=r(317),o=r(319),u=r(320),h=r(43),c=r(90),f=r(87),l=r(45),p=Array;e.exports=function(e){var t=i(e),r=u(this),g=arguments.length,m=g>1?arguments[1]:void 0,d=void 0!==m;d&&(m=n(m,g>2?arguments[2]:void 0));var v,w,b,y,P,S,U=l(t),R=0;if(!U||this===p&&o(U))for(v=h(t),w=r?new this(v):p(v);v>R;R++)S=d?m(t[R],R):t[R],c(w,R,S);else for(P=(y=f(t,U)).next,w=r?new this:[];!(b=s(P,y)).done;R++)S=d?a(y,m,[b.value,R],!0):b.value,c(w,R,S);return w.length=R,w}},317:function(e,t,r){var n=r(9),s=r(318);e.exports=function(e,t,r,i){try{return i?t(n(r)[0],r[1]):t(r)}catch(t){s(e,"throw",t)}}},318:function(e,t,r){var n=r(10),s=r(9),i=r(40);e.exports=function(e,t,r){var a,o;s(e);try{if(!(a=i(e,"return"))){if("throw"===t)throw r;return r}a=n(a,e)}catch(e){o=!0,a=e}if("throw"===t)throw r;if(o)throw a;return s(a),r}},319:function(e,t,r){var n=r(5),s=r(19),i=n("iterator"),a=Array.prototype;e.exports=function(e){return void 0!==e&&(s.Array===e||a[i]===e)}},320:function(e,t,r){var n=r(2),s=r(3),i=r(0),a=r(25),o=r(18),u=r(44),h=function(){},c=[],f=o("Reflect","construct"),l=/^\s*(?:class|function)\b/,p=n(l.exec),g=!l.exec(h),m=function(e){if(!i(e))return!1;try{return f(h,c,e),!0}catch(e){return!1}},d=function(e){if(!i(e))return!1;switch(a(e)){case"AsyncFunction":case"GeneratorFunction":case"AsyncGeneratorFunction":return!1}try{return g||!!p(l,u(e))}catch(e){return!0}};d.sham=!0,e.exports=!f||s((function(){var e;return m(m.call)||!m(Object)||!m((function(){e=!0}))||e}))?d:m},321:function(e,t,r){"use strict";var n=r(2),s=/[^\0-\u007E]/,i=/[.\u3002\uFF0E\uFF61]/g,a="Overflow: input needs wider integers to process",o=RangeError,u=n(i.exec),h=Math.floor,c=String.fromCharCode,f=n("".charCodeAt),l=n([].join),p=n([].push),g=n("".replace),m=n("".split),d=n("".toLowerCase),v=function(e){return e+22+75*(e<26)},w=function(e,t,r){var n=0;for(e=r?h(e/700):e>>1,e+=h(e/t);e>455;)e=h(e/35),n+=36;return h(n+36*e/(e+38))},b=function(e){var t,r,n=[],s=(e=function(e){for(var t=[],r=0,n=e.length;r<n;){var s=f(e,r++);if(s>=55296&&s<=56319&&r<n){var i=f(e,r++);56320==(64512&i)?p(t,((1023&s)<<10)+(1023&i)+65536):(p(t,s),r--)}else p(t,s)}return t}(e)).length,i=128,u=0,g=72;for(t=0;t<e.length;t++)(r=e[t])<128&&p(n,c(r));var m=n.length,d=m;for(m&&p(n,"-");d<s;){var b=2147483647;for(t=0;t<e.length;t++)(r=e[t])>=i&&r<b&&(b=r);var y=d+1;if(b-i>h((2147483647-u)/y))throw o(a);for(u+=(b-i)*y,i=b,t=0;t<e.length;t++){if((r=e[t])<i&&++u>2147483647)throw o(a);if(r==i){for(var P=u,S=36;;){var U=S<=g?1:S>=g+26?26:S-g;if(P<U)break;var R=P-U,k=36-U;p(n,c(v(U+R%k))),P=h(R/k),S+=36}p(n,c(v(P))),g=w(u,y,d==m),u=0,d++}}u++,i++}return l(n,"")};e.exports=function(e){var t,r,n=[],a=m(g(d(e),i,"."),".");for(t=0;t<a.length;t++)r=a[t],p(n,u(s,r)?"xn--"+b(r):r);return l(n,".")}}}]);