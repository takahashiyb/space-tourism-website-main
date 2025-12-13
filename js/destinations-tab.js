import { getJson } from "./util.js";

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
    const html = `
    <li role="tab" aria-selected="false" class="tab-option js-destinations-tab-options" data-destination="${destination.name.toLowerCase()}">
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
}
