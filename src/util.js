String.prototype.toId = function () {
  return this.replace(/[<@#&!>]/g, '');
}

