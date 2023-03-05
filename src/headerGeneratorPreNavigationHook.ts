import { InternalHttpHook } from "crawlee";

export const headerGeneratorPreNavigationHook: InternalHttpHook<any> = async (
    crawlingContext,
    gotOptions
): Promise<void> => {
    gotOptions.sessionToken = crawlingContext.session;
    gotOptions.useHeaderGenerator = true;
    gotOptions.headerGeneratorOptions = {
        browserListQuery: "> 0.5%, last 4 versions, Firefox ESR, not dead",
        devices: ["desktop"],
        locales: ["en-US", "en"],
        operatingSystems: ["windows", "linux", "macos"],
    };
};