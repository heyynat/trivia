import React from 'react';
import Header from '../components/feedback/Header';
import Scoreboard from '../components/feedback/Scoreboard';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const minHit = 3;
    const assertions = 2; //  this.props;

    return (
      <>
        <Header />
        <h3 data-testid="feedback-text">
          {
            (assertions >= minHit)
              ? 'Mandou bem!'
              : 'Podia ser melhor...'
          }
        </h3>
        <Scoreboard />
      </>
    );
  }
}

// const mapStateToProps = (state) => ({
//   assertions: state.player.assertions,
// });

export default Feedback;
