import { SingletonRouter } from "next/router";
import queryString from "query-string";

export function navigate(
  router: SingletonRouter,
  path: "/" | "/results" | "/editor",
  query?: any
) {
  const { from } = router.query;
  const url = `${path}?from=${from}&${query}`;

  console.log("navigating:", url);

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

    case "/editor": {
      extensionPath = browser.extension.getURL(
        "/next/out/pipeline-editor.html"
      );
      break;
    }
  }

  extensionPath = extensionPath
    .concat("?")
    .concat(queryString.stringify({ from, ...query }));

  router.push(
    { pathname: path, query: { from, ...query } },
    extensionPath.concat()
  );
}
