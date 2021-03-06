var webpack=require('webpack');//插件
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
console.log(UglifyJSPlugin);
module.exports={
	entry:__dirname+'/src/index.js',//入口文件配置
	output:{ //出口文件配置
       path:__dirname+'/docs',
       filename:'dlLoading.min.js'
	},
	devtool:'source-map',
	module:{
		loaders:[
			]		
	},
	plugins:[
	   new webpack.BannerPlugin('delen 出品')
	   // new webpack.optimize.UglifyJsPlugin({
		  // minimize: true,
		  // compress: {
		  //   warnings: false,
		  // },
	   // })
	],
	//运行方式 webpack-dev-server --inline --hot修改代码自动刷新
	// 
	devServer:{
	  contentBase:'./docs', //本地服务器需要加载的目录
	  inline:true,//时时刷新
	  hot:true  //容许热加载
	}
	
}

