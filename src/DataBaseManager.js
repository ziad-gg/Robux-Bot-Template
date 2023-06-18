module.exports = class DataBaseManager {
  constructor(Schema) {
    this.Schema = Schema;
  }
  async get(id) {
    let data;
    data = await this.Schema.findOne({ id });
    
    if (!data) {
      data = new this.Schema({ id });
      return data;
    } else {
      return data;
    }
  }
}