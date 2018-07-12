import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ClippedDrawer from './ClippedDrawer.js'
import * as Actions from '../actions/actions'
import Constants from '../constants/constants';
import DemoPage from './DemoPage';
import EvaluatePage from './EvaluatePage';
import RecentsPage from './RecentsPage';


class ApplicationPage extends React.Component {
    constructor(props) {
        super(props);

        this.extractFrames = this.extractFrames.bind(this);
        this.onEvaluateClick = this.onEvaluateClick.bind(this);
        this.onRecentsClick = this.onRecentsClick.bind(this);
        this.setVideoDirectory = this.setVideoDirectory.bind(this);
        this.setActiveSteps = this.setActiveSteps.bind(this);
        this.uploadRequest = this.uploadRequest.bind(this);
        this.evaluateVideo = this.evaluateVideo.bind(this);
        this.resetAll = this.resetAll.bind(this);

    }

    resetAll(){
        this.props.actions.resetAll();
    }

    evaluateVideo() {
        this.props.actions.evaluateVideo();
    }

    uploadRequest(file) {
        this.props.actions.setFileDetails(file);
        this.props.actions.uploadDocumentRequest(file);
    }


    setActiveSteps(value) {
        this.props.actions.setActiveSteps(value);
    }

    setVideoDirectory(filename) {
        this.props.actions.setVideoDirectory(filename);
    }

    extractFrames() {
        this.props.actions.showExtractLoad();
        this.props.actions.extractFrames();
    }

    onEvaluateClick() {
        this.props.actions.onEvaluateClick();
    }

    onRecentsClick() {
        this.props.actions.onRecentsClick();
    }

    render() {

        let pageToShow = null;

        if (this.props.Data.CurrentPage == Constants.VQA_DEMO) {
            pageToShow = <DemoPage
            />;
        }
        else if (this.props.Data.CurrentPage == Constants.VQA_EVALUATE) {
            pageToShow = <EvaluatePage
                TileData={this.props.Data.TileData}
                setVideoDirectory={this.setVideoDirectory}
                VideoFileName={this.props.Data.VideoFileName}
                setActiveSteps={this.setActiveSteps}
                activeSteps={this.props.Data.activeSteps}
                steps={this.props.Data.steps}
                uploadRequest={this.uploadRequest}
                extractFrames={this.extractFrames}
                EvaluateReport={this.props.Data.EvaluateReport}
                evaluateVideo={this.evaluateVideo}
                FramesExtractedBool={this.props.Data.FramesExtractedBool}
                EvaluateBool={this.props.Data.EvaluateBool}
                Extractloading={this.props.Data.Extractloading}
                ProgressBarValue={this.props.Data.ProgressBarValue}
                Rating={this.props.Data.Rating}
                Evaluating={this.props.Data.Evaluating}
                NimaScore={this.props.Data.NimaScore}
                FileInfo={this.props.Data.FileInfo}
                resetAll={this.resetAll}
            />;
        }
        else if (this.props.Data.CurrentPage == Constants.VQA_RECENTS) {
            pageToShow = <RecentsPage />;
        }

        return (
            <div>
                <ClippedDrawer
                    SideMenu={this.props.Data.SideMenu}
                    onDemoClick={this.onDemoClick}
                    onEvaluateClick={this.onEvaluateClick}
                    onRecentsClick={this.onRecentsClick}
                    content={pageToShow} />
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return { "Data": state };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(Actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationPage);