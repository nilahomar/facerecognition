import 'tachyons';
import React, { useCallback, useState } from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import './App.css';
import particlesOptions from "./particles.json";
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition.js/FaceRecognition';

function App() {
    const particlesInit = useCallback(main => {
        loadFull(main);
    }, [])

    const [input, setInput] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const onInputChange = (e) => {
        setInput(e.target.value)
    }



    const onButtonSubmit = () => {
        setImageUrl(input)
        const USER_ID = 'b9ywt0ryg9hm';
        const PAT = '49126cde05e347bfa5b205e7420111ad';
        const APP_ID = 'd05f838b6e1a43c3af8e43c5e5fe3fb7';
        const MODEL_ID = 'face-detection';
        const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
        const IMAGE_URL = input;

        const raw = JSON.stringify({
            "user_app_id": {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": IMAGE_URL
                        }
                    }
                }
            ]
        });

        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key ' + PAT
            },
            body: raw
        };

        fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
            .then(response => response.json())
            .then(result => console.log(result.outputs[0].data.regions[0].region_info.bounding_box))
            .catch(error => console.log('error', error));

    }

    return (
        <div className="App">
            <Particles options={particlesOptions} init={particlesInit} />
            <Navigation />
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
            <FaceRecognition imageUrl={imageUrl} />
        </div>
    );
}

export default App;
