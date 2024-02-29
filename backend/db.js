const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://tanmaygupta22003:aBMkZ4dmKAiUwMdn@cluster0.fnfys0x.mongodb.net/paytm");

const conn = mongoose.connection;

conn.on("error", () => console.error.bind(console, "connection error"));
conn.once('open', () => console.info('Connection to Database is successful'));

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        minLength: 3,
        maxLength: 50,
    },
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
    
})

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
    User,
    Account,
    conn,
}