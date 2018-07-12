import * as types from './actionTypes';
import Constants from '../constants/constants';
import axios from 'axios';


export function onDemoClick() {
    return {
        type: types.DEMO_SCREEN,
        nextPage: Constants.VQA_DEMO
    };
}

export function onEvaluateClick() {
    return {
        type: types.EVALUATE_SCREEN,
        nextPage: Constants.VQA_EVALUATE
    };
}

export function onRecentsClick() {
    return {
        type: types.RECENTS_SCREEN,
        nextPage: Constants.VQA_RECENTS
    };
}

export function setVideoDirectory(filename) {
    return {
        type: types.SET_VIDEO_DIR,
        fileName: filename
    }
}

export function setActiveSteps(value) {
    return {
        type: types.SET_ACTIVE_STEPS,
        value: value,
    }
}

export function uploadSuccess({ data }) {
    return {
        type: 'UPLOAD_DOCUMENT_SUCCESS',
        data,
    };
}

export function uploadFail(error) {
    return {
        type: 'UPLOAD_DOCUMENT_FAIL',
        error,
    };
}


export function extractSuccess({ data }) {
    return {
        type: 'FRAMES_EXTRACT_SUCCESS',
        bool: true,
        data,
    };
}

export function extractFail(error) {
    return {
        type: 'FRAMES_EXTRACT_FAIL',
        error,
    };
}

export function evaluateSuccess() {
    return {
        type: 'EVALUATE_SUCCESS',
        bool: true,
    };
}

export function evaluateFail(error) {
    return {
        type: 'EVALUATE_FAIL',
        error,
    };
}

export function showExtractLoad() {
    return {
        type: 'SHOW_EXTRACT_LOAD',
        bool: true
    }
}

export function setFileDetails(file) {
    let name = file.name.split('.')[0];
    return {
        type: 'SET_FILE_DETAILS',
        "filename": name,
        "filetype": file.type,
        "filesize": file.size
    }
}

export function updateVideoAssessmentValues(newData) {
    let Rating = parseFloat(parseFloat(newData.Rating).toFixed(2));
    let NimaScore = parseFloat(parseFloat(newData.NIMAScore).toFixed(2));
    let color = "white";


    if (NimaScore >= 0.0 && NimaScore <= 3.0) {
        color = "#ff0000"
    }
    else if (NimaScore >= 3.0 && NimaScore <= 4.30) {
        color = "#ffff00";

    }
    else if (NimaScore >= 4.30) {
        color = "#00ff00";
    }

    return {
        type: 'UPDATE_VIDEO_ASSESSMENT',
        "NimaScore": NimaScore,
        "ProgressBarValue": parseInt(newData.Progress),
        "Rating": Rating,
        "Evaluating": newData.Evaluating,
        "Color": color
    }
}

export function resetAll() {
    return {
        type: 'RESET_ALL'
    }
}


export function uploadDocumentRequest(file) {

    let data = new FormData();
    data.append('file', file);

    return (dispatch) => {
        axios({
            method: 'post',
            url: '/fileupload',
            data: data
        }).then((response) => {
            dispatch(uploadSuccess(response))
        })
            .catch((error) => {
                dispatch(uploadFail(error))
            });
    }
}


export function extractFrames() {
    return (dispatch) => {
        axios.get('/extract')
            .then((response) => {
                dispatch(extractSuccess(response))
            })
            .catch((error) => {
                dispatch(uploadFail(error))
            });
    }
}



export function evaluateVideo() {
    let data = new FormData();
    data.append('file', "file");

    return (dispatch) => {

        /* axios({
             method: 'post',
             url: '/evaluate',
             data: data
         }).then((response) => {
             console.log(response)
             dispatch(evaluateSuccess(response))
         })
             .catch((error) => {
                 dispatch(evaluateFail(error))
             });
     }*/
        var xhttp;
        xhttp = new XMLHttpRequest();
        xhttp.previous_text = '';
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState >= 3) {

                if (this.readyState == 3) {
                    var newData = xhttp.responseText.substr(xhttp.previous_text.length);
                    newData = newData.replace(/'/g, '"');
                    console.log(newData);
                    let disPatchData = Object.assign({}, { ...JSON.parse(newData) })
                    dispatch(updateVideoAssessmentValues(disPatchData));
                    xhttp.previous_text = xhttp.responseText;
                } else if (this.readyState == 4 && this.status == 200) {
                    console.log("-----------------------completed---------------------------");
                    var newData = xhttp.responseText.substr(xhttp.previous_text.length);
                    xhttp.previous_text = xhttp.responseText;
                    dispatch(evaluateSuccess());
                }

            }
        };
        xhttp.open("POST", "/evaluate", true);
        xhttp.send();
    }
}