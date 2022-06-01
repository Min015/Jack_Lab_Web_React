export function handleGetPage(nowpage, maxpage){
  let pagearray = [];
  for (let i = (Number(nowpage) - 2); i <= (Number(nowpage) + 2); i++) {
    if (i > 0 && i <= Number(maxpage)) {
      pagearray.push(i)
    }
  }
  return pagearray;
}