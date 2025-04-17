const users = []; //I'll use a database later

module.exports = {
  findUserByName: (username) => users.find(u => u.username === username),
  createUser: (user) => users.push(user)
}