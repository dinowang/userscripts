// ==UserScript==
// @name         Microsoft docuemnts language (zh-tw/en-us) switcher
// @namespace    http://dinowang.net/
// @version      0.1
// @description
// @author       Dino Wang
// @match        https://*.microsoft.com/*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    (function () {
        var langs = ["zh-tw", "zh-cn", "en-us"],
            pathParts = location.pathname.split(/\//g),
            currentLang = pathParts[1];

        var style = document.createElement('style');
        style.type = "text/css";
        style.innerHTML =
            ".msex-container { position: fixed; bottom: 0px; right: 0px; background-color: #333; text-align: center; padding: 0 8px; z-index: 9999; }" +
            ".msex-container a { font-size: 9pt; }" +
            ".msex-container a:not(:last-child):after { content: \"|\"; margin: 0 4px; color: #777; }";
        document.getElementsByTagName('head')[0].appendChild(style);

        if (currentLang && currentLang.match(/^(zh-tw|zh-cn|en-us)/)) {
            var container = document.createElement("div");
            container.className = "msex-container";
            document.body.insertBefore(container, document.body.children[0]);

            var toogleButton = document.querySelector("#language-toggle");
            if (toogleButton != null) {
                var langToggle = document.createElement("a");
                langToggle.href = "#"
                langToggle.innerText = "language toggle";
                langToggle.onclick = _ => toogleButton.click();
                container.appendChild(langToggle);
            }

            langs.forEach(lang => {
                pathParts[1] = lang;
                var a = document.createElement("a");
                a.href = currentLang == lang ? "#" : location.origin + pathParts.join("/");
                a.innerText = lang;
                container.appendChild(a);
            });
        }
    })();
})();
