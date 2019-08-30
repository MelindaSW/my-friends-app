const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const sqlite = require('sqlite')

const app = express()
app.use(bodyParser.json())

app.use(express.static(path.join(path.resolve(), 'public')))

let db
sqlite.open('myFriends.sqlite').then(database => {
   db = database
})


app.get('/friends', (req, res) => {
// If the request contains an id query, send only the friend with a matching id, otherwise, send all friends.
   if (req.query.id) {
      db.all('SELECT * FROM friends WHERE friendId = ?;', [req.query.id])
      .then(friend => {
         res.send(friend)
      })
   } else {
      db.all('SELECT * FROM friends;').then(friends => {
         res.send(friends)
      })
   }
})

app.delete('/friends', (req, res) => {
   db.run('DELETE FROM friends WHERE friendId = ?;', [req.query.id])
   .then(() => {
      res.send('The friend has been unfriended.')
   })
})

app.put('/friends/:id', (req, res) => {
   db.run(`UPDATE friends SET name = ?,
                              birthday = ?,
                              hometown = ?,
                              homecountry = ?,
                              makes_friend_happy = ?,
                              makes_friend_angry = ?,
                              favourite_food = ?,
                              number_of_siblings = ?,
                              favourite_band_or_singer = ?,
                              favourite_color = ?,
                              secret = ?,
                              interest1 = ?,
                              interest2 = ?,
                              nickname = ?
                              WHERE friendId = ?;`,
                              [
                                 req.body.name,
                                 req.body.birthday,
                                 req.body.hometown,
                                 req.body.homecountry,
                                 req.body.makes_friend_happy,
                                 req.body.makes_friend_angry,
                                 req.body.favourite_food,
                                 req.body.number_of_siblings,
                                 req.body.favourite_band_or_singer,
                                 req.body.favourite_color,
                                 req.body.secret,
                                 req.body.interest1,
                                 req.body.interest2,
                                 req.body.nickname,
                                 req.params.id
                              ])
   .then(() => {
      res.send(req.body.name + ' was successfully updated!')
   })
})

app.post('/friends', (req, res) => {
   db.run(`INSERT INTO friends(name,
                              birthday,
                              hometown,
                              homecountry,
                              makes_friend_happy,
                              makes_friend_angry,
                              favourite_food,
                              number_of_siblings,
                              favourite_band_or_singer,
                              favourite_color,
                              secret,
                              interest1,
                              interest2,
                              nickname)
                              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                             [
                              req.body.friendName,
                              req.body.friendBday,
                              req.body.friendCity,
                              req.body.friendCountry,
                              req.body.friendHappy,
                              req.body.friendAngry,
                              req.body.friendFood,
                              req.body.friendSiblings,
                              req.body.friendBandOrSinger,
                              req.body.friendColor,
                              req.body.friendSecret,
                              req.body.friendInterest1,
                              req.body.friendInterest2,
                              req.body.friendNickname
                           ])
   .then( () => {
   res.send('Congrats! ' + req.body.friendName + ' was added to the friend collection!')})
})

app.listen(3000)
