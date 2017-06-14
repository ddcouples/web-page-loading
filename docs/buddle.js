/*! delen 出品 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__drawApi__ = __webpack_require__(1);




function Loading(option){
	this.w=360;
	this.h=360;
	this.p=0;
	this.dis=true;
	this.step=0;
	this.timer=0;
	this.opa=100;
}

//支持vue
Loading.install=function(Vue,option){
	Vue.directive('v-v-pageloading',function (el, binding) {
	  if(binding.value||binding.value=='true'){
	  	Loading.start(option);
	  }else{
	  	Loading.end();
	  }
    })
}

//支持CommonJS
if(typeof exports == 'object'){
	module.exports=Loading;
}else if(typeof define=="function" && __webpack_require__(2)){//支持Amd
	define([],function(){
		return Loading;
	})
}else if(window.Vue){//Vue是全局变量时 自动调用Vue.use()
	window.vVLoading=Loading;
	Vue.use(Loading);
}
//支持

Loading.start=function(option){
	if(!Loading.real){
		Loading.real=new Loading(option);
		
	}
	Loading.real.domInit(option);
	Loading.real.init(option);
}
Loading.end=function(){
	Loading.real.dis=false;Loading.real=null;
}
Loading.prototype.init=function(option){
	// this.domInit(option);
    this.lw=option.lw||18;
	this.fillStyle=option.fillStyle||'#065886';
	this.strokeStyle=option.strokeStyle||'#178e06';
	this.tc=option.tc||'#178e06';		
	this.c.fillStyle=this.fillStyle;
	__WEBPACK_IMPORTED_MODULE_0__drawApi__["a" /* default */].drawCir(this.c,this.w,this.h,this.lw,this.strokeStyle);
	this.c.clip();
	this.wave=new __WEBPACK_IMPORTED_MODULE_0__drawApi__["a" /* default */].drawWave(this.c,this.w-10,this.h-10);
	var that=this;
	this.p=0;
	this.opa=100;
	this.dis=true;
	(function repeat(){
		that.loop();
		that.timer=requestAnimFrame(repeat);
		console.log(that.timer);
	      if(that.p>=1000){
		  	that.p=1000;
		  	that.opa-=2;
		  	that.contain.style.opacity=(that.opa)/100;
		  	if(that.opa<=0){
              that.contain.parentNode.removeChild(that.contain);
		  	  window.cancelAnimationFrame(that.timer);		  		
		  	}
		  }				
	})();
}
Loading.prototype.loop=function(){
      this.c.clearRect(0,0,this.w,this.h);
	  this.c.save();
	  let slice=__WEBPACK_IMPORTED_MODULE_0__drawApi__["a" /* default */].random([0,900]);
	  if(this.dis){
	  	let cur=__WEBPACK_IMPORTED_MODULE_0__drawApi__["a" /* default */].random([0,900]);
	  	if(slice<cur){
	  		this.p=__WEBPACK_IMPORTED_MODULE_0__drawApi__["a" /* default */].add(this.p,slice,[2,5]);
	  	}else{
	  		this.p=__WEBPACK_IMPORTED_MODULE_0__drawApi__["a" /* default */].add(this.p,slice,[.1,.2]);
	  	}
	  	
	  }else{
	  	this.p=__WEBPACK_IMPORTED_MODULE_0__drawApi__["a" /* default */].add(this.p,1000,[15,25]);
	  }
	  this.c.translate(0,this.h*(1-this.p/1000));
	  //角度增加一度
	  this.step+=Math.random()>.5?1:3;
	  this.step%=360;
	  //角度转换成弧度
	  var angle = this.step*Math.PI/180;
	  //矩形高度的变化量
	  var dl = Math.sin(angle) * this.w/12;
	  //矩形高度的变化量(右上顶点)
	  var dr = Math.cos(angle) * this.w/12;
	  this.wave.draw(dl,dr,this.fillStyle);
	  this.wave.draw(dr,dl);
	  this.c.restore();

	  __WEBPACK_IMPORTED_MODULE_0__drawApi__["a" /* default */].drawText(this.c,this.w,this.h,parseInt(this.p/10),this.tc);
}
Loading.prototype.domInit=function(option){
    
	document.querySelector('html').style.height='100%';
	var body= document.querySelector('body');
	body.style.cssText="height:100%;lineHeight:0;margin:0;padding:0";
	if(!this.contain){
		this.contain=document.createElement('div')
	}
	var contain=this.contain;
	var cStyle={
		position:'absolute',
		background:'#999',
		opacity:'.8',
		zIndex:'1000',
		left:'0',
		top:'0',
		width:'100%',
		height:'100%',
	};
	__WEBPACK_IMPORTED_MODULE_0__drawApi__["a" /* default */].setStyle(contain, cStyle);
	if(!this.canvas){
		this.canvas=document.createElement('canvas');
	}
	var canvas=this.canvas;
    var canStyle={
		position:'absolute',
		zIndex:'1001',
		left:'50%',
		top:'50%',
		width:option.w+'px',
		height:option.h+'px',
		marginLeft:-option.w/2+'px',
		marginTop:-option.h/2+'px'
	};
	__WEBPACK_IMPORTED_MODULE_0__drawApi__["a" /* default */].setStyle(canvas, canStyle);
	canvas.width=this.w;
	canvas.height=this.h;
	this.canvas=canvas;
	this.c=canvas.getContext('2d');
	var that=this;
	contain.appendChild(canvas);
	if(dom){
		if(this.contain){
			dom.appendChild(contain);
		}
		
		dom.style.position='relative';
	}
	else{
		if(this.contain){
		  body.appendChild(contain);
	    }
        window.onload=function(){
         	setTimeout(()=>{
         		that.dis=false;
         		Loading.real=null;
         	},800)
        }		
	};
	window.requestAnimFrame=window.requestAnimationFrame ||window.webkitRequestAnimationFrame ||
	       window.mozRequestAnimationFrame ||
	       function( callback ){
	        window.setTimeout(callback, 1000 / 60);
	       };
}

/* harmony default export */ __webpack_exports__["a"] = (Loading);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)(module)))

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function drawWave($c,w,h,dl,dr){
	this.c=$c;
	this.w=w;
	this.h=h;
	this.dl=dl||0;
	this.dr=dr||0;
	this.draw= function(dl,dr,color){
		this.c.save();
		this.c.beginPath();
		this.c.moveTo(0,dl);
		
		this.c.bezierCurveTo(this.w/2+dl*3,dl*1.5,this.w/2+dr*3,dr*1.5,this.w,dr);
		
		this.c.lineTo(this.w,this.h);
		this.c.lineTo(0,this.h);
		this.c.closePath();
		this.c.globalAlpha = 1;  
		if(color){
	        this.c.globalAlpha = 0.2;   
			this.c.fillStyle=color;
		}
	    this.c.fill();
	    this.c.restore();
	}
}
function drawCir(c,w,h,lw,cl){
        c.save();
		c.translate(w/2,h/2);
		c.strokeStyle=cl;
		c.beginPath();
		c.lineWidth=lw;
		c.arc(0,0,w/2-lw,0,Math.PI*2);
		c.stroke();
		c.fill();
		c.restore();	
}
function drawText(c,w,h,p,tc){
	c.save();
	c.translate(w/2,h/2);
	c.fillStyle=tc;
	c.textAlign = "center";
	c.textBaseline="middle";
	c.font = w/6+"px arial";
	c.fillText(p+'%',0,0);
	c.restore();			
}
function add(res,dist,speed){
 	var _speed=random(speed);
 	if(res<dist&&res+_speed>dist){
 		res=dist;
 	}
 	if(res<dist&&res+_speed<dist){
 		res+=_speed;
 	}
 	return res;
 }
 function setStyle(obj,json){
    for(var i in json)
    {
        obj.style[i]=json[i];
    }
}
function random(n){
 	if(typeof n ==="object"){
 		return Math.random()*(n[1]-n[0])+n[0]
 	}else{
 		return n;
 	}
 } 
/* harmony default export */ __webpack_exports__["a"] = ({
	drawWave,
	drawText,
	add,
	random,
	setStyle,
	drawCir
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if(!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true,
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_Loading__ = __webpack_require__(0);


var dom=document.querySelector('#dom');


__WEBPACK_IMPORTED_MODULE_0__lib_Loading__["a" /* default */].start({
	dom:dom,
	w:100,
	h:100,
    fillStyle: '#dd0',
    strokeStyle:"#f00",
    tc:"#d0d"	

});
 //Loading.end();
setTimeout(function(){
  __WEBPACK_IMPORTED_MODULE_0__lib_Loading__["a" /* default */].start({
	dom:dom,
	w:100,
	h:100,

 });
},6000)
setTimeout(function(){
  __WEBPACK_IMPORTED_MODULE_0__lib_Loading__["a" /* default */].start({
	dom:dom,
	w:200,
	h:200,

 });
},6000)


/***/ })
/******/ ]);
//# sourceMappingURL=buddle.js.map