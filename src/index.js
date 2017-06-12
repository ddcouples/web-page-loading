import Loading from '../lib/Loading';

var dom=document.querySelector('#dom');


Loading.start(dom,150,150);
setTimeout(function(){
  Loading.end();
},6000)