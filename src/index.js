const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { engine } = require('express-handlebars');
const app = express();
const route = require('./routes/index');
const port = 3000;

// Middleware phục vụ file tĩnh:
// Nếu request gửi tới yêu cầu file tĩnh -> middleware sẽ kiếm file tĩnh trong thư mục public.
// Nếu không thì request sẽ được gửi tiếp cho các middleware bên dưới ( nếu không tìm thấy thì sẽ trả về lỗi 404 ).
app.use(express.static(path.join(__dirname, '/public')));

// Middleware xử lý dữ liệu từ FormData gửi lên server ( Dùng để xử lý dữ liệu được gửi từ Form HTML )
app.use(express.urlencoded({ extended: true }));
// Middleware xử lý dữ liệu từ được gửi bởi code JS lên Server ( các thư viện JS client: fetch, XMLHttpRequest, axios, ... )
app.use(express.json());

// Middleware logger của thư viện Morgan ( log ra các request tới server - phục vụ việc debugging )
app.use(morgan('combined'));

// TEMPLATE ENGINE
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/resources/views/'));

route(app);

// KHỞI ĐỘNG WEB SERVER - ĐƯỢC TÍCH HỢP SẴN TRONG EXPRESS
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
