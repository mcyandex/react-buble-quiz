import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MDBTypography,
  MDBBtn,
  MDBCard,
  MDBIcon,
  MDBCardHeader,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBRadio,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBSpinner,
  MDBRow,
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
  DialogTitle,
  IconButton,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

let bookRange = [];
let bookId, chapterRange, chapterId, verseId;

const PROBLEM_NUM = 1;

export default function Main() {
  const { lang, section } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [cardLoading, setCardLoading] = useState(false);

  const [visibleModal, setVisibleModal] = useState(false);
  const [modalIcon, setModalIcon] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalColor, setModalColor] = useState("");

  const [randomVerse, setRandomVerse] = useState([]);

  const [bookOptions, setBookOptions] = useState([]);
  const [verseOptions, setVerseOptions] = useState([]);

  const [totalPoints, setTotalPoints] = useState(0);

  const [questionNumber, setQuestionNumber] = useState(1);
  const [answerStatus, setAnswerStatus] = useState(0); // 0: pending, 1: success, 2: failded
  const [questionType, setQuestionType] = useState(0); // 0: book, 1: chapter, 2: verse

  const [selectedOption, setSelectedOption] = useState("");

  const handleNewModal = (icon, color, title) => {
    setModalColor(color);
    setModalIcon(icon);
    setModalTitle(title);

    setVisibleModal(true);
  };

  const getScoreMessage = (score) => {
    let message = "";
    switch (score) {
      case 0:
        message = `Your Total Score is ${score}.\n Maybe just a little more study to get you off the mark!`;
        break;
      case 1:
        message = `Your Total Score is ${score}.\n You're off the mark, nice job!`;
        break;
      case 2:
        message = `Your Total Score is ${score}.\n 2's no fluke, keep'em coming`;
        break;
      case 3:
        message = `Your Total Score is ${score}.\n Yes, yes, some more studying to take you higher`;
        break;
      case 4:
        message = `Your Total Score is ${score}.\n You're getting the hang of it`;
        break;
      case 5:
        message = `Your Total Score is ${score}.\n oh on FIRE!`;
        break;
      case 6:
        message = `Your Total Score is ${score}.\n This is incredible...!`;
        break;
      default:
        message = `Your Total Score is ${score}.\n You're invincible! A true Bible Verse Master!`;
        break;
    }
    return message;
  };

  const getQuestion = async () => {
    bookRange = section.split("-").map((one) => +one);
    bookId = getRandomNumber(bookRange[0], bookRange[1]);
    chapterRange = BooksData.find((one) => one.bookid == bookId).chapters;
    chapterId = getRandomNumber(1, +chapterRange);

    setIsLoading(true);
    const randomChapterVerses = await GetRandomChapter(lang, bookId, chapterId);
    // randomChapterVerses.sort((a, b) => 0.5 - Math.random());
    setVerseOptions(randomChapterVerses);
    verseId = getRandomNumber(0, randomChapterVerses.length - 1);
    setRandomVerse(randomChapterVerses[verseId]);
    verseId = randomChapterVerses[verseId].verse;

    const allBooksSection = await GetBooks(lang);
    const booksOfSection = allBooksSection.filter(
      (one) => one.bookid >= bookRange[0] && one.bookid <= bookRange[1]
    );
    // booksOfSection.sort((a, b) => 0.5 - Math.random());
    setBookOptions(booksOfSection);
    setIsLoading(false);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption) {
      handleNewModal("exclamation-triangle", "warning", "Select the option");
      return;
    }
    if (questionType == 0) {
      if (selectedOption == bookId) {
        setQuestionType(1);
        setSelectedOption("");
        setCardLoading(true);

        setTimeout(() => {
          setCardLoading(false);
        }, 1000);
      } else {
        setAnswerStatus(2);
        if (questionNumber == PROBLEM_NUM) {
          handleNewModal("exclamation", "info", getScoreMessage(totalPoints));
          return;
        }
      }
    } else if (questionType == 1) {
      if (selectedOption == chapterId) {
        setQuestionType(2);
        setSelectedOption("");
        setCardLoading(true);

        handleNewModal("checked", "success", "You scored 1 point.");

        setTotalPoints(totalPoints + 1);

        setTimeout(() => {
          setCardLoading(false);
        }, 1000);
      } else {
        setAnswerStatus(2);
        if (questionNumber == PROBLEM_NUM) {
          handleNewModal("exclamation", "info", getScoreMessage(totalPoints));
          return;
        }
      }
    } else {
      if (selectedOption == verseId) {
        setQuestionType(2);

        handleNewModal("checked", "success", "You scored additional 1 point.");

        setTotalPoints(totalPoints + 1);

        setAnswerStatus(1);

        if (questionNumber == PROBLEM_NUM) {
          handleNewModal(
            "exclamation",
            "info",
            getScoreMessage(totalPoints + 1)
          );
          return;
        }
      } else {
        setAnswerStatus(2);
        if (questionNumber == PROBLEM_NUM) {
          handleNewModal("exclamation", "info", getScoreMessage(totalPoints));
          return;
        }
      }
    }
  };
  const handleNext = () => {
    if (questionNumber == PROBLEM_NUM) {
      handleNewModal("exclamation", "info", getScoreMessage(totalPoints));
      return;
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

  return (
    <div className="main-page h-96 bg-gradient-to-b from-teal-100 w-full pt-40">
      <MDBTypography
        tag={"h2"}
        className="text-center fw-bold m-4 text-green-500"
      >
        Question {questionNumber}
      </MDBTypography>
      {isLoading ? (
        <div className="text-center mt-5">
          <MDBSpinner
            className="m-2"
            style={{ textAlign: "center", width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </MDBSpinner>
        </div>
      ) : (
        <div className="w-3/4 m-auto">
          <MDBTypography
            tag={"h4"}
            className="text-center text-xl m-3"
            dangerouslySetInnerHTML={{ __html: randomVerse.text }}
          />
          <MDBCard>
            <MDBCardHeader className="flex justify-center">
              <div className="text-blue-400 text-xl m-1">Score : </div>
              <big className="text-red-400 text-xl m-1">
                <strong>{totalPoints}</strong>
              </big>
            </MDBCardHeader>
            {cardLoading ? (
              <div className="text-center m-5">
                <MDBSpinner
                  className="m-2"
                  style={{ textAlign: "center", width: "3rem", height: "3rem" }}
                >
                  <span className="visually-hidden">Loading...</span>
                </MDBSpinner>
              </div>
            ) : (
              <div>
                <div className="flex flex-col md:flex-row justify-content-end">
                  <Button
                    variant="outlined"
                    className="m-2"
                    color="warning"
                    onClick={() => {
                      navigate("/before");
                    }}
                  >
                    Restart
                  </Button>
                  <Button
                    variant="outlined"
                    className="m-2"
                    color="primary"
                    onClick={handleSubmitAnswer}
                    style={
                      !answerStatus ? { display: "block" } : { display: "none" }
                    }
                  >
                    Submit Answer
                  </Button>
                  <Button
                    variant="outlined"
                    className="m-2"
                    color="primary"
                    onClick={handleNext}
                    style={
                      answerStatus && questionNumber != PROBLEM_NUM
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    Next Question
                  </Button>
                  <Button
                    variant="outlined"
                    className="m-2"
                    color="secondary"
                    onClick={() => {
                      navigate("/");
                    }}
                    style={
                      answerStatus && questionNumber == PROBLEM_NUM
                        ? { visibility: "visible" }
                        : { visibility: "hidden" }
                    }
                  >
                    Homepage
                  </Button>
                </div>
                <MDBCardFooter>
                  {questionType === 0 ? (
                    <MDBCardBody>
                      <div className="m-3">
                        Select the correct Book where this verse came from.
                      </div>
                      <MDBCardText>
                        <div className="grid grid-cols-3 gap-4">
                          {bookOptions.map((one, index) => {
                            return (
                              <div
                                key={index}
                                className="p-2 rounded-3xl border-4 border-teal-400"
                              >
                                <MDBRadio
                                  key={one.bookid}
                                  name="bookOption"
                                  id={one.bookid}
                                  label={one.name}
                                  onChange={(_, e) => {
                                    // console.log("1111", one.bookid, bookId);
                                    setSelectedOption(one.bookid);
                                  }}
                                  value={one.bookid}
                                  checked={one.bookid == selectedOption}
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
                                  disabled={answerStatus}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </MDBCardText>
                    </MDBCardBody>
                  ) : questionType === 1 ? (
                    <MDBCardBody>
                      <MDBCardTitle>
                        Select the correct Chapter where this verse came from.
                      </MDBCardTitle>
                      <MDBCardText>
                        <div className="grid grid-cols-3 gap-4">
                          {Array(chapterRange)
                            .fill(0)
                            .map((one, index) => {
                              return (
                                <div className="p-2 rounded-3xl border-4 border-teal-400">
                                  <MDBRadio
                                    key={index + 1}
                                    name="bookOption"
                                    id={index + 1}
                                    label={`Chapter ${index + 1}`}
                                    onChange={() => {
                                      // console.log("2222", index + 1, chapterId);
                                      setSelectedOption(index + 1);
                                    }}
                                    value={index + 1}
                                    checked={index + 1 == selectedOption}
                                    labelStyle={
                                      questionType == 1 && answerStatus == 2
                                        ? index + 1 === selectedOption
                                          ? { textDecoration: "line-through" }
                                          : index + 1 == chapterId
                                          ? {}
                                          : {}
                                        : {}
                                    }
                                    wrapperStyle={
                                      questionType == 1 && answerStatus == 2
                                        ? index + 1 == selectedOption
                                          ? { color: "red" }
                                          : index + 1 == chapterId
                                          ? {
                                              color: "green",
                                              fontWeight: "bolder",
                                            }
                                          : { color: "black" }
                                        : {}
                                    }
                                    disabled={answerStatus}
                                  />
                                </div>
                              );
                            })}
                        </div>
                      </MDBCardText>
                    </MDBCardBody>
                  ) : (
                    <MDBCardBody>
                      <MDBCardTitle>Select the correct Verse.</MDBCardTitle>
                      <div className="grid grid-cols-3 gap-4">
                        {verseOptions.map((one) => {
                          return (
                            <div className="p-2 rounded-3xl border-4 border-teal-400">
                              <MDBRadio
                                key={one.pk}
                                name="verseOption"
                                id={one.verse}
                                label={one.verse}
                                onChange={() => {
                                  // console.log("333333", one.verse, verseId);
                                  setSelectedOption(one.verse);
                                }}
                                value={one.verse}
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
                                disabled={answerStatus}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </MDBCardBody>
                  )}
                </MDBCardFooter>
              </div>
            )}
          </MDBCard>
        </div>
      )}

      <BootstrapDialog
        onClose={toggleModal}
        aria-labelledby="customized-dialog-title"
        open={visibleModal}
        className="w-1/2 m-auto"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" className={`text-${modalColor}`}>
          {modalColor.toUpperCase()}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={toggleModal}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent className="" dividers>
          <Typography className={`p-10 w-[400px] text-center text-${modalColor}`} gutterBottom>{modalTitle}</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={toggleModal}>
            Close
          </Button>
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
