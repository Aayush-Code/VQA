import Constants from '../constants/constants';

export default {
    store: {
        "CurrentPage": Constants.VQA_DEMO,
        "SideMenu": {
            "demoClicked": false,
            "evaluateClicked": false,
            "recentsClicked": false
        },
        "FramesGrid": [],
        "VideoFileName": "",
        "ExtractFolderName": "",
        "activeSteps": 0,
        "steps": 2,
        "TileData": [],
        "EvaluateReport": [],
        "FileInfo": [
            {
                "Header": "Title",
                "Text": ""
            },
            {
                "Header": "Size",
                "Text": ""
            },
            {
                "Header": "Type",
                "Text": ""
            }
        ],
        "FramesExtractedBool": false,
        "EvaluateBool": false,
        "Extractloading": false,
        "ProgressBarValue": 0,
        "Rating": 0,
        "Evaluating": "",
        "NimaScore": 0
    }
};