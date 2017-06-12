import drawApi from './drawApi';


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
	this.opa=100;
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
	drawApi.drawCir(this.c,this.w,this.h,this.lw);
	this.c.clip();
	this.wave=new drawApi.drawWave(this.c,this.w,this.h);
	var that=this;
	
	(function repeat(){
		that.loop();
		that.timer=requestAnimFrame(repeat);
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
	  	this.p=drawApi.add(this.p,slice,[1,5]);
	  }else{
	  	this.p=drawApi.add(this.p,1000,[6,9]);
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

	  drawApi.drawText(this.c,this.w,this.h,parseInt(this.p/10));
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
	drawApi.setStyle(contain, cStyle);
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
	this.contain = contain;
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

export default Loading;