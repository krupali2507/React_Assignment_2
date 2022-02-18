import './index.css'

const starImage =
  'https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png'

const PasswordItem = props => {
  const {passwordDetail, onDeletPassword, showPasswords} = props
  const {uid, website, username, password} = passwordDetail

  const firstChar = website.slice(0, 1)

  const onDeleteItem = () => {
    onDeletPassword(uid)
  }

  return (
    <li className="password-info-container">
      <p className="password-symbol">{firstChar}</p>
      <div className="password-detail">
        <p className="info">{website}</p>
        <p className="info">{username}</p>
        {showPasswords ? (
          <p>{password}</p>
        ) : (
          <img src={starImage} alt="stars" className="star-image" />
        )}
      </div>
      <button
        type="button"
        className="delete-password-btn"
        testid="delete"
        onClick={onDeleteItem}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItem
