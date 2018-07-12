import React, { PropTypes } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';


const styles = {
  root: {
    background: '#fafafa',
  }
};


function getSteps() {
  return ['Upload video for assessment and extract keyframes', 'Begin evaluation'];
}

class HorizontalLabelPositionBelowStepper extends React.Component {

  constructor(props) {
    super(props);


  }


  render() {
    const steps = getSteps();

    return (
      <div>
        <div>
          <Stepper activeStep={this.props.activeSteps} alternativeLabel>
            {
              steps.map(label => {
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })
            }
          </Stepper>
        </div>
        <div>


        </div>
      </div>
    );
  }
}

export default withStyles(styles)(HorizontalLabelPositionBelowStepper);
