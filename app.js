let express = require('express');
let app = express();
let port = process.env.PORT || 3000 ;
app.get("/",(req,res)=>{
    res.send("Test Page");
});
app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
}) 