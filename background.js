chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function (tab) {
        if (!tab.url.includes("https://www.linkedin.com/mynetwork")) {
            chrome.browserAction.setIcon({path: {19: "./icon_gray_19.png", 38: "./icon_gray_38.png"}})
        } else  chrome.browserAction.setIcon({path: {19: "./icon_19.png", 38: "./icon_38.png"}})
    })
});

chrome.runtime.onMessage.addListener(function(request) {
    console.log(request);
    chrome.browserAction.setIcon(request);
});