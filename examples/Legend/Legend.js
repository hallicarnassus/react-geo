!function(e){function t(t){for(var a,s,u=t[0],o=t[1],c=t[2],d=0,f=[];d<u.length;d++)s=u[d],n[s]&&f.push(n[s][0]),n[s]=0;for(a in o)Object.prototype.hasOwnProperty.call(o,a)&&(e[a]=o[a]);for(p&&p(t);f.length;)f.shift()();return l.push.apply(l,c||[]),r()}function r(){for(var e,t=0;t<l.length;t++){for(var r=l[t],a=!0,u=1;u<r.length;u++){var o=r[u];0!==n[o]&&(a=!1)}a&&(l.splice(t--,1),e=s(s.s=r[0]))}return e}var a={},n={10:0},l=[];function s(t){if(a[t])return a[t].exports;var r=a[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=a,s.d=function(e,t,r){s.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},s.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var u=window.webpackJsonp=window.webpackJsonp||[],o=u.push.bind(u);u.push=t,u=u.slice();for(var c=0;c<u.length;c++)t(u[c]);var p=o;l.push([444,1,0]),r()}({444:function(e,t,r){"use strict";var a=d(r(2)),n=r(17),l=d(r(46)),s=d(r(65)),u=d(r(61)),o=d(r(400)),c=d(r(21)),p=r(43);function d(e){return e&&e.__esModule?e:{default:e}}var f=new u.default({name:"OSM-WMS",source:new o.default({url:"https://ows.terrestris.de/osm-gray/service",params:{LAYERS:"OSM-WMS",TILED:!0},serverType:"geoserver"})}),m=new u.default({name:"States (USA)",source:new o.default({url:"https://ahocevar.com/geoserver/wms",params:{LAYERS:"usa:states",TILED:!0},serverType:"geoserver"})}),i=new u.default({name:"Places",legendUrl:"https://www.koeln.de/files/images/Karnevalstrikot_Spieler_270.jpg",source:new o.default({url:"https://ahocevar.com/geoserver/wms",params:{LAYERS:"ne:ne_10m_populated_places",TILED:!0,TRANSPARENT:"true"},serverType:"geoserver"})}),v=new l.default({layers:[f,m,i],view:new s.default({center:c.default.fromLonLat([-98.583333,39.833333]),zoom:4})});(0,n.render)(a.default.createElement("div",null,a.default.createElement("div",{id:"map",style:{height:"200px"}}),a.default.createElement("div",{className:"example-block"},a.default.createElement("span",null,"Layer "+f.get("name")+":"),a.default.createElement(p.Legend,{layer:f})),a.default.createElement("div",{className:"example-block"},a.default.createElement("span",null,"Layer "+m.get("name")+' with "extraParams":'),a.default.createElement(p.Legend,{layer:m,extraParams:{HEIGHT:10,WIDTH:10}})),a.default.createElement("div",{className:"example-block"},a.default.createElement("span",null,"Layer "+i.get("name")+' with custom "legendUrl":'),a.default.createElement(p.Legend,{layer:i}))),document.getElementById("exampleContainer"),function(){v.setTarget("map")})}});