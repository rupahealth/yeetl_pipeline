const matches = window.location.href.match(/github.com\/([^/]*\/[^/]*)/);
let popup: HTMLIFrameElement = null;

document.addEventListener("mousemove", generateMenus);

generateMenus();

if (!isFirefox()) {
  insertStyle();
}

browser.runtime.onMessage.addListener(({ subject, path }: any) => {
  switch (subject) {
    case "open-popup": {
      path = path.concat("&from=tab");

      console.log(path);

      if (isPopup()) {
        popup.src = path;
      } else {
        popup = insertPopup(path);
      }

      break;
    }
    case "close-popup": {
      if (isPopup()) {
        removePopup();
      }

      break;
    }
  }
});

document.addEventListener("click", () => {
  if (isPopup()) {
    removePopup();
  }
});

function isFilePage() {
  return Boolean(document.getElementById("blob-path"));
}

function generateMenus(event?: MouseEvent) {
  browser.runtime.sendMessage(generateMessage(event));
}

function getParentRow(child: HTMLElement): HTMLTableRowElement {
  for (const row of document.getElementsByTagName("tr")) {
    if (row.className.match(/js-navigation-item/) && row.contains(child)) {
      return row;
    }
  }
}

function generateMessage(event?: MouseEvent) {
  if (matches) {
    if (event) {
      const node = event.target as HTMLElement;
      const line = node.getAttribute("data-line-number");

      if (isFilePage()) {
        const branch = getBranch();
        let path = window.location.href.split(branch)[1];

        if (line) {
          path = path.concat(`:${line}`);
        }

        return { subject: "gh-code-open-file", path };
      }

      const codeSamplePath = getPathFromCodeSample(node);

      if (codeSamplePath) {
        let path = "/".concat(codeSamplePath);

        if (line) {
          path = path.concat(`:${line}`);
        }

        return { subject: "gh-code-open-file", path };
      }

      const inlineCodePath = getPathFromInlineCode(node);

      if (inlineCodePath) {
        let path = "/".concat(inlineCodePath);

        if (line) {
          path = path.concat(`:${line}`);
        }

        return { subject: "gh-code-open-file", path };
      }

      const row = getParentRow(node);

      if (row && row.innerHTML.match(/class=\"octicon octicon-file\"/)) {
        const path = pathFromFileRow(row);

        return { subject: "gh-code-open-file", path };
      }
    }

    return { subject: "gh-code-open-repo" };
  }

  return { subject: "clear-menus" };
}

function getPathFromInlineCode(element: HTMLElement) {
  for (const code of document.querySelectorAll(".border.rounded-1.my-2")) {
    if (code.contains(element)) {
      const anchor = code.querySelector(".lh-condensed a");

      if (anchor) {
        return anchor.innerHTML
          .split("/")
          .splice(1)
          .join("/");
      }

      break;
    }
  }
}

function getPathFromCodeSample(element: HTMLElement) {
  for (const file of document.getElementsByClassName("file")) {
    if (file.contains(element)) {
      const anchor = file.querySelector(".file-info a");

      if (anchor) {
        return anchor.getAttribute("title");
      }

      break;
    }
  }
}

function getBranch(): string {
  const matches = document.title.match(/at (\w*)/);

  if (matches) {
    return matches[1];
  }

  return "master";
}

function pathFromFileRow(row: HTMLTableRowElement): string {
  const { href } = row.querySelector("a");
  const branch = getBranch();

  return href.split(branch)[1];
}

function removePopup() {
  document.body.removeChild(popup);
  popup = null;
}

function isPopup(): boolean {
  return Boolean(document.getElementById("gh-code-popup"));
}

function insertPopup(path: string): HTMLIFrameElement {
  const popup = document.createElement("iframe");

  popup.src = path;
  popup.id = "gh-code-popup";

  document.body.appendChild(popup);
  return popup;
}

function insertStyle() {
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = `
    #gh-code-popup {
      box-shadow: -3px 5px 15px rgba(0, 0, 0, 0.16), 
                  0 3px 6px rgba(0, 0, 0, 0.23);
      background: white;
      border: none;
      height: 400px;
      position: fixed;
      right: 0;
      top: 0;
      width: 327px;
      z-index: 9999;
    }
  `;

  document.head.appendChild(style);
}

function isFirefox() {
  return navigator.userAgent.indexOf("Firefox/") !== -1;
}
