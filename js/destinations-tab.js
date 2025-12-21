import { getJson, slideInDark, slideInBlur } from "./util.js";

async function loadDestinationData() {
  const json = await getJson;

  const destinations = json.json.destinations;

  return destinations;
}

export async function loadDestinationTabs() {
  const tabDestinations = document.querySelector(".js-destinations-tab");

  if (!tabDestinations) {
    return;
  }

  const destinations = await loadDestinationData();

  let arrayListItem = "";

  destinations.forEach((destination) => {
    const selected =
      tabDestinations.dataset.currentDestination ===
      destination.name.toLowerCase()
        ? "selected"
        : "";

    const html = `
    <li role="tab" aria-selected="false" class="tab-option js-destinations-tab-options name-${destination.name.toLowerCase()} ${selected}" data-destination="${destination.name.toLowerCase()}">
      ${destination.name.toUpperCase()}
    </li>
    `;
    arrayListItem += html;
  });

  tabDestinations.innerHTML = `
  <nav aria-label="tabs menu">
    <ul class="tab-list">
    ${arrayListItem}
    </ul>
  </nav>`;

  const elementListItem = document.querySelectorAll(
    ".js-destinations-tab-options"
  );

  elementListItem.forEach((element) => {
    element.addEventListener("click", function (e) {
      const container = document.querySelector(".js-destinations-tab");
      const namePrevious = container.dataset.currentDestination;
      const elementPrevious = document.querySelector(`.name-${namePrevious}`);

      const element = e.target;
      const name = element.dataset.destination;
      const data = destinations.find(
        (destination) => destination.name.toLowerCase() === name
      );

      element.classList.add("selected");
      container.dataset.currentDestination = name;
      if (elementPrevious.classList.contains("selected")) {
        elementPrevious.classList.remove("selected");
      }

      const object = {
        image: `.${data.images.webp}`,
        text: `
        <h1 class="destination-title">${data.name}</h1>
        <p>${data.description}</p>`,
        specs: `
        <div class="destination-specs-entry">
          <h2>Avg. distance</h2>
          <h3>${data.distance}</h3>
        </div>
        <div class="destination-specs-entry">
          <h2>Est. travel time</h2>
          <h3>${data.travel}</h3>
        </div>
        `,
      };

      loadDestinationDisplay(object);
    });
  });
}

function loadDestinationDisplay(object) {
  const image = document.querySelector(".js-image-destination");
  const text = document.querySelector(".js-destination-text");
  const specs = document.querySelector(".js-destination-specs");

  image.src = object.image;
  text.innerHTML = object.text;
  specs.innerHTML = object.specs;

  slideInDark(image);
  slideInBlur(text);
  slideInBlur(specs);
}
