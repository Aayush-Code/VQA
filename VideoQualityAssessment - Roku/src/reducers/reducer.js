import * as types from '../actions/actionTypes';
import initialState from './initialState';
import Constants from '../constants/constants';


export default function Reducer(state = initialState.store, action) {
    switch (action.type) {

        case types.DEMO_SCREEN:
            return Object.assign({}, state, {
                "CurrentPage": action.nextPage,
                "SideMenu": { "demoClicked": true }
            });

        case types.EVALUATE_SCREEN:
            return Object.assign({}, state, {
                "CurrentPage": action.nextPage,
                "SideMenu": { "evaluateClicked": true }
            });


        case types.RECENTS_SCREEN:
            return Object.assign({}, state, {
                "CurrentPage": action.nextPage,
                "SideMenu": { "recentsClicked": true }
            });


        case types.SET_VIDEO_DIR:
            return Object.assign({}, state, {
                "VideoFileName": action.fileName
            });

        case types.SET_ACTIVE_STEPS:
            return Object.assign({}, state, {
                "activeSteps": action.value
            });

        case types.FRAMES_EXTRACT_SUCCESS:
            return Object.assign({}, state, {
                "FramesExtractedBool": action.bool,
                "TileData": action.data,
                "Extractloading": false
            });

        case types.EVALUATE_SUCCESS:
            return Object.assign({}, state, {
                "EvaluateBool": action.bool,
            });


        case types.SHOW_EXTRACT_LOAD:
            return Object.assign({}, state, {
                "Extractloading": true
            });


        case types.SET_FILE_DETAILS:
            {
                let FileInfo =
                    [
                        {
                            "Header": "Title",
                            "Text": action.filename.toString()
                        },
                        {
                            "Header": "Size",
                            "Text": action.filesize.toString()
                        },
                        {
                            "Header": "Type",
                            "Text": action.filetype.toString()
                        }
                    ]
                return Object.assign({}, state, {
                    "FileInfo": FileInfo
                });
            }

        case types.UPDATE_VIDEO_ASSESSMENT:
            {
                let Report = {
                    Filename: action.Evaluating,
                    Rating: action.NimaScore,
                    Color: action.Color
                };
                return Object.assign({}, state, {
                    "ProgressBarValue": action.ProgressBarValue,
                    "Rating": action.Rating,
                    "EvaluateReport": [...state.EvaluateReport, Report]
                });

            }

        case types.RESET_ALL: {
            return Object.assign({}, state, {
                "CurrentPage": Constants.VQA_EVALUATE,
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
            });
        }

        default:
            return state;
    }
}


