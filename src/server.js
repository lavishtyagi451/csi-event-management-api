const app = require('./app');

const PORT = 5000;


app.listen(PORT,(req,res) =>{
    console.log(`server is running on port ${PORT}`)
});