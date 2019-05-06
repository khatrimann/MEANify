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
          var fromId;
          
          User.findOne({ socketId: data.to })
          .then(user => {
            var online = user.online;
            var toUser = user.username;
            if (online) {
              io.to(data.to).emit('pmsg', data.from + ': ' + data.message);
              User.findOneAndUpdate({ socketId: data.to }, { lastMsg: data.message, $push: { chats: { to: toUser, from: data.from, message: data.message } } }, {upsert: true})
              .then(user => {
                console.log(user);
              });
            } else {
              User.findOne({ username: data.from })
              .then(user => {
                console.log(fromId);
                if (data.message.indexOf('hey') > -1 || data.message.indexOf('hi') > -1 || data.message.indexOf('hello') > -1) {
                  io.to(user.socketId).emit('pmsg', toUser + ': Hi, I am currently offline');
                  user.chats.push({from: toUser, to: data.from, message: 'Hi, I am currently offline'});
                } else if (data.message.indexOf('when') > -1) {
                  io.to(user.socketId).emit('pmsg', toUser + ': I\'ll text you when i\'ll be online');
                  user.chats.push({from: toUser, to: data.from, message: 'I\'ll text you when i\'ll be online'});
                } else if (data.message.indexOf('Ok') > -1 || data.message.indexOf('OK') > -1 || data.message.indexOf('Okay') > -1 || data.message.indexOf('OKAY') > -1 || data.message.indexOf('ok') > -1) {
                  io.to(user.socketId).emit('pmsg', toUser + ': :)');
                  user.chats.push({from: toUser, to: data.from, message: ':)'});

                }
                user.save();
              });
            }
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