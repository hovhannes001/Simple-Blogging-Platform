const express = require(express);
const app = express();
require(dotenv).config();
const connectDB = require('./config/database');
app.use(express.json());

connectDB();
app.use('/users',require('./routes/userRoute'));
app.use('/posts',require('./routes/postRoute'));

const port = process.env.PORT || 8080;
app.listen(port,() => {console.log(`Server is running on port: ${port}`)});