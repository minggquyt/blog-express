const express = require('express');
const morgan = require('morgan')
const path = require('path');
const { engine } = require("express-handlebars");
const sass = require('sass');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware phục vụ file tĩnh: 
// Nếu request gửi tới yêu cầu file tĩnh -> middleware sẽ kiếm file tĩnh trong thư mục public.
// Nếu không thì request sẽ được gửi tiếp cho các middleware bên dưới ( nếu không tìm thấy thì sẽ trả về lỗi 404 ).
app.use(express.static(path.join(__dirname,"/public")));




// Middleware logger của thư viện Morgan ( log ra các request tới server - phục vụ việc debugging )
app.use(morgan('combined'));

// TEMPLATE ENGINE 
app.engine('hbs', engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/resources/views/'));

app.get('/', (req, res) => {
   res.render('home');
});

app.get('/news',(req,res) => {
  res.render("news");
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});