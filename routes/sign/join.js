// routes/sign/join.js

// 이 파일을 라우터로 사용할 것 이기에 아래 두개를 불러와준다.
const express = require('express');
const router = express.Router();

// 데이터베이스 접속을 위해 maria.js를 불러온다
const maria = require('../../maria');

// /join 으로 get 접속하면 views/sign/join.pug 를 렌더링해준다.
// join.pug 는 추후 접속한다.
router.get('/', function(req, res, next) {
    res.render('sign/join');
});

// /join 으로 post 접속하면 아래와 같은 동작을 수행한다.
router.post('/', function(req, res, next) {
    // addUser 를 불러온다. req.body 는 axios 를 통해 클라이언트 측에서 넘겨줄 데이터이다.
    const user = require('../../model/user/addUser')(req.body);
    // sql 문은 아래와 같다. ES6의 템플릿 문자열을 사용해서 복잡하게 쓰지 않고 한줄로 적어준다.
    // 테이블의 ID 값은 자동으로 증가(AUTO_INCREMENT)하기에 안적어줘도 된다.
    const sql = `INSERT INTO users(USERID, PASSWORD, NAME, SALT) VALUES  ("${user.userid}","${user.password}","${user.name}",${user.salt})`;

    maria.query(sql, function(err, rows) {
        // 데이터가 잘 들어갔는지 확인을 위해 로그를 찍어준다.
        // 에러가 없다면 "1"을 있다면 "0"을 반환한다.
        // 이는 크게 상관없다.
        if(!err && rows!==null) {
            res.send("1")
        } else {
            res.send("0")
        }
    })
});


module.exports = router;