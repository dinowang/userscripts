// ==UserScript==
// @name         Search engine (google | bing | duckduckgo) switcher
// @namespace    http://dinowang.net/
// @version      0.1
// @description
// @author       Dino Wang
// @match        https://*.google.com/search*
// @match        https://*.google.com.tw/search*
// @match        https://*.bing.com/search*
// @match        https://duckduckgo.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    (function () {

        var engines = [
                { "name": "Google", "url": "https://google.com/search" },
                { "name": "Bing", "url": "https://bing.com/search" },
                { "name": "DuckDuckGo", "url": "https://duckduckgo.com/" }
            ],
            searches = location.search.replace(/^\?/, "").split(/&/g),
            queries = {};

        for (var i = 0; i < searches.length; i++) {
           var parts = searches[i].split(/=/);
           queries[parts[0]] = decodeURI(parts[1]);
        }

        console.log(queries);

        var style = document.createElement('style');
        style.type = "text/css";
        style.innerHTML = ".msex-container { position: fixed; bottom: 0px; right: 0px; background-color: #aaa; text-align: center; padding: 3px 8px; z-index: 9999; }" +
                          ".msex-container a { font-size: 9pt; color: #333; }" +
                          ".msex-container a:not(:last-child):after { content: \"|\"; margin: 0 4px; color: #333; }";
        document.getElementsByTagName('head')[0].appendChild(style);

        var container = document.createElement("div");
        container.className = "msex-container";
        document.body.insertBefore(container, document.body.children[0]);

        engines.forEach(engine => {
            var a = document.createElement("a");
            a.href = engine.url + "?q=" + queries["q"];
            a.innerText = engine.name;
            container.appendChild(a);
        });
    })();
})();