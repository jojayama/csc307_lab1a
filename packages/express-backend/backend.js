import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World! Go to your users page.")
})

app.get("/users", (req, res) => {
  const { name, job } = req.query;
  userServices.getUsers(name,job)
    .then(users => res.send({users_list:users}))
    .catch(err => res.status(404).send("Resource not found."))
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// app.get("/users?name=<name>", (req, res) => {
//   const {name} = req.query;
//   userServices.findUserByName(name)
//     .then(users => res.send({users_list:users}))
//     .catch(err => res.status(404).send("Resource not found."))
// });



// const users = {
//   users_list: [
//     {
//       id: "xyz789",
//       name: "Charlie",
//       job: "Teacher",
//     },
//     {
//       id: "abac333",
//       name: "Charlie",
//       job: "Janitor",
//     },
//     {
//       id: "abc123",
//       name: "Mac",
//       job: "Bouncer",
//     },
//     {
//       id: "ppp222",
//       name: "Mac",
//       job: "Professor",
//     },
//     {
//       id: "yat999",
//       name: "Dee",
//       job: "Aspring actress",
//     },
//     {
//       id: "zap555",
//       name: "Dennis",
//       job: "Bartender",
//     },
//   ],
// };

// app.get("/users", (req, res) => {
//   const name = req.query.name;
//   if (name != undefined) {
//     let result = findUserByName(name);
//     result = { users_list: result };
//     res.status(201).send(result);
//   } else {
//     res.send(users);
//   }
// });

// const findUserById = (id) =>
//   users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  userServices.findUserById(id)
    .then(users => res.send({users_list:users}))
    .catch(err => res.status(404).send("Resource not found."))
})

app.post("/users", (req, res) => {
  //const addedUser = req.body;
  userServices.addUser(req.body)
    .then(users => res.send({users_list:users}))
    .catch(err => res.status(404).send("Resource not found."))
 // res.status(201).send()
});

// const hardDeleteByID = (id) => {
//   users["users_list"] = users["users_list"].filter((user) => user.id !== id);
// };

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  // if (id != undefined) {
    // hardDeleteByID(id);
  userServices.deleteUserById(id)
    .then(users => res.send({users_list:users}))
    .catch(err => res.status(404).send("Resource not found."))
  // } else {
  //   res.status(404).send("Resource not found");
  // }
});


// app.get("/users", (req, res) => {
//   const name = req.query.name;
//   const job = req.query.job;

//   console.log("Name: ", name);
//   console.log("Job: ", job);

//   if ((name != undefined) && (job != undefined)) {
//     let result = findUsersByNameAndJob(name, job);
//     result = { users_list: result };
//     res.status(201).send(result);
//   } else {
//     res.send(users);
//   }
// });