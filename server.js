const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const dbConfig = require('./app/config/db.config');
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
            name: "user"
            }).save(err => {
            if (err) {
                console.log("error", err);
            }
    
            console.log("added 'user' to roles collection");
            });
    
            new Role({
            name: "moderator"
            }).save(err => {
            if (err) {
                console.log("error", err);
            }
    
            console.log("added 'moderator' to roles collection");
            });
    
            new Role({
            name: "admin"
            }).save(err => {
            if (err) {
                console.log("error", err);
            }
    
            console.log("added 'admin' to roles collection");
            });
        }
    });
}

const PostRoute = require('./app/routes/post.routes');
const AuthorRoute = require('./app/routes/user-author-access.routes');
const CommentRoute = require('./app/routes/comment.routes');

app.use('/explore', PostRoute);
app.use('/api/comments', CommentRoute);
app.use('/', AuthorRoute);
require('./app/routes/auth.routes')(app);

const Uroute = require('./app/routes/user.routes');
Uroute.app(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});