export function qs(selector, parent = document) {// wrapper for querySelector...returns matching element
  return parent.querySelector(selector);
}
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}
export function renderListWithTemplate(templateFn, parentElement, list, position = 'afterbegin', clear = false) {
  if(clear){
    parentElement.innerHTML = "";
  }

  const htmlStrings = list.map(templateFn);
    
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}
export function alertMessage(message, scroll = true) {
  const main = document.querySelector("main");
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<span>${message}</span><button type="button">&times;</button>`;
  alert.querySelector("button").addEventListener("click", () => alert.remove());
  main.prepend(alert);
  if (scroll) window.scrollTo(0, 0);
}
export async function loadHeaderFooter() {
  const header = await fetch("../partial/header.html").then(res => res.text());
  const footer = await fetch("../partial/footer.html").then(res => res.text());
  document.getElementById("main-header").innerHTML = header;
  document.getElementById("main-footer").innerHTML = footer;
}