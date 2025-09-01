export const filtersHook = (gen, data, filters) => {

  let filtered = data.filter((x) => x.gender === gen);
  console.log(filters.price)
  if (filters.gender.length > 0) {
    filtered = data.filter((x) => filters.gender.includes(x.gender));
    console.log("hi gender")
  }

  if (filters.price?.start!==null && filters.price?.end) {
    console.log("hi price")
    filtered = filtered.filter(
      (x) => x.price >= filters.price.start && x.price <= filters.price.end
    ).sort((x,y)=>y.price - x.price);
  }

  if (filters.rating) {
    filtered = filtered.filter((x) => x.rating >= filters.rating);
    console.log("hi rating")
  }

  if (filters.size?.length > 0) {
    filtered = filtered.filter((x) =>
      filters.size.some((y) => x.availableSizes.includes(y.toUpperCase()))
    );
    console.log("hi size")
  }

  return filtered;
};
