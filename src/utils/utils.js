export const countPrice = (orderGoods) => {
  return orderGoods.reduce((acc, rec) => {
    return acc + rec.price * rec.count;
  }, 0);
};

export const totalCount = (orderGoods) => {
  return orderGoods.reduce((acc, rec) => {
    return acc + rec.count;
  }, 0);
};
