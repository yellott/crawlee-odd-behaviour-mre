import { Dataset, createHttpRouter } from "crawlee";
import { createRequest } from "./generateRequests.js";
import { RequestLabel } from "./RequestLabel.js";

export function getHttpRouter() {
    const router = createHttpRouter();

    router.addHandler(
        RequestLabel.STEP_ONE,
        async ({ request: { userData, loadedUrl }, log, crawler, json }) => {
            log.info(RequestLabel.STEP_ONE, { url: loadedUrl });
            await crawler.addRequests([
                createRequest(userData.name, RequestLabel.STEP_TWO, {
                    ...userData,
                    developers: [...userData.developers, ...json],
                }),
            ]);
        }
    );

    router.addHandler(
        RequestLabel.STEP_TWO,
        async ({ request: { userData, loadedUrl }, log, crawler, json }) => {
            log.info(RequestLabel.STEP_TWO, { url: loadedUrl });
            await crawler.addRequests([
                createRequest(userData.name, RequestLabel.STEP_THREE, {
                    ...userData,
                    developers: [...userData.developers, ...json],
                }),
            ]);
        }
    );

    router.addHandler(
        RequestLabel.STEP_THREE,
        async ({ request: { userData, loadedUrl }, log, json }) => {
            log.info(RequestLabel.STEP_THREE, { url: loadedUrl });
            await Dataset.pushData({
                url: loadedUrl,
                name: userData.name,
                title: RequestLabel.STEP_THREE,
                developers: [...userData.developers, ...json],
            });
        }
    );

    return router;
}
