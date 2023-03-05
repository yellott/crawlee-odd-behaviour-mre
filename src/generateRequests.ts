import { RequestOptions } from "crawlee";

const libNames = [
    "React",
    "Vue.js",
    "Angular",
    "jQuery",
    "Lodash",
    "Redux",
    "D3.js",
    "Express",
    "Bootstrap",
    "Ember.js",
    "Backbone.js",
    "Underscore.js",
    "Moment.js",
    "Chart.js",
    "Socket.IO",
    "Three.js",
    "Mocha",
    "Jest",
    "Gulp",
    "Grunt",
];

export function getMissingEntries(names: string[]) {
    return libNames.filter((libName) => {
        return !names.includes(libName);
    });
}

export function createRequest(
    name: string,
    label: string,
    userData: Record<string, any>
): RequestOptions {
    return {
        method: "POST",
        url: `http://localhost:3000/root?name=${name}&key=${label}`,
        headers: {
            "Content-Type": "application/json",
        },
        label,
        useExtendedUniqueKey: true,
        payload: JSON.stringify({ label }),
        userData,
    };
}

export function generateRequests(label: string): RequestOptions[] {
    return libNames.map((name) =>
        createRequest(name, label, { name, developers: [] })
    );
}
