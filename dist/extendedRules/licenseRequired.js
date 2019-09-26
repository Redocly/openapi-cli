"use strict";

var _error = require("../error");

/* eslint-disable class-methods-use-this */
class LicenseRequired {
  static get ruleName() {
    return 'licenseRequired';
  }

  onExit(node, definition, ctx) {
    if (definition.name !== 'OpenAPIInfo') return null;

    if (!node.license) {
      return [(0, _error.createErrorMissingRequiredField)('license', node, ctx)];
    }

    return null;
  }

}

module.exports = LicenseRequired;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9leHRlbmRlZFJ1bGVzL2xpY2Vuc2VSZXF1aXJlZC5qcyJdLCJuYW1lcyI6WyJMaWNlbnNlUmVxdWlyZWQiLCJydWxlTmFtZSIsIm9uRXhpdCIsIm5vZGUiLCJkZWZpbml0aW9uIiwiY3R4IiwibmFtZSIsImxpY2Vuc2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUNBOztBQURBO0FBR0EsTUFBTUEsZUFBTixDQUFzQjtBQUNwQixhQUFXQyxRQUFYLEdBQXNCO0FBQ3BCLFdBQU8saUJBQVA7QUFDRDs7QUFFREMsRUFBQUEsTUFBTSxDQUFDQyxJQUFELEVBQU9DLFVBQVAsRUFBbUJDLEdBQW5CLEVBQXdCO0FBQzVCLFFBQUlELFVBQVUsQ0FBQ0UsSUFBWCxLQUFvQixhQUF4QixFQUF1QyxPQUFPLElBQVA7O0FBQ3ZDLFFBQUksQ0FBQ0gsSUFBSSxDQUFDSSxPQUFWLEVBQW1CO0FBQ2pCLGFBQU8sQ0FBQyw0Q0FBZ0MsU0FBaEMsRUFBMkNKLElBQTNDLEVBQWlERSxHQUFqRCxDQUFELENBQVA7QUFDRDs7QUFDRCxXQUFPLElBQVA7QUFDRDs7QUFYbUI7O0FBY3RCRyxNQUFNLENBQUNDLE9BQVAsR0FBaUJULGVBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgY2xhc3MtbWV0aG9kcy11c2UtdGhpcyAqL1xuaW1wb3J0IHsgY3JlYXRlRXJyb3JNaXNzaW5nUmVxdWlyZWRGaWVsZCB9IGZyb20gJy4uL2Vycm9yJztcblxuY2xhc3MgTGljZW5zZVJlcXVpcmVkIHtcbiAgc3RhdGljIGdldCBydWxlTmFtZSgpIHtcbiAgICByZXR1cm4gJ2xpY2Vuc2VSZXF1aXJlZCc7XG4gIH1cblxuICBvbkV4aXQobm9kZSwgZGVmaW5pdGlvbiwgY3R4KSB7XG4gICAgaWYgKGRlZmluaXRpb24ubmFtZSAhPT0gJ09wZW5BUElJbmZvJykgcmV0dXJuIG51bGw7XG4gICAgaWYgKCFub2RlLmxpY2Vuc2UpIHtcbiAgICAgIHJldHVybiBbY3JlYXRlRXJyb3JNaXNzaW5nUmVxdWlyZWRGaWVsZCgnbGljZW5zZScsIG5vZGUsIGN0eCldO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IExpY2Vuc2VSZXF1aXJlZDtcbiJdfQ==