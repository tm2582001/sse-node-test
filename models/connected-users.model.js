class ConnectedUsers {
  constructor() {
    this.users = new Set();
  }

  insertUser = (user_id) => {
    this.users.add(user_id);
  };

  removeUser = (user_id) => {
    // self.users.remove(user_id);

    this.users.delete(user_id);

    if (this.users.size === 0) {
      this.users = new Set();
    }
  };

  hasUser = (user_id) => {
    // self.users.contains(user_id)
    return this.users.has(user_id);
  };

  getConnectUsersCount = () => {
    if (this.users.size === 0) {
      this.users = new Set();
    }

    console.log(this.users);
    return this.users.size;
  };
}

export default ConnectedUsers;