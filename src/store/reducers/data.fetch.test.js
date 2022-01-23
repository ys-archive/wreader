const data_fetch = require("./data.fetch");
// @ponicode
describe("data_fetch.actions.fetchOne", () => {
  test("0", () => {
    let result = data_fetch.actions.fetchOne({ dataFetch: { fetchOne: true } });
    expect(result).toMatchSnapshot();
  });

  test("1", () => {
    let result = data_fetch.actions.fetchOne({
      dataFetch: { fetchOne: false },
    });
    expect(result).toMatchSnapshot();
  });

  test("2", () => {
    let result = data_fetch.actions.fetchOne(undefined);
    expect(result).toMatchSnapshot();
  });
});
