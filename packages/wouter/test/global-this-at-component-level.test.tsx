/**
 * @vitest-environment node
 */

import { test, expect, describe } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import {
  useSearch,
  usePathname,
  useBrowserLocation,
} from "wouter/use-browser-location";

describe("useSearch", () => {
  test("works in node", () => {
    const App = () => {
      const search = useSearch({ ssrSearch: "?foo=1" });
      return <>{search}</>;
    };

    const rendered = renderToStaticMarkup(<App />);
    expect(rendered).toBe("?foo=1");
  });

  test("works in node without options", () => {
    const App = () => {
      const search = useSearch();
      return <>search: {search}</>;
    };

    const rendered = renderToStaticMarkup(<App />);
    expect(rendered).toBe("search: ");
  });
});

test("usePathname works in node", () => {
  const App = () => {
    const path = usePathname({ ssrPath: "hello-from-server" });
    return <>{path}</>;
  };

  const rendered = renderToStaticMarkup(<App />);
  expect(rendered).toBe("hello-from-server");
});

test("useBrowserLocation works in node", () => {
  const App = () => {
    const [location] = useBrowserLocation({ ssrPath: "hello-from-server" });
    return <>{location}</>;
  };

  const rendered = renderToStaticMarkup(<App />);
  expect(rendered).toBe("hello-from-server");
});
