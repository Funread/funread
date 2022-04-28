import react, {useState, useEffect} from "react";
import { storage } from "./firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const UploadImage = () =>{

    const [img, setImg] = useState(null);
    const [url, setUrl] = useState("");
    const [imgName, setImgName] = useState("");

    const container ={
        width:"100%",
        height:"300px",
        display:"flex",
        justifyContent:"center",
        flexWrap:"wrap"
    };

    useEffect(() => {

    },[url]);

    const content = {
        width:"50%",
        height:"auto"
    };

    const handleUpload = (e) => {
        setImg(e.target.files[0]);
        setImgName(e.target.files[0].name);
    }

    const uploadPage = () => {
        if(!img) return;
        const imgRef = ref(storage, `images/${imgName}`);
        //promise
        uploadBytes(imgRef, img).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url)=>{
                console.log(url);
                setUrl(url);
            })
        })
    }

    return(
        <div className="Uploadimage" style={container}>
            <div className="content" style={content}>
                <input className="choose-file" type="file" onChange={handleUpload}/>
                <div><button onClick={uploadPage}>upload</button></div>
                <div>downloadURL: {url}</div>
            </div>
        </div>
    );
}

export default UploadImage;