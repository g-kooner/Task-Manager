const mongoose = require("mongoose");
/*
fycpe4-wusJek-busqew
*/

//since function running here right away just need to import it to other module where being used no need export in this case
//add object with properties to avoid deprecation warnings
const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
