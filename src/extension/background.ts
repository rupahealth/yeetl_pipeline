import { Data } from "../common/interfaces/data.interface";

const DEFAULT_DATA = {
  data: {
    pipelines: []
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

browser.commands.onCommand.addListener(async (command: string) => {
  switch (command) {
    case "toggle-popup":
      // togglePopup()
      break
  }
});

function openPopup(data: any, tab: browser.tabs.Tab) {
  const path = browser.extension.getURL("next/out/index.html");
  const popup = encodeURI(`${path}`);

  if (isFirefox()) {
    browser.browserAction.setPopup({ tabId: tab.id, popup });
    browser.browserAction.openPopup().catch(() =>
      browser.tabs.sendMessage(tab.id, {
        subject: "open-popup",
        path: popup
      })
    );
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
