import { Repo } from "../common/interfaces/repo.interface";

browser.menus.onClicked.addListener(({ menuItemId }, tab) => {
  switch (menuItemId) {
    case "gh-code-open-repo": {
      return openRepo(tab);
    }
  }
});

browser.menus.create({
  id: "gh-code-open-repo",
  contexts: ["all"],
  title: "Open this repo in Code",
  icons: { "16": "../icons/code-logo.png" }
});

function openRepo(tab: browser.tabs.Tab) {
  browser.browserAction.openPopup();

  const map = getOrCreateRepoMap(tab.url);
  console.log(map);
}

function getOrCreateRepoMap(url: string): Repo {
  return {
    url,
    localPath: "/Users/maxchehab/projects/gh-code",
    name: "gh-code"
  };
}
