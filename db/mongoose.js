const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dbAdminUser:' + process.env.MONGO_ATLAS_PW + '@cluster0-6gc5b.mongodb.net/' + process.env.MONGODB_ENV + '?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});