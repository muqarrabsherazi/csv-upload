const curry = <F extends (...args: any[]) => any>(fn: F) => {
  return function curried(...args: any[]): any {
    return args.length >= fn.length
      ? fn(...args)
      : (...next: any[]) => curried(...args, ...next);
  };
}

export default curry
