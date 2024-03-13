module.exports = ({ result, others = {} }) => {
  if (Array.isArray(result)) {
    let nextOffset =
      others?.limit === result?.length
        ? (others.offset || 0) + result.length
        : null;

    return {
      items: result,
      count: result.length,
      nextOffset: nextOffset,
    };
  }

  return result;
};
