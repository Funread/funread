import React, {useState, useEffect, useRef} from "react";
import "./Storybook.css";
import {TextArea} from '@adobe/react-spectrum';
// import { storage } from "./firebase";
// import { getDownloadURL, ref, uploadBytes} from "firebase/storage";
// import {v4} from "uuid";

//TODO: Connect the uploadPage with new firebase.jsx in Shared

const Storybook = (props) => {

    const canvasRef = useRef(null);

    const [img, setImg] = useState("");
    const [txt, setTxt] = useState("");

    useEffect(() => {
        setImg(window.sessionStorage.getItem("img"));
        setTxt(window.sessionStorage.getItem("txt"));
    },[]);

    useEffect(() =>{
        window.sessionStorage.setItem("txt", txt);
    }, [txt]);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 750;
        canvas.height = 900;

        const context = canvas.getContext("2d");

        const display = new Image();
        display.src = img;

        display.onload = () => {
            context.drawImage(display, 0, 0, 750, 900);
        }
        window.sessionStorage.setItem("img", img);
    },[img]);

    const handleUpload = (e) => {
        let temp = '';
        getBase64(e.target.files[0], (r) => {
            temp = r;
            setImg(temp);
            console.log(temp);
        })
    }

    const getBase64 = (f, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(f);
        reader.onload = () => {
            cb(reader.result);
        };
        reader.onerror = (e) => {
            console.log('Error: ', e);
        }
    }

    // const uploadPage = () => {
    //     canvasRef.current.toBlob((b) => {
    //         console.log(b);
    //         // pages/teacher1/
    //         const pageRef = ref(storage, `pages/${props.current}`);
    //         uploadBytes(pageRef, b).then((snapshot) => {
    //             getDownloadURL(snapshot.ref).then((url) =>{
    //                 //setPageList((prev) => [...prev, url])
    //                 // console.log(url);
    //                 // console.log(pageList);
    //             })
    //         })
    //     })
    // }

    return(
        <div className="Storybook">
            <div className="story-container">
                <div className="story-img">
                <canvas className="canvas"
                        ref={canvasRef}>
                </canvas>
                <input className="choose-file" type="file" onChange={handleUpload}/>
            </div>
            <div className="story-txt">
                <TextArea placeholder="Book Content..." UNSAFE_className="content" aria-label="content" value={txt} width="100%" height="100%" maxHeight="100%" onChange={setTxt} isQuiet/>
            </div>
            </div>
            {/* <button onClick={uploadPage}>upload</button> */}
            {/* <div className="test">{img + " / " + txt}</div> */}
        </div>
    );
}

export default Storybook;