export const getJson = fetch("../data/data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    return { json: data };
  });

export function slideInDark(element) {
  element.classList.remove("slide-in-dark");
  void element.offsetWidth;
  element.classList.add("slide-in-dark");
}

export function slideInBlur(element) {
  element.classList.remove("slide-in-blur");
  void element.offsetWidth;
  element.classList.add("slide-in-blur");
}
