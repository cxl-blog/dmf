/**
 * @description 基于@uni-helper/uni-network see{@link https://modyqyw.top/uni-helper/api/uni-app-network.html}
 */
import type { UnCancelTokenSource, UnConfig, UnInstance, UnResponse } from '@uni-helper/uni-network'
import uan, { UnCancelToken, UnError } from '@uni-helper/uni-network'
import qs from 'qs'

// import { HTTP_OK_STATUS } from '@/constants/request'
import { t } from '@/i18n'
import { HTTP_OK_STATUS } from '@/constants/request'

const { getLocale } = useLocale()

/**
 * @description 取消请求util，用于实现取消请求逻辑
 */
class CancelRequestUtil {
  private _pendingList: Map<string, UnCancelTokenSource>
  constructor() {
    this._pendingList = new Map()
  }

  /**
   * @description 生成键值
   * @param config
   */
  generateKey(config: UnCustomConfig) {
    if (config.cancelCustomKey) {
      return config.cancelCustomKey
    }

    const { method, url, params = {}, data = {} } = config

    if (!config.cancelUseStrict) {
      return `${method}&${url}`
    }

    const formatParams = JSON.parse(JSON.stringify(params))
    const formatData = JSON.parse(JSON.stringify(data))
    return `${method}&${url}&${
      method?.toUpperCase() === 'GET' ? qs.stringify(formatParams) : qs.stringify(formatData)
    }`
  }

  /**
   * 添加队列
   * @param config
   */
  addPendingList(config: UnCustomConfig) {
    const key = this.generateKey(config)

    if (key) {
      const cancelToken = UnCancelToken
      const source = cancelToken.source()
      config.cancelToken = source.token
      this._pendingList.set(key, source)
    }
  }

  /**
   * 移除队列
   * @param config
   */
  removePendingList(config: UnCustomConfig) {
    const key = this.generateKey(config)

    if (key) {
      const source = this._pendingList.get(key)

      if (!source) {
        return
      }

      source.cancel()
      this._pendingList.delete(key)
    }
  }
}

const cancelUtil = new CancelRequestUtil()
let requestInstance: UnInstance
let wexinRequestInstance: typeof wx.cloud.callContainer

// #ifdef MP-WEIXIN
// eslint-disable-next-line prefer-const
wexinRequestInstance = async ({ url, method, params, data, ...others }) => {
  const res = await wx.cloud.callContainer({
    config: { env: 'prod-8ge16jg5afdf6cc6' },
    header: {
      'X-WX-SERVICE': 'springboot-5thz',
      'content-type': 'application/json',
      'X-WX-EXCLUDE-CREDENTIALS': 'unionid, cloudbase-access-token, openid'
    },
    ...others,
    data: params ?? data,
    path: url,
    method
  })

  if (res.statusCode === HTTP_OK_STATUS) {
    return res.data
  }

  return res
}
// #endif

// #ifndef MP-WEIXIN
// eslint-disable-next-line prefer-const
requestInstance = uan.create({
  baseUrl: import.meta.env.VITE_API_BASE_PATH,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': getLocale()
  },
  paramsSerializer: qs.stringify,
  sslVerify: false
})

requestInstance.interceptors.request.use((config: UnConfig) => {
  if ((config as UnCustomConfig)?.cancelable) {
    cancelUtil.removePendingList(config) // 移除上次请求且没有结束的请求信息
    cancelUtil.addPendingList(config) // 添加新的信息
  }

  return Promise.resolve(config)
})

requestInstance.interceptors.response.use(
  (response: UnResponse<AppResponse>) => {
    // 微信小程序不能获取到config
    const { config = {}, data } = response

    if ((config as UnCustomConfig)?.cancelable) {
      cancelUtil.removePendingList(config as UnCustomConfig)
    }

    // 二进制请求，不用处理，直接返回
    // if (['blob', 'stream', 'arrayBuffer'].includes(config!.responseType!)) {
    //   return Promise.resolve(data)
    // } else {
    //   if (data?.code !== HTTP_OK_STATUS) {
    //     !(config as UnCustomConfig<AppResponse>).ignoreErrorMsg && parseResponse(data!)

    //     return Promise.reject(data)
    //   }
    // }

    return Promise.resolve(data!) as unknown as any
  },
  (error: UnError<AppResponse>) => {
    const { data = {} } = error.response || {}

    // 取消请求，跳过处理
    if (error.code === UnError.ERR_CANCELED) {
      return Promise.reject(error)
    }

    // 后端返回有错误数据，采用后端数据，否则采用原始数据
    if (Object.keys(data).length) {
      parseResponse(data)
    } else {
      const msg = data.message || error.message || t('请求失败啦T_T')
      uni.showToast({
        icon: 'error',
        title: msg
      })
    }

    return Promise.reject(error)
  }
)
// #endif

/**
 * @description 解析业务数据
 * @param data 业务数据
 */
function parseResponse(data: AppResponse) {
  uni.showToast({
    icon: 'error',
    title: data.message || t('请求失败啦T_T')
  })
}

// 目前只区分微信小程序与其他平台
const httpInstance = requestInstance || wexinRequestInstance

/**
 * @description 基于各个平台兼容性考虑，考虑只使用get post see {@link https://uniapp.dcloud.net.cn/api/request/request.html}
 */
export default {
  get: <D = any>(
    url: UnConfig['url'],
    params: UnConfig['params'] = {},
    config: UnCustomGetConfig = {}
  ) => httpInstance({ url, params, ...config, method: 'GET' }) as unknown as Promise<D>,
  post: <D = any>(
    url: UnConfig['url'],
    data: UnConfig['data'] = {},
    config: UnCustomPostConfig = {}
  ) => httpInstance({ url, data, ...config, method: 'POST' }) as unknown as Promise<D>,
  download: (config: UnConfig) => httpInstance.download(config),
  upload: (config: UnConfig) => httpInstance.upload(config)
}

export { httpInstance }
