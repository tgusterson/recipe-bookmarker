const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
require('./db/mongoose');

const undefinedRoutehandler = require('./api/middleware/404');
const errorHandler = require('./api/middleware/errorHandler');

const userRoutes = require('./api/routes/user');
const recipesRoutes = require('./api/routes/recipes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRoutes);
app.use('/recipes', recipesRoutes);

app.use(undefinedRoutehandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});