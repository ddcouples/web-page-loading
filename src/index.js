import Loading from '../lib/Loading';

var dom=document.querySelector('#dom');


Loading.start({
	dom:dom,
	w:100,
	h:100,
    fillStyle: '#dd0',
    strokeStyle:"#f00",
    tc:"#d0d"	

});
 //Loading.end();
setTimeout(function(){
  Loading.start({
	dom:dom,
	w:100,
	h:100,

 });
},6000)
setTimeout(function(){
  Loading.start({
	dom:dom,
	w:200,
	h:200,

 });
},6000)
