export function addPaginationFunction() {
  const navPagination = document.querySelectorAll(".js-pagination");

  let navPaginationList = [];

  navPagination.forEach((nav) => {
    const list = nav.querySelectorAll(".js-pagination-link");

    navPaginationList.push({ nav: nav, list: list });
  });

  navPaginationList.forEach((nav) => {
    const list = nav.list;

    list.forEach((link) => {
      link.addEventListener("click", function () {
        nav.list.forEach((element) => {
          element.classList.remove("pagination--selected");
          element.setAttribute("aria-selected", "false");
        });
        this.classList.add("pagination--selected");
        this.setAttribute("aria-selected", "true");
      });
    });
  });
}
