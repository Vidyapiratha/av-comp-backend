module.exports = ({ result, others = {} }) => {
  if (result && result.data) {
    const isArrayResult = Array.isArray(result.data);
    const itemCount = isArrayResult ? result.data.length : 1;
    const nextOffset =
        isArrayResult && others.limit === result.data.length
            ? (others.offset || 0) + result.data.length
            : null;

    return {
      items: result.data,
      count: itemCount,
      nextOffset: nextOffset || 0,
      totalCount: result.totalCount || itemCount,
    };
  }

  console.log("Returning empty result");

  return {
    items: [],
    count: 0,
    nextOffset: 0,
    totalCount: 0,
  };
};