class User {
  constructor(
    id,
    email,
    password,
    nickname,
    instagram,
    facebook,
    introduction,
    status,
  ) {
    this._id = id;
    this._email = email;
    this._password = password;
    this._nickname = nickname;
    this._instagram = instagram;
    this._facebook = facebook;
    this._introduction = introduction;
    this._status = status;
  }
}

export default User;
