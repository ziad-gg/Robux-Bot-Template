String.prototype.toId = function () {
  return this.replace(/[<@#&!>]/g, '');
}

String.prototype.isNumber = function () {
  if (isNaN(this) || parseInt(this) != this || parseInt(this) <= 0) return false;
  return true;
};

Number.prototype.isNumber = function () {
  if (isNaN(this) || parseInt(this) != this || parseInt(this) <= 0) return false;
  return true;
};