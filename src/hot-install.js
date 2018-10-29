import { stringHash } from './hash.js'

const installed = {}

// 动态cdn导入工具类(单线程,按顺序依次加载)
export function hotCdnImportsSync (urls, onOk) {
  let count = 0
  const install = function () {
    hotCdnImport(urls[count], () => {
      count++
      if (count < urls.length) {
        install()
      } else {
        onOk()
      }
    })
  }
  install()
}

// 动态cdn导入工具类(多线程,同步加载)
export function hotCdnImports (urls, onOk) {
  let count = 0
  const onOneInstallOk = function () {
    count++
    if (count === urls.length) onOk()
  }
  if (urls instanceof Array && urls.length > 0) {
    urls.forEach(url => hotCdnImport(url, onOneInstallOk))
  } else {
    onOk()
  }
}

// 创建script节点
function createScriptNode (opt = {src: '', id: ''}) {
  const node = document.createElement('script')
  node.type = 'text/javascript'
  node.src = opt.src
  node.id = opt.id
  return node
}

// 加载script
export function hotCdnImport (url, onOk) {
  const urlHash = stringHash(url)
  const newOnOk = () => {
    onOk()
    installed[urlHash] = true
  }
  if (url) {
    const head = document.getElementsByTagName('head')[0]
    let node = document.getElementById(urlHash)
    if (node) {
      const checkInsall = () => {
        if (installed[urlHash]) {
          newOnOk()
        } else { // 其他线程正在加载,等待加载完成后执行回调
          setTimeout(checkInsall, 5)
        }
      }
      checkInsall()
    } else {
      node = createScriptNode({id: urlHash, src: url})
      node.addEventListener('load', newOnOk)
      head.appendChild(node)
    }
  }
}
