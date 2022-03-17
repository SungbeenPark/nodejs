var express = require('express');
var router = express.Router();

const maria = require('../maria');

/* 게시판 관련 컨트롤러 */
/* "/board" */

/* GET users listing. */
router.get('/', function(req, res, next) {
  try{
    const post = req.body;
    let sql = 'select * from notice ';
    sql += `where 1=1 `;
    //sql += `limit ${post.page} ${post.row}`;
    maria.query(sql, function(err, rows, fields) {
      if(!err && rows!==null) {
        res.json(rows)
      } else {
        console.log(err);
        res.json(false);
      }
    });
  } catch (e) {
    console.log(e);
    res.json(false);
  }
});

// 게시판 작성 페이지로 이동
router.get("/post", function (req, res, next) {
  res.render("board/post");
});


// 게시글 작성
router.post('/post', function(req, res, next) {
  try{
    const post = req.body;
    const sql = 'INSERT INTO notice(title, contents, user, password, createdDate, modifiedDate) values ';
    const sqlValue = `("${post.title}", "${post.contents}", "${post.user}", "${post.password}", NOW(), NOW());`;
    maria.query(sql + sqlValue, function(err, rows, fields) {
      if(!err) {
        res.json(true);
      } else {
        console.log(err);
        res.json(err);
      }
    });
  } catch (e) {
    console.log(e);
    res.json(e);
  }
});

// 게시글 삭제
router.delete('/:id', function(req, res, next) {
  try{
    const sql = `delete from notice where ID = '${req.params.id}' `;
    maria.query(sql , function(err, rows, fields) {
      if(!err) {
        res.json(true);
      } else {
        console.log(err);
        res.json(err);
      }
    });
  } catch (e) {
    console.log(e);
    res.json(e);
  }
});
// 게시글 수정
router.put('/post/:id', function(req, res, next) {
  try{
    const post = req.body;
    let selectSql = `select * from notice where ID = '${req.params.id}' `;
    maria.query(selectSql, function(err, rows, fields) {
      if(!err) {
        if(post.password === rows[0].password){
          let updateStr = `  modifiedDate = NOW() `;
          if(post.title !== null){
            updateStr += `, title = '${post.title}'`;
          }
          if(post.contents !== null){
            updateStr += `, contents = '${post.contents}'`;
          }
          if(post.user !== null){
            updateStr += `, user = '${post.user}'`;
          }
          const sql = ` update notice set ${updateStr} where ID = '${req.params.id}' `;
          maria.query(sql , function(err, rows, fields) {
            if(!err) {
              res.json(rows);
            } else {
              console.log(err);
              res.json(err);
            }
          });

        }else{
          res.json("비밀번호 오류");
        }
      } else {
        console.log(err);
        res.json(err);
      }

    })
  } catch (e) {
    console.log(e);
    res.json(e);
  }

});

module.exports = router;

