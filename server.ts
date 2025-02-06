import express from 'express';
import configDotenv from './src/config/dotenv';
// import cors from 'cors';
import routes from './src/routes/routes';
import produtorRoutes from './src/routes/produtorRoutes';
import configAuth from "./src/middlewares/checkAuth";
import passport = require("passport");

configAuth();
configDotenv();

const app = express();
const port = process.env.PORT;
console.log(port)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cors());
app.use('/api/produtores', produtorRoutes);
app.use(routes);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
console.log(`${process.env.APP_NAME} app listening at http://localhost:${port}`);
});
