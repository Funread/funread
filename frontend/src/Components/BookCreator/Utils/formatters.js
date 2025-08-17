export function formatQuizData(contentData, optionsData = [], pageNumber = 0) {
  const type = (contentData?.type || "singleChoice").toString();

  if (type.toLowerCase() === "complete" || type === "COMPLETE") {
    return {
      pageNumber,
      type: "complete",
      content: {
        title: contentData.content?.title || contentData.title || "",
        question: contentData.content?.question || contentData.question || "",
        correctAnswer: contentData.content?.correctAnswer || contentData.correctAnswer || "",
        points: contentData.content?.points || contentData.points || 10,
      },
    };
  }

  // Determine source of options: prefer optionsData (DB rows) if present, otherwise use embedded contentData.options
  let normalizedOptions = [];

  if (Array.isArray(optionsData) && optionsData.length > 0) {
    normalizedOptions = optionsData.map((opt) => ({
      answer: opt.answer,
      // DB may use numeric flags iscorrect/isactive as 1/0
      isCorrect: opt.iscorrect === 1 || opt.isCorrect === true || opt.isCorrect === 1,
      points: Number(opt.points) || 0,
      isActive: opt.isactive === 1 || opt.isActive === true || opt.isActive === 1,
    }));
  } else if (Array.isArray(contentData?.options) && contentData.options.length > 0) {
    normalizedOptions = contentData.options.map((opt) => ({
      answer: opt.answer || opt.answerText || "",
      // support different casing/field names
      isCorrect: opt.isCorrect === true || opt.iscorrect === 1 || opt.iscorrect === true || opt.correct === true || false,
      points: Number(opt.points ?? opt.point ?? 0) || 0,
      isActive: opt.isActive === true || opt.isactive === 1 || true,
    }));
  }

  return {
    pageNumber,
    type: "singleChoice",
    content: {
      title: contentData.content?.title || contentData.content?.title || contentData.title || "",
      question: contentData.content?.question || contentData.content?.question || contentData.question || "",
    },
    options: normalizedOptions,
  };
}
