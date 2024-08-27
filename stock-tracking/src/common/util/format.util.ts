export const formatFloatNumber = (value: number, fiexd: number = 2) => {
  if (value) return parseFloat(value.toFixed(2));
};
