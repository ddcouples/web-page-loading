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
var obj = {
	drawWave:drawWave,
	drawText:drawText,
	add:add,
	random:random,
	setStyle:setStyle,
	drawCir:drawCir
};
 
 module.exports = obj;