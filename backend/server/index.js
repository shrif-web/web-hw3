express =require('express');
Parse = require('parse/node');
Parse.initialize("myAppId");
Parse.serverURL = 'http://localhost:1337/parse'
Parse.User.enableUnsafeCurrentUser()
const app = express();
 

app.use(express.urlencoded({extended:false})); 
app.post('/api/signup', async (req, res) => {
  console.log(req.body);
  const user = new Parse.User();
  user.set("password", req.body.password);
  user.set("email", req.body.email);
  user.set("username", req.body.email);

  try {
    await user.signUp();
    return res.send('success pm');
  } catch (error) {
    console.log(error);
    return res.send(error);
}
});
  
app.post('/api/signin', async (req, res) => {
  // if(Parse.User.current()){
  //   console.log("you");
  // }else{
  //   console.log("not you");
  // }
  try {
    const user = await Parse.User.logIn(req.body.email , req.body.password );
    res.send("you login successfuly")
  } catch (error) {
    res.send(error);
}

});

app.post('/api/logout', async (req, res) => {
  Parse.User.logOut();
  res.send("ok");
});
app.listen(3000, () =>
  console.log(`Example app listening on port 3000!`),
);



// async function start(){
//     const GameScore = Parse.Object.extend("GameScore");
//     const gameScore = new GameScore();

//     gameScore.set("score", 4);
//     gameScore.set("playerName", "Sean Plott");
//     gameScore.set("cheatMode", false);
//     gameScore.set("skills", ["pwnage", "flying"]);

//     gameScore.save().then((gameScore) => {
//     // Now let's update it with some new data. In this case, only cheatMode and score
//     // will get sent to the cloud. playerName hasn't changed.
//     gameScore.set("cheatMode", true);
//     gameScore.set("score", 4);
//     return gameScore.save();
//     });

//     const query = new Parse.Query(GameScore);
//     query.equalTo("score", 4);
//     const results = await query.find();
//     for (let i = 0; i < results.length; i++) {
//     const object = results[i];
// }
// console.log("result => ",results);

// }

