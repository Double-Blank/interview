// 寻找名至实归的用户
function solution(users) {
  var min = + Infinity;
  var ans = 0;
  for (var key in users)
    if (Math.abs(users[key] - Number(key)) < min) {
      min = Math.abs(users[key] - Number(key));
      ans = key;
    }
  return +ans

}