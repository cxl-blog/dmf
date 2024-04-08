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
      navbarDisableAutoBack: true,
      activeTabPath: 'pages/index/index'
      // layout: false 不使用layout布局
    },
    // {
    //   path: 'pages/category/index',
    //   style: {
    //     navigationBarTitleText: '占事'
    //   },
    //   activeTabPath: 'pages/index/index'
    // },
    {
      path: 'pages/history/index',
      style: {
        navigationBarTitleText: '历史记录'
      },
      navbarDisableAutoBack: true,
      activeTabPath: 'pages/history/index'
    },
    // {
    //   path: 'pages/divinatory-symbol/Detail',
    //   style: {
    //     navigationBarTitleText: '查看卦象'
    //   },
    //   activeTabPath: 'pages/index/index'
    // },
    {
      path: 'pages/divinatory-symbol/List',
      style: {
        navigationBarTitleText: '卦象百科'
      },
      activeTabPath: 'pages/divinatory-symbol/List',
      navbarDisableAutoBack: true
    },
    {
      path: 'pages/setting/index',
      style: {
        navigationBarTitleText: '设置'
      },
      navbarDisableAutoBack: true,
      activeTabPath: 'pages/setting/index',
      navbarDisabled: true
    },
    {
      path: 'pages/calendar/index',
      style: {
        navigationBarTitleText: '日历'
      },
      activeTabPath: 'pages/calendar/index'
    }
  ] as PageConfig[],
  subPackages: [
    {
      root: 'pages-other',
      pages: [
        {
          path: 'category/index',
          style: {
            navigationBarTitleText: '占事'
          },
          activeTabPath: 'pages/index/index'
        },
        {
          path: 'divinatory-symbol/Detail',
          style: {
            navigationBarTitleText: '查看卦象'
          },
          activeTabPath: 'pages/index/index'
        }
      ] as PageConfig[]
    }
  ],
  globalStyle: {
    // navigationBarTextStyle: 'black',
    // navigationBarBackgroundColor: '#f7f5f1',
    navigationStyle: 'custom',
    'mp-weixin': {}
  }
})
