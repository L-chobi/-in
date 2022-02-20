const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");

// 라우터 목록
const indexRouter = require("./routes/indexRouter");
const userRouter = require("./routes/userRouter");
const myPetBoard = require("./routes/postRouter/myPetBoardRouter/myPetBoardIndex");
const lostPetsRouter = require("./routes/postRouter/lostPetsRouter/lostPetsIndex");
const myPageRouter = require("./routes/myPageRouter");
const myInfoModifyRouter = require("./routes/myPageRouter/modifyInfo");
const loginRouter = require("./routes/loginRouter");
const kakaoRouter = require("./routes/loginRouter/kakaoRouter");
const kakaoCallbackRouter = require("./routes/loginRouter/kakaoCallbackRouter");
const apiRouter = require("./routes/apiRouter");

const app = express();
// view 경로 설정
app.set("views", `${__dirname}/views`);
app.use(express.static("src"));

// 화면 구성 엔진을 ejs로 설정
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

// 세션 사용
app.use(
  session({
    secret: "ras",
    resave: true,
    secure: false,
    saveUninitialized: false,
  })
);

app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 라우터 추가하기

app.use("/", indexRouter);
app.use("/users", userRouter);

app.use("/myPetBoard", myPetBoard); // 근황게시판
app.use("/lostPets", lostPetsRouter); // 보호게시판(여기 수정 필요)
app.use("/myPage", myPageRouter); // 마이페이지
app.use("/myPage/modify", myInfoModifyRouter); // 내 정보변경 페이지
app.use("/api", apiRouter); // 댓글 전송, 수정, 삭제, like 전송 등
app.use("/login", loginRouter); //로그인 페이지로 이동
app.use("/auth/kakao", kakaoRouter);
app.use("/auth/kakao/callback", kakaoCallbackRouter);

module.exports = app;
