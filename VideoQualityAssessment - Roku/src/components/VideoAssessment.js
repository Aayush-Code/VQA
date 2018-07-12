import "react-sweet-progress/lib/style.css";
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Progress } from 'react-sweet-progress';
import Report from './Report';

class VideoAssessment extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let theme = { success: { color: "green", trailColor: "lime", symbol: "-" } }
        let status = "defualt"

        if (this.props.Rating >= 0.0 && this.props.Rating <= 3.0) {
            theme = { error: { color: "red", trailColor: "pink", symbol: "Poor" } }
            status = "error";
        }
        else if (this.props.Rating >= 3.0 && this.props.Rating <= 4.30) {
            theme = { active: { color: "orange", trailColor: "yellow", symbol: "Average" } }
            status = "active";

        }
        else if (this.props.Rating >= 4.30) {
            theme = { success: { color: "green", trailColor: "lime", symbol: "Good" } }
            status = "success"
        }




        return (
            <div className="margin5">
                <div id="one" style={{ marginTop: "10px" }}>
                    <Progress width={250} type="circle" percent={this.props.ProgressBarValue} status={status} theme={theme} />
                </div>
                <div id="two" style={{ overflow: "auto", maxHeight: "250px" }} >
                    <Report
                        EvaluateReport={this.props.EvaluateReport}
                    />
                </div>


            </div>
        );
    }
}

export default VideoAssessment;

