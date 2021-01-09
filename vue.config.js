module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'plugins': '@/plugins'
      }
    },
    
  },
  // vue-cli 4
  publicPath  : '/mall/',
  
  
  // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  productionSourceMap: false
}