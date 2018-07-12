import React, { PropTypes } from 'react';
import Typography from '@material-ui/core/Typography'
import Constants from '../constants/constants';
import { withStyles } from '@material-ui/core/styles';
import HorizontalLabelPositionBelowStepper from './HorizontalLabelPositionBelowStepper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import VideoInfo from './VideoInfo';
import FramesGrid from './FramesGrid';
import EvaluateBottomNavigation from './EvaluateBottomNavigation';
import VideoAssessment from './VideoAssessment';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});

const textBoxStyle = {
    "border-radius": "25px",
    "border": "2px solid #609",
    "padding": "20px",
    "width": "200px",
    "height": "15px"
}

class EvaluatePage extends React.Component {
    constructor(props) {
        super(props);

        this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    handleFileUpload(files) {
        const file = files[0];
        console.log(file);
        this.props.setVideoDirectory(file.name);
        this.props.uploadRequest(file)
    }

    render() {
        const { classes } = this.props;

        let EvaluateSection = null;
        if (this.props.activeSteps == 0) {
            EvaluateSection = (this.props.VideoFileName == "" ? null :
                (
                    <div className="margin5">
                        <div id="one">
                            <VideoInfo
                                extractFrames={this.props.extractFrames}
                                Extractsuccess={this.props.Extractsuccess}
                                Extractloading={this.props.Extractloading}
                                FileInfo={this.props.FileInfo}

                            />
                        </div>
                        <div id="two">
                            <FramesGrid
                                TileData={this.props.TileData} />
                        </div>
                    </div>
                )
            )



        }
        else if (this.props.activeSteps == 1) {
            EvaluateSection = (this.props.VideoFileName == "" ? null :
                (
                    <VideoAssessment
                        ProgressBarValue={this.props.ProgressBarValue}
                        Rating={this.props.Rating}
                        Evaluating={this.props.Evaluating}
                        NimaScore={this.props.NimaScore}
                        EvaluateBool={this.props.EvaluateBool}
                        EvaluateReport={this.props.EvaluateReport}

                        />
                )
            )
        }
        return (

            <div>
                <div>
                    <HorizontalLabelPositionBelowStepper
                        activeSteps={this.props.activeSteps} />
                </div>

                <div className="wrapper" style={{ marginLeft: "5%", marginRight: "5%" }}>
                    <div id="one">
                        <input id="myInput" type="file" ref={(ref) => this.myInput = ref} style={{ display: 'none' }} onChange={(e) => this.handleFileUpload(e.target.files)} />
                        <Button disabled={this.props.activeSteps === this.props.steps - 1} variant="fab" color="primary" aria-label="add" className={classes.button} onClick={(e) => this.myInput.click()}>
                            <AddIcon />
                        </Button>
                    </div>
                    <div id="two">
                        <input readOnly type="text" value={this.props.VideoFileName} className="videoPathBox" placeholder="Video Name" />
                    </div>
                    {EvaluateSection}
                </div>
                <div>
                    <EvaluateBottomNavigation
                        setActiveSteps={this.props.setActiveSteps}
                        activeSteps={this.props.activeSteps}
                        steps={this.props.steps}
                        VideoFileName={this.props.VideoFileName}
                        evaluateVideo={this.props.evaluateVideo}
                        FramesExtractedBool={this.props.FramesExtractedBool}
                        EvaluateBool={this.props.EvaluateBool}
                        resetAll={this.props.resetAll}
                    />

                </div>
            </div>
        );
    }
}

export default withStyles(styles)(EvaluatePage);