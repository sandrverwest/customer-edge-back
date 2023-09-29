const Contractor = require("../models/contractor");

const handleError = (res, error) => {
  res.status(500).json({ error });
}

module.exports = (io, app) => {
    const fleet = io.of("/fleet");

    fleet.on('connection', (socket) => {
      console.log('A user connected');
    
      socket.on('joinRoom', (room) => {
        socket.join(room);

        Contractor
        .find()
        .then((result) => {
          if(result){
            fleet.to(room).emit('fetchData', result);
          }
        })
        .catch((err) =>{
          fleet.to(room).emit('error', err);
        })
        console.log(`User joined room: ${room}`);
      });
    
      socket.on('leaveRoom', (room) => {
        socket.leave(room);
        console.log(`User left room: ${room}`);
      });
    
      socket.on('sendEntity', (data) => {
        Contractor
        // .findById(data.ssn_ein)
        .findOne({ssn_ein: data.data.ssn_ein})
        .then((result) => {
          if(result) {
            fleet.to(data.room).emit('error', `The following SSN/EIN ${result.ssn_ein} already exists and assigned to ${result.first_name} ${result.last_name}.`);
          } else {
            const contractor = new Contractor(data.data);
            contractor
            .save()
            .then((result) => {
              fleet.to(data.room).emit('message', result);
            })
            .catch((err) => {
              fleet.to(data.room).emit('error', err);
            })
          }
        })
        .catch((err) => {
          fleet.to(data.room).emit('error', err);
        })
      });
    
      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
    });









////////////////// online status

const onlineUsers = [];

const online = io.of("/online");

online.on('connection', (socket) => {
    console.log('User connected');
  
    socket.on('goOnline', (user) => {
      onlineUsers.push(user)

      online.emit('getOnlineUsers', getUpdatedUsers());

      socket.on('disconnect', () => {
        console.log('A user disconnected');
        const indexToRemove = onlineUsers.findIndex(item => item._id === user._id);

        if (indexToRemove !== -1) {
            onlineUsers.splice(indexToRemove, 1);
        }
        online.emit('getOnlineUsers', getUpdatedUsers());
      });
    });

    socket.on('goOffline', (user) => {
        console.log('went offline destriy');
        const indexToRemove = onlineUsers.findIndex(item => item._id === user._id);

        if (indexToRemove !== -1) {
            onlineUsers.splice(indexToRemove, 1);
        }
        online.emit('getOnlineUsers', getUpdatedUsers());
    })
  });
  
  function getUpdatedUsers() {
    return onlineUsers;
  }






  app.get('/api/entities', async (req, res) => {
    Contractor
    .find()
    // .sort({ name: 1 })
    .then((result) => {
        res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err))
  });

  app.get('/api/entities/:id', async (req, res) => {
    Contractor
    .find({cid: req.params.id})
    .then((result) => {
        res
        .status(200)
        .json(result);
    })
    .catch((err) => handleError(res, err))
  });


  app.post('/api/entities/:id', async (req, res) => {
    Contractor
    .findOne({ssn_ein: req.body.ssn_ein})
    .then((result) => {
      if(result) {
        res
        .status(400)
        .json({error: `The following SSN/EIN ${result.ssn_ein} already exists and assigned to ${result.first_name} ${result.last_name}.`})
      } else {
        const contractor = new Contractor(req.body);
        contractor
        .save()
        .then((result) => {

          fleet.to(req.params.id).emit('messageN', result);
          console.log('emmotted to ', req.params.id, result)
          res
          .status(200)
          .json(result);
        })
        .catch((err) => handleError(res, err))
      }
    })
    .catch((err) => handleError(res, err))
  });



  };











  