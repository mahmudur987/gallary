import React, { useRef, useState } from "react";
import "../App.css";
import { useQuery } from "@tanstack/react-query";
import AXIOSBASEURL from "../axios/Axios";
import AddImage from "./AddImage";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinar";
import "./index.css";
const Images = () => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isShown, setIsShown] = useState("");
  const [anm, setAnm] = useState(false);
  const dragImage = useRef(0);
  const dragoverImage = useRef(0);
  const { isLoading, data, isError, error, refetch } = useQuery({
    queryKey: ["/image"],
    queryFn: async () => {
      const res = await AXIOSBASEURL.get("/image");
      setImages(res.data.data);
      return res.data.data;
    },
  });
  console.log(images);
  const handleSort = () => {
    const itemsclone = [...images];
    // const temp = itemsclone[dragImage.current];
    // itemsclone[dragImage.current] = itemsclone[dragoverImage.current];
    // itemsclone[dragoverImage.current] = temp;
    const movedItem = itemsclone.splice(dragImage.current, 1)[0];
    itemsclone.splice(dragoverImage.current, 0, movedItem);
    setImages(itemsclone);
  };

  const toggleImageSelection = (id) => {
    setSelectedImages((prevSelectedImages) => {
      if (prevSelectedImages.includes(id)) {
        return prevSelectedImages.filter((imageId) => imageId !== id);
      } else {
        return [...prevSelectedImages, id];
      }
    });
  };
  const handleDelete = () => {
    const toastId = toast.loading("Loading...");
    AXIOSBASEURL.delete("/images", { data: selectedImages })
      .then((data) => {
        console.log(data.data);
        toast.success("image Delete successfully");
        setSelectedImages([]);
        refetch();
        toast.dismiss(toastId);
      })
      .catch((err) => {
        console.error("Error", err);
      });
    toast.dismiss(toastId);
  };
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return toast.error(error);
  }

  return (
    <main className="container mx-auto">
      <div className="flex justify-between md:px-10 my-5 h-10">
        {selectedImages.length > 0 && (
          <button className="btn  font-bold">
            {selectedImages.length} File Selected
          </button>
        )}
        {selectedImages.length > 0 && (
          <button onClick={handleDelete} className="btn btn-outline">
            Delete
          </button>
        )}
      </div>

      <div
        className={`grid grid-col-3 md:grid-cols-5 gap-3 first-letter:justify-center items-center ${
          anm && "draggable-container"
        }`}
      >
        {images.map((x, index) => (
          <div
            key={index}
            className={`relative max-w-xl border rounded-lg border-black p-1 w-full cursor-pointer bg-white ${
              index === 0 && "row-span-2 col-span-2"
            }
          } draggable-item   `}
            onMouseEnter={() => setIsShown(x._id)}
            onMouseLeave={() => setIsShown("")}
            draggable
            onDragStart={() => {
              setIsShown("");

              dragImage.current = index;
            }}
            onDragEnter={() => {
              dragoverImage.current = index;
            }}
            onDragEnd={handleSort}
            onDragOver={(e) => {
              e.preventDefault();
            }}
          >
            <figure className="w-full h-full">
              <img className="w-full h-full" src={x.imageUrl} alt="Shoes" />
            </figure>
            {(isShown === x._id || selectedImages.includes(x._id)) && (
              <div
                className={`absolute left-0 top-0 w-full h-full p-1 rounded-lg ${
                  isShown ? "bg-gray-500" : "bg-white"
                }   bg-opacity-70`}
              >
                <button
                  onClick={() => toggleImageSelection(x._id)}
                  className={`absolute top-2 right-2 btn  ${
                    selectedImages.includes(x._id)
                      ? "btn-primary"
                      : "btn px-5 py-4"
                  } btn-sm text-xl`}
                >
                  {selectedImages.includes(x._id) && <span> ✓</span>}
                </button>
              </div>
            )}
          </div>
        ))}

        <AddImage refetch={refetch} />
      </div>
    </main>
  );
};

export default Images;
