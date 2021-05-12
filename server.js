// express에 관련된 모든 세팅만 작성
const app = require('./app.js');
const port = 3000;

app.listen( port , () => {
    console.log('Express listening on port', port );
});