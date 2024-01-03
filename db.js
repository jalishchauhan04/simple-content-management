const mongoose = require("mongoose");
try {
  const db = mongoose.connect("");
} catch (err) {
  console.log(err);
}
