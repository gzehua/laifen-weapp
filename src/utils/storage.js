class storage {
  constructor(props) {
    this.props = props || {};
    this.source = wx || this.props.source;
  }
  /**
   * 获取缓存
   * @param String $key  key
   * @param String $def  若想要无缓存时，返回默认值则get('key','默认值')（支持字符串、json、数组、boolean等等）
   * @return value;
   */
  get (key, def = '') {
    const data = this.source,
      timeout = parseInt(data.getStorageSync(`${key}__separator__`) || 0);

    // 过期失效
    if (timeout) {
      if (Date.now() > timeout) {
        this.remove(key);
        return;
      }
    }
    let value = data.getStorageSync(key);
    return value ? value : def;
  }

  /**
   * 设置缓存
   * @param String $key       key
   * @param String $value     value（支持字符串、json、数组、boolean等等）
   * @param Number $timeout   过期时间（单位：分钟）不设置时间即为永久保存
   * @return value;
   */
  put (key, value, timeout = 0) {
    let data = this.source;
    let _timeout = parseInt(timeout);
    data.setStorageSync(key, value);
    if (_timeout) {
      data.setStorageSync(`${key}__separator__`, Date.now() + 1000 * 60 * _timeout);
    } else {
      data.removeStorageSync(`${key}__separator__`);
    }

    return value;
  }

  remove (key) {
    let data = this.source;
    data.removeStorageSync(key);
    data.removeStorageSync(`${key}__separator__`);
    return undefined;
  }
}
let storages = new storage();
wx.$storage = storages;
export default storages;
