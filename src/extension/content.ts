const matches = window.location.href.match(/github.com\/([^/]*\/[^/]*)/);
let popup: HTMLIFrameElement = null;

if (matches) {
  browser.runtime.sendMessage({ subject: "gh-code-open-repo" });
}

if (!isFirefox()) {
  insertStyle();
}

browser.runtime.onMessage.addListener(({ subject, path }: any) => {
  switch (subject) {
    case "open-popup": {
      path = path.concat("&from=tab");

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

function removePopup() {
  document.body.removeChild(popup);
  popup = null;
}

function isPopup(): boolean {
  return Boolean(document.getElementById("gh-code-popup"));
}

function insertPopup(path: string): HTMLIFrameElement {
  const popup = document.createElement("iframe");
  console.log("-----", path);

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
      height: 402px;
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
