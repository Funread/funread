// src/Components/Loaders/BookCreatorLoader.jsx
import Lottie from "lottie-react";
import animationData from "../../assets/loaders/BookCreator.json"; // asegúrate que la ruta es correcta
export default function BookCreatorLoader() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
     
      <p style={{ fontSize: "3.4rem", fontWeight: "bold", margin: "1rem 0 0" }}>
      Printing your Page. . . . Please Wait
      </p>
      <p style={{ fontSize: "2rem", color: "#555" }}>
       
        The book factory is working hard! 
      </p>
      <div style={{ width: "calc(200vw * 0.25)", height: 250, margin: "auto" }}>
      <Lottie animationData={animationData} loop autoplay />
</div>
    
    </div>
  );
}
