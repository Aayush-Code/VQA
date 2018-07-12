import React, { PropTypes } from 'react';
import Typography from '@material-ui/core/Typography'
import Constants from '../constants/constants';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        width: '90%',
    },
    backButton: {
        marginRight: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
});

class EvaluateBottomNavigation extends React.Component {
    constructor(props) {
        super(props);

        this.beginEvaluation = this.beginEvaluation.bind(this);
        this.exportReport = this.exportReport.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }


    exportReport() {
        this.props.setActiveSteps(this.props.activeSteps + 1);
    }

    beginEvaluation() {
        this.props.setActiveSteps(this.props.activeSteps + 1);
        this.props.evaluateVideo();
    };

    handleBack() {
        this.props.setActiveSteps(this.props.activeSteps - 1);
    };

    handleReset() {
        this.props.resetAll();
        this.props.setActiveSteps(0);

    };

    render() {
        const { classes } = this.props;
        return (

            <div style={{ marginTop: "30px" }}>
                {
                    this.props.activeSteps === this.props.steps ?

                        (
                            <div>
                                <Typography className={classes.instructions}>
                                    All steps completed - you&quot;re finished
                        </Typography>
                                <Button onClick={this.handleReset}>Reset</Button>
                            </div>
                        )
                        :
                        (
                            <div>
                                <div>
                                    <Button
                                        disabled={this.props.activeSteps === 0}
                                        onClick={this.handleBack}
                                        className={classes.backButton}>
                                        Back
                                </Button>
                                    {
                                        (this.props.activeSteps === this.props.steps - 1 ?
                                            <Button disabled={this.props.VideoFileName == "" || this.props.EvaluateBool == false} variant="contained" color="primary" onClick={this.exportReport} style={{ float: "right" }}>
                                                {
                                                    'Export Report'
                                                }
                                            </Button> :
                                            <Button disabled={this.props.VideoFileName == "" || this.props.FramesExtractedBool == false} variant="contained" color="primary" onClick={this.beginEvaluation} style={{ float: "right" }}>
                                                {
                                                    'Evaluate'
                                                }
                                            </Button>)
                                    }

                                </div>
                            </div>
                        )
                }
            </div>
        );
    }

}

export default withStyles(styles)(EvaluateBottomNavigation);












