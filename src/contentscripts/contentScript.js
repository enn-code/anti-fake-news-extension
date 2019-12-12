const hello = "initialising contentscript";
console.log(hello);

// On receiving a message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension",
  );
  if (request.greeting === "hello") {
    sendResponse({ farewell: "goodbye" });
  }
  sendResponse({ text: document.body.innerText });
});

export default hello;
