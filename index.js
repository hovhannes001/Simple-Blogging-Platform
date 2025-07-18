const express = require(express);
const app = express();
require(dotenv).config();

app.use(express.json());

app.use('/users',require('./routes/userRoute'));
app.use('/posts',require('./routes/bookRoute'));
app.use('/review',require('./routes/reviewRoute'));

const port = process.env.PORT || 8080;
app.listen(port,() => {console.log(`Server is running on port: ${port}`)});