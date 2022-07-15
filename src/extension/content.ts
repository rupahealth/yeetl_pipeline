const matches = window.location.href.match(
  /^https:\/\/github.com\/([^/]*\/[^/]*)/
);

document.addEventListener("mousemove", generateMenus);

generateMenus();
insertStyle();

const popup: HTMLIFrameElement = insertPopup();

browser.runtime.onMessage.addListener(({ subject, path }: any) => {
  console.log("received message", { subject })

  switch (subject) {
    case "start-recording": {
      console.log("calling startRecording()")
      startRecording()
      break
    }
    case "stop-recording": {
      console.log("calling stopRecording()")
      stopRecording()
      break
    }
    case "toggle-popup": {
      console.log("calling togglePopup()")
      togglePopup()
      break
    }
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


function getElementIndex(element: HTMLTableCellElement): number {
  let index = 0

  for (const child of Array.from(element.parentElement.children)) {
    if (child === element) {
      return index
    }
    index++
  }
}

function getTableBodyContainerSelector(element: HTMLTableCellElement): string {
  const parent = element.parentElement.parentElement
  return getXPath(parent)
}


// https://github.com/thiagodp/get-xpath/blob/master/src/index.ts
function getXPath(el: any): string {
  let nodeElem = el;
  if (nodeElem && nodeElem.id) {
    return "//*[@id=\"" + nodeElem.id + "\"]";
  }
  let parts: string[] = [];
  while (nodeElem && Node.ELEMENT_NODE === nodeElem.nodeType) {
    let nbOfPreviousSiblings = 0;
    let hasNextSiblings = false;
    let sibling = nodeElem.previousSibling;
    while (sibling) {
      if (sibling.nodeType !== Node.DOCUMENT_TYPE_NODE &&
        sibling.nodeName === nodeElem.nodeName) {
        nbOfPreviousSiblings++;
      }
      sibling = sibling.previousSibling;
    }
    sibling = nodeElem.nextSibling;
    while (sibling) {
      if (sibling.nodeName === nodeElem.nodeName) {
        hasNextSiblings = true;
        break;
      }
      sibling = sibling.nextSibling;
    }
    let prefix = nodeElem.prefix ? nodeElem.prefix + ":" : "";
    let nth = nbOfPreviousSiblings || hasNextSiblings
      ? "[" + (nbOfPreviousSiblings + 1) + "]"
      : "";
    parts.push(prefix + nodeElem.localName + nth);
    nodeElem = nodeElem.parentNode;
  }
  return parts.length ? "/" + parts.reverse().join("/") : "";
}


// https://stackoverflow.com/a/28031333
function getXPathForElement(el, xml) {
  var xpath = '';
  var pos, tempitem2;

  while (el !== xml.documentElement) {
    pos = 0;
    tempitem2 = el;
    while (tempitem2) {
      if (tempitem2.nodeType === 1 && tempitem2.nodeName === el.nodeName) { // If it is ELEMENT_NODE of the same name
        pos += 1;
      }
      tempitem2 = tempitem2.previousSibling;
    }

    xpath = "*[name()='" + el.nodeName + "' and namespace-uri()='" + (el.namespaceURI === null ? '' : el.namespaceURI) + "'][" + pos + ']' + '/' + xpath;

    el = el.parentNode;
  }
  xpath = '/*' + "[name()='" + xml.documentElement.nodeName + "' and namespace-uri()='" + (el.namespaceURI === null ? '' : el.namespaceURI) + "']" + '/' + xpath;
  xpath = xpath.replace(/\/$/, '');
  return xpath;
}

document.addEventListener('click', (e) => {
  const recording = document.body.classList.contains("recording")
  if (recording) {
    const target = e.target as HTMLTableCellElement

    if (target.tagName === "TD") {
      const index = getElementIndex(target)
      const selector = getTableBodyContainerSelector(target)
      console.log("Index", index)
      console.log("Table Selector", selector)

      popup.contentWindow.postMessage({ subject: 'recording-result', data: { cell_index: index, parent_selector: selector } }, '*')
    }
  }
})

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
  const matches = document.title.match(/at (\S*)/);

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

function isPopup(): boolean {
  return popup.className === "open";
}

function insertPopup(): HTMLIFrameElement {
  const popup = document.createElement("iframe");
  popup.src = browser.extension.getURL(
    `next/out/index.html`
  );
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
      position: fixed;
      right: 0;
      top: 0;
      z-index: 9999;
      height:0;
      width:0;
    }

    #gh-code-popup.open {
      height: 400px;
      width: 500px;
    }

    body.recording td:hover {
      border: 1px solid red !important;
    }
  `;

  document.head.appendChild(style);
}

function togglePopup() {
  if (popup.classList.contains("open")) {
    popup.classList.remove("open")
  } else {
    popup.classList.add("open")
  }
}

function startRecording() {
  if (!document.body.classList.contains("recording")) {
    document.body.classList.add("recording")
  }
}

function stopRecording() {
  if (document.body.classList.contains("recording")) {
    document.body.classList.remove("recording")
  }
}