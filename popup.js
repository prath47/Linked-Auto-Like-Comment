var btn = document.querySelector(".btn");

let likeInput = document.querySelector("#likeInput");
let CommentInput = document.querySelector("#commentInput");
let len = Math.max(likeInput.value, CommentInput.value);

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  //   alert("Button clicked");
  if (likeInput.value === "" || CommentInput.value === "") {
    alert("Please fill in the required fields");
    return;
  }

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  // chrome.tabs.update(tab.id, { url: "https://www.linkedin.com/feed/" });

  console.log(likeInput.value, CommentInput.value);

  chrome.scripting
    .executeScript({
      target: { tabId: tab.id },
      func: temp,
      args: [len],
    })
    .then(() => console.log("script injected"));

  // chrome.runtime.reload();
});

function hello() {
  console.log("hello");
}
async function temp() {
  console.log("hello");
  document.querySelectorAll(
    ".artdeco-button.artdeco-button--muted.artdeco-button--4.artdeco-button--tertiary.ember-view.social-actions-button.react-button__trigger"
  );

  console.log(
    document.querySelectorAll(
      ".artdeco-button.artdeco-button--muted.artdeco-button--4.artdeco-button--tertiary.ember-view.social-actions-button.react-button__trigger"
    )
  );

  let myinterval = setInterval(() => {
    window.scrollBy(0, 1000);
    console.log(len)
    console.log(
      document.querySelectorAll(
        ".artdeco-button.artdeco-button--muted.artdeco-button--4.artdeco-button--tertiary.ember-view.social-actions-button.react-button__trigger"
      ).length
    );
    if (
      document.querySelectorAll(
        ".artdeco-button.artdeco-button--muted.artdeco-button--4.artdeco-button--tertiary.ember-view.social-actions-button.react-button__trigger"
      ).length >= len
    )
      clearInterval(myinterval);
    console.log(
      document.querySelectorAll(
        ".artdeco-button.artdeco-button--muted.artdeco-button--4.artdeco-button--tertiary.ember-view.social-actions-button.react-button__trigger"
      )
    );
  }, 2000);
}
// while (
//   document.querySelectorAll(
//     ".artdeco-button.artdeco-button--muted.artdeco-button--4.artdeco-button--tertiary.ember-view.social-actions-button.react-button__trigger"
//   ).length < 10
// ) {
//   window.scrollBy(0, 1000);
//   console.log(
//     document.querySelectorAll(
//       ".artdeco-button.artdeco-button--muted.artdeco-button--4.artdeco-button--tertiary.ember-view.social-actions-button.react-button__trigger"
//     ).length
//   );
// }

// setTimeout(() => {
//   return;
// }, 30000);
// setInterval(() => {
//   console.log("hello");
//   let likebtn = document.querySelectorAll(
//     ".artdeco-button__text.react-button__text.social-action-button__text"
//   );

//   console.log(likebtn);
//   console.log(likebtn.length);
//   likebtn.forEach((btn) => {
//     if (btn.innerText === "Like") {
//       btn.click();
//     }
//   });
// }, 15000);

// setInterval(() => {
//   console.log("hello");
//   let likebtn = document.querySelectorAll(
//     ".artdeco-button.artdeco-button--muted.artdeco-button--4.artdeco-button--tertiary.ember-view.social-actions-button.react-button__trigger"
//   );

//   console.log(likebtn);
//   console.log(likebtn.length);
//   // likebtn.forEach((btn) => {
//   //   if (btn.innerText === "Like") {
//   //     btn.click();
//   //   }
//   // });
// }, 5000);
