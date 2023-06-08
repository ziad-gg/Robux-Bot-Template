const { Zoblox } = require('zoblox.js');

String.prototype.toId = function () {
  return this.replace(/[<@#&!>]/g, '');
};

Zoblox.prototype.isLoged = async function () {
  const user = await this.getCurrentUser().then(data => data).catch(e => null);
  if (user) return true;
  else return false;
}