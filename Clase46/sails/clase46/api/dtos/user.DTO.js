class userDTO {
  constructor(userData = {}) {
    this.id = userData.id || "anonimo";
    this.email = userData.email || null;
    this.role = userData.role || "invitado";
    this.firstName = userData.firstName || "anonimo";
    this.lastName = userData.lastName || "";
    this.avatar = userData.avatar || "/uploads/avatar-anonimo.jpg";
    this.currentCart = userData.currentCart || null;
    this.address = userData.address || "";
    this.tel = userData.tel || "";
  }
}

module.exports = userDTO;
