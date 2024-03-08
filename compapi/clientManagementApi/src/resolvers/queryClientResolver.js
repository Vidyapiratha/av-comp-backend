const testEndpoint = async (arguments) => {
  console.log("testEndpoint Called with arguments::", arguments);

  return { status: "success" };
};

module.exports = {
  testEndpoint,
};
