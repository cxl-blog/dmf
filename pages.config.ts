import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  easycom: {
    // 注意一定要放在custom里，否则无效，https://ask.dcloud.net.cn/question/131175
    custom: {
      '^u--(.*)': 'uview-plus/components/u-$1/u-$1.vue',
      '^up-(.*)': 'uview-plus/components/u-$1/u-$1.vue',
      '^u-([^-].*)': 'uview-plus/components/u-$1/u-$1.vue'
    },
    autoscan: true
  },
  // You can also define pages fields, which have the highest priority.priority.
  pages: [
    // pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
    {
      path: 'pages/index/index',
      style: {
        navigationBarTitleText: '预测卦象'
      },
      navbarDisableAutoBack: true
    },
    {
      path: 'pages/category/index',
      style: {
        navigationBarTitleText: '占事'
      }
    },
    {
      path: 'pages/divinatory-symbol/Detail',
      style: {
        navigationBarTitleText: '查看卦象'
      }
    },
    {
      path: 'pages/divinatory-symbol/List',
      style: {
        navigationBarTitleText: '卦象百科'
      }
    }
  ],
  globalStyle: {
    navigationBarTextStyle: 'white',
    navigationStyle: 'custom'
  }
})
