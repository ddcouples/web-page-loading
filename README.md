# A progress bar that simulates the amount of traffic used！
# github：https://github.com/ddcouples/web-page-loading.git
# Show the url https://ddcouples.github.io/web-page-loading/

Method:
   `import Loading from 'web-page-loading';`
    `let option={`
        dom: body,
        w: w,
        h: h,
        lw: lw,
        fillStyle: fillStyle,
        strokeStyle:strokeStyle,
        tc:tc

    `}` 
    `Loading.start([option]);`

  

   1. option setting
      dom is which You want to display the dom in load;  //if dom is null/undefined dom just is body;
      w is the progress's width; 
      h is the progress's height;
      lw is the circle's width;
      fillStyle is the water's color;
      strokeStyle is the circle's color;
      tc is the text's color;
    （W, h is the same, otherwise it's not harmonious. If you like,I can't help it.）

   

	Loading.start(dom,50,50);
   2. if no 'Loading.end()',the progree can't end; so you should add it;
    but if the dom is null or undefined Loading is thought to be loaded in body,
    so  window is ready that Loading.end() will do by herself;
	setTimeout(function(){
	  Loading.end();
	},6000)

otherwise:
  
  `v-v-pageloading` directive can be used for Vue;
  `import Loading from 'web-page-loading';`
  `Vue.use(Loading,option)` // Use same as above;
  in page you can use `v-v-pageloading` just like `v-v-pageloading='true'`
  # Thank You! Welcome to star  and issue it ,I am delen!
# github：https://github.com/ddcouples/web-page-loading.git

