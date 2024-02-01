const mongoose = require("mongoose");

async function main() {
  await mongoose.connect(
    "mongodb+srv://bk1649h:GUGVTjuKq4ZfBk8y@cluster0.w1qninw.mongodb.net/"
  );
}

main();

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    
  },
  lastname: {
    type: String,
   
  },
  email: {
    type: String,
 
  },
  password: {
    type: String,
    required: true,
  },
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User model
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("Account", accountSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  Account,
};


