function toId() {
  return this.replaceAll('[<@#&!>]', '');
} 

function isNumber() {
  if (isNaN(this) || parseInt(this) != this || parseInt(this) <= 0) return false;
  return true;
} 

String.prototype.toId = toId();
String.prototype.isNumber = isNumber();
Number.prototype.isNumber = isNumber();