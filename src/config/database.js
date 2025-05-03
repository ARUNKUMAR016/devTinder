const mongoose = require("mongoose");

const connectDb = async () => {
  mongoose.connect(
    "mongodb+srv://arunkumarveerapandian4:arunonstep04@nodecluster.znm5vsr.mongodb.net/devTinder"
  );
};

module.exports = {
  connectDb,
};
