import {Component} from 'react'

import PasswordItem from '../PasswordItem'

import './index.css'

class CreatePasswords extends Component {
  state = {
    inputWebsite: '',
    inputUsername: '',
    inputPassword: '',
    passwordsList: [],
    searchInput: '',
    showPasswords: false,
  }

  onChangeWebsite = event => {
    this.setState({inputWebsite: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({inputUsername: event.target.value})
  }

  onChangePassword = event => {
    this.setState({inputPassword: event.target.value})
  }

  onSubmitData = event => {
    event.preventDefault()
    const {
      inputWebsite,
      inputUsername,
      inputPassword,
      passwordsList,
    } = this.state

    if (inputWebsite !== '' && inputUsername !== '' && inputPassword !== '') {
      const id = passwordsList.length + 1
      const passwordDetail = {
        uid: id,
        website: inputWebsite,
        username: inputUsername,
        password: inputPassword,
      }

      this.setState(prevState => ({
        passwordsList: [...prevState.passwordsList, passwordDetail],
        inputWebsite: '',
        inputUsername: '',
        inputPassword: '',
      }))
    }
  }

  onSearchPasswords = event => {
    this.setState({searchInput: event.target.value})
  }

  onDeletePassword = id => {
    const {passwordsList} = this.state

    const filterdPasswords = passwordsList.filter(
      eachPassword => eachPassword.uid !== id,
    )
    this.setState({passwordsList: filterdPasswords})
  }

  renderPasswordForm = () => {
    const {inputWebsite, inputUsername, inputPassword} = this.state

    return (
      <div className="password-form-container">
        <div className="form-input-container">
          <h1 className="form-heading">Add New Password</h1>
          <form className="data-input-container" onSubmit={this.onSubmitData}>
            <div className="logo-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-logo"
              />
              <input
                type="text"
                placeholder="Enter Website"
                className="input-element"
                value={inputWebsite}
                onChange={this.onChangeWebsite}
              />
            </div>
            <div className="logo-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-logo"
              />
              <input
                type="text"
                placeholder="Enter Username"
                className="input-element"
                value={inputUsername}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="logo-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-logo"
              />
              <input
                type="password"
                placeholder="Enter Password"
                className="input-element"
                value={inputPassword}
                onChange={this.onChangePassword}
              />
            </div>
            <div className="button-container">
              <button type="submit" className="add-btn">
                Add
              </button>
            </div>
          </form>
        </div>
        <div className="image-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manager-image"
          />
        </div>
      </div>
    )
  }

  renderEmptyView = () => (
    <div className="no-passwords-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="password-manager-image"
      />
      <p className="your-passwords-heading">No Passwords</p>
    </div>
  )

  renderPasswordListView = () => {
    const {passwordsList, searchInput, showPasswords} = this.state

    const filteredResultsList = passwordsList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <ul className="passwords-list">
        {filteredResultsList.map(eachPassword => (
          <PasswordItem
            passwordDetail={eachPassword}
            key={eachPassword.uid}
            onDeletPassword={this.onDeletePassword}
            showPasswords={showPasswords}
          />
        ))}
      </ul>
    )
  }

  onToggleShowPasswords = () => {
    this.setState(prevState => ({showPasswords: !prevState.showPasswords}))
  }

  renderPasswordsList = () => {
    const {passwordsList, searchInput} = this.state

    const searchResults = passwordsList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const isPasswordsEmpty = searchResults.length === 0
    const count = passwordsList.length

    return (
      <div className="password-list-container">
        <div className="passwords-list-header">
          <div className="pass-count-container">
            <h1 className="your-passwords-heading">Your Passwords</h1>
            <p className="password-list-count">{count}</p>
          </div>
          <div className="password-search-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              alt="search"
              className="search-icon"
            />
            <input
              type="search"
              className="input-element"
              value={searchInput}
              onChange={this.onSearchPasswords}
            />
          </div>
        </div>
        <hr className="line" />
        <div className="show-passwords-container">
          <input
            type="checkbox"
            id="showPassword"
            onClick={this.onToggleShowPasswords}
          />
          <label htmlFor="showPassword" className="label-checkbox">
            Show passwords
          </label>
        </div>
        {isPasswordsEmpty
          ? this.renderEmptyView()
          : this.renderPasswordListView()}
      </div>
    )
  }

  render() {
    return (
      <div className="bg-container">
        <div className="app-header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
        </div>
        {this.renderPasswordForm()}
        {this.renderPasswordsList()}
      </div>
    )
  }
}

export default CreatePasswords
