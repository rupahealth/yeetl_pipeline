import { Data } from "../common/interfaces/data.interface";

const DEFAULT_DATA = {
  data: {
    repos: {}
  }
};

let DATA = DEFAULT_DATA.data as Data;

let contextMenuShown = false;

if (isFirefox()) {
  browser.contextMenus.onShown.addListener(() => {
    contextMenuShown = true;
  });

  browser.contextMenus.onHidden.addListener(() => {
    contextMenuShown = false;
  });
}

browser.storage.onChanged.addListener(loadData);

loadData();

browser.runtime.onMessage.addListener(async ({ subject, path }: any) => {
  switch (subject) {
    case "gh-code-open-repo": {
      createContextMenu(
        "gh-code-open-repo",
        "Open in Code",
        (_info: any, tab: browser.tabs.Tab) => openRepo(tab)
      );

      break;
    }

    case "gh-code-open-file": {
      createContextMenu(
        "gh-code-open-file",
        "Open file in Code",
        (_info: any, tab: browser.tabs.Tab) => openFile(tab, path)
      );

      break;
    }

    case "clear-menus": {
      await browser.contextMenus.removeAll();
      break;
    }

    case "close-popup": {
      const tabs = await browser.tabs.query({});
      tabs.forEach(({ id }) => browser.tabs.sendMessage(id, { subject }));
      break;
    }

    case "open-path": {
      openPath(path);
      break;
    }
  }
});

async function openPath(path: string) {
  console.log("opening", path);

  if (isFirefox()) {
    window.location.href = path;
  } else {
    const tab = (await browser.tabs.query({})).find(({ active }) => active);

    browser.tabs.executeScript(tab.id, {
      code: `window.location.href = "${path}";`
    });
  }
}

async function openRepo(tab: browser.tabs.Tab) {
  const repo = getCurrentRepo(tab);

  if (repo) {
    const path = `vscode://file${repo.localPath}`;
    openPath(path);
  } else {
    openPopup({ intent: "create-repo", name }, tab);
  }
}

async function openFile(tab: browser.tabs.Tab, filePath: string) {
  const repo = getCurrentRepo(tab);

  if (repo) {
    const path = `vscode://file${repo.localPath}${filePath}`;
    openPath(path);
  }
}

async function createContextMenu(
  id: string,
  title: string,
  onclick: (_info: any, tab: browser.tabs.Tab) => void
) {
  if (contextMenuShown) {
    return;
  }

  await browser.contextMenus.removeAll();

  const options = {
    id,
    contexts: ["all" as browser.contextMenus.ContextType],
    title,
    icons: { "16": "../icons/code-logo.png" },
    documentUrlPatterns: [`*://*.github.com/*`],
    onclick
  };

  if (chrome) {
    delete options.icons;
  }

  browser.contextMenus.create(options);
}

function getCurrentRepo(tab: browser.tabs.Tab) {
  const { repos } = DATA;
  const matches = tab.url.match(/github.com\/([^/]*\/[^/]*)/);
  const name = matches[1];

  return Object.entries(repos)
    .map(([_key, repo]) => repo)
    .find(repo => repo.name === name);
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
