/*
Uppgift 10
Skapa en SQLite-driven Single Page Application-“fullstack”-applikation
som består av en webbtjänst och ett Vue.js-frontend.
Använd express- och sqlite-paketen,
och servera frontend-applikationen med static-middleware-komponenten i Express.

Filen public/index.html ska vara frontend-applikationens enda HTML-fil,
och denna ska vara tillgänglig via http://localhost:3000.

Applikationen ska kunna presentera (via GET),
lägga till (via POST), ändra (via PUT), och ta bort (via DELETE), städer.

Vue.js-applikationen ska kommunicera med Express-webbtjänsten via fetch.
Express-webbtjänsten ska i sin tur “prata med” en SQLite-databas.

Det är inte nödvändigt att kunna filtrera städer via namn
och/eller befolkningsmängd som i Uppgift 7-9,
men detta skulle kunna vara en bra övning.

En annan (frivillig) övning skulle kunna vara att använda Vue Router och Vuex i frontend-applikationen.

Återanvänd gärna kod från tidigare cities-relaterade inlämningar.

Lämna in all kod som behövs för att köra projektet
och installera dess beroenden med npm install (det vill säga, package.json),
i en Zip-fil som heter fullstack.zip. node_modules-katalogen ska inte ingå i Zip-arkivet.
*/




const state = {
   friend: {},
   friends: [],
   friendName: '',
   friendBday: '',
   friendCity: '',
   friendCountry: '',
   friendHappy: '',
   friendAngry: '',
   friendFood: '',
   friendSiblings: null,
   friendBandOrSinger: '',
   friendColor: '',
   friendSecret: '',
   friendInterest1: '',
   friendInterest2: '',
   friendNickname: '',
   message: ''
}

const actions = {
   // POST
   addFriend(context, friend) {

      fetch('http://localhost:3000/friends', {
         body: JSON.stringify(friend),
         headers: {
            'Content-Type': 'application/json'
         },
         method: 'POST'
      })
      .then(response => {
         return response.text()
      })
      .then(result => {
         store.commit('setMessage', result)
      })

   },

   // GET
   fetchAllFriends() {
      fetch('http://localhost:3000/friends')
      .then(response => response.json())
      .then(result => store.commit('setFriends', result))
   },
   // GET
   fetchOneFriend(context, id) {
      fetch('http://localhost:3000/friends?id=' + id)
      .then(response => response.json())
      .then(result => {
         store.commit('setFriend', result[0])
      })
   },


   // PUT
   alterFriend(context, [id, friend]) {

      fetch('http://localhost:3000/friends/' + id, {
         body: JSON.stringify(friend),
         headers: {
            'Content-Type': 'application/json'
         },
         method: 'PUT'
      })
      .then(response => {
         return response.text()
      }).then(result => {
         store.commit('setMessage', result)
         store.dispatch('fetchOneFriend', id)
         console.log(JSON.stringify(friend))
         console.log(friend)
      })
   },


   // DELETE
   deleteFriend(context, id) {
      fetch('http://localhost:3000/friends?id=' + id, {
         method: 'DELETE'
      }).then(response => {
         return response.text()
      }).then(result => {
         store.commit('setMessage', result)
         store.dispatch('fetchAllFriends')
      })
   }
}

const mutations = {
   setFriend(state, friend) {
      state.friend = friend
   },
   setFriends(state, friends) {
      state.friends = friends
   },
   setFriendName(state, friendName) {
      state.friendName = friendName
   } ,
   setFriendBday(state, friendBday) {
      state.friendBday = friendBday
   },
   setFriendCity(state, friendCity) {
      state.friendCity = friendCity
   },
   setFriendCountry(state, friendCountry) {
      state.friendCountry = friendCountry
   },
   setFriendHappy(state, friendHappy) {
      state.friendHappy = friendHappy
   },
   setFriendAngry(state, friendAngry) {
      state.friendAngry = friendAngry
   },
   setFriendFood(state, friendFood) {
      state.friendFood = friendFood
   },
   setFriendSiblings(state, friendSiblings) {
      state.friendSiblings = friendSiblings
   },
   setFriendBandOrSinger(state, friendBandOrSinger) {
      state.friendBandOrSinger = friendBandOrSinger
   },
   setFriendColor(state, friendColor) {
      state.friendColor = friendColor
   },
   setFriendSecret(state, friendSecret) {
      state.friendSecret = friendSecret
   },
   setFriendInterest1(state, friendInterest1) {
      state.friendInterest1 = friendInterest1
   },
   setFriendInterest2(state, friendInterest2) {
      state.friendInterest2 = friendInterest2
   },
   setFriendNickname(state, friendNickname) {
      state.friendNickname = friendNickname
   },
   setMessage(state, message) {
      state.message = message
   }
}

const store = new Vuex.Store({
   actions,
   mutations,
   state
})


// Homecomponents:
Vue.component('selection', {

   template: `<div>
                  <p><router-link to="/signup"><button @click="$store.commit('setMessage', null)">Sign up as my new friend</button></router-link></p>
                  <p><router-link to="/allthefriends"><button @click="$store.dispatch('fetchAllFriends')">See all the friends and meddle with the content of the friend list</button></router-link></p>
               </div>`
})

Vue.component('welcome', {
   template: `<div>
                  <h1>Welcome, friend!</h1>
                  <p>What would you like to do?</p>
                  <selection></selection>
              </div>`
})

const start = Vue.component('start', {
   template: `<welcome></welcome>`
})



// The go to home link. On top of the pages.
Vue.component('go-home', {
   template: `<router-link to="/"><button @click="$store.commit('setMessage', null)">Home</button></router-link>`
})


// Add new friend page
Vue.component('add-a-friend-button', {
   template: `<input type="button" value="Add friend" @click="$store.dispatch('addFriend')>`
})

Vue.component('fill-in-info', {
   computed: {
      friendName: {
         get() {
            return this.$store.state.friendName
         },
         set(friendName) {
            this.$store.commit('setFriendName', friendName)
         }
      },
      friendBday: {
         get() {
            return this.$store.state.friendBday
         },
         set(friendBday) {
            this.$store.commit('setFriendBday', friendBday)
         }
      },
      friendCity: {
         get() {
            return this.$store.state.friendCity
         },
         set(friendCity) {
            this.$store.commit('setFriendCity', friendCity)
         }
      },
      friendCountry: {
         get() {
            return this.$store.state.friendCountry
         },
         set(friendCountry) {
            this.$store.commit('setFriendCountry', friendCountry)
         }
      },
      friendHappy: {
         get() {
            return this.$store.state.friendHappy
         },
         set(friendHappy) {
            this.$store.commit('setFriendHappy', friendHappy)
         }
      },
      friendAngry: {
         get() {
            return this.$store.state.friendAngry
         },
         set(friendAngry) {
            this.$store.commit('setFriendAngry', friendAngry)
         }
      },
      friendFood: {
         get() {
            return this.$store.state.friendFood
         },
         set(friendFood) {
            this.$store.commit('setFriendFood', friendFood)
         }
      },
      friendSiblings: {
         get() {
            return this.$store.state.friendSiblings
         },
         set(friendSiblings) {
            this.$store.commit('setFriendSiblings', friendSiblings)
         }
      },
      friendBandOrSinger: {
         get() {
            return this.$store.state.friendBandOrSinger
         },
         set(friendBandOrSinger) {
            this.$store.commit('setFriendBandOrSinger', friendBandOrSinger)
         }
      },
      friendColor: {
         get() {
            return this.$store.state.friendColor
         },
         set(friendColor) {
            this.$store.commit('setFriendColor', friendColor)
         }
      },
      friendSecret: {
         get() {
            return this.$store.state.friendSecret
         },
         set(friendSecret) {
            this.$store.commit('setFriendSecret', friendSecret)
         }
      },
      friendInterest1: {
         get() {
            return this.$store.state.friendInterest1
         },
         set(friendInterest1) {
            this.$store.commit('setFriendInterest1', friendInterest1)
         }
      },
      friendInterest2: {
         get() {
            return this.$store.state.friendInterest2
         },
         set(friendInterest2) {
            this.$store.commit('setFriendInterest2', friendInterest2)
         }
      },
      friendNickname: {
         get() {
            return this.$store.state.friendNickname
         },
         set(friendNickname) {
            this.$store.commit('setFriendNickname', friendNickname)
         }
      }
   },
   template: `<div>
                  <form>
                     <fieldset>
                        <legend>Fill in the form below and become my new friend!</legend>
                           <ul>
                              <li>
                                 Full name: <input type="text" v-model="friendName">
                              </li>
                              <li>
                                 Nickname:  <input type="text" v-model="friendNickname">
                              </li>
                              <li>
                                 Birthday (YYYY-MM-DD):  <input type="text" size="10" v-model="friendBday">
                              </li>
                              <li>
                                 Hometown:  <input type="text" v-model="friendCity">
                              </li>
                              <li>
                                 Homecountry:  <input type="text" v-model="friendCountry">
                              </li>
                              <li>
                                 What makes you happy?  <input type="text" v-model="friendHappy">
                              </li>
                              <li>
                                 What makes you angry?  <input type="text" v-model="friendAngry">
                              </li>
                              <li>
                                 How many siblings do you have?  <input type="text" size="5" v-model="friendSiblings">
                              </li>
                              <li>
                                 Favorite food:  <input type="text" v-model="friendFood">
                              </li>
                              <li>
                                 Favorite color:  <input type="text" v-model="friendColor">
                              </li>
                              <li>
                                 Favorite band (or artist):  <input type="text" v-model="friendBandOrSinger">
                              </li>
                              <li>
                                 Tell me two of your interests:  1 <input type="text" v-model="friendInterest1">  2 <input type="text" v-model="friendInterest2">
                              </li>
                              <li>
                                 Tell me a secret of yours:  <input type="text" size="70" v-model="friendSecret">
                              </li>
                           </ul>
                     </fieldset>
                  </form>
                  <input type="button" value="Add friend"
                   @click="$store.dispatch('addFriend',
                   { friendName, friendBday, friendCity, friendCountry, friendHappy, friendAngry, friendFood, friendSiblings, friendBandOrSinger, friendColor, friendSecret, friendInterest1, friendInterest2, friendNickname } )">
                   <p>{{ $store.state.message }}</p>
               </div>`
})


const signup = Vue.component('sign-up', {
   template: `<div>
                  <go-home />
                  <fill-in-info></fill-in-info>
               </div>`
})


// View/modify or delete friend page:

Vue.component('list-of-friends', {
   computed: {
      friends() {
         return this.$store.state.friends
      }
   },
   template: `<div>
                  <p>{{ $store.state.message }}</p>
                  <ul v-for="friend in friends">
                  <li>
                     <strong>Id: </strong> {{ friend.friendId }}
                  </li>
                     <li>
                        <strong>Name: </strong> {{ friend.name }}
                     </li>
                     <li>
                        <strong>Nickname:</strong> {{ friend.nickname }}
                     </li>
                     <li>
                        <strong>Birthday:</strong> {{ friend.birthday }}
                     </li>
                     <li>
                        <strong>Nr of siblings:</strong> {{ friend.number_of_siblings }}
                     </li>
                     <li>
                        <strong>Hometown:</strong> {{ friend.hometown }}
                     </li>
                     <li>
                        <strong>Homecountry:</strong> {{ friend.homecountry }}
                     </li>
                     <li>
                        <strong>This makes {{ friend.name }} happy:</strong> {{ friend.makes_friend_happy }}
                     </li>
                     <li>
                        <strong>This makes {{ friend.name }} angry:</strong> {{ friend.makes_friend_angry }}
                     </li>
                     <li>
                        <strong>Favorite food:</strong> {{ friend.favourite_food }}
                     </li>
                     <li>
                        <strong>Favorite color:</strong> {{ friend.favourite_color }}
                     </li>
                     <li>
                        <strong>Interests:</strong> {{ friend.interest1 }}, {{ friend.interest2 }}
                     </li>
                     <li>
                        <strong>A secret:</strong> <em>{{ friend.secret }}</em>
                     </li>
                     <router-link to="/editFriend"><button @click="$store.dispatch('fetchOneFriend', friend.friendId)">Edit</button></router-link>
                     <input @click="$store.dispatch('deleteFriend', friend.friendId)" type="button" value="Delete">
                  </ul>
               </div>`
})


// Component with list of friends and buttons with the values Edit and Delete
const viewAndModify = Vue.component('view-and-modify', {
   template: `<div>
                  <go-home />
                  <list-of-friends></list-of-friends>
               </div>
               `
})


// The edit friend page
const editFriend = Vue.component('edit-friend', {
   computed: {
      friend() {
         return this.$store.state.friend
      },
      friendName: {
         get() {
            return this.friend.name
            // return this.$store.state.friendName
         },
         set(friendName) {
            this.$store.commit('setFriendName', friendName)
         }
      },
      friendBday: {
         get() {
            return this.friend.birthday
            // return this.$store.state.friendBday
         },
         set(friendBday) {
            this.$store.commit('setFriendBday', friendBday)
         }
      },
      friendCity: {
         get() {
            return this.friend.hometown
            // return this.$store.state.friendCity
         },
         set(friendCity) {
            this.$store.commit('setFriendCity', friendCity)
         }
      },
      friendCountry: {
         get() {
            return this.friend.homecountry
            // return this.$store.state.friendCountry
         },
         set(friendCountry) {
            this.$store.commit('setFriendCountry', friendCountry)
         }
      },
      friendHappy: {
         get() {
            return this.friend.makes_friend_happy
            // return this.$store.state.friendHappy
         },
         set(friendHappy) {
            this.$store.commit('setFriendHappy', friendHappy)
         }
      },
      friendAngry: {
         get() {
            return this.friend.makes_friend_angry
            // return this.$store.state.friendAngry
         },
         set(friendAngry) {
            this.$store.commit('setFriendAngry', friendAngry)
         }
      },
      friendFood: {
         get() {
            return this.friend.favourite_food
            // return this.$store.state.friendFood
         },
         set(friendFood) {
            this.$store.commit('setFriendFood', friendFood)
         }
      },
      friendSiblings: {
         get() {
            return this.friend.number_of_siblings
            // return this.$store.state.friendSiblings
         },
         set(friendSiblings) {
            this.$store.commit('setFriendSiblings', friendSiblings)
         }
      },
      friendBandOrSinger: {
         get() {
            return this.friend.favourite_band_or_singer
            // return this.$store.state.friendBandOrSinger
         },
         set(friendBandOrSinger) {
            this.$store.commit('setFriendBandOrSinger', friendBandOrSinger)
         }
      },
      friendColor: {
         get() {
            return this.friend.favourite_color
            // return this.$store.state.friendColor
         },
         set(friendColor) {
            this.$store.commit('setFriendColor', friendColor)
         }
      },
      friendSecret: {
         get() {
            return this.friend.secret
            // return this.$store.state.friendSecret
         },
         set(friendSecret) {
            this.$store.commit('setFriendSecret', friendSecret)
         }
      },
      friendInterest1: {
         get() {
            return this.friend.interest1
            // return this.$store.state.friendInterest1
         },
         set(friendInterest1) {
            this.$store.commit('setFriendInterest1', friendInterest1)
         }
      },
      friendInterest2: {
         get() {
            return this.friend.interest2
            // return this.$store.state.friendInterest2
         },
         set(friendInterest2) {
            this.$store.commit('setFriendInterest2', friendInterest2)
         }
      },
      friendNickname: {
         get() {
            return this.friend.nickname
            // return this.$store.state.friendNickname
         },
         set(friendNickname) {
            this.$store.commit('setFriendNickname', friendNickname)
         }
      }
   },
   template: `<div>
                  <go-home />
                  <ul>
                     <li>
                        Name: <input v-model="friend.name">
                     </li>
                     <li>
                        Nickname: <input v-model="friend.nickname">
                     </li>
                     <li>
                        Birthday (YYYY-MM-DD): <input v-model="friend.birthday">
                     </li>
                     <li>
                        Number of siblings: <input v-model="friend.number_of_siblings">
                     </li>
                     <li>
                        Hometown: <input v-model="friend.hometown">
                     </li>
                     <li>
                        Homecountry: <input v-model="friend.homecountry">
                     </li>
                     <li>
                        Makes {{ friendName }} happy:<input v-model="friend.makes_friend_happy">
                     </li>
                     <li>
                        Makes {{ friendName }} angry: <input v-model="friend.makes_friend_angry">
                     </li>
                     <li>
                        Favorite food: <input v-model="friend.favourite_food">
                     </li>
                     <li>
                        Favorite color: <input v-model="friend.favourite_color">
                     </li>
                     <li>
                        Interest 1: <input v-model="friend.interest1">
                     </li>
                     <li>
                        Interest 2: <input v-model="friend.interest2">
                     </li>
                     <li>
                        Secret: <input v-model="friend.secret">
                     </li>
                  </ul>

                  <input
                  @click="$store.dispatch('alterFriend',
                  [friend.friendId,
                     {
                     name: friendName,
                     birthday: friendBday,
                     hometown: friendCity,
                     homecountry: friendCountry,
                     makes_friend_happy: friendHappy,
                     makes_friend_angry: friendAngry,
                     favourite_food: friendFood,
                     number_of_siblings: friendSiblings,
                     favourite_band_or_singer: friendBandOrSinger,
                     favourite_color: friendColor,
                     secret: friendSecret,
                     interest1: friendInterest1,
                     interest2: friendInterest2,
                     nickname: friendNickname
                     }
                  ])"
                  type="button"
                  value="Submit changes">

                  <p>{{ $store.state.message }}</p>
               </div>`
})



const router = new VueRouter({
   routes: [{
      component: start,
      path: '/'
   },{
      component: signup,
      path: '/signup'
   },{
      component: viewAndModify,
      path: '/allthefriends'
   },{
      component: editFriend,
      path: '/editfriend'
   }]
})


new Vue({
   el: '#app',
   store,
   router,
   template: '<router-view></router-view>'
})
