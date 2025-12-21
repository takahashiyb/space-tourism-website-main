import { pagination } from "./pagination.js";
import { loadDestinationTabs } from "./destinations-tab.js";
import { functionHamburger } from "./navigation.js";

loadDestinationTabs();
pagination("components-small-pagination", "crew");
pagination("components-large-pagination", "technology");
functionHamburger();
