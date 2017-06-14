import drawApi from './drawApi';



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
}else if(typeof define=="function" && define.amd){//支持Amd
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
	drawApi.drawCir(this.c,this.w,this.h,this.lw,this.strokeStyle);
	this.c.clip();
	this.wave=new drawApi.drawWave(this.c,this.w-10,this.h-10);
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
	  let slice=drawApi.random([0,900]);
	  if(this.dis){
	  	let cur=drawApi.random([0,900]);
	  	if(slice<cur){
	  		this.p=drawApi.add(this.p,slice,[2,5]);
	  	}else{
	  		this.p=drawApi.add(this.p,slice,[.1,.2]);
	  	}
	  	
	  }else{
	  	this.p=drawApi.add(this.p,1000,[15,25]);
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

	  drawApi.drawText(this.c,this.w,this.h,parseInt(this.p/10),this.tc);
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
	drawApi.setStyle(contain, cStyle);
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
	drawApi.setStyle(canvas, canStyle);
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

export default Loading;