import React, { useCallback, useState } from 'react';
import Particles from "react-tsparticles";
import particlesOptions from "./particles.json";
import { loadFull } from "tsparticles";
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition.js/FaceRecognition';
import 'tachyons';
import './App.css';

function App() {

    //particles for the background
    const particlesInit = useCallback(main => {
        loadFull(main);
    }, [])
    const [input, setInput] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [box, setBox] = useState({});
    const [route, setRoute] = useState('signin')
    const [isSignedIn, setSignedIn] = useState(false)



    const calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height)
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    const displayFaceBox = (box) => {
        setBox(box)
    }

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
            .then(result => displayFaceBox(calculateFaceLocation(result)))
            .catch(error => console.log('error', error));

    }

    const onRouteChange = (route) => {
        if (route === 'signout') {
            setSignedIn(false)
        } else if (route === 'home') {
            setSignedIn(true)
        }
        setRoute(route)
    }

    return (
        <div className="App">
            <Particles options={particlesOptions} init={particlesInit} />
            <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
            {route === 'home'
                ? <div>
                    <Logo />
                    <Rank />
                    <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
                    <FaceRecognition imageUrl={imageUrl} box={box} />
                </div>
                : (
                    route === "signin"
                        ? <Signin onRouteChange={onRouteChange} />
                        : <Register onRouteChange={onRouteChange} />
                )


            }
        </div>
    );
}

export default App;
