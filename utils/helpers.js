function debounce(func, wait, immediate) {
  let timeout;
  return () => {
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) func.apply(this, arguments);
    }, wait);
    if (callNow) func.apply(this, arguments);
  };
}

export {
  debounce,
};