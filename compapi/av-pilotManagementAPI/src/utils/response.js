module.exports = ({ result, others = {} }) => {
  if (Array.isArray(result.data)) {
    let nextOffset =
      others?.limit === result?.data?.length
        ? (others.offset || 0) + result.data.length
        : null;

    return {
      items: result.data,
      count: result.data.length,
      nextOffset: nextOffset,
      totalCount: result.totalCount,
    };
  }

  return {
    items: result.data || [],
    count: result.data ? result.data.length : 0,
    nextOffset: 0,
    totalCount: result.totalCount,
  };
};
