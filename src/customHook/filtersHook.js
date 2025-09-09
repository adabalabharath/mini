export const filtersHook = (gen, data, filters) => {
  let filtered = data.filter(
    (x) =>
      x.gender===gen
  );

  if (filters.gender.length > 0) {
    filtered = data.filter((x) => filters.gender.includes(x.gender));
  }

  if (filters.price?.start !== null && filters.price?.end) {
    filtered = filtered.filter(
      (x) => x.price >= filters.price.start && x.price <= filters.price.end
    );
  }

  filtered =
    filters.sort === "asc"
      ? filtered.sort((a, b) => a.price - b.price)
      : filtered.sort((a, b) => b.price - a.price);

  if (filters.rating) {
    filtered = filtered.filter((x) => x.rating >= filters.rating);
  }

  if (filters.size?.length > 0) {
    filtered = filtered.filter((x) =>
      filters.size.some((y) => x.availableSizes.includes(y.toUpperCase()))
    );
  }

  return filtered;
};
