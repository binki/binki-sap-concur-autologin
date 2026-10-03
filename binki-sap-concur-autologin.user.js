// ==UserScript==
// @name binki-sap-concur-autologin
// @version 1.0.2
// @homepageURL https://github.com/binki/binki-sap-concur-autologin
// @match https://www.concursolutions.com/*
// @match https://*.concursolutions.com/*
// @require https://github.com/binki/binki-userscript-on-query-selector/raw/40428bc8ee6565ed842302273384a0d42bd73699/binki-userscript-on-query-selector.js
// @require https://github.com/binki/binki-userscript-when-element-query-selector-async/raw/0a9c204bdc304a9e82f1c31d090fdfdf7b554930/binki-userscript-when-element-query-selector-async.js
// @require https://github.com/binki/binki-userscript-when-input-completed/raw/d11bfc5021cb99fd80d5a2d008ffd4c7eabaf554/binki-userscript-when-input-completed.js
// ==/UserScript==

(async () => {
  binkiOnQuerySelector('#username-input', async usernameInput => {
    await whenInputCompletedAsync(usernameInput);
    (await whenElementQuerySelectorAsync(document.body, '#btnSubmit')).click();
  });
})();
(async () => {
  (await whenElementQuerySelectorAsync(document.body, '[data-trans-id="SignIn.G2.signinWithPassword"]')).click();
})();
(async () => {
  await whenInputCompletedAsync(await whenElementQuerySelectorAsync(document.body, '#password'));
  (await whenElementQuerySelectorAsync(document.body, '[data-trans-id="Common.Next"]')).click();
})();
(async () => {
  // We are going to assume that we don’t know the length of the authcode. If the user pastes it,
  // this will properly detect that. Otherwise, just let the user manually click Sign In on this one.
  await whenInputCompletedAsync(await whenElementQuerySelectorAsync(document.body, '#authcode'));
  (await whenElementQuerySelectorAsync(document.body, '[data-trans-id="SignIn.Header"]')).click();
})();
