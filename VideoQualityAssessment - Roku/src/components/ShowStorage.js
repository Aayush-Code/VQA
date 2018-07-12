import React from 'react';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Storage from '@material-ui/icons/Storage';

const styles = theme => ({
    menuItem: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& $primary, & $icon': {
                color: theme.palette.common.white,
            },
        },
    },
    primary: {},
    icon: {},
    bar: {
        flexGrow: 1
    },
});

function ShowStorage(props) {
    const { classes } = props;

    return (
        <MenuList>
            <MenuItem className={classes.menuItem}>
                <ListItemIcon className={classes.icon}>
                    <Storage />
                </ListItemIcon>
                <ListItemText classes={{ primary: classes.primary }} inset primary="Storage" />
            </MenuItem>

        </MenuList>
    );
}

ShowStorage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShowStorage);