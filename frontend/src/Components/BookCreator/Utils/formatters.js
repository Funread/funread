// src/Components/BookCreator/utils/formatQuizData.js

export function formatQuizData(contentData, optionsData, pageNumber = 0) {
    return {
      pageNumber: pageNumber,
      type: "singleChoice",
      content: {
        title: contentData.title,
        question: contentData.question,
      },
      options: optionsData.map(opt => ({
        answer: opt.answer,
        isCorrect: opt.iscorrect === 1,
        points: opt.points,
        isActive: opt.isactive === 1,
      })),
    };
  }
  