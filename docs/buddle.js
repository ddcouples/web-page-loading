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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__drawApi__ = __webpack_require__(1);



function Loading(w,h,lw,fillStyle){
	this.w=w||'60';
	this.h=h||'60';
	this.lw=lw||3;
	this.p=0;
	this.dis=true;
	this.fillStyle=fillStyle||'#065886';
	this.step=0;
	this.loop.bind(this);
	this.timer=0;
}
Loading.start=function(dom,w,h){
	if(!Loading.real){
		Loading.real=new Loading(480,480,12);
	}
	Loading.real.init(dom,w,h);
}
Loading.end=function(){
	Loading.real.dis=false;
}
Loading.prototype.init=function(dom,w,h){
	this.domInit(dom,w,h);
	this.c.fillStyle=this.fillStyle;
	__WEBPACK_IMPORTED_MODULE_0__drawApi__["a" /* default */].drawCir(this.c,this.w,this.h,this.lw);
	this.c.clip();
	this.wave=new __WEBPACK_IMPORTED_MODULE_0__drawApi__["a" /* default */].drawWave(this.c,this.w,this.h);
	var that=this;
	(function repeat(){
		that.loop();
		that.timer=requestAnimFrame(repeat);
	      if(that.p>=1000){
		  	that.p=1000;
	        console.log(that.timer);
		  	window.cancelAnimationFrame(that.timer);
		  }				
	})();
    // window.onload=function(){
    //      	setTimeout(()=>{
    //      		that.dis=false;
    //      	},800)
    // }	
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
	  this.c.translate(0,this.h*(1-this.p/1000));
	  //角度增加一度
	  this.step+=Math.random()>.5?3:5;
	  //角度转换成弧度
	  var angle = this.step*Math.PI/180;
	  //矩形高度的变化量
	  var dl = Math.sin(angle) * this.w/12;
	  //矩形高度的变化量(右上顶点)
	  var dr = Math.cos(angle) * this.w/12;
	  this.wave.draw(dl,dr,'rgba(103, 147, 179,.8)');
	  this.wave.draw(dr,dl);
	  this.c.restore();

	  __WEBPACK_IMPORTED_MODULE_0__drawApi__["a" /* default */].drawText(this.c,this.w,this.h,parseInt(this.p/10));
}
Loading.prototype.domInit=function(dom,w,h){
	document.querySelector('html').style.height='100%';
	var body= document.querySelector('body');
	body.style.cssText="height:100%;lineHeight:0;margin:0;padding:0";
	var contain=document.createElement('div');
	var cStyle={
		position:'absolute',
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
	canvas.style.width=w+'px';
	canvas.style.height=h+'px';
	canvas.width=this.w;
	canvas.height=this.h;
	con.appendChild(canvas);
	this.c=canvas.getContext('2d');
	var that=this;
	if(dom){
		dom.appendChild(contain);
		dom.style.position='relative';
	}
	else{
		body.appendChild(contain);
        window.onload=function(){
         	setTimeout(()=>{
         		that.dis=false;
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
		this.c.bezierCurveTo(this.h/2,dl,this.w/2,dr,this.w,dr);
		this.c.lineTo(this.w,this.h);
		this.c.lineTo(0,this.h);
		this.c.closePath();
		if(color) this.c.fillStyle=color;
	    this.c.fill();
	    this.c.restore();
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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_Loading__ = __webpack_require__(0);


var dom=document.querySelector('#dom');


__WEBPACK_IMPORTED_MODULE_0__lib_Loading__["a" /* default */].start(dom,150,150);
setTimeout(function(){
  __WEBPACK_IMPORTED_MODULE_0__lib_Loading__["a" /* default */].end();
},6000)

/***/ })
/******/ ]);
//# sourceMappingURL=buddle.js.map