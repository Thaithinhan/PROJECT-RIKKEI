const app = require('./app/app');
const { Server } = require('http');
const httpServer = new Server(app);
const io = require('socket.io')(httpServer); //Khoier tạo instance của Class

// Tạo một server HTTP từ Express app
app.set('socketio', io); // tạo biến toàn cục để sử dụng ở những noi khác

const port = 4000;
httpServer.listen(port, () => {
  console.log(`Server run on port http://localhost:${port}`);
});
