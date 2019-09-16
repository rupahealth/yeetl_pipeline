const matches = window.location.href.match(/github.com\/([^/]*\/[^/]*)/);
if (matches) {
    browser.runtime.sendMessage({ subject: "gh-code-open-repo" });
}
//# sourceMappingURL=content.js.map