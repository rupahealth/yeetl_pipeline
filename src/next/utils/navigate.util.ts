import { SingletonRouter } from "next/router";
import queryString from "query-string";

export function navigate(
  router: SingletonRouter,
  path: "/settings" | "/details" | "/",
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

    case "/details": {
      extensionPath = browser.extension.getURL("/next/out/details.html");
      break;
    }

    case "/settings": {
      extensionPath = browser.extension.getURL("/next/out/settings.html");
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
