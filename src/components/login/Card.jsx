import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { getTokenThunk, getUserInfo } from '../../actions';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      email: '',
      isDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchToken = this.fetchToken.bind(this);
  }

  componentDidMount() {
    this.fetchToken();
  }

  fetchToken() {
    const { getToken } = this.props;
    getToken();
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => {
      const { nome, email } = this.state;
      if (nome.length > 0 && email.length > 0) {
        this.setState({
          isDisabled: false,
        });
      } else {
        this.setState({
          isDisabled: true,
        });
      }
    });
  }

  handleSubmit() {
    const { token, getUser } = this.props;
    localStorage.setItem('token', token);
    const { email, nome } = this.state;
    const hash = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    const player = { name: nome, assertions: 0, score: 0, gravatarEmail: email };
    localStorage.setItem('state', JSON.stringify({ player }));

    getUser({ nome, email, url, score: 0 });
  }

  render() {
    const { nome, email, isDisabled } = this.state;
    return (
      <div className="container-form-login">
        <form className="card-login">
          <h1>Login</h1>
          <input
            className="input-field-login"
            type="text"
            data-testid="input-player-name"
            name="nome"
            placeholder="Nome"
            value={ nome }
            onChange={ this.handleChange }
          />
          <input
            className="input-field-login"
            type="email"
            data-testid="input-gravatar-email"
            name="email"
            placeholder="Email"
            value={ email }
            onChange={ this.handleChange }
          />
          <Link to="quiz">
            <button
              className="button-login"
              disabled={ isDisabled }
              data-testid="btn-play"
              type="button"
              onClick={ this.handleSubmit }
            >
              Jogar
            </button>
          </Link>
          <hr className="hr-login" />
          <Link to="/settings">
            <button
              className="settings-button"
              type="button"
              data-testid="btn-settings"
            >
              Configurações
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(getTokenThunk()),
  getUser: (payload) => dispatch(getUserInfo(payload)),
});

const mapStateToProps = (state) => ({
  token: state.token.token,
});

Card.propTypes = {
  getToken: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
