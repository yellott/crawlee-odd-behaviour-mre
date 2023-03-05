import { Actor, log } from "apify";

import { Dataset, HttpCrawler } from "crawlee";
import { generateRequests, getMissingEntries } from "./generateRequests.js";
import { headerGeneratorPreNavigationHook } from "./headerGeneratorPreNavigationHook.js";
import { RequestLabel } from "./RequestLabel.js";
import { getHttpRouter } from "./routes.js";

log.setLevel(log.LEVELS.DEBUG);

await Actor.init();

const crawler = new HttpCrawler({
    requestHandler: getHttpRouter(),
    failedRequestHandler: ({ request }) => {
        log.error("Failed request", { url: request.url });
    },
    additionalMimeTypes: ["application/json"],
    preNavigationHooks: [headerGeneratorPreNavigationHook],
    /* Uncomment line below and saving data works as expected */
    /* maxConcurrency: 1 */
});

await crawler.run(generateRequests(RequestLabel.STEP_ONE));


const data = await Dataset.getData();
const names = data.items.map((item) => item.name);
const missing = getMissingEntries(names);

log.error("Missing entries", missing);

await Actor.exit();
