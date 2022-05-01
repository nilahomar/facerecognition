function Clarify() {
  const USER_ID = 'b9ywt0ryg9hm';
  const PAT = '49126cde05e347bfa5b205e7420111ad';
  const APP_ID = 'd05f838b6e1a43c3af8e43c5e5fe3fb7';
  const MODEL_ID = 'face-detection';
  const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
  const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';

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
}

export default Clarify