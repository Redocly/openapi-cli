"use strict";

var _index = require("../index");

test('validate simple document', () => {
  expect((0, _index.validateFromFile)('./test/specs/openapi/simple.yaml')).toMatchInlineSnapshot('Array []');
});
test('Validate simple valid OpenAPI document', () => {
  expect((0, _index.validateFromFile)('./test/specs/openapi/valid-2.yaml')).toMatchInlineSnapshot('Array []');
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9fX3Rlc3RzX18vaW5kZXgudGVzdC5qcyJdLCJuYW1lcyI6WyJ0ZXN0IiwiZXhwZWN0IiwidG9NYXRjaElubGluZVNuYXBzaG90Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBQSxJQUFJLENBQUMsMEJBQUQsRUFBNkIsTUFBTTtBQUNyQ0MsRUFBQUEsTUFBTSxDQUNKLDZCQUFpQixrQ0FBakIsQ0FESSxDQUFOLENBRUVDLHFCQUZGLENBRXdCLFVBRnhCO0FBR0QsQ0FKRyxDQUFKO0FBTUFGLElBQUksQ0FBQyx3Q0FBRCxFQUEyQyxNQUFNO0FBQ25EQyxFQUFBQSxNQUFNLENBQ0osNkJBQWlCLG1DQUFqQixDQURJLENBQU4sQ0FFRUMscUJBRkYsQ0FFd0IsVUFGeEI7QUFHRCxDQUpHLENBQUoiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB2YWxpZGF0ZUZyb21GaWxlIH0gZnJvbSAnLi4vaW5kZXgnO1xuXG50ZXN0KCd2YWxpZGF0ZSBzaW1wbGUgZG9jdW1lbnQnLCAoKSA9PiB7XG4gIGV4cGVjdChcbiAgICB2YWxpZGF0ZUZyb21GaWxlKCcuL3Rlc3Qvc3BlY3Mvb3BlbmFwaS9zaW1wbGUueWFtbCcpLFxuICApLnRvTWF0Y2hJbmxpbmVTbmFwc2hvdCgnQXJyYXkgW10nKTtcbn0pO1xuXG50ZXN0KCdWYWxpZGF0ZSBzaW1wbGUgdmFsaWQgT3BlbkFQSSBkb2N1bWVudCcsICgpID0+IHtcbiAgZXhwZWN0KFxuICAgIHZhbGlkYXRlRnJvbUZpbGUoJy4vdGVzdC9zcGVjcy9vcGVuYXBpL3ZhbGlkLTIueWFtbCcpLFxuICApLnRvTWF0Y2hJbmxpbmVTbmFwc2hvdCgnQXJyYXkgW10nKTtcbn0pO1xuIl19