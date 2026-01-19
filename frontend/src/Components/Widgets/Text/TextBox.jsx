import React, { useRef, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const Box = ({ onWidgetChange }) => {
  const [text, setText] = useState('')
  const editorRef = useRef();
  const [editorData, setEditorData] = useState('');
  // const [, drag] = useDrag({
  //   type: widgetType,
  //   item: { type: 'Box' },
  //   collect: (monitor) => ({
  //     isDragging: !!monitor.isDragging(),
  //   }),
  // })

  const handleTextChange = (e) => {
    const newText = e.target.value
    setText(newText)
    onWidgetChange({ type: 'Box', data: {data: newText }})
  }


  const handleEditorDataChange = () => {
    const data = editorRef.current.editor.getData();
    setEditorData(data);

    onWidgetChange({ type: 'Box', data: {data: data }})
    // Aquí puedes manejar los datos como necesites, por ejemplo, enviarlos a un servidor
};

  return (
    // <div>
    //   <textarea
    //     placeholder='Lorem Ipsum'
    //     value={text}
    //     onChange={handleTextChange}
    //   />

    <CKEditor
    editor={ClassicEditor}
    ref={editorRef}
    onReady={editor => {
        editorRef.current = { editor };
    }}
    onChange={handleEditorDataChange}
    // ... otras opciones
/>
    // </div>
  )
}

export default Box
