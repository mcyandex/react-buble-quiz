import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MDBTypography,
  MDBCard,
  MDBCardHeader,
  MDBCardFooter,
  MDBRadio,
  MDBSpinner,
} from "mdb-react-ui-kit";

import { GetRandomChapter, GetBooks } from "../../libs/axios";
import getRandomNumber from "../../libs/getRandomNumber";
import BooksData from "../../consts/BooksData.json";

import "./styles.css";
import { styled } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slider,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import TelegramIcon from "@mui/icons-material/Telegram";
import NextPlanIcon from "@mui/icons-material/NextPlan";
import CancelIcon from "@mui/icons-material/Cancel";
import { getChapterCounts, getVerseCounts } from "../../libs/getItemCount";

let bookRange = [];
let bookId, chapterRange, chapterId, verseId;

const PROBLEM_NUM = 10;

export default function Main() {
  const { lang, section } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isSummaryLoading, setIsSummaryLoading] = useState(true);
  const [cardLoading, setCardLoading] = useState(false);

  const [visibleModal, setVisibleModal] = useState(false);
  const [modalSection, setModalSection] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalColor, setModalColor] = useState("");

  const [randomVerse, setRandomVerse] = useState([]);

  const [bookOptions, setBookOptions] = useState([]);
  const [chapterOptions, setChapterOptions] = useState([]);
  const [verseOptions, setVerseOptions] = useState([]);

  const [totalPoints, setTotalPoints] = useState(0);

  const [questionNumber, setQuestionNumber] = useState(1);
  const [answerStatus, setAnswerStatus] = useState(0); // 0: pending, 1: success, 2: failded
  const [questionType, setQuestionType] = useState(0); // 0: book, 1: chapter, 2: verse

  const [selectedOption, setSelectedOption] = useState("");

  const [messages, setMessages] = useState("");

  const [quizInfo, setQuizInfo] = useState({
    success: "",
    error: "",
    ans: {},
  });

  const [quizArray, setQuizArray] = useState([]);

  const handleNewModal = (section, color, title) => {
    if (section === "summary") return;
    setModalColor(color);
    setModalTitle(title);
    setModalSection(section);
    setVisibleModal(true);
  };

  const getScoreMessage = (score) => {
    let message = "";
    switch (score) {
      case 0:
        message = (
          <div>
            <div className="font-bold inline">Total score: {score}</div> - Maybe
            just a little more study to get you off the mark!
          </div>
        );
        break;
      case 1:
        message = (
          <div>
            <div className="font-bold inline">Total score: {score}</div> -
            You're off the mark, nice job!
          </div>
        );
        break;
      case 2:
        message = (
          <div>
            <div className="font-bold inline">Total score: {score}</div> - 2's
            no fluke, keep'em coming
          </div>
        );
        break;
      case 3:
        message = (
          <div>
            <div className="font-bold inline">Total score: {score}</div> - Yes,
            yes, some more studying to take you higher
          </div>
        );
        break;
      case 4:
        message = (
          <div>
            <div className="font-bold inline">Total score: {score}</div> -
            You're getting the hang of it
          </div>
        );
        break;
      case 5:
        message = (
          <div>
            <div className="font-bold inline">Total score: {score}</div> - oh on
            FIRE!
          </div>
        );
        break;
      case 6:
        message = (
          <div>
            <div className="font-bold inline">Total score: {score}</div> - This
            is incredible...!
          </div>
        );
        break;
      default:
        message = (
          <div>
            <div className="font-bold inline">Total score: {score}</div> -
            You're invincible! A true Bible Verse Master!
          </div>
        );
        break;
    }
    setMessages(message);
    return message;
  };

  const getQuestion = async () => {
    if (questionNumber > PROBLEM_NUM) return;
    setIsLoading(true);
    bookRange = section.split("-").map((one) => +one);

    const allBooksSection = await GetBooks(lang);
    const booksOfSection = allBooksSection.filter(
      (one) => one.bookid >= bookRange[0] && one.bookid <= bookRange[1]
    );
    let books = [];
    books = booksOfSection.sort((a, b) => 0.5 - Math.random());
    while (books[0].chapter < 4)
      books = booksOfSection.sort((a, b) => 0.5 - Math.random());
    bookId = books[0].bookid;

    let bookAns = books[0];

    let versionRange = localStorage
      .getItem("section-num")
      .split("-")
      .map((one) => +one);
    let booksNum = getRandomNumber(versionRange[0], versionRange[1]);
    setBookOptions(
      books.slice(0, booksNum).sort((a, b) => a.bookid - b.bookid)
    );

    chapterRange = BooksData.find((one) => one.bookid == bookId).chapters;
    let chapters = [...new Array(chapterRange)]
      .map((_, i) => i + 1)
      .sort((a, b) => 0.5 - Math.random());
    chapterId = chapters[0];
    setChapterOptions(
      chapters.slice(0, getChapterCounts(chapterRange)).sort((a, b) => a - b)
    );

    let randomChapterVerses;

    do {
      randomChapterVerses = await GetRandomChapter(lang, bookId, chapterId);
      randomChapterVerses.sort((a, b) => 0.5 - Math.random());
    } while (randomChapterVerses[0].text.length < 4);
    
    setRandomVerse(randomChapterVerses[0]);
    verseId = randomChapterVerses[0].verse;
    setQuizInfo({
      success: "",
      error: "",
      ans: { ...randomChapterVerses[0], chapter: chapterId, book: bookAns },
    });
    setVerseOptions(
      randomChapterVerses
        .slice(0, getVerseCounts(randomChapterVerses.length))
        .sort((a, b) => a.verse - b.verse)
    );
    setTimeout(() => {
      setIsLoading(false);
    }, 900);
  };

  const handleSubmitAnswer = async () => {
    if (questionNumber > PROBLEM_NUM) return;
    if (!selectedOption) {
      handleNewModal("WARNING", "warning", "Select the option!");
      return;
    }
    if (questionType == 0) {
      let selectedBook = await bookOptions.find(
        (item) => item.bookid === selectedOption
      ).name;
      if (selectedOption == bookId) {
        setQuestionType(1);
        setSelectedOption("");
        setCardLoading(true);
        setQuizInfo({
          ...quizInfo,
          success: selectedBook,
        });

        setTimeout(() => {
          setCardLoading(false);
        }, 1000);
      } else {
        setQuizInfo({
          ...quizInfo,
          error: selectedBook,
        });
        setAnswerStatus(2);
        // if (questionNumber >= PROBLEM_NUM) {
        //   handleNewModal("summary", "info", getScoreMessage(totalPoints));
        //   return;
        // }
      }
    } else if (questionType == 1) {
      if (selectedOption == chapterId) {
        setQuizInfo({
          ...quizInfo,
          success: `${quizInfo.success} Chapter ${selectedOption}`,
        });
        setQuestionType(2);
        setSelectedOption("");
        setCardLoading(true);

        handleNewModal("", "info", "CORRECT +1");

        setTotalPoints(totalPoints + 1);

        setTimeout(() => {
          setCardLoading(false);
        }, 1000);
      } else {
        setQuizInfo({
          ...quizInfo,
          error: `Chapter ${selectedOption}`,
        });
        setAnswerStatus(2);
        // if (questionNumber >= PROBLEM_NUM) {
        //   handleNewModal("summary", "info", getScoreMessage(totalPoints));
        //   return;
        // }
      }
    } else {
      if (selectedOption == verseId) {
        setQuizInfo({
          ...quizInfo,
          success: `All Correct +2`,
        });
        setQuestionType(2);

        handleNewModal("", "info", "Additional point +1");

        setTotalPoints(totalPoints + 1);

        setAnswerStatus(1);

        // if (questionNumber >= PROBLEM_NUM) {
        //   handleNewModal("summary", "info", getScoreMessage(totalPoints + 1));
        //   return;
        // }
      } else {
        setQuizInfo({
          ...quizInfo,
          success: `Chapter Correct +1`,
          error: ``,
        });
        setAnswerStatus(2);
        // if (questionNumber >= PROBLEM_NUM) {
        //   handleNewModal("summary", "info", getScoreMessage(totalPoints));
        //   return;
        // }
      }
    }
  };

  const handleNext = () => {
    if (questionNumber >= PROBLEM_NUM) {
      handleNewModal("summary", "info", getScoreMessage(totalPoints));
      // return;
    }
    getQuestion();
    setQuestionNumber(questionNumber + 1);
    setAnswerStatus(0);
    setQuestionType(0);
    setSelectedOption("");
  };

  const toggleModal = () => {
    setVisibleModal(!visibleModal);
  };

  useEffect(() => {
    getQuestion();
  }, [lang, section]);

  useEffect(() => {
    if (questionNumber > PROBLEM_NUM) return;
    setIsSummaryLoading(true);
    let tmpArray = quizArray;
    tmpArray[questionNumber] = quizInfo;
    console.log(tmpArray);
    setQuizArray(tmpArray);
    setTimeout(() => {
      setIsSummaryLoading(false);
    }, 900);
  }, [quizInfo.success, quizInfo.error]);

  return (
    <div className="main-page h-96 w-full pt-12 sm:pt-28 md:pt-32">
      {questionNumber > PROBLEM_NUM ? (
        isSummaryLoading ? (
          <div className="w-full flex justify-center h-full items-center">
            <div className="loading-wave">
              <div className="loading-bar"></div>
              <div className="loading-bar"></div>
              <div className="loading-bar"></div>
              <div className="loading-bar"></div>
            </div>
          </div>
        ) : (
          <div className="w-3/4 m-auto transition duration-700">
            <div className="text-center text-3xl md:text-5xl flex justify-center gap-3">
              <img
                src={`/assets/images/icon.png`}
                className="w-8 h-8 md:w-10 md:h-10"
              />
              Summary
            </div>
            <div className="w-full border m-3">
              {/* <div className="hidden sm:flex w-full ">
                <div className="border p-2 w-[19%] text-center">Questions</div>
                <div className="border p-2 w-[64%] text-center truncate text-ellipsis">
                  Content
                </div>
                <div className="border p-2 w-[17%] text-center">Rate</div>
              </div> */}
              {quizArray.map((item, index) => {
                if (!index) return <></>;
                return (
                  <div key={index} className="border sm:flex w-full">
                    <div className="sm:border p-2 sm:w-[19%] ps-3 underline">
                      {`Q${index}. ${item.ans.book.name} ${item.ans.chapter}:${item.ans.verse}`}
                    </div>
                    <div className="sm:border p-2 sm:w-[64%] truncate text-ellipsis flex items-center">
                      {item.ans.text}
                    </div>
                    <div className="sm:border p-2 sm:w-[17%] text-center flex items-center">
                      <div className="m-auto flex md:block lg:flex">
                        <div className="text-[#458258] me-1">
                          {item.success}
                        </div>
                        <div className="text-red-500 line-through">
                          {item.error}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-center lg:text-2xl text-blue-500">
              {messages}
            </div>
            <div className="text-center">
              <Button
                variant="contained"
                className="m-3 w-0 sm:w-40"
                color="error"
                onClick={() => {
                  navigate("/before");
                }}
              >
                <div className="flex flex-row items-center align-middle gap-1">
                  <RestartAltIcon />
                  <div className="hidden sm:block">Play Again</div>
                </div>
              </Button>
            </div>
          </div>
        )
      ) : (
        <div className="animate-[fadeInAnimation_1s_ease]">
          <MDBTypography
            tag={"h2"}
            className="font-serif text-center text-3xl md:text-5xl xl:text-6xl fw-bold m-4 text-[#458258] flex justify-center gap-3"
          >
            <img
              src={`/assets/images/icon.png`}
              className="w-8 h-8 md:w-12 md:h-12 xl:w-16 xl:h-16"
            />
            Question {questionNumber}
          </MDBTypography>
          <div className="w-2/3 m-auto md:w-1/2 xl:w-1/3">
            <Slider
              value={questionNumber}
              step={1}
              marks
              min={0}
              max={PROBLEM_NUM}
              className="text-[#458258]"
              color="p"
            />
          </div>
          {isLoading ? (
            <div className="w-full flex justify-center h-full items-center mt-20">
              <div className="loading-wave">
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
              </div>
            </div>
          ) : (
            <div className="w-3/4 m-auto animate-[fadeInAnimation_1s_ease]">
              <MDBTypography
                tag={"h4"}
                className="text-center text-md sm:text-xl m-3"
                dangerouslySetInnerHTML={{ __html: randomVerse.text }}
              />
              <MDBCard>
                <MDBCardHeader className="flex justify-center">
                  <div className=" text-2xl m-1">Score : </div>
                  <strong className="m-0.5 text-3xl">{totalPoints}</strong>
                </MDBCardHeader>
                {cardLoading ? (
                  <div className="text-center m-5">
                    <MDBSpinner
                      className="m-2"
                      style={{
                        textAlign: "center",
                        width: "3rem",
                        height: "3rem",
                      }}
                    >
                      <span className="visually-hidden">Loading...</span>
                    </MDBSpinner>
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-row justify-between">
                      <Button
                        variant="contained"
                        className="m-3 w-0 sm:w-32"
                        color="error"
                        onClick={() => {
                          navigate("/");
                        }}
                      >
                        <div className="flex flex-row items-center align-middle gap-1">
                          <RestartAltIcon />
                          <div className="hidden sm:block">Restart</div>
                        </div>
                      </Button>
                      <Button
                        variant="contained"
                        className="m-3 w-0 sm:w-32"
                        color="info"
                        onClick={handleSubmitAnswer}
                        style={
                          !answerStatus
                            ? { display: "block" }
                            : { display: "none" }
                        }
                      >
                        <div className="flex flex-row items-center align-middle gap-1 justify-center">
                          <TelegramIcon />
                          <div className="hidden sm:block">Submit</div>
                        </div>
                      </Button>
                      <Button
                        variant="contained"
                        className="m-3 w-0 md:w-32"
                        color="success"
                        onClick={handleNext}
                        style={
                          answerStatus
                            ? { display: "block" }
                            : { display: "none" }
                        }
                      >
                        <div className="flex flex-row items-center align-middle gap-1 justify-center">
                          <NextPlanIcon />
                          <div className="hidden sm:block">Next</div>
                        </div>
                      </Button>
                    </div>
                    <MDBCardFooter>
                      {questionType === 0 ? (
                        <div>
                          <div className="my-3 mx-0 text-sm sm:text-md xl:text-xl">
                            Select the correct Book where this verse came from.
                          </div>
                          <div className="text-xs md:text-sm xl:text-lg grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-4">
                            {bookOptions.map((one, index) => {
                              return (
                                <div
                                  key={index}
                                  className="p-0 sm:p-1 rounded-lg border-[1px]"
                                  onClick={(_, e) => {
                                    console.log("1111", one.bookid, bookId);
                                    if (answerStatus == 0)
                                      setSelectedOption(one.bookid);
                                  }}
                                >
                                  <MDBRadio
                                    className="scale-50 sm:scale-75 xl:scale-100 flex items-center"
                                    key={one.bookid}
                                    name="bookOption"
                                    id={one.bookid}
                                    label={one.name}
                                    value={one.bookid}
                                    checked={one.bookid == selectedOption}
                                    readOnly
                                    labelStyle={
                                      questionType == 0 && answerStatus == 2
                                        ? one.bookid === selectedOption
                                          ? { textDecoration: "line-through" }
                                          : one.bookid == bookId
                                          ? {}
                                          : {}
                                        : {}
                                    }
                                    wrapperStyle={
                                      questionType == 0 && answerStatus == 2
                                        ? one.bookid == selectedOption
                                          ? { color: "red" }
                                          : one.bookid == bookId
                                          ? {
                                              color: "green",
                                              fontWeight: "bolder",
                                            }
                                          : { color: "black" }
                                        : {}
                                    }
                                    wrapperClass="xl:m-2 flex items-center truncate text-ellipsis"
                                    disabled={answerStatus}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : questionType === 1 ? (
                        <div>
                          <div className="my-3 mx-0 text-sm sm:text-md xl:text-xl">
                            Select the correct Chapter where this verse came
                            from.
                          </div>
                          <div className="text-xs md:text-sm xl:text-lg grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-4">
                            {chapterOptions.map((one, i) => {
                              return (
                                <div
                                  key={i}
                                  className="p-0 sm:p-1 rounded-lg border-[1px]"
                                  onClick={() => {
                                    console.log("2222", one, chapterId);
                                    if (answerStatus == 0)
                                      setSelectedOption(one);
                                  }}
                                >
                                  <MDBRadio
                                    className="scale-50 sm:scale-75 xl:scale-100 flex items-center"
                                    key={one}
                                    name="bookOption"
                                    id={one}
                                    label={`Chapter ${one}`}
                                    value={one}
                                    checked={one == selectedOption}
                                    readOnly
                                    labelStyle={
                                      questionType == 1 && answerStatus == 2
                                        ? one === selectedOption
                                          ? { textDecoration: "line-through" }
                                          : one == chapterId
                                          ? {}
                                          : {}
                                        : {}
                                    }
                                    wrapperStyle={
                                      questionType == 1 && answerStatus == 2
                                        ? one == selectedOption
                                          ? { color: "red" }
                                          : one == chapterId
                                          ? {
                                              color: "green",
                                              fontWeight: "bolder",
                                            }
                                          : { color: "black" }
                                        : {}
                                    }
                                    wrapperClass="xl:m-2 flex items-center"
                                    disabled={answerStatus}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="my-3 mx-0 text-sm sm:text-md xl:text-xl">
                            Select the correct Verse.
                          </div>
                          <div className="text-xs md:text-sm xl:text-lg grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-4">
                            {verseOptions.map((one, index) => {
                              return (
                                <div
                                  key={index}
                                  className="p-0 sm:p-1 rounded-lg border-[1px]"
                                  onClick={() => {
                                    console.log("333333", one.verse, verseId);
                                    if (answerStatus == 0)
                                      setSelectedOption(one.verse);
                                  }}
                                >
                                  <MDBRadio
                                    className="scale-50 sm:scale-75 xl:scale-100 flex items-center"
                                    key={one.pk}
                                    name="verseOption"
                                    id={one.verse}
                                    label={`Verse ${one.verse}`}
                                    value={one.verse}
                                    readOnly
                                    checked={one.verse == selectedOption}
                                    labelStyle={
                                      questionType == 2 && answerStatus == 2
                                        ? one.verse === selectedOption
                                          ? { textDecoration: "line-through" }
                                          : one.verse == verseId
                                          ? {}
                                          : {}
                                        : {}
                                    }
                                    wrapperStyle={
                                      questionType == 2 && answerStatus == 2
                                        ? one.verse == selectedOption
                                          ? { color: "red" }
                                          : one.verse == verseId
                                          ? {
                                              color: "green",
                                              fontWeight: "bolder",
                                            }
                                          : { color: "black" }
                                        : {}
                                    }
                                    wrapperClass="xl:m-2 flex items-center"
                                    disabled={answerStatus}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </MDBCardFooter>
                  </div>
                )}
              </MDBCard>
            </div>
          )}
        </div>
      )}
      <BootstrapDialog
        onClose={toggleModal}
        aria-labelledby="customized-dialog-title"
        open={visibleModal}
        className="m-auto"
      >
        <DialogContent>
          <div
            className={`pt-10 px-4 w-full sm:w-[400px] text-center text-${modalColor} text-xl`}
          >
            {modalTitle}
          </div>
        </DialogContent>
        <DialogActions>
          {modalSection == "summary" ? (
            <Button
              variant="contained"
              color="error"
              className="m-2"
              onClick={toggleModal}
            >
              <div>
                <CancelIcon /> Close
              </div>
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              className="m-2"
              onClick={toggleModal}
            >
              <div>
                Continue <NextPlanIcon />
              </div>
            </Button>
          )}
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
