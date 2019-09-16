var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const DEFAULT_DATA = {
    data: {
        repos: {}
    }
};
let DATA = DEFAULT_DATA.data;
browser.runtime.onMessage.addListener(({ subject }) => {
    if (subject === "gh-code-open-repo") {
        console.log("creating context menu");
        browser.menus.create({
            id: "gh-code-open-repo",
            contexts: ["all"],
            title: "Open in Code",
            icons: { "16": "../icons/code-logo.png" },
            documentUrlPatterns: [`*://*.github.com/*`]
        });
    }
});
browser.menus.onClicked.addListener(({ menuItemId }, tab) => {
    switch (menuItemId) {
        case "gh-code-open-repo": {
            openRepo(tab);
        }
    }
});
browser.browserAction.onClicked.addListener(function (tab) {
    browser.windows.create({
        url: browser.runtime.getURL("dist/next/out/index.html"),
        type: "popup",
        height: 600,
        width: 1300
    });
});
browser.storage.onChanged.addListener(loadData);
loadData();
function openRepo(tab) {
    const { repos } = DATA;
    const matches = tab.url.match(/github.com\/([^/]*\/[^/]*)/);
    if (matches) {
        const name = matches[1];
        const repo = Object.entries(repos)
            .map(([_key, repo]) => repo)
            .find(repo => repo.name === name);
        if (repo) {
            window.location.href = `vscode://file${repo.localPath}`;
        }
        else {
            openPopup({ intent: "create-repo", name }, tab);
        }
    }
}
function queryString(data) {
    let query = ``;
    Object.entries(data).forEach(([key, value], index) => {
        const op = index === 0 ? "?" : "&";
        query = query.concat(`${op}${key}=${value}`);
    });
    return query;
}
function openPopup(data, tab) {
    const path = browser.extension.getURL("next/out/index.html");
    const query = queryString(data);
    const popup = encodeURI(`${path}${query}`);
    browser.browserAction.setPopup({ tabId: tab.id, popup });
    browser.browserAction.openPopup();
    browser.browserAction.setPopup({ tabId: tab.id, popup: path });
}
function loadData() {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = (yield browser.storage.local.get("data"));
        if (!data) {
            return browser.storage.local.set(DEFAULT_DATA);
        }
        DATA = data;
    });
}
//# sourceMappingURL=background.js.map