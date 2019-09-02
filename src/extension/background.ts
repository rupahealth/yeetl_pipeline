import { RepoMap } from "../common/interfaces/repo-map.interface";

browser.menus.create({
  id: "gh-code-open",
  contexts: ["all"],
  title: "Open in Code",
  icons: { "16": "../icons/code-logo.png" }
});

browser.menus.onClicked.addListener(({ menuItemId }, tab) => {
  switch (menuItemId) {
    case "gh-code-open": {
      return openInCode(tab);
    }
  }
});

function openInCode(tab: browser.tabs.Tab) {
  browser.browserAction.openPopup();

  const map = getOrCreateRepoMap(tab.url);
  console.log(map);
}

function getOrCreateRepoMap(url: string): RepoMap {
  return {
    url,
    localPath: "/Users/maxchehab/projects/gh-code",
    name: "gh-code"
  };
}
