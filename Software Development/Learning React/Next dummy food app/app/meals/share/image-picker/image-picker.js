'use client';

import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
    const [pickedImage, setPickedImage] = useState();
    const imageInput = useRef();

    function handlePickClick() {
        imageInput.current.click();
    }

    function handleImageChange(event) {
        const file = event.target.files[0]; // To access the first file, 
        // even though it will always be a single accepted file
        if (!file) {
            setPickedImage(null);
            return;
        }

        // Construct temporary loaded image
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPickedImage(fileReader.result) //
        };

        fileReader.readAsDataURL(file);

    }


    return (
        <div className={classes.picker}>
            <label htmlFor={name  /* field name in the form: 'image' */}>
                {label}
            </label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image selected yet.</p>}
                    {pickedImage && (
                        <Image
                            src={pickedImage}
                            alt="The image selected by the user."
                            fill />
                    )}
                </div>
                <input
                    ref={imageInput}
                    className={classes.input}
                    type="file"
                    id={name} //field name in the input: 'image'
                    name={name}  //field name of the input: 'image'
                    accept="image/png image/jpeg image/jpg" // Accepted image formats
                    // multiple // To accept multiple files
                    onChange={handleImageChange}
                    required
                />
                <button className={classes.button} type="button" onClick={handlePickClick}>
                    Pick an image
                </button>
            </div>
        </div>
    );
}