import React, { useState } from "react";

const Start = () => {
  const [articleText, setArticleText] = useState({ text: "" });
  const [isLoaded, setIsLoaded] = useState(false);

  const button = document.createElement("button");
  button.addEventListener(
    "click",
    function() {
      console.log("posting message...");
      window.postMessage(
        { type: "FROM_PAGE", text: "Hello from the webpage!" },
        "*",
      );

      chrome.tabs.query({ active: true, currentWindow: true }, function(
        tabs: any,
      ) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            task: "retrieve html body",
          },
          function(msg: any) {
            console.log("result message coming from content script:", msg);
            setArticleText(msg);

            // Get article
            fetch("http://localhost:8080/api/article", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ article: msg }),
            }).then(res => {
              console.log(res);
            });
          },
        );
      });

      setTimeout(() => {
        setIsLoaded(true);
      }, 3000);
    },
    false,
  );
  button.innerText = "TEST";
  document.body.appendChild(button);

  // On receiving a message
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(
      sender.tab
        ? "from a content script:" + sender.tab.url
        : "from the extension",
    );
    if (request.greeting == "hello") {
      sendResponse({ farewell: "goodbye" });
    } else {
      sendResponse({ hi: "hi from contentScript.js" });
    }
  });

  return (
    <div
      style={{
        height: "600px",
        width: "600px",
        background: "black",
        color: "white",
      }}
    >
      Hello world - Start{" "}
      {articleText && isLoaded && (
        <div
          id="rating"
          style={{ width: "100px", height: "100px", background: "yellow" }}
        ></div>
      )}
      <div style={{ overflow: "auto" }}>{articleText && articleText.text}</div>
    </div>
  );
};

export default Start;
