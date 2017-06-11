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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__drawApi__ = __webpack_require__(2);



function Loading(w,h,lw,fillStyle){
	this.w=w||'60';
	this.h=h||'60';
	this.lw=lw||3;
	this.p=0;
	this.dis=true;
	this.fillStyle=fillStyle||'#065886';
	this.step=0;
	this.loop.bind(this);
}
Loading.prototype.init=function(){
	this.domInit();
	this.c.fillStyle=this.fillStyle;
	__WEBPACK_IMPORTED_MODULE_0__drawApi__["a" /* default */].drawCir(this.c,this.w,this.h,this.lw);
	this.c.clip();
	this.wave=new __WEBPACK_IMPORTED_MODULE_0__drawApi__["a" /* default */].drawWave(this.c,this.w,this.h);
	var that=this;
	(function repeat(){
		that.loop();
		requestAnimFrame(repeat);	
	})();
    window.onload=function(){
         	setTimeout(()=>{
         		that.dis=false;
         	},8000)
   }	
}
Loading.prototype.loop=function(){
      this.c.clearRect(0,0,this.w,this.h);
	  this.c.save();
	  let slice=__WEBPACK_IMPORTED_MODULE_0__drawApi__["a" /* default */].random([0,900]);
	  if(this.dis){
	  	this.p=__WEBPACK_IMPORTED_MODULE_0__drawApi__["a" /* default */].add(this.p,slice,[1,5]);
	  }else{
	  	this.p=__WEBPACK_IMPORTED_MODULE_0__drawApi__["a" /* default */].add(this.p,1000,[6,9]);
	  }
	  
	  if(this.p>=1000){
	  	this.p=1000;
	  }			
	  this.c.translate(0,this.h*(1-this.p/1000));
	  //角度增加一度
	  this.step+=Math.random()>.5?3:5;
	  //角度转换成弧度
	  var angle = this.step*Math.PI/180;
	  //矩形高度的变化量
	  var dl = Math.sin(angle) * 5;
	  //矩形高度的变化量(右上顶点)
	  var dr = Math.cos(angle) * 5;
	  this.wave.draw(dl,dr);
	  this.c.restore();

	  __WEBPACK_IMPORTED_MODULE_0__drawApi__["a" /* default */].drawText(this.c,this.w,this.h,parseInt(this.p/10));
	  // requestAnimFrame(this.loop);	
}
Loading.prototype.domInit=function(){
	document.querySelector('html').style.height='100%';
	var body= document.querySelector('body');
	body.style.cssText="height:100%;lineHeight:0;margin:0;padding:0";
	var contain=document.createElement('div');
	var cStyle={
		position:'fixed',
		background:'#999',
		opacity:'.8',
		zIndex:'1000',
		left:'0',
		top:'0',
		width:'100%',
		height:'100%',
		display: 'table'
	};
	__WEBPACK_IMPORTED_MODULE_0__drawApi__["a" /* default */].setStyle(contain, cStyle);
	var con=document.createElement('div');
	con.style.cssText="display:table-cell;vertical-align: middle;text-align: center;";
	contain.appendChild(con);
	var canvas=document.createElement('canvas');
	canvas.width=this.w;
	canvas.height=this.h;
	con.appendChild(canvas);
	this.c=canvas.getContext('2d');
	body.appendChild(contain);
	window.requestAnimFrame=window.requestAnimationFrame ||window.webkitRequestAnimationFrame ||
	       window.mozRequestAnimationFrame ||
	       function( callback ){
	        window.setTimeout(callback, 1000 / 60);
	       };
}

/* harmony default export */ __webpack_exports__["a"] = (Loading);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_Loading__ = __webpack_require__(0);


var loading=new __WEBPACK_IMPORTED_MODULE_0__lib_Loading__["a" /* default */]();
loading.init();

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function drawWave($c,w,h,dl,dr){
	this.c=$c;
	this.w=w;
	this.h=h;
	this.dl=dl||0;
	this.dr=dr||0;
	this.draw= function(dl,dr){
		this.c.beginPath();
		this.c.moveTo(0,dl);
		this.c.bezierCurveTo(this.h/2,dl,this.w/2,dr,this.w,dr);
		this.c.lineTo(this.w,this.h);
		this.c.lineTo(0,this.h);
		this.c.closePath();
	    this.c.fill();
	}
}
function drawCir(c,w,h,lw){
        c.save();
		c.translate(w/2,h/2);
		c.strokeStyle="#178e06";
		c.beginPath();
		c.lineWidth=lw;
		c.arc(0,0,w/2-lw,0,Math.PI*2);
		c.stroke();
		c.restore();	
}
function drawText(c,w,h,p){
	c.save();
	c.translate(w/2,h/2);
	c.fillStyle="#6fe8c5";
	c.textAlign = "center";
	c.textBaseline="middle";
	c.font = "10px arial";
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

/***/ })
/******/ ]);
//# sourceMappingURL=buddle.js.map