import React from 'react';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Cached from '@material-ui/icons/Cached';
import Assessment from '@material-ui/icons/Assessment';
import SlideShow from '@material-ui/icons/SlideShow';


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
});

function ListItemComposition(props) {
  const { classes } = props;

  function handleClickDemo(e) {
    e.preventDefault();
    props.onDemoClick();
  }

  function handleClickEvaluate(e) {
    e.preventDefault();
    props.onEvaluateClick();
  }

  function handleClickRecents(e) {
    e.preventDefault();
    props.onRecentsClick();
  }

  return (
      <MenuList>
        <MenuItem className={classes.menuItem} onClick={handleClickDemo.bind(this)}>
          <ListItemIcon className={classes.icon}>
            <SlideShow />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="Demo" />
        </MenuItem>
        <MenuItem className={classes.menuItem}  onClick={handleClickEvaluate.bind(this)}>
          <ListItemIcon className={classes.icon}>
            <Assessment />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="Evaluate" />
        </MenuItem>
        <MenuItem className={classes.menuItem}  onClick={handleClickRecents.bind(this)}>
          <ListItemIcon className={classes.icon}>
            <Cached />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="Recents" />
        </MenuItem>
      </MenuList>
  );
}

ListItemComposition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItemComposition);