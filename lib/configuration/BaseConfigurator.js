'use strict';

exports.__esModule = true;

var _mapValues = require('../utils/mapValues');

var _mapValues2 = _interopRequireDefault(_mapValues);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BaseConfigurator {
  constructor(parent) {
    this.parent = parent;
  }

  getAncestor(type) {
    if (this.parent) {
      return this.parent instanceof type ? this.parent : this.parent.getAncestor(type);
    }
    return null;
  }

  buildConfig() {
    const mapper = value => {
      if (!value) {
        return value;
      }
      if (value instanceof BaseConfigurator) {
        return value.buildConfig();
      }
      if (Array.isArray(value)) {
        return value.map(mapper);
      }
      if (value && typeof value === 'object') {
        return (0, _mapValues2.default)(value, mapper);
      }
      return value;
    };
    return (0, _mapValues2.default)(this.config, mapper);
  }
}
exports.default = BaseConfigurator;