"use strict";

var _class, _descriptor, _class2, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

// @say
var Animal = (_class = (_temp = _class2 = /*#__PURE__*/function () {
  function Animal(name) {
    _classCallCheck(this, Animal);

    _initializerDefineProperty(this, "PI", _descriptor, this);

    _defineProperty(this, "age", 28);

    this.name = name;
  }

  _createClass(Animal, [{
    key: "say",
    value: function say() {
      console.log('my name is animal');
    }
  }], [{
    key: "makeSound",
    value: function makeSound() {
      console.log('pi');
    }
  }]);

  return Animal;
}(), _defineProperty(_class2, "flag", true), _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "PI", [readonly], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 3.14;
  }
}), _applyDecoratedDescriptor(_class.prototype, "say", [before], Object.getOwnPropertyDescriptor(_class.prototype, "say"), _class.prototype)), _class);
var dog = new Animal('dog'); // dog.PI = 3.15;

console.log(dog);
dog.say(); // 1) 给类添加静态属性
// function say(constructor) {
//     constructor.combawa = 'asdas'
// }
// 2) //类的属性

function readonly(target, key, descriptor) {
  // console.log(target == Animal.prototype);
  descriptor.writable = false;
} // 3) //类的方法


function before(target, key, descriptor) {
  // console.log(target, key, descriptor);
  var oldSy = descriptor.value;

  descriptor.value = function () {
    console.log("before ".concat(key));
    oldSy.call.apply(oldSy, [target].concat(Array.prototype.slice.call(arguments)));
  };
}
