const express = require("express");
exphbs = require("express-handlebars");
const app = express();
const sqlite = require("sqlite");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const uuidv4 = require("uuid/v4");
const saltRounds = 10;
const dbPromise = sqlite.open("./data.sqlite");

app.engine("handlebars", exphbs());
app.set("view engine","handlebars");
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('public'));



const authorize = async (request,response,next)=>{
    const db = await dbPromise;
    const token = request.cookies.authToken;
    console.log("token from authorize", token);
    if(!token)
    {
        return next();
    }
    const authToken = await db.get("SELECT * FROM authTokens WHERE token=?",token);
    console.log("authToken from authorize", authToken);
    if(!authToken)
    {
        return next();
    }
    const user = await db.get(
        "SELECT name, id FROM users WHERE id=?",authToken.userId);
    console.log("user from authorize", user);
    
    request.user = user;;
    next();
};

app.use(authorize);


// app.get("/", async (request,response) =>{
//     const db = await dbPromise;
//     const messages = await db.all(`SELECT * FROM messages`);
//     const users = await db.all("SELECT * FROM users");
//     response.render("index", {messages: messages, user: request.user});
//     request.cookies.userEmail;
// });


app.post("/", (request,response)=>{
    response.redirect("/");
})


// app.post("/message", async (request,response)=>
// {
//     console.log(request.body);
//     const db = await dbPromise;
    
//     if(!request.user)
//     {
//         return response.render("index", {error: "not logged in"});
//     }
//     if(!request.body || !request.body.message)
//     {
//         return response.render("index", {error: "message not provided"});
//     }

//     await db.run(`INSERT INTO messages (message, authorId, authorName) VALUES (?, ?, ?)`,
//      request.body.message,
//      request.user.id,
//      request.user.name
//      );
//     response.redirect("/");
// });


app.get("/login", (request,response) =>
{
    response.render("login");
});

app.post("/login", async (request,response)=>{
    const db = await dbPromise;
    const {email,password}=request.body;
    const user = await db.get("SELECT * FROM users WHERE email=?",email);
    if(!user)
    {
        return response.render("login", {error: "user not found"});
    }
    const matches = await bcrypt.compare(password,user.password);
    if(!matches)
    {
        return response.render("login",{error: "password is incorrect"})
    }
    
    const token = uuidv4();
    await db.run(
        "INSERT INTO authTokens (token, userId) VALUES (?,?)",
        token,
        user.id
    );
    response.cookie("authToken",token);
    response.redirect("/");
});


app.get("/register", (request, response)=>{
    response.render("register");
});

app.post("/register", async (request,response)=>
{
    const db = await dbPromise;
    const { name, email, password } = request.body;
    let error=null;
    if(!name)
    {
        error = "name field is required";            
    }
    if(!email)
    {
        error = "email field is required";            
    }
    if(!password)
    {
        error = "password field is required";            
    }
    const existingUser = await db.get("SELECT email FROM users WHERE email=?",email);
    if(existingUser)
    {
        return response.render("register",{error: "user already exists"});
    }
    if(error)
    {
        return response.render("register",{error: error});            
    }
    const pwHash =  await bcrypt.hash(password, saltRounds);
    await db.run(`INSERT INTO users (name,email,password) VALUES (?,?,?)`,
    name,
    email,
    pwHash);

    const user = await db.get("SELECT * FROM users WHERE email=?", email);
    const token = uuidv4();
    await db.run(
        "INSERT INTO authTokens (token, userId) VALUES (?,?)",
        token,
        user.id
    );
    response.cookie("authToken",token);
 
    response.redirect("/");
});

app.get("/", (request, response) =>{
    response.render("index", {user: request.user});
    
})

app.get("/logout", (request,response) =>
{
    response.render("logout");
});

app.get("/about", (request,response) =>
{
    response.render("about");
});

app.get("/team", (request,response) =>
{
    response.render("team");
});

app.get("/profile", async(request, response) =>
{
    const db = await dbPromise;
    const creation1 = await db.get("SELECT * FROM creations ORDER BY RANDOM() LIMIT 1" );
    const creation2 = await db.get("SELECT * FROM creations ORDER BY RANDOM() LIMIT 1" );
    const creation3 = await db.get("SELECT * FROM creations ORDER BY RANDOM() LIMIT 1" );
    const creation4 = await db.get("SELECT * FROM creations ORDER BY RANDOM() LIMIT 1" );
    while(creation1.cr8tion == creation2.cr8tion){
        if(creation1.cr8tion == creation2.cr8tion){
            const creation2 = await db.get("SELECT * FROM creations ORDER BY RANDOM() LIMIT 1" );
        }
    }
    while(creation3.cr8tion == creation1.cr8tion || creation3.cr8tion == creation2.cr8tion){
        if(creation3.cr8tion == creation1.cr8tion || creation3.cr8tion == creation2.cr8tion){
            const creation3 = await db.get("SELECT * FROM creations ORDER BY RANDOM() LIMIT 1" );
        }
    }
    while(creation4.cr8tion == creation1.cr8tion || creation4.cr8tion == creation2.cr8tion || creation4.cr8tion == creation3.cr8tion){
        if(creation4.cr8tion == creation1.cr8tion || creation4.cr8tion == creation2.cr8tion || creation4.cr8tion == creation3.cr8tion){
            const creation4 = await db.get("SELECT * FROM creations ORDER BY RANDOM() LIMIT 1" );
        }
    }
    console.log(creation1);
    console.log(creation2);
    console.log(creation3);
    console.log(creation4);
    response.cookie("hairID1", creation1.topID);
    response.cookie("topID1", creation1.midID);
    response.cookie("bottomID1", creation1.bottomID);
    response.cookie("voteID1", creation1.votes);
    response.cookie("userID1", creation1.userID);

    response.cookie("hairID2", creation2.topID);
    response.cookie("topID2", creation2.midID);
    response.cookie("bottomID2", creation2.bottomID);
    response.cookie("voteID2", creation2.votes);
    response.cookie("userID2", creation2.userID);

    
    response.cookie("hairID3", creation3.topID);
    response.cookie("topID3", creation3.midID);
    response.cookie("bottomID3", creation3.bottomID);
    response.cookie("voteID3", creation3.votes);
    response.cookie("userID3", creation3.userID);

    response.cookie("hairID4", creation4.topID);
    response.cookie("topID4", creation4.midID);
    response.cookie("bottomID4", creation4.bottomID);
    response.cookie("voteID4", creation4.votes);
    response.cookie("userID4", creation4.userID);

    response.render("profile" , {user: request.user});
});

app.get("/voting", async(request, response) =>
{
    const db = await dbPromise;
    const creation1 = await db.get("SELECT * FROM creations ORDER BY RANDOM() LIMIT 1" );
    const creation2 = await db.get("SELECT * FROM creations ORDER BY RANDOM() LIMIT 1" );
    while(creation1.cr8tion == creation2.cr8tion){
        if(creation1.cr8tion == creation2.cr8tion){
            const creation2 = await db.get("SELECT * FROM creations ORDER BY RANDOM() LIMIT 1" );
        }
    }
    console.log(creation1);
    console.log(creation2);
    response.cookie("hairID1", creation1.topID);
    response.cookie("topID1", creation1.midID);
    response.cookie("bottomID1", creation1.bottomID);
    response.cookie("voteID1", creation1.votes);
    response.cookie("userID1", creation1.userID);
    response.cookie("cr8tionID1", creation1.cr8tion)

    response.cookie("hairID2", creation2.topID);
    response.cookie("topID2", creation2.midID);
    response.cookie("bottomID2", creation2.bottomID);
    response.cookie("voteID2", creation2.votes);
    response.cookie("userID2", creation2.userID);
    response.cookie("cr8tionID2", creation2.cr8tion)

    response.render("voting" , {user: request.user});
});

app.post("/voting1", async (request,response) =>{
    console.log("in /voting1 post");
    const thisPicCookie1 = request.cookies.cr8tionID1;
    console.log("cookie1 saved");
    const db = await dbPromise;
    await db.run('UPDATE creations SET votes = votes + 1 WHERE cr8tion = ?',
        thisPicCookie1
    );
    console.log("added correct vote")
    response.redirect("/voting");
});

app.post("/voting2", async (request,response) =>{
    console.log("in /voting2 post");
    const thisPicCookie2 = request.cookies.cr8tionID2;
    console.log("cookie2 saved");
    const db = await dbPromise;
    await db.run('UPDATE creations SET votes = votes + 1 WHERE cr8tion = ?',
        thisPicCookie2
    );
    console.log("added correct vote")
    response.redirect("/voting");
});

app.get("/play", (request, response) =>
{
    response.render("play" , {user: request.user});
});

app.post("/play", async (request,response) =>{
    const {hairID, topID, bottomID}=request.body;
    const votes = 0;
    console.log("Attemping to save...");
    console.log("Hair ID: " + hairID);
    console.log("Top ID: " + topID);
    console.log("Bottom ID: " + bottomID);
    console.log("Votes: " + votes);
    console.log("User ID: "+ request.user.id);

    const db = await dbPromise;
    await db.run('INSERT INTO creations (cr8tion, topID, midID, bottomID, votes, userId) VALUES (?,?,?,?,?,?)',
        null,
        hairID,
        topID,
        bottomID,
        votes,
        request.user.id
    )
    response.redirect("/play");
});

app.post("/logout", async (request,response)=>
{
    const db = await dbPromise;
    const token = request.cookies.authToken;
    await db.run(
        "DELETE FROM authTokens WHERE token=?",
        token
    );
 
    response.redirect("/");
});

const setup = async () => 
{
    const db = await dbPromise;
    db.migrate({ force:"last" });
    app.listen(3000,()=> console.log("listening on http://localhost:3000"));
};

setup();


