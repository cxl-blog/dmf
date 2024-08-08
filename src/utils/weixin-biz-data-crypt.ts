import CryptoJS from 'crypto-js'
import { Base64 } from 'js-base64'

class WXBizDataCrypt {
  public appId: string
  public sessionKey: string
  constructor(appId: string, sessionKey: string) {
    this.appId = appId
    this.sessionKey = sessionKey
  }

  decryptData(encryptedData: string, iv: string) {
    const key = CryptoJS.enc.Base64.parse(this.sessionKey)
    const ivv = CryptoJS.enc.Base64.parse(iv)
    const decrypt = CryptoJS.AES.decrypt(encryptedData, key, {
      iv: ivv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return JSON.parse(Base64.decode(CryptoJS.enc.Base64.stringify(decrypt)))
  }
}

export default WXBizDataCrypt
