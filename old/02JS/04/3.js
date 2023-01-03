// 生成圣诞树
function solution(height) {
  for (var i = 0, out = "", num = 1, spaces = height - 1; i < height; i++) {
    for (var j = 0; j < spaces; j++) out += " ";
    for (var j = 0; j < num; j++) out += "*";
    for (var j = 0; j < spaces; j++) out += " ";
    num += 2, out += "\n", spaces -= 1;
  }
  return out.substr(0, out.length - 1);
}