import VendorDetails from "./VendorDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import ApiServices from "./ApiServices.mjs";

loadHeaderFooter();

const dataSource = new ApiServices();
const listElement = document.querySelector("#vendorList");
const searchInput = document.querySelector("#searchInput");
const categoryFilter = document.querySelector("#categoryFilter");
const ratingFilter = document.querySelector("#ratingFilter");
const sortBy = document.querySelector("#sortBy");
const loadingText = document.createElement("p");
loadingText.textContent = "Loading vendors...";
document.querySelector("section").prepend(loadingText);
loadingText.style.display = "none";

async function handleSearch() {
  loadingText.style.display = "block";
  listElement.innerHTML = "";

  try {
    const results = await dataSource.searchVendors({
      query: searchInput.value.trim(),
      category: categoryFilter.value,
      rating: ratingFilter.value,
      sort: sortBy.value
    });

    if (!results.length) {
      listElement.innerHTML = "<p>No vendors found.</p>";
    } else {
      results.forEach(v => {
        listElement.insertAdjacentHTML("beforeend", VendorDetails.renderVendor(v));
      });
    }
  } catch {
    listElement.innerHTML = "<p>Error loading vendors. Please try again.</p>";
  } finally {
    loadingText.style.display = "none";
  }
}

function debounce(fn, delay = 300) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

searchInput.addEventListener("input", debounce(handleSearch));
categoryFilter.addEventListener("change", handleSearch);
ratingFilter.addEventListener("change", handleSearch);
sortBy.addEventListener("change", handleSearch);

document.querySelector("#vendorSearchForm").addEventListener("submit", e => {
  e.preventDefault();
  handleSearch();
});

handleSearch();