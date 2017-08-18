/**
 * Created by 15010 on 2017/8/14.
 */
const digitsRE = /(\d{3})(?=\d)/g

export function currency (value, currency, decimals) {
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''//isFinite()函数用于检测七参数是否无穷大 &
  currency = currency != null ? currency : '$'
  decimals = decimals != null ? decimals : 2
  var stringified = Math.abs(value).toFixed(decimals)//abs()取绝对值,toFixed()把number四舍五入为指定小数位数的数字
  var _int = decimals    //截取整数位----slice(start,end),索引均可以为负数,end 索引往往取不到
    ? stringified.slice(0, -1 - decimals) //从已有数组中返回选定的元素
    : stringified
  var i = _int.length % 3
  var head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
    : ''
  var _float = decimals
    ? stringified.slice(-1 - decimals)
    : ''
  var sign = value < 0 ? '-' : ''
  return sign + currency + head +
    _int.slice(i).replace(digitsRE, '$1,') +
    _float
}
