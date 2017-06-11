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
}
Loading.prototype.init=function(){
	this.domInit();
	this.c.fillStyle=this.fillStyle;
	drawApi.drawCir(this.c,this.w,this.h,this.lw);
	this.c.clip();
	this.wave=new drawApi.drawWave(this.c,this.w,this.h);
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
	  let slice=drawApi.random([0,900]);
	  if(this.dis){
	  	this.p=drawApi.add(this.p,slice,[1,5]);
	  }else{
	  	this.p=drawApi.add(this.p,1000,[6,9]);
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

	  drawApi.drawText(this.c,this.w,this.h,parseInt(this.p/10));
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
	drawApi.setStyle(contain, cStyle);
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

export default Loading;