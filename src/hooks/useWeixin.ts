export function useWeixin() {
  function checkSession(): Promise<boolean> {
    return new Promise(resolve => {
      wx.checkSession({
        success() {
          resolve(true)
        },
        fail() {
          resolve(false)
        }
      })
    })
  }

  function login() {
    return new Promise((resolve, reject) => {
      wx.login({
        success(res) {
          if (res.code) {
            resolve(res)
          } else {
            reject(res)
          }
        },
        fail(res) {
          reject(res)
        }
      })
    })
  }

  function getUserProfile(): Promise<any> {
    return new Promise((resolve, reject) => {
      wx.getUserProfile({
        desc: '获取用户信息',
        success(res) {
          resolve(res)
        },
        fail(res) {
          reject(res)
        }
      })
      // uni.getUserProfile({
      //   desc: '获取用户信息',
      //   success(res) {
      //     resolve(res)
      //   },
      //   fail(res) {
      //     reject(res)
      //   }
      // })
    })
  }

  return {
    checkSession,
    login,
    getUserProfile
  }
}
