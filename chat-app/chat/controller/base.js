var User = require('../models/user');

module.exports.IOHandler = (io, to="") => {
    io.on('connection', (socket) => {
        console.log('user connected: ' + socket.id);
        module.exports = socket;
        console.log(socket);
        var userid = getUser();
        console.log(userid);

        socket.on('login', (id) => {
          User.findOneAndUpdate({ _id: id }, { socketId: socket.id, online: true })
          .then(user => {
            console.log(user);
          });
        }); 
        
        socket.on('msg', (data) => {
          console.log('Sending msg: ' + data.message + ' to ' + data.to);
          io.to(data.to).emit('pmsg', data.message);
          User.findOneAndUpdate({ socketId: data.to }, { lastMsg: data.message }, {upsert: true})
          .then(user => {
            console.log(user);
          });
        });

        socket.on('disconnect', () => {
          console.log(socket.id + ' disconnected');
          User.findOneAndUpdate({ socketId: socket.id }, { online: false})
          .then(user => {
            console.log(user);
          });
        });

        socket.on('new-message', (message, to) => {
          console.log(message);
            if (to) {
              io.to(to).emit(message);
            }
            console.log(socket.id);
        });
      });
};

var userId;

module.exports.setUserId = (Id) => {
  userId = Id;
};

function getUser() {
  return userId;
}