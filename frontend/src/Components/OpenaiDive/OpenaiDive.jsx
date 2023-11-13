import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import "./OpenaiDive.css";
import { useNavigate } from "react-router-dom";

function OpenaiDive(props) {
  const [Imagepromp,setImagePromp] = useState('')
  const [textPromp,setTextPromp] = useState('')
  const [showImageGenerator,setShowImageGenerator] = useState(false)
  const [showPrompGenerator,setShowPrompGenerator] = useState(false)
  const [openaiKey,setOpenaiKey] = useState('')
  const [generateImage,setGenerateImage] = useState('')
  const [generatePromp,setGeneratePromp] = useState('')
  const [messages, setMessages] = useState([
    {role: "system", content: "You are a helpful assistant."},
    {role: "user", content: "I'm working on a book and need your guidance. Can you help me create engaging content about a specific topic?"},
    {role: "assistant", content: "Of course! I'd be happy to assist you with your book. Could you please specify the topic or subject you're focusing on? Feel free to share any preferences or requirements you have in mind."}
  ]);

  const imageGenerator = async () => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/dalle-generate', // Reemplaza con la URL correcta de la API de DALL-E
        { description: Imagepromp },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+openaiKey,
          },
        }
      );

      setGenerateImage(response.data.image_url);
    } catch (error) {
      console.error('Error al generar imagen:', error);
    }
  }

  const prompGenerator = async () => {
    try {
      const newMessages = [...messages, { role: 'user', content: textPromp + 'I want the book to be both engaging and educational. Can you suggest a format for the content, including text, images, audio, or videos?' }];
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci-codex/completions',
        {
          prompt: newMessages.map(msg => `${msg.role}: ${msg.content}`).join('\n'),
          max_tokens: 150,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+openaiKey,
          },
        }
      );
      setGeneratePromp(response.data.choices[0].text)
    } catch (error) {
      alert('Error al enviar mensaje:', error);
    }
  }


  return (
    <>
    <button onClick={() => {setShowImageGenerator(true)}}>Generar Imagen</button>
    <Modal show={showImageGenerator} onHide={() => {setShowImageGenerator(false)}}>
      <Modal.Header closeButton>
        <Modal.Title>OpenAI Image Generator</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        create your own images with artificial intelligence
        <Form onSubmit={imageGenerator} className="openai-form">
          <Form.Group className="form-group">
            <Form.Label>
              OpenAI key
            </Form.Label>
            <Form.Control
              id="keyInput"
              size="lg"
              type="text"
              value={openaiKey}
              onChange={(e) => {
                setOpenaiKey(e.target.value);
              }}
              placeholder="your openai key ..."
              required
              />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>
              Image promp
            </Form.Label>
            <Form.Control
              id="prompInput"
              size="lg"
              type="text"
              maxLength={500}
              value={Imagepromp}
              onChange={(e) => {
                setImagePromp(e.target.value);
              }}
              placeholder="your openai key ..."
              required
              />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
        <div className="div-image-openai">
          <img src={generateImage} alt="imagen requerida"/>
        </div>
      </Modal.Body>
    </Modal>
    <button onClick={() => {setShowPrompGenerator(true)}}>Generar promp</button>
    <Modal show={showPrompGenerator} onHide={() => {setShowPrompGenerator(false)}}>
      <Modal.Header closeButton>
        <Modal.Title>OpenAI Promp Generator</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      create prompts for your books
      <Form onSubmit={prompGenerator} className="openai-form">
          <Form.Group className="form-group">
            <Form.Label>
              OpenAi Key
            </Form.Label>
            <Form.Control
              id="keyInput"
              size="lg"
              type="text"
              value={openaiKey}
              onChange={(e) => {
                setOpenaiKey(e.target.value);
              }}
              placeholder="your openai key ..."
              required
              />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>
              promp
            </Form.Label>
            <Form.Control
              id="prompInput"
              size="lg"
              type="text"
              value={textPromp}
              maxLength={500}
              onChange={(e) => {
                setTextPromp(e.target.value);
              }}
              placeholder="your openai key ..."
              required
              />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
        <div className="div-image-openai">
          <textarea>
            {generatePromp}
          </textarea>
        </div>
      </Modal.Body>
    </Modal>
    </>
  );
}

export default OpenaiDive;
