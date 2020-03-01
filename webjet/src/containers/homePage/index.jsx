import React from 'react';
import { connect } from 'react-redux';
import {
  filmWorldRequestSuccess,
  filmWorldRequestFailed
} from './homePage.actions';
import { getFilmMaker } from '../../api/filmmaker';
import './styles.css';

class HomePage extends React.Component {
  async componentDidMount() {
    const result = await getFilmMaker();
    console.log('result    ', result);
    if (result.response.status === 200)
      this.props.filmWorldRequestSuccess(result.response.data.data);
    else this.props.filmWorldRequestFailed(result.response);
  }

  render() {
    const { filmWorldData } = this.props;
    return (
      <div className="TileContainer">
        {filmWorldData &&
          filmWorldData.map((filmWorld, index) => {
            return (
              <div className="Tiles" key={index}>
                {filmWorld.title}
                {filmWorld.charges}
                {filmWorld.description}
                {filmWorld.owner}
              </div>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    filmWorldData: state.filmWorld
  };
};

const mapDispatchToProps = dispatch => {
  return {
    filmWorldRequestSuccess: success => {
      dispatch(filmWorldRequestSuccess(success));
    },
    filmWorldRequestFailed: error => {
      dispatch(filmWorldRequestFailed(error));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
