export function formatQuizData(contentData, optionsData = [], pageNumber = 0) {
  const type = contentData?.type || "singleChoice";

  if (type === "complete") {
    return {
      pageNumber,
      type,
      content: {
        title: contentData.title || "",
        question: contentData.question || "",
        correctAnswer: contentData.correctAnswer || "",
        points: contentData.points || 10,
      },
    };
  }

  // default: singleChoice
  return {
    pageNumber,
    type,
    content: {
      title: contentData.content?.title || "",
      question: contentData.content?.question || "",
    },
    options: optionsData.map(opt => ({
      answer: opt.answer,
      isCorrect: opt.iscorrect === 1,
      points: opt.points,
      isActive: opt.isactive === 1,
    })),
  };
}
