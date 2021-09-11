export async function asyncForEach(arr, asyncCallback) {
  const len = arr.length;
  for (let i = 0; i < len; ++i) {
    await asyncCallback(arr[i], i, arr);
  }
}
