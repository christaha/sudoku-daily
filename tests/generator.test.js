const { generateOne } = require('../generator/generator');

test('verify that a puzzle is generated', () => {
  const result = generateOne();
  expect(result).toBeDefined();
});
