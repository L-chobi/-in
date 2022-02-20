import { myComments } from "./myComments.js";
import { myPage } from "./myPage.js";
import { changeName } from "./userChange.js";
import { myPosts } from "./myPosts.js";

const run = () => {
  window.addEventListener("DOMContentLoaded", () => {
    myPage();
    changeName();
    myPosts();
    myComments();
  });
};

run();
