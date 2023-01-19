class UserInfo {
  constructor({ nameOfProfileSelector, professionOfProfileSelector }) {
    this._nameOfProfile = document.querySelector(nameOfProfileSelector);
    this._professionOfProfile = document.querySelector(
      professionOfProfileSelector
    );
  }

  getUserInfo() {
    const profile = {};
    profile["name"] = this._nameOfProfile.textContent;
    profile["profession"] = this._professionOfProfile.textContent;
    return profile;
  }

  setUserInfo({ newName, newProfession }) {
    this._nameOfProfile.textContent = newName;
    this._professionOfProfile.textContent = newProfession;
  }
}

export default UserInfo;
