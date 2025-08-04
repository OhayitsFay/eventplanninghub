import { loadHeaderFooter } from "./utils.mjs";
import ApiServices from "./ApiServices.mjs";
import VendorDetails from "./VendorDetails.mjs";

loadHeaderFooter();

const dataSource = new ApiServices("vendors");

const targetElement = document.querySelector (".vendor-details");

const vendorList = new VendorDetails("vendors", dataSource, targetElement);
vendorList.init();