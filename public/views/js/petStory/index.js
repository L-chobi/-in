import { mainTag } from "./main.js";
import { postBody } from "./postBody.js";
import { comments } from "./comments.js";
import { commentInput } from "./commentInput.js";
import { articleBottomBtns } from "./articleBottomBtns.js";
import { checkLoginUser } from "./checkLoginUser.js";
import { getPetStoryDetail } from "./api.js";
import {
  handlePostComment,
  clickCommentToolBox,
  handleRePostComment,
  showHiddenBox,
} from "./handleComment.js";

const run = () => {
  window.addEventListener("DOMContentLoaded", async () => {
    let data = await getPetStoryDetail(location.pathname.split("/")[2]);
    let checkLogin = await checkLoginUser();
    let isNotLogin = Object.keys(checkLogin).length === 0;
    let loginInfo = checkLogin;

    mainTag();
    postBody(data);
    comments(data.comments);
    commentInput(isNotLogin);
    articleBottomBtns(data);

    showHiddenBox(loginInfo, isNotLogin);
    handlePostComment();
    handleRePostComment();
    clickCommentToolBox();
  });
};

run();
