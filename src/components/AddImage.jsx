import React, { useEffect, useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/config";
import AXIOSBASEURL from "../axios/Axios";
import toast from "react-hot-toast";
const AddImage = ({ refetch }) => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const storageRef = ref(storage, file?.name);
  useEffect(() => {
    if (file) {
      const toastId = toast.loading("Loading...");
      uploadBytes(storageRef, file)
        .then(() => {
          console.log("Upload Image");
          getDownloadURL(storageRef, file)
            .then((url) => {
              const data = { imageUrl: url };
              AXIOSBASEURL.post("/image", data)
                .then((data) => {
                  console.log(data.data);
                  refetch();
                  setFile(null);
                  toast.success("image upload successfully");
                  toast.dismiss(toastId);
                })
                .catch((err) => {
                  console.error(err);
                });
            })
            .catch((err) => {
              toast.error(err.message);
            });
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  }, [file]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      onClick={handleButtonClick}
      className="form-control border h-32 flex- justify-center items-center"
    >
      <img
        className="w-5 h-5"
        src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
        alt=""
      />
      <button className="font-bold">Add Images</button>
      <input
        ref={fileInputRef}
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
        type="file"
        style={{ display: "none" }}
      />
    </div>
  );
};

export default AddImage;
