import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import path from 'path';


const styles = theme => ({

  root: {
    maxHeight: "382px",
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: '#fafafa',
  },
  gridList: {
    maxHeight: "382px",
    width: 500
  },
  subheader: {
    width: '100%',
  },
});


class FramesGrid extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let FramesList = null;
    const { classes } = this.props;

    if (this.props.TileData) {
      FramesList = (
        <GridList cellHeight={160} className={classes.gridList} cols={3}>
          {
            this.props.TileData.map(tile => (
              <GridListTile cols={tile.cols || 1}>
                <img src={(path.join(__dirname, tile.img))} alt={tile.title} />
              </GridListTile>
            ))
          }
        </GridList>
      );
    }

    return (
      <div className={classes.root}>
        {FramesList}
      </div>
    );
  }


}

FramesGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FramesGrid);
