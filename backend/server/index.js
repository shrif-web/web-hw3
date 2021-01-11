express =require('express');
Parse = require('parse/node');
validator = require('validator');
Parse.initialize("myAppId");
Parse.serverURL = 'http://localhost:1337/parse'
Parse.User.enableUnsafeCurrentUser()
const app = express();
 

app.use(express.urlencoded({extended:false})); 
app.post('/api/signup', async (req, res) => {
  console.log("------> ",Object.keys(req.body).length , req.body);
  if(Object.keys(req.body).length != 2){
    return res.status(400).json({message: "Request Length should be 2"});
  }
  if(req.body.password.length < 5){
    return res.status(400).json({message: "filed `password`.length should be gt 5"});
  }
  if(!validator.isEmail(req.body.email)){
    return res.status(400).json({message:"filed `email` is not valid"});
  }
  const user = new Parse.User();
  user.set("password", req.body.password);
  user.set("email", req.body.email);
  user.set("username", req.body.email);

  try {
    await user.signUp();
    return res.status(201).json({message:"user has been created."});
  } catch (error) {
    if(error.code == 202){
      return res.status(409).json({message:"email already exist."});
    }
    // if(error.code == 125){
    //   return res.status(400).json({message:"filed `email` is not valid"});
    // }
    console.log(error);
    return res.json({message:error.message});
}
});
  
app.post('/api/signin', async (req, res) => {
  // if(Parse.User.current()){
  //   console.log("you");
  // }else{
  //   console.log("not you");
  // }
  if(Object.keys(req.body).length != 2){
    return res.status(400).json({message: "Request Length should be 2"});
  }
  if(!validator.isEmail(req.body.email)){
    return res.status(400).json({message:"filed `email` is not valid"});
  }
  try {
    const user = await Parse.User.logIn(req.body.email , req.body.password );
    res.status(200).json({"token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZS"})
  } catch (error) {
    res.status(401).json({message:"wrong email or password."})
}

});

app.get('/api/signin', async (req, res) => {
  return res.status(405).json({message:"Only `Post` Method is Valid"});
});

app.post('/api/logout', async (req, res) => {
  Parse.User.logOut();
  res.json({message:"ok"});
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

