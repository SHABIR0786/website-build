"use strict";function bind(e,t){return function(){return e.apply(t,arguments)}}const{toString:toString}=Object.prototype,{getPrototypeOf:getPrototypeOf}=Object,kindOf=(e=>t=>{const r=toString.call(t);return e[r]||(e[r]=r.slice(8,-1).toLowerCase())})(Object.create(null)),kindOfTest=e=>(e=e.toLowerCase(),t=>kindOf(t)===e),typeOfTest=e=>t=>typeof t===e,{isArray:isArray}=Array,isUndefined=typeOfTest("undefined");function isBuffer(e){return null!==e&&!isUndefined(e)&&null!==e.constructor&&!isUndefined(e.constructor)&&isFunction(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const isArrayBuffer=kindOfTest("ArrayBuffer");function isArrayBufferView(e){let t;return t="undefined"!==typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&isArrayBuffer(e.buffer),t}const isString=typeOfTest("string"),isFunction=typeOfTest("function"),isNumber=typeOfTest("number"),isObject=e=>null!==e&&"object"===typeof e,isBoolean=e=>!0===e||!1===e,isPlainObject=e=>{if("object"!==kindOf(e))return!1;const t=getPrototypeOf(e);return(null===t||t===Object.prototype||null===Object.getPrototypeOf(t))&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},isDate=kindOfTest("Date"),isFile=kindOfTest("File"),isBlob=kindOfTest("Blob"),isFileList=kindOfTest("FileList"),isStream=e=>isObject(e)&&isFunction(e.pipe),isFormData=e=>{let t;return e&&("function"===typeof FormData&&e instanceof FormData||isFunction(e.append)&&("formdata"===(t=kindOf(e))||"object"===t&&isFunction(e.toString)&&"[object FormData]"===e.toString()))},isURLSearchParams=kindOfTest("URLSearchParams"),trim=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function forEach(e,t,{allOwnKeys:r=!1}={}){if(null===e||"undefined"===typeof e)return;let n,o;if("object"!==typeof e&&(e=[e]),isArray(e))for(n=0,o=e.length;n<o;n++)t.call(null,e[n],n,e);else{const o=r?Object.getOwnPropertyNames(e):Object.keys(e),s=o.length;let i;for(n=0;n<s;n++)i=o[n],t.call(null,e[i],i,e)}}function findKey(e,t){t=t.toLowerCase();const r=Object.keys(e);let n,o=r.length;for(;o-- >0;)if(n=r[o],t===n.toLowerCase())return n;return null}const _global="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:"undefined"!==typeof window?window:global,isContextDefined=e=>!isUndefined(e)&&e!==_global;function merge(){const{caseless:e}=isContextDefined(this)&&this||{},t={},r=(r,n)=>{const o=e&&findKey(t,n)||n;isPlainObject(t[o])&&isPlainObject(r)?t[o]=merge(t[o],r):isPlainObject(r)?t[o]=merge({},r):isArray(r)?t[o]=r.slice():t[o]=r};for(let n=0,o=arguments.length;n<o;n++)arguments[n]&&forEach(arguments[n],r);return t}const extend=(e,t,r,{allOwnKeys:n}={})=>(forEach(t,((t,n)=>{r&&isFunction(t)?e[n]=bind(t,r):e[n]=t}),{allOwnKeys:n}),e),stripBOM=e=>(65279===e.charCodeAt(0)&&(e=e.slice(1)),e),inherits=(e,t,r,n)=>{e.prototype=Object.create(t.prototype,n),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),r&&Object.assign(e.prototype,r)},toFlatObject=(e,t,r,n)=>{let o,s,i;const a={};if(t=t||{},null==e)return t;do{for(o=Object.getOwnPropertyNames(e),s=o.length;s-- >0;)i=o[s],n&&!n(i,e,t)||a[i]||(t[i]=e[i],a[i]=!0);e=!1!==r&&getPrototypeOf(e)}while(e&&(!r||r(e,t))&&e!==Object.prototype);return t},endsWith=(e,t,r)=>{e=String(e),(void 0===r||r>e.length)&&(r=e.length),r-=t.length;const n=e.indexOf(t,r);return-1!==n&&n===r},toArray=e=>{if(!e)return null;if(isArray(e))return e;let t=e.length;if(!isNumber(t))return null;const r=new Array(t);for(;t-- >0;)r[t]=e[t];return r},isTypedArray=(e=>t=>e&&t instanceof e)("undefined"!==typeof Uint8Array&&getPrototypeOf(Uint8Array)),forEachEntry=(e,t)=>{const r=(e&&e[Symbol.iterator]).call(e);let n;for(;(n=r.next())&&!n.done;){const r=n.value;t.call(e,r[0],r[1])}},matchAll=(e,t)=>{let r;const n=[];for(;null!==(r=e.exec(t));)n.push(r);return n},isHTMLForm=kindOfTest("HTMLFormElement"),toCamelCase=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,(function(e,t,r){return t.toUpperCase()+r})),hasOwnProperty=(({hasOwnProperty:e})=>(t,r)=>e.call(t,r))(Object.prototype),isRegExp=kindOfTest("RegExp"),reduceDescriptors=(e,t)=>{const r=Object.getOwnPropertyDescriptors(e),n={};forEach(r,((r,o)=>{let s;!1!==(s=t(r,o,e))&&(n[o]=s||r)})),Object.defineProperties(e,n)},freezeMethods=e=>{reduceDescriptors(e,((t,r)=>{if(isFunction(e)&&-1!==["arguments","caller","callee"].indexOf(r))return!1;const n=e[r];isFunction(n)&&(t.enumerable=!1,"writable"in t?t.writable=!1:t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+r+"'")}))}))},toObjectSet=(e,t)=>{const r={},n=e=>{e.forEach((e=>{r[e]=!0}))};return isArray(e)?n(e):n(String(e).split(t)),r},noop=()=>{},toFiniteNumber=(e,t)=>(e=+e,Number.isFinite(e)?e:t),ALPHA="abcdefghijklmnopqrstuvwxyz",DIGIT="0123456789",ALPHABET={DIGIT:DIGIT,ALPHA:ALPHA,ALPHA_DIGIT:ALPHA+ALPHA.toUpperCase()+DIGIT},generateString=(e=16,t=ALPHABET.ALPHA_DIGIT)=>{let r="";const{length:n}=t;for(;e--;)r+=t[Math.random()*n|0];return r};function isSpecCompliantForm(e){return!!(e&&isFunction(e.append)&&"FormData"===e[Symbol.toStringTag]&&e[Symbol.iterator])}const toJSONObject=e=>{const t=new Array(10),r=(e,n)=>{if(isObject(e)){if(t.indexOf(e)>=0)return;if(!("toJSON"in e)){t[n]=e;const o=isArray(e)?[]:{};return forEach(e,((e,t)=>{const s=r(e,n+1);!isUndefined(s)&&(o[t]=s)})),t[n]=void 0,o}}return e};return r(e,0)},isAsyncFn=kindOfTest("AsyncFunction"),isThenable=e=>e&&(isObject(e)||isFunction(e))&&isFunction(e.then)&&isFunction(e.catch);var utils$1={isArray:isArray,isArrayBuffer:isArrayBuffer,isBuffer:isBuffer,isFormData:isFormData,isArrayBufferView:isArrayBufferView,isString:isString,isNumber:isNumber,isBoolean:isBoolean,isObject:isObject,isPlainObject:isPlainObject,isUndefined:isUndefined,isDate:isDate,isFile:isFile,isBlob:isBlob,isRegExp:isRegExp,isFunction:isFunction,isStream:isStream,isURLSearchParams:isURLSearchParams,isTypedArray:isTypedArray,isFileList:isFileList,forEach:forEach,merge:merge,extend:extend,trim:trim,stripBOM:stripBOM,inherits:inherits,toFlatObject:toFlatObject,kindOf:kindOf,kindOfTest:kindOfTest,endsWith:endsWith,toArray:toArray,forEachEntry:forEachEntry,matchAll:matchAll,isHTMLForm:isHTMLForm,hasOwnProperty:hasOwnProperty,hasOwnProp:hasOwnProperty,reduceDescriptors:reduceDescriptors,freezeMethods:freezeMethods,toObjectSet:toObjectSet,toCamelCase:toCamelCase,noop:noop,toFiniteNumber:toFiniteNumber,findKey:findKey,global:_global,isContextDefined:isContextDefined,ALPHABET:ALPHABET,generateString:generateString,isSpecCompliantForm:isSpecCompliantForm,toJSONObject:toJSONObject,isAsyncFn:isAsyncFn,isThenable:isThenable};function AxiosError(e,t,r,n,o){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=(new Error).stack,this.message=e,this.name="AxiosError",t&&(this.code=t),r&&(this.config=r),n&&(this.request=n),o&&(this.response=o)}utils$1.inherits(AxiosError,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:utils$1.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const prototype$1=AxiosError.prototype,descriptors={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach((e=>{descriptors[e]={value:e}})),Object.defineProperties(AxiosError,descriptors),Object.defineProperty(prototype$1,"isAxiosError",{value:!0}),AxiosError.from=(e,t,r,n,o,s)=>{const i=Object.create(prototype$1);return utils$1.toFlatObject(e,i,(function(e){return e!==Error.prototype}),(e=>"isAxiosError"!==e)),AxiosError.call(i,e.message,t,r,n,o),i.cause=e,i.name=e.name,s&&Object.assign(i,s),i};var httpAdapter=null;function isVisitable(e){return utils$1.isPlainObject(e)||utils$1.isArray(e)}function removeBrackets(e){return utils$1.endsWith(e,"[]")?e.slice(0,-2):e}function renderKey(e,t,r){return e?e.concat(t).map((function(e,t){return e=removeBrackets(e),!r&&t?"["+e+"]":e})).join(r?".":""):t}function isFlatArray(e){return utils$1.isArray(e)&&!e.some(isVisitable)}const predicates=utils$1.toFlatObject(utils$1,{},null,(function(e){return/^is[A-Z]/.test(e)}));function toFormData(e,t,r){if(!utils$1.isObject(e))throw new TypeError("target must be an object");t=t||new FormData;const n=(r=utils$1.toFlatObject(r,{metaTokens:!0,dots:!1,indexes:!1},!1,(function(e,t){return!utils$1.isUndefined(t[e])}))).metaTokens,o=r.visitor||c,s=r.dots,i=r.indexes,a=(r.Blob||"undefined"!==typeof Blob&&Blob)&&utils$1.isSpecCompliantForm(t);if(!utils$1.isFunction(o))throw new TypeError("visitor must be a function");function l(e){if(null===e)return"";if(utils$1.isDate(e))return e.toISOString();if(!a&&utils$1.isBlob(e))throw new AxiosError("Blob is not supported. Use a Buffer instead.");return utils$1.isArrayBuffer(e)||utils$1.isTypedArray(e)?a&&"function"===typeof Blob?new Blob([e]):Buffer.from(e):e}function c(e,r,o){let a=e;if(e&&!o&&"object"===typeof e)if(utils$1.endsWith(r,"{}"))r=n?r:r.slice(0,-2),e=JSON.stringify(e);else if(utils$1.isArray(e)&&isFlatArray(e)||(utils$1.isFileList(e)||utils$1.endsWith(r,"[]"))&&(a=utils$1.toArray(e)))return r=removeBrackets(r),a.forEach((function(e,n){!utils$1.isUndefined(e)&&null!==e&&t.append(!0===i?renderKey([r],n,s):null===i?r:r+"[]",l(e))})),!1;return!!isVisitable(e)||(t.append(renderKey(o,r,s),l(e)),!1)}const u=[],d=Object.assign(predicates,{defaultVisitor:c,convertValue:l,isVisitable:isVisitable});if(!utils$1.isObject(e))throw new TypeError("data must be an object");return function e(r,n){if(!utils$1.isUndefined(r)){if(-1!==u.indexOf(r))throw Error("Circular reference detected in "+n.join("."));u.push(r),utils$1.forEach(r,(function(r,s){!0===(!(utils$1.isUndefined(r)||null===r)&&o.call(t,r,utils$1.isString(s)?s.trim():s,n,d))&&e(r,n?n.concat(s):[s])})),u.pop()}}(e),t}function encode$1(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,(function(e){return t[e]}))}function AxiosURLSearchParams(e,t){this._pairs=[],e&&toFormData(e,this,t)}const prototype=AxiosURLSearchParams.prototype;function encode(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function buildURL(e,t,r){if(!t)return e;const n=r&&r.encode||encode,o=r&&r.serialize;let s;if(s=o?o(t,r):utils$1.isURLSearchParams(t)?t.toString():new AxiosURLSearchParams(t,r).toString(n),s){const t=e.indexOf("#");-1!==t&&(e=e.slice(0,t)),e+=(-1===e.indexOf("?")?"?":"&")+s}return e}prototype.append=function(e,t){this._pairs.push([e,t])},prototype.toString=function(e){const t=e?function(t){return e.call(this,t,encode$1)}:encode$1;return this._pairs.map((function(e){return t(e[0])+"="+t(e[1])}),"").join("&")};class InterceptorManager{constructor(){this.handlers=[]}use(e,t,r){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!r&&r.synchronous,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(e){utils$1.forEach(this.handlers,(function(t){null!==t&&e(t)}))}}var InterceptorManager$1=InterceptorManager,transitionalDefaults={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},URLSearchParams$1="undefined"!==typeof URLSearchParams?URLSearchParams:AxiosURLSearchParams,FormData$1="undefined"!==typeof FormData?FormData:null,Blob$1="undefined"!==typeof Blob?Blob:null,platform$1={isBrowser:!0,classes:{URLSearchParams:URLSearchParams$1,FormData:FormData$1,Blob:Blob$1},protocols:["http","https","file","blob","url","data"]};const hasBrowserEnv="undefined"!==typeof window&&"undefined"!==typeof document,hasStandardBrowserEnv=(e=>hasBrowserEnv&&["ReactNative","NativeScript","NS"].indexOf(e)<0)("undefined"!==typeof navigator&&navigator.product),hasStandardBrowserWebWorkerEnv="undefined"!==typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope&&"function"===typeof self.importScripts;var utils=Object.freeze({__proto__:null,hasBrowserEnv:hasBrowserEnv,hasStandardBrowserWebWorkerEnv:hasStandardBrowserWebWorkerEnv,hasStandardBrowserEnv:hasStandardBrowserEnv}),platform={...utils,...platform$1};function toURLEncodedForm(e,t){return toFormData(e,new platform.classes.URLSearchParams,Object.assign({visitor:function(e,t,r,n){return platform.isNode&&utils$1.isBuffer(e)?(this.append(t,e.toString("base64")),!1):n.defaultVisitor.apply(this,arguments)}},t))}function parsePropPath(e){return utils$1.matchAll(/\w+|\[(\w*)]/g,e).map((e=>"[]"===e[0]?"":e[1]||e[0]))}function arrayToObject(e){const t={},r=Object.keys(e);let n;const o=r.length;let s;for(n=0;n<o;n++)s=r[n],t[s]=e[s];return t}function formDataToJSON(e){function t(e,r,n,o){let s=e[o++];const i=Number.isFinite(+s),a=o>=e.length;if(s=!s&&utils$1.isArray(n)?n.length:s,a)return utils$1.hasOwnProp(n,s)?n[s]=[n[s],r]:n[s]=r,!i;n[s]&&utils$1.isObject(n[s])||(n[s]=[]);return t(e,r,n[s],o)&&utils$1.isArray(n[s])&&(n[s]=arrayToObject(n[s])),!i}if(utils$1.isFormData(e)&&utils$1.isFunction(e.entries)){const r={};return utils$1.forEachEntry(e,((e,n)=>{t(parsePropPath(e),n,r,0)})),r}return null}function stringifySafely(e,t,r){if(utils$1.isString(e))try{return(t||JSON.parse)(e),utils$1.trim(e)}catch(n){if("SyntaxError"!==n.name)throw n}return(r||JSON.stringify)(e)}const defaults={transitional:transitionalDefaults,adapter:["xhr","http"],transformRequest:[function(e,t){const r=t.getContentType()||"",n=r.indexOf("application/json")>-1,o=utils$1.isObject(e);o&&utils$1.isHTMLForm(e)&&(e=new FormData(e));if(utils$1.isFormData(e))return n&&n?JSON.stringify(formDataToJSON(e)):e;if(utils$1.isArrayBuffer(e)||utils$1.isBuffer(e)||utils$1.isStream(e)||utils$1.isFile(e)||utils$1.isBlob(e))return e;if(utils$1.isArrayBufferView(e))return e.buffer;if(utils$1.isURLSearchParams(e))return t.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let s;if(o){if(r.indexOf("application/x-www-form-urlencoded")>-1)return toURLEncodedForm(e,this.formSerializer).toString();if((s=utils$1.isFileList(e))||r.indexOf("multipart/form-data")>-1){const t=this.env&&this.env.FormData;return toFormData(s?{"files[]":e}:e,t&&new t,this.formSerializer)}}return o||n?(t.setContentType("application/json",!1),stringifySafely(e)):e}],transformResponse:[function(e){const t=this.transitional||defaults.transitional,r=t&&t.forcedJSONParsing,n="json"===this.responseType;if(e&&utils$1.isString(e)&&(r&&!this.responseType||n)){const r=!(t&&t.silentJSONParsing)&&n;try{return JSON.parse(e)}catch(o){if(r){if("SyntaxError"===o.name)throw AxiosError.from(o,AxiosError.ERR_BAD_RESPONSE,this,null,this.response);throw o}}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:platform.classes.FormData,Blob:platform.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};utils$1.forEach(["delete","get","head","post","put","patch"],(e=>{defaults.headers[e]={}}));var defaults$1=defaults;const ignoreDuplicateOf=utils$1.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]);var parseHeaders=e=>{const t={};let r,n,o;return e&&e.split("\n").forEach((function(e){o=e.indexOf(":"),r=e.substring(0,o).trim().toLowerCase(),n=e.substring(o+1).trim(),!r||t[r]&&ignoreDuplicateOf[r]||("set-cookie"===r?t[r]?t[r].push(n):t[r]=[n]:t[r]=t[r]?t[r]+", "+n:n)})),t};const $internals=Symbol("internals");function normalizeHeader(e){return e&&String(e).trim().toLowerCase()}function normalizeValue(e){return!1===e||null==e?e:utils$1.isArray(e)?e.map(normalizeValue):String(e)}function parseTokens(e){const t=Object.create(null),r=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let n;for(;n=r.exec(e);)t[n[1]]=n[2];return t}const isValidHeaderName=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function matchHeaderValue(e,t,r,n,o){return utils$1.isFunction(n)?n.call(this,t,r):(o&&(t=r),utils$1.isString(t)?utils$1.isString(n)?-1!==t.indexOf(n):utils$1.isRegExp(n)?n.test(t):void 0:void 0)}function formatHeader(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,((e,t,r)=>t.toUpperCase()+r))}function buildAccessors(e,t){const r=utils$1.toCamelCase(" "+t);["get","set","has"].forEach((n=>{Object.defineProperty(e,n+r,{value:function(e,r,o){return this[n].call(this,t,e,r,o)},configurable:!0})}))}class AxiosHeaders{constructor(e){e&&this.set(e)}set(e,t,r){const n=this;function o(e,t,r){const o=normalizeHeader(t);if(!o)throw new Error("header name must be a non-empty string");const s=utils$1.findKey(n,o);(!s||void 0===n[s]||!0===r||void 0===r&&!1!==n[s])&&(n[s||t]=normalizeValue(e))}const s=(e,t)=>utils$1.forEach(e,((e,r)=>o(e,r,t)));return utils$1.isPlainObject(e)||e instanceof this.constructor?s(e,t):utils$1.isString(e)&&(e=e.trim())&&!/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim())?s(parseHeaders(e),t):null!=e&&o(t,e,r),this}get(e,t){if(e=normalizeHeader(e)){const r=utils$1.findKey(this,e);if(r){const e=this[r];if(!t)return e;if(!0===t)return parseTokens(e);if(utils$1.isFunction(t))return t.call(this,e,r);if(utils$1.isRegExp(t))return t.exec(e);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,t){if(e=normalizeHeader(e)){const r=utils$1.findKey(this,e);return!(!r||void 0===this[r]||t&&!matchHeaderValue(this,this[r],r,t))}return!1}delete(e,t){const r=this;let n=!1;function o(e){if(e=normalizeHeader(e)){const o=utils$1.findKey(r,e);!o||t&&!matchHeaderValue(r,r[o],o,t)||(delete r[o],n=!0)}}return utils$1.isArray(e)?e.forEach(o):o(e),n}clear(e){const t=Object.keys(this);let r=t.length,n=!1;for(;r--;){const o=t[r];e&&!matchHeaderValue(this,this[o],o,e,!0)||(delete this[o],n=!0)}return n}normalize(e){const t=this,r={};return utils$1.forEach(this,((n,o)=>{const s=utils$1.findKey(r,o);if(s)return t[s]=normalizeValue(n),void delete t[o];const i=e?formatHeader(o):String(o).trim();i!==o&&delete t[o],t[i]=normalizeValue(n),r[i]=!0})),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){const t=Object.create(null);return utils$1.forEach(this,((r,n)=>{null!=r&&!1!==r&&(t[n]=e&&utils$1.isArray(r)?r.join(", "):r)})),t}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map((([e,t])=>e+": "+t)).join("\n")}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e,...t){const r=new this(e);return t.forEach((e=>r.set(e))),r}static accessor(e){const t=(this[$internals]=this[$internals]={accessors:{}}).accessors,r=this.prototype;function n(e){const n=normalizeHeader(e);t[n]||(buildAccessors(r,e),t[n]=!0)}return utils$1.isArray(e)?e.forEach(n):n(e),this}}AxiosHeaders.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]),utils$1.reduceDescriptors(AxiosHeaders.prototype,(({value:e},t)=>{let r=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(e){this[r]=e}}})),utils$1.freezeMethods(AxiosHeaders);var AxiosHeaders$1=AxiosHeaders;function transformData(e,t){const r=this||defaults$1,n=t||r,o=AxiosHeaders$1.from(n.headers);let s=n.data;return utils$1.forEach(e,(function(e){s=e.call(r,s,o.normalize(),t?t.status:void 0)})),o.normalize(),s}function isCancel(e){return!(!e||!e.__CANCEL__)}function CanceledError(e,t,r){AxiosError.call(this,null==e?"canceled":e,AxiosError.ERR_CANCELED,t,r),this.name="CanceledError"}function settle(e,t,r){const n=r.config.validateStatus;r.status&&n&&!n(r.status)?t(new AxiosError("Request failed with status code "+r.status,[AxiosError.ERR_BAD_REQUEST,AxiosError.ERR_BAD_RESPONSE][Math.floor(r.status/100)-4],r.config,r.request,r)):e(r)}utils$1.inherits(CanceledError,AxiosError,{__CANCEL__:!0});var cookies=platform.hasStandardBrowserEnv?{write:function(e,t,r,n,o,s){const i=[];i.push(e+"="+encodeURIComponent(t)),utils$1.isNumber(r)&&i.push("expires="+new Date(r).toGMTString()),utils$1.isString(n)&&i.push("path="+n),utils$1.isString(o)&&i.push("domain="+o),!0===s&&i.push("secure"),document.cookie=i.join("; ")},read:function(e){const t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}};function isAbsoluteURL(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function combineURLs(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}function buildFullPath(e,t){return e&&!isAbsoluteURL(t)?combineURLs(e,t):t}var isURLSameOrigin=platform.hasStandardBrowserEnv?function(){const e=/(msie|trident)/i.test(navigator.userAgent),t=document.createElement("a");let r;function n(r){let n=r;return e&&(t.setAttribute("href",n),n=t.href),t.setAttribute("href",n),{href:t.href,protocol:t.protocol?t.protocol.replace(/:$/,""):"",host:t.host,search:t.search?t.search.replace(/^\?/,""):"",hash:t.hash?t.hash.replace(/^#/,""):"",hostname:t.hostname,port:t.port,pathname:"/"===t.pathname.charAt(0)?t.pathname:"/"+t.pathname}}return r=n(window.location.href),function(e){const t=utils$1.isString(e)?n(e):e;return t.protocol===r.protocol&&t.host===r.host}}():function(){return!0};function parseProtocol(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function speedometer(e,t){e=e||10;const r=new Array(e),n=new Array(e);let o,s=0,i=0;return t=void 0!==t?t:1e3,function(a){const l=Date.now(),c=n[i];o||(o=l),r[s]=a,n[s]=l;let u=i,d=0;for(;u!==s;)d+=r[u++],u%=e;if(s=(s+1)%e,s===i&&(i=(i+1)%e),l-o<t)return;const f=c&&l-c;return f?Math.round(1e3*d/f):void 0}}function progressEventReducer(e,t){let r=0;const n=speedometer(50,250);return o=>{const s=o.loaded,i=o.lengthComputable?o.total:void 0,a=s-r,l=n(a);r=s;const c={loaded:s,total:i,progress:i?s/i:void 0,bytes:a,rate:l||void 0,estimated:l&&i&&s<=i?(i-s)/l:void 0,event:o};c[t?"download":"upload"]=!0,e(c)}}const isXHRAdapterSupported="undefined"!==typeof XMLHttpRequest;var xhrAdapter=isXHRAdapterSupported&&function(e){return new Promise((function(t,r){let n=e.data;const o=AxiosHeaders$1.from(e.headers).normalize(),s=e.responseType;let i,a;function l(){e.cancelToken&&e.cancelToken.unsubscribe(i),e.signal&&e.signal.removeEventListener("abort",i)}if(utils$1.isFormData(n))if(platform.hasStandardBrowserEnv||platform.hasStandardBrowserWebWorkerEnv)o.setContentType(!1);else if(!1!==(a=o.getContentType())){const[e,...t]=a?a.split(";").map((e=>e.trim())).filter(Boolean):[];o.setContentType([e||"multipart/form-data",...t].join("; "))}let c=new XMLHttpRequest;if(e.auth){const t=e.auth.username||"",r=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";o.set("Authorization","Basic "+btoa(t+":"+r))}const u=buildFullPath(e.baseURL,e.url);function d(){if(!c)return;const n=AxiosHeaders$1.from("getAllResponseHeaders"in c&&c.getAllResponseHeaders());settle((function(e){t(e),l()}),(function(e){r(e),l()}),{data:s&&"text"!==s&&"json"!==s?c.response:c.responseText,status:c.status,statusText:c.statusText,headers:n,config:e,request:c}),c=null}if(c.open(e.method.toUpperCase(),buildURL(u,e.params,e.paramsSerializer),!0),c.timeout=e.timeout,"onloadend"in c?c.onloadend=d:c.onreadystatechange=function(){c&&4===c.readyState&&(0!==c.status||c.responseURL&&0===c.responseURL.indexOf("file:"))&&setTimeout(d)},c.onabort=function(){c&&(r(new AxiosError("Request aborted",AxiosError.ECONNABORTED,e,c)),c=null)},c.onerror=function(){r(new AxiosError("Network Error",AxiosError.ERR_NETWORK,e,c)),c=null},c.ontimeout=function(){let t=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded";const n=e.transitional||transitionalDefaults;e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),r(new AxiosError(t,n.clarifyTimeoutError?AxiosError.ETIMEDOUT:AxiosError.ECONNABORTED,e,c)),c=null},platform.hasStandardBrowserEnv){const t=isURLSameOrigin(u)&&e.xsrfCookieName&&cookies.read(e.xsrfCookieName);t&&o.set(e.xsrfHeaderName,t)}void 0===n&&o.setContentType(null),"setRequestHeader"in c&&utils$1.forEach(o.toJSON(),(function(e,t){c.setRequestHeader(t,e)})),utils$1.isUndefined(e.withCredentials)||(c.withCredentials=!!e.withCredentials),s&&"json"!==s&&(c.responseType=e.responseType),"function"===typeof e.onDownloadProgress&&c.addEventListener("progress",progressEventReducer(e.onDownloadProgress,!0)),"function"===typeof e.onUploadProgress&&c.upload&&c.upload.addEventListener("progress",progressEventReducer(e.onUploadProgress)),(e.cancelToken||e.signal)&&(i=t=>{c&&(r(!t||t.type?new CanceledError(null,e,c):t),c.abort(),c=null)},e.cancelToken&&e.cancelToken.subscribe(i),e.signal&&(e.signal.aborted?i():e.signal.addEventListener("abort",i)));const f=parseProtocol(u);f&&-1===platform.protocols.indexOf(f)?r(new AxiosError("Unsupported protocol "+f+":",AxiosError.ERR_BAD_REQUEST,e)):c.send(n||null)}))};const knownAdapters={http:httpAdapter,xhr:xhrAdapter};utils$1.forEach(knownAdapters,((e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch(r){}Object.defineProperty(e,"adapterName",{value:t})}}));const renderReason=e=>`- ${e}`,isResolvedHandle=e=>utils$1.isFunction(e)||null===e||!1===e;var adapters={getAdapter:e=>{e=utils$1.isArray(e)?e:[e];const{length:t}=e;let r,n;const o={};for(let s=0;s<t;s++){let t;if(r=e[s],n=r,!isResolvedHandle(r)&&(n=knownAdapters[(t=String(r)).toLowerCase()],void 0===n))throw new AxiosError(`Unknown adapter '${t}'`);if(n)break;o[t||"#"+s]=n}if(!n){const e=Object.entries(o).map((([e,t])=>`adapter ${e} `+(!1===t?"is not supported by the environment":"is not available in the build")));throw new AxiosError("There is no suitable adapter to dispatch the request "+(t?e.length>1?"since :\n"+e.map(renderReason).join("\n"):" "+renderReason(e[0]):"as no adapter specified"),"ERR_NOT_SUPPORT")}return n},adapters:knownAdapters};function throwIfCancellationRequested(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new CanceledError(null,e)}function dispatchRequest(e){throwIfCancellationRequested(e),e.headers=AxiosHeaders$1.from(e.headers),e.data=transformData.call(e,e.transformRequest),-1!==["post","put","patch"].indexOf(e.method)&&e.headers.setContentType("application/x-www-form-urlencoded",!1);return adapters.getAdapter(e.adapter||defaults$1.adapter)(e).then((function(t){return throwIfCancellationRequested(e),t.data=transformData.call(e,e.transformResponse,t),t.headers=AxiosHeaders$1.from(t.headers),t}),(function(t){return isCancel(t)||(throwIfCancellationRequested(e),t&&t.response&&(t.response.data=transformData.call(e,e.transformResponse,t.response),t.response.headers=AxiosHeaders$1.from(t.response.headers))),Promise.reject(t)}))}const headersToObject=e=>e instanceof AxiosHeaders$1?e.toJSON():e;function mergeConfig(e,t){t=t||{};const r={};function n(e,t,r){return utils$1.isPlainObject(e)&&utils$1.isPlainObject(t)?utils$1.merge.call({caseless:r},e,t):utils$1.isPlainObject(t)?utils$1.merge({},t):utils$1.isArray(t)?t.slice():t}function o(e,t,r){return utils$1.isUndefined(t)?utils$1.isUndefined(e)?void 0:n(void 0,e,r):n(e,t,r)}function s(e,t){if(!utils$1.isUndefined(t))return n(void 0,t)}function i(e,t){return utils$1.isUndefined(t)?utils$1.isUndefined(e)?void 0:n(void 0,e):n(void 0,t)}function a(r,o,s){return s in t?n(r,o):s in e?n(void 0,r):void 0}const l={url:s,method:s,data:s,baseURL:i,transformRequest:i,transformResponse:i,paramsSerializer:i,timeout:i,timeoutMessage:i,withCredentials:i,adapter:i,responseType:i,xsrfCookieName:i,xsrfHeaderName:i,onUploadProgress:i,onDownloadProgress:i,decompress:i,maxContentLength:i,maxBodyLength:i,beforeRedirect:i,transport:i,httpAgent:i,httpsAgent:i,cancelToken:i,socketPath:i,responseEncoding:i,validateStatus:a,headers:(e,t)=>o(headersToObject(e),headersToObject(t),!0)};return utils$1.forEach(Object.keys(Object.assign({},e,t)),(function(n){const s=l[n]||o,i=s(e[n],t[n],n);utils$1.isUndefined(i)&&s!==a||(r[n]=i)})),r}const VERSION="1.6.1",validators$1={};["object","boolean","number","function","string","symbol"].forEach(((e,t)=>{validators$1[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}}));const deprecatedWarnings={};function assertOptions(e,t,r){if("object"!==typeof e)throw new AxiosError("options must be an object",AxiosError.ERR_BAD_OPTION_VALUE);const n=Object.keys(e);let o=n.length;for(;o-- >0;){const s=n[o],i=t[s];if(i){const t=e[s],r=void 0===t||i(t,s,e);if(!0!==r)throw new AxiosError("option "+s+" must be "+r,AxiosError.ERR_BAD_OPTION_VALUE)}else if(!0!==r)throw new AxiosError("Unknown option "+s,AxiosError.ERR_BAD_OPTION)}}validators$1.transitional=function(e,t,r){function n(e,t){return"[Axios v1.6.1] Transitional option '"+e+"'"+t+(r?". "+r:"")}return(r,o,s)=>{if(!1===e)throw new AxiosError(n(o," has been removed"+(t?" in "+t:"")),AxiosError.ERR_DEPRECATED);return t&&!deprecatedWarnings[o]&&(deprecatedWarnings[o]=!0,console.warn(n(o," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(r,o,s)}};var validator={assertOptions:assertOptions,validators:validators$1};const validators=validator.validators;class Axios{constructor(e){this.defaults=e,this.interceptors={request:new InterceptorManager$1,response:new InterceptorManager$1}}request(e,t){"string"===typeof e?(t=t||{}).url=e:t=e||{},t=mergeConfig(this.defaults,t);const{transitional:r,paramsSerializer:n,headers:o}=t;void 0!==r&&validator.assertOptions(r,{silentJSONParsing:validators.transitional(validators.boolean),forcedJSONParsing:validators.transitional(validators.boolean),clarifyTimeoutError:validators.transitional(validators.boolean)},!1),null!=n&&(utils$1.isFunction(n)?t.paramsSerializer={serialize:n}:validator.assertOptions(n,{encode:validators.function,serialize:validators.function},!0)),t.method=(t.method||this.defaults.method||"get").toLowerCase();let s=o&&utils$1.merge(o.common,o[t.method]);o&&utils$1.forEach(["delete","get","head","post","put","patch","common"],(e=>{delete o[e]})),t.headers=AxiosHeaders$1.concat(s,o);const i=[];let a=!0;this.interceptors.request.forEach((function(e){"function"===typeof e.runWhen&&!1===e.runWhen(t)||(a=a&&e.synchronous,i.unshift(e.fulfilled,e.rejected))}));const l=[];let c;this.interceptors.response.forEach((function(e){l.push(e.fulfilled,e.rejected)}));let u,d=0;if(!a){const e=[dispatchRequest.bind(this),void 0];for(e.unshift.apply(e,i),e.push.apply(e,l),u=e.length,c=Promise.resolve(t);d<u;)c=c.then(e[d++],e[d++]);return c}u=i.length;let f=t;for(d=0;d<u;){const e=i[d++],t=i[d++];try{f=e(f)}catch(p){t.call(this,p);break}}try{c=dispatchRequest.call(this,f)}catch(p){return Promise.reject(p)}for(d=0,u=l.length;d<u;)c=c.then(l[d++],l[d++]);return c}getUri(e){return buildURL(buildFullPath((e=mergeConfig(this.defaults,e)).baseURL,e.url),e.params,e.paramsSerializer)}}utils$1.forEach(["delete","get","head","options"],(function(e){Axios.prototype[e]=function(t,r){return this.request(mergeConfig(r||{},{method:e,url:t,data:(r||{}).data}))}})),utils$1.forEach(["post","put","patch"],(function(e){function t(t){return function(r,n,o){return this.request(mergeConfig(o||{},{method:e,headers:t?{"Content-Type":"multipart/form-data"}:{},url:r,data:n}))}}Axios.prototype[e]=t(),Axios.prototype[e+"Form"]=t(!0)}));var Axios$1=Axios;class CancelToken{constructor(e){if("function"!==typeof e)throw new TypeError("executor must be a function.");let t;this.promise=new Promise((function(e){t=e}));const r=this;this.promise.then((e=>{if(!r._listeners)return;let t=r._listeners.length;for(;t-- >0;)r._listeners[t](e);r._listeners=null})),this.promise.then=e=>{let t;const n=new Promise((e=>{r.subscribe(e),t=e})).then(e);return n.cancel=function(){r.unsubscribe(t)},n},e((function(e,n,o){r.reason||(r.reason=new CanceledError(e,n,o),t(r.reason))}))}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1)}static source(){let e;return{token:new CancelToken((function(t){e=t})),cancel:e}}}var CancelToken$1=CancelToken;function spread(e){return function(t){return e.apply(null,t)}}function isAxiosError(e){return utils$1.isObject(e)&&!0===e.isAxiosError}const HttpStatusCode={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(HttpStatusCode).forEach((([e,t])=>{HttpStatusCode[t]=e}));var HttpStatusCode$1=HttpStatusCode;function createInstance(e){const t=new Axios$1(e),r=bind(Axios$1.prototype.request,t);return utils$1.extend(r,Axios$1.prototype,t,{allOwnKeys:!0}),utils$1.extend(r,t,null,{allOwnKeys:!0}),r.create=function(t){return createInstance(mergeConfig(e,t))},r}const axios=createInstance(defaults$1);axios.Axios=Axios$1,axios.CanceledError=CanceledError,axios.CancelToken=CancelToken$1,axios.isCancel=isCancel,axios.VERSION="1.6.1",axios.toFormData=toFormData,axios.AxiosError=AxiosError,axios.Cancel=axios.CanceledError,axios.all=function(e){return Promise.all(e)},axios.spread=spread,axios.isAxiosError=isAxiosError,axios.mergeConfig=mergeConfig,axios.AxiosHeaders=AxiosHeaders$1,axios.formToJSON=e=>formDataToJSON(utils$1.isHTMLForm(e)?new FormData(e):e),axios.getAdapter=adapters.getAdapter,axios.HttpStatusCode=HttpStatusCode$1,axios.default=axios,module.exports=axios;