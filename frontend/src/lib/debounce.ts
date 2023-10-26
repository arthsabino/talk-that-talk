export const debounce = <Params extends any[]>(
  cb: (...args: Params) => any,
  d: number
): ((...args: Params) => void) => {
  let timer: ReturnType<typeof setTimeout> | undefined = undefined;
  return function (...args: Params) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => cb(...args), d);
  };
};

export default debounce;
