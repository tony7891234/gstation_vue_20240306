// 排列数算法(本例中没有用到)
 export const queue = (arr, size) => {
 	if (size > arr.length) {
 		return
 	}
 	var allResult = []
 	(function(arr, size, result) {
 		if (result.length == size) {
 			allResult.push(result)
 		} else {
 			for (var i = 0, len = arr.length; i < len; i++) {
 				var newArr = [].concat(arr),
 					curItem = newArr.splice(i, 1)
 				arguments.callee(newArr, size, [].concat(result, curItem))
 			}
 		}
 	})(arr, size, [])
 	return allResult
 }

 // 组合数算法
/**
 * 获得指定数组的所有组合
 */
function arrayCombine(targetArr = [], count = 1) {
  if (!Array.isArray(targetArr)) return []

  const resultArrs = []
  // 所有组合的 01 排列
  const flagArrs = getFlagArrs(targetArr.length, count)
  while (flagArrs.length) {
    const flagArr = flagArrs.shift()
    resultArrs.push(targetArr.filter((_, idx) => flagArr[idx]))
  }
  return resultArrs
}
/**
 * 获得从 m 中取 n 的所有组合
 * 思路如下：
 * 生成一个长度为 m 的数组，
 * 数组元素的值为 1 表示其下标代表的数被选中，为 0 则没选中。
 *
 * 1. 初始化数组，前 n 个元素置 1，表示第一个组合为前 n 个数；
 * 2. 从左到右扫描数组元素值的 “10” 组合，找到第一个 “10” 组合后将其变为 “01” 组合；
 * 3. 将其左边的所有 “1” 全部移动到数组的最左端
 * 4. 当 n 个 “1” 全部移动到最右端时（没有 “10” 组合了），得到了最后一个组合。
 */
function getFlagArrs(m, n = 1) {
  if (n < 1 || m < n)  return []

  // 先生成一个长度为 m 字符串，开头为 n 个 1， 例如“11100”
  let str = '1'.repeat(n) + '0'.repeat(m-n)
  let pos
  // 1
  const resultArrs = [Array.from(str, x => Number(x))]
  const keyStr = '10'

  while(str.indexOf(keyStr) > -1) {
    pos = str.indexOf(keyStr)
    // 2
    str = str.replace(keyStr, '01')
    // 3
    str = Array.from(str.slice(0, pos))
      .sort((a, b) => b-a)
      .join('') + str.slice(pos)
    // 4
    resultArrs.push(Array.from(str, x => Number(x)))
  }
  return resultArrs
}
  
  /// 该算法arguments.callee在严格模式下不支持
  // function comb(arr, size ){
  //   var allResult = [];
  //   (function(arr, size, result){
  //     var arrLen = arr.length;
  //     if(size > arrLen){
  //       return;
  //     }
  //     if(size == arrLen){
  //       allResult.push([].concat(result, arr))
  //     }else{
  //       for(var i =0 ; i < arrLen; i++){
  //         var newResult = [].concat(result);
  //         newResult.push(arr[i]);
  
  //         if(size == 1){
  //           allResult.push(newResult);
  //         }else{
  //           var newArr = [].concat(arr);
  //           newArr.splice(0, i +　1);
  //           arguments.callee(newArr, size - 1, newResult);
  //         }
  //       }
  //     }
  //   })(arr, size, []);
  //   return allResult;
  // }
  
  // 获取赔率乘积之和

function getOdds(arr) { //是个二维度数组
	let result = 0
	let sum  = 1
	for(let i = 0; i < arr.length; i++) {
		sum = 1
		for(let j = 0; j < arr[i].length; j++) {
			sum *= arr[i][j] / 1
		}
		result += sum
	}
	return result.toFixed(2)
}
export const comb = arrayCombine
export {
	getOdds
}