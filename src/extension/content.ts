import { Pipeline } from "../common/interfaces/pipeline.interface";

const matches = window.location.href.match(
  /^https:\/\/github.com\/([^/]*\/[^/]*)/
);


insertStyle();

const popup: HTMLIFrameElement = insertPopup();

browser.runtime.onMessage.addListener(({ subject, pipeline }: any) => {
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
    case "extract-data": {
      extractData(pipeline)
    }
  }
});

function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function extractData(pipeline: Pipeline) {
  console.log("EXTRACTING PIPELINE DATA", pipeline)


  const data = []

  const table = getElementByXpath(pipeline.table) as HTMLTableElement
  console.log(table)
  for (const row of Array.from(table.children) as HTMLTableRowElement[]) {
    if (row.tagName === "TR") {
      console.log(row)

      const data_row = {}
      for (const transformation of pipeline.transformations) {
        const cell = Array.from(row.children)[transformation.from]
        console.log(cell)
        data_row[transformation.to] = cell.textContent

      }
      data.push(data_row)
    }
  }

  popup.contentWindow.postMessage({ subject: 'extract-result', data }, '*')
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