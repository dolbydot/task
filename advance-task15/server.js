const http = require('http')
const fs = require('fs');
const qs = require('querystring');
const app = http.createServer((req, res) => {

  if (req.url == '/') {
    console.log('hello ')
    fs.createReadStream('./index.html').pipe(res);
  }
  if (req.url == '/jquery.min.js') {
    fs.createReadStream('./jquery.min.js').pipe(res);
  }
  if (/\/api\/loadMore/.test(req.url)) {
    res.writeHead(200, {
      'Content-Type': 'text/plain;charset=utf-8',
    })
    var paramstr = req.url.split('?')[1]
    console.log(qs.parse(paramstr));
    var index = +qs.parse(paramstr).index;
    var length = +qs.parse(paramstr).length
    var result = [];
    for (var i = 0; i < length; i++) {
      result.push(`内容${index + i}`)
    };
    // 模拟比较差的网络状况，2s后响应结果
    setTimeout(function () {
      res.end(JSON.stringify(result), 'utf-8');
    }, 1000);
  }
})
app.listen(9000, () => {
  console.log('server listenig at http://localhost:9000')
})