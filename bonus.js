var longestCommonPrefix = function (strs) {
  if (strs.length == 0) return "";
  let common = strs[0];
  for (const word of strs.slice(1)) {
    while (!word.startsWith(common)) {
      common = common.slice(0, -1);
      if (common == "") return ""
    }
  }
  return common;
};


