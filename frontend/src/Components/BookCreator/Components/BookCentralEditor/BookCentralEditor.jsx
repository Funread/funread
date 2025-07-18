// src/Components/BookCreator/components/BookCentralEditor.jsx
import Canvas from "./Canvas";
import QuizEditor from "./QuizEditor";
import QuizCompleteEditor from "./QuizCompleteEditor";
import WordSearchForm from './WordSearchForm';
import BookCreatorLoader from "../../../Loaders/BookCreatorLoader";
export default function BookCentralEditor({
  isLoading,
  pagesType,
  // quizType,
  widget,
  elements,
  setElements,
  images,
  selectedId,
  setSelectedId,
  stageRef,
  transformerRef,
  quizEditorRef,
  quizCompleteEditorRef,
  currentPage,
  handleWordSearchSave,
}) {

  console.log('BookCentralEditor')
  console.log(elements)
  console.log(widget)
  
  if (isLoading) return <BookCreatorLoader />;
  if (pagesType === 2)
    return (
      <Canvas
        elements={elements}
        setElements={setElements}
        images={images}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        stageRef={stageRef}
        transformerRef={transformerRef}
      />
    );
  if ( widget === 9 )
    return (
      <QuizEditor
        ref={quizEditorRef}
        pageNumber={currentPage}
        initialData={elements}
      />
    );
  if (widget === 8)
    return (
      <QuizCompleteEditor
        ref={quizCompleteEditorRef}
        pageNumber={currentPage}
        initialData={elements}
      />
    );
  if (pagesType === 5)
    return (
      <WordSearchForm initialData={elements} onSave={handleWordSearchSave} />
    );
  return null;
}
