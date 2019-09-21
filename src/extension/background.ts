import { Data } from "../common/interfaces/data.interface";

const DEFAULT_DATA = {
  data: {
    repos: {}
  }
};

let DATA = DEFAULT_DATA.data as Data;

browser.runtime.onMessage.addListener(async ({ subject }: any) => {
  console.log({ subject });
  switch (subject) {
    case "gh-code-open-repo": {
      console.log("creating context menu");

      const options = {
        id: "gh-code-open-repo",
        contexts: ["all" as browser.contextMenus.ContextType],
        title: "Open in Code",
        icons: { "16": "../icons/code-logo.png" },
        documentUrlPatterns: [`*://*.github.com/*`]
      };

      if (chrome) {
        delete options.icons;
      }

      browser.contextMenus.create(options);
      break;
    }
    case "close-popup": {
      const tabs = await browser.tabs.query({});
      tabs.forEach(({ id }) => browser.tabs.sendMessage(id, { subject }));
    }
  }
});

browser.contextMenus.onClicked.addListener(({ menuItemId }, tab) => {
  switch (menuItemId) {
    case "gh-code-open-repo": {
      openRepo(tab);
      break;
    }
  }
});

browser.browserAction.onClicked.addListener(function(tab) {
  browser.windows.create({
    url: browser.runtime.getURL("dist/next/out/index.html"),
    type: "popup",
    height: 600,
    width: 1300
  });
});

browser.storage.onChanged.addListener(loadData);

loadData();

async function openRepo(tab: browser.tabs.Tab) {
  const { repos } = DATA;
  const matches = tab.url.match(/github.com\/([^/]*\/[^/]*)/);

  if (matches) {
    const name = matches[1];
    const repo = Object.entries(repos)
      .map(([_key, repo]) => repo)
      .find(repo => repo.name === name);

    if (repo) {
      const path = `vscode://file${repo.localPath}`;

      if (isFirefox()) {
        window.location.href = path;
      } else {
        browser.tabs.create({ url: path });
      }
    } else {
      openPopup({ intent: "create-repo", name }, tab);
    }
  }
}

function queryString(data: { [key: string]: string }): string {
  let query = ``;

  Object.entries(data).forEach(([key, value], index) => {
    const op = index === 0 ? "?" : "&";
    query = query.concat(`${op}${key}=${value}`);
  });

  return query;
}

function openPopup(data: any, tab: browser.tabs.Tab) {
  const path = browser.extension.getURL("next/out/index.html");
  const query = queryString(data);
  const popup = encodeURI(`${path}${query}`);

  if (isFirefox()) {
    browser.browserAction.setPopup({ tabId: tab.id, popup });
    browser.browserAction.openPopup();
    browser.browserAction.setPopup({ tabId: tab.id, popup: path });
  } else {
    browser.tabs.sendMessage(tab.id, { subject: "open-popup", path: popup });
  }
}

async function loadData() {
  const { data } = ((await browser.storage.local.get("data")) as unknown) as {
    data: Data;
  };

  if (!data) {
    return browser.storage.local.set(DEFAULT_DATA);
  }

  DATA = data;
}

function isFirefox() {
  return navigator.userAgent.indexOf("Firefox/") !== -1;
}
