# A progress bar that simulates the amount of traffic used！
# github：https://github.com/ddcouples/web-page-loading.git
# Show the url https://ddcouples.github.io/web-page-loading/

Method:
   `import Loading from 'web-page-loading';`
    `Loading.start([dom][,w][,h]);`


   1. dom is which You want to display the dom in load;  w is the progress's width; h is the progress's height （W, h is the same, otherwise it's not harmonious. If you like,I can't help it.）

   

	Loading.start(dom,50,50);
   2. if no 'Loading.end()',the progree can't end; so you should add it;
    but if the dom is null or undefined Loading is thought to be loaded in body,
    so  window is ready that Loading.end() will do by herself;
	setTimeout(function(){
	  Loading.end();
	},6000)


  # Thank You! Welcome to star  and issue it ,I am delen!
# github：https://github.com/ddcouples/web-page-loading.git

