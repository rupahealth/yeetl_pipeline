import { SingletonRouter } from "next/router";
import queryString from "query-string";

export function navigate(
  router: SingletonRouter,
  path: "/" | "/results" | "/pipeline-editor" | "/pipeline/new",
  query?: any
) {

  let extensionPath: string = path;

  switch (path) {
    case "/": {
      extensionPath = browser.extension.getURL("/next/out/index.html");
      break;
    }

    case "/results": {
      extensionPath = browser.extension.getURL("/next/out/results.html");
      break;
    }

    case "/pipeline-editor": {
      extensionPath = browser.extension.getURL(
        "/next/out/pipeline-editor.html"
      );
      break;
    }

    case "/pipeline/new": {
      extensionPath = browser.extension.getURL("/next/out/new.html");
      break;
    }
  }

  extensionPath = extensionPath
    .concat("?")
    .concat(queryString.stringify(query));

  console.log(extensionPath)

  router.push(
    { pathname: path, query },
    extensionPath.concat()
  );
}
