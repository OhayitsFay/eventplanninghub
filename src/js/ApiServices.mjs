

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ApiServices {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then(data => data);
  }
  async findProductById(id) {
    const vendors = await this.getData();
    return vendors.find(item => item.id === id);
  }
}