
const imagetoBase64 = async(file)=>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const data = new Promise((resolve,reject)=>{
        reader.onload = ()=> resolve(reader.result);
        reader.onerror = err => reject(err);


    })
    return data;
}
export {imagetoBase64};

// const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = function(event) {
//       const imageDataURL = event.target.result;
//       console.log(imageDataURL); // Do something with the data URL
//     };

//     if (file instanceof Blob) {
//       reader.readAsDataURL(file);
//     } else {
//       console.error("Selected file is not a valid Blob object.");
//     }
//   };