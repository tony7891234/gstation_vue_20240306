const TransformPages = require('uni-read-pages')
const {webpack} = new TransformPages()
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    productionSourceMap: false, // 生产打包时不输出map文件，增加打包速度
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
            config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
            config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']
        }
		return {
			plugins: [
				new webpack.DefinePlugin({
					ROUTES: webpack.DefinePlugin.runtimeValue(() => {
						const tfPages = new TransformPages({
							includes: ['path', 'name', 'aliasPath','meta']
						});
						return JSON.stringify(tfPages.routes)
					}, true )
				})
			]
		}
    }
}

// module.exports = {
// 	productionSourceMap: false, // 生产打包时不输出map文件，增加打包速度
// 	configureWebpack: {
// 		plugins: [
// 			new webpack.DefinePlugin({
// 				ROUTES: webpack.DefinePlugin.runtimeValue(() => {
// 					const tfPages = new TransformPages({
// 						includes: ['path', 'name', 'aliasPath','meta']
// 					});
// 					return JSON.stringify(tfPages.routes)
// 				}, true )
// 			}),
// 			new TerserPlugin({
// 				terserOptions: {
// 				  compress: {
// 					  warnings: false,
// 					  drop_console: true // 生产模式下忽略打印信息
// 					},
// 				},
// 			}),
// 		]
// 	}
// }