// 计算相邻重复单词数
function solution(s) {
  var res = s.match(/(\b\w+)\s\1/ig);
  return res == null ? 0 : res.length;
}