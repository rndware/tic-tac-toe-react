// TODO: use lodash 'chunk' and 'delay' methods instead

export function chunkArray<T>(array: T[], part: number): T[][] {
  var tmp = [];
  for (var i = 0; i < array.length; i += part) {
    tmp.push(array.slice(i, i + part));
  }
  return tmp;
}

export function sleep(n: number): Promise<undefined> {
  return new Promise((resolve) => setTimeout(resolve, n));
}
