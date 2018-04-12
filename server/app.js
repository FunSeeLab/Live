const Koa = require('koa');
const http = require('http');
const socket = require('socket.io');
const views = require('koa-views');
const path = require('path');

const app = new Koa();
const server = http.createServer(app.callback());
const io = socket(server);

let loginUser = [];

io.on('connection', function(socket){
  let username = '';
  socket.on('login', (msg) => {
    username = msg;
    loginUser.push({ username, socket });
    console.log('loginUser:', loginUser.join(','));
  });

  socket.on('logout', (msg) => {
    console.log(`${username} logout`);
    loginUser = loginUser.filter((user) => user.name === username);
    console.log('loginUser:', loginUser.join(','));
  });

  socket.on('chat', (msg) => {
    const arr = msg.split('_');
    if(arr[0].trim() === '') {
      io.emit('msgHistory', `${username}对大家说：${arr[1]}`);
      return;
    }
    io.emit('msgHistory', `${username}对${arr[0]}说：${arr[1]}`);
    
  });
  
  socket.on('disconnect', () => {
    console.log(`${username} disconnected`);
    loginUser = loginUser.filter((user) => user.name === username);
    console.log('loginUser:', loginUser.join(','));
  });
});

app.use(views(path.resolve(__dirname, '../views'), { map: { html: 'ejs' } }));

app.use(async(ctx, next) => {
  if(ctx.request.path === '/') {
    await ctx.render('index');
    return;
  }

  return next();
})

server.listen(3000);