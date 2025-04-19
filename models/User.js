const { client } = require("../config/db");

const db = client.db("rock-paper-scissors");
const userCollection = db.collection("users");

module.exports = {
  //Find a user by username
  findUserByName: async (username) => {
    return await userCollection.findOne({ username });
  },

  //Create a new user
  createUser: async (user) => {
    const result = await userCollection.insertOne(user);
    return result.insertedId;
  },
};
