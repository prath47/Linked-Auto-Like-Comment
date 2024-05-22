var btn = document.querySelector(".btn");

let likeInput = document.querySelector("#likeInput");
let CommentInput = document.querySelector("#commentInput");

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  let len = Math.max(likeInput.value, CommentInput.value);
  //   alert("Button clicked");
  if (likeInput.value === "" || CommentInput.value === "") {
    alert("Please fill in the required fields");
    return;
  }

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  // chrome.tabs.update(tab.id, { url: "https://www.linkedin.com/feed/" });

  console.log(likeInput.value, CommentInput.value);

  await chrome.scripting
    .executeScript({
      target: { tabId: tab.id },
      func: temp,
      args: [len],
    })
    .then(() => console.log("script1 injected"));

  await chrome.scripting
    .executeScript({
      target: { tabId: tab.id },
      func: clickLikebtn,
      args: [likeInput.value],
    })
    .then(() => console.log("script2 injected"));

  await chrome.scripting
    .executeScript({
      target: { tabId: tab.id },
      func: commentFunction,
      args: [CommentInput.value],
    })
    .then(() => console.log("script3 injected"));

  await chrome.scripting
    .executeScript({
      target: { tabId: tab.id },
      func: clickFunction,
      args: [CommentInput.value],
    })
    .then(() => console.log("script3 injected"));
});

// function hello() {
//   console.log("hello");
// }

async function temp(len) {
  console.log("max len " + len);

  let myinterval = setInterval(() => {
    window.scrollBy(0, 1000);
    console.log(len);
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
  }, 2000);
}

async function clickLikebtn(len) {
  let cnt = 0;
  let clickLike = setInterval(() => {
    document
      .querySelectorAll(
        ".artdeco-button__text.react-button__text.social-action-button__text"
      )
      .forEach((btn) => {
        if (cnt >= len) {
          clearInterval(clickLike);
          return;
        }
        if (btn.innerText === "Like") {
          console.log("clicked " + cnt);
          btn.click();
          cnt++;
        }
      });

    if (cnt >= len) {
      clearInterval(clickLike);
      return;
    }
  }, 3000);
}

async function commentFunction(len) {
  let cnt = 0;
  console.log("totol comment length " + len);
  let comment = setInterval(() => {
    if (
      document.getElementsByClassName(
        "artdeco-button artdeco-button--muted artdeco-button--4 artdeco-button--tertiary ember-view social-actions-button comment-button flex-wrap "
      ).length < len
    ) {
      return;
    } else {
      Array.from(
        document.getElementsByClassName(
          "artdeco-button artdeco-button--muted artdeco-button--4 artdeco-button--tertiary ember-view social-actions-button comment-button flex-wrap "
        )
      ).forEach((btn) => {
        if (cnt >= len) {
          clearInterval(comment);
          return;
        }
        btn.click();
        setTimeout(() => {}, 2000);
        let commentInputBox = document.querySelectorAll(
          "div[aria-label='Text editor for creating content'] p"
        );

        if (commentInputBox.length < cnt) {
          return;
        } else {
          commentInputBox[cnt].innerText = "Nice Post";
          cnt++;
        }
      });

      if (cnt >= len) {
        clearInterval(comment);
        return;
      }
    }
  }, 3000);
}

async function clickFunction(len) {
  let cnt = 0;

  let click = setInterval(() => {
    Array.from(
      document.getElementsByClassName(
        "comments-comment-box__submit-button mt3 artdeco-button artdeco-button--1 artdeco-button--primary ember-view"
      )
    ).forEach((btn) => {
      if (cnt >= len) {
        clearInterval(comment);
        return;
      }
      console.log("commented " + cnt);
      btn.click();
      cnt++;
    });

    if (cnt >= len) {
      console.log("comments Completed" + cnt);
      clearInterval(click);
      return;
    }
  }, 3000);
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
