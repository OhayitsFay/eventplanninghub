import {renderListWithTemplate} from "./utils.mjs";
function vendorCardTemplate(vendor) {
  return `<section class="vendor-card">
    <a href="/index.html?vendor=${vendor.id}">
      <img src="${vendor.image}" alt="${vendor.name}">
      <h3>${vendor.name}</h3>
      <p><strong>Category: </strong>${vendor.category}</p>
      <p><strong>Rating: </strong>${vendor.rating} stars</p>
      <p><strong>Price Range: </strong>${vendor.price}</p>
      <p><strong>Contact: </strong>${vendor.phone}</p>
      <p><strong>Location: </strong>${vendor.location}</p>
      <p><strong>Reviews: </strong>${vendor.review_count}</p>
      <p>${vendor.description}</p>
      <a href="${vendor.website}" target="_blank">Visit Profile</a>
    </section>
  `;
}
export default class VendorDetails {
  constructor(category, dataSource,listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const vendorList = await this.dataSource.getData();
    this.renderList(vendorList);
  }

  renderList(vendorList) {
    renderListWithTemplate(vendorCardTemplate, this.listElement, vendorList);
  }
}