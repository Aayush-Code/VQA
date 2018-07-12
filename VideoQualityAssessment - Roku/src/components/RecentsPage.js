import React, { PropTypes } from 'react';
import Typography from '@material-ui/core/Typography'
import Constants from '../constants/constants';

const styles = theme => ({
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0,
    },
    toolbar: theme.mixins.toolbar,
});

class RecentsPage extends React.Component {
    constructor(props) {
        super(props);
    }

    

    render() {
        return (

            <div>
                <main className={styles.content}>
                    <div className={styles.toolbar} />
                    <Typography noWrap>{'RecentsPage'}</Typography>
                </main>
            </div>
        );
    }

}

export default RecentsPage;

