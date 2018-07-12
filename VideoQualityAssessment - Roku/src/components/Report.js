import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2
    }
});

class Report extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("REPORT!!!!!!!!!!!!!!!! ----> " + this.props.EvaluateReport);
        let report = null
        if (this.props.EvaluateReport) {
            report = (
                <div>
                    {
                        this.props.EvaluateReport.map((data) => {
                            console.log(data);
                            return (
                                <div style={{ backgroundColor: data.Color }}>
                                    <div id="one">
                                        <Typography variant="body2" noWrap>
                                            {data.Filename}
                                        </Typography>
                                    </div>
                                    <div id="two">
                                        <Typography variant="body2">
                                            {data.Rating}
                                        </Typography>
                                    </div>

                                </div>
                            );
                        })
                    }
                </div>
            )
        }
        const { classes } = this.props;
        console.log(this.props.EvaluateReport);

        return (
            <div>
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="headline" component="h3">
                        Evaluation Report
                    </Typography>
                    {report}
                </Paper>
            </div>
        );
    }
}

Report.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Report);