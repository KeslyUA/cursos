import { useState } from "react";
export const handleSubmit = (formData) => {
    
    const dataToSave = {
      titulo: formData.titulo,
      descripcion: formData.descripcion,
      video: formData.video, 
    };
  
    localStorage.setItem("videoData", JSON.stringify(dataToSave));
    alert("Video guardado con éxito.");
  };
  
  

function FormularioVideo() {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    video: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file); 
      setFormData({ ...formData, video: videoURL });
    }
  };
  

  return (
    <div>
      
      

    </div>
  );
}
export default FormularioVideo;


  
