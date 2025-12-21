import { getJson } from "./util.js";

export function addPaginationFunction(section) {
  const pagination = document.querySelector(section);
  const navPagination = pagination.querySelectorAll(".js-pagination");

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

export async function pagination(paginationType, data) {
  const section = document.querySelector(`.${paginationType}.${data}`);

  if (!section) {
    return;
  }

  const json = await getJson;

  const list = json.json[data];

  const type = paginationType.replace("components-", "");

  let listHtml = "";

  list.forEach((item, index) => {
    listHtml += `<li><a class="li__${type} js-pagination-link ${
      index === 0 ? "pagination--selected" : "" //for now, always set to 0
    }" href="#page${index + 1}" data-index="${item.name.toLowerCase()}">${
      type === "large-pagination" ? index + 1 : ""
    }</a></li>`;
  });

  section.innerHTML = `
  <div class="design-content">
    <div style="column-span: all">
      <nav
        class="js-pagination"
        aria-label="pagination"
        data-pagination="1"
      >
        <ul class="ul__${type}">
          ${listHtml}
        </ul>
      </nav>
    </div>
  </div>
  `;

  addPaginationFunction(`.${paginationType}.${data}`);

  const listPagination = section.querySelectorAll(`.li__${type}`);
  listPagination.forEach((item) => {
    item.addEventListener("click", function () {
      if (data === "crew") {
        displayChangeCrew(item, list);
      }
      if (data === "technology") {
        displayChangeTechnology(item, list);
      }
    });
  });
}

function displayChangeCrew(item, list) {
  const pullData = item.dataset.index;
  const object = list.find((item) => item.name.toLowerCase() === pullData);

  const title = document.querySelector(".crew-title");
  const name = document.querySelector(".crew-name");
  const description = document.querySelector(".crew-text p");
  const image = document.querySelector(".js-image-crew");

  title.textContent = object.role;
  name.textContent = object.name;
  description.textContent = object.bio;
  image.src = `.${object.images.webp}`;
}

function displayChangeTechnology(item, list) {
  const pullData = item.dataset.index;
  const object = list.find((item) => item.name.toLowerCase() === pullData);

  const name = document.querySelector(".js-technology-name");
  const description = document.querySelector(".js-technology-description");
  const image = document.querySelector(".container__image-technology");
  const small = document.querySelector(".js-image-small-technology");
  const large = document.querySelector(".js-image-large-technology");

  name.textContent = object.name;
  description.textContent = object.description;
  small.src = `.${object.images.landscape}`;
  large.srcset = `.${object.images.portrait}`;

  name.classList.remove("slide-in");
  void name.offsetWidth;
  name.classList.add("slide-in");

  description.classList.remove("slide-in");
  void description.offsetWidth;
  description.classList.add("slide-in");

  image.classList.remove("slide-in");
  void image.offsetWidth;
  image.classList.add("slide-in");
}
