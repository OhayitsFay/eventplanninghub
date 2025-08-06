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
    this.apiURL = import.meta.env.VITE_EVENT_URL;
  }
  getData() {
    return fetch(this.apiURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(convertToJson)
      .then(data => data);
  }
  async findProductById(id) {
    const vendors = await this.getData();
    return vendors.find(item => item.id === id);
  }
  async searchVendors({ query = "", category = "", rating = "", sort = "" }) {
    const params = new URLSearchParams();
    if (query) params.append("search", query);
    if (category) params.append("category", category);
    // MockAPI doesn’t support rating filter server-side—score >= rating filter done client-side
    if (sort) params.append("sortBy", sort); // Not built-in sort; we still sort afterwards

    const response = await fetch(`${this.apiURL}?${params.toString()}`, {
      headers: { "Content-Type": "application/json" }
    });
    const vendors = await convertToJson(response);

    let filtered = vendors;

    if (rating) {
      filtered = filtered.filter(v => Number(v.rating) >= Number(rating));
    }

    if (sort === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "price") {
      filtered.sort((a, b) => {
        const aVal = parseInt(a.price.replace(/\D/g, ""), 10);
        const bVal = parseInt(b.price.replace(/\D/g, ""), 10);
        return aVal - bVal;
      });
    }

    return filtered;
  }
}