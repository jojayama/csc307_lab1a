import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Teacher",
    },
    {
      id: "abac333",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

const generateRanID = () => {
  return Math.random().toString(36).substr(2, 6)
}

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.status(201).send(result);
  } else {
    res.send(users);
  }
});

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(201).send(result);
  }
});

const addUser = (user) => {
  const id = generateRanID();
  const newUser = { ...user, id };
  users["users_list"].push(newUser);
  return newUser;
};

app.post("/users", (req, res) => {
  const addedUser = req.body;
  addUser(addedUser);
  res.status(201).send();
});

const hardDeleteByID = (id) => {
  users["users_list"] = users["users_list"].filter((user) => user.id !== id);
};

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  if (id != undefined) {
    hardDeleteByID(id);
    res.status(204).send();
  } else {
    res.status(404).send("Resource not found.");
  }
});

const findUsersByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};


app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  console.log("Name: ", name);
  console.log("Job: ", job);

  if ((name != undefined) && (job != undefined)) {
    let result = findUsersByNameAndJob(name, job);
    result = { users_list: result };
    res.status(201).send(result);
  } else {
    res.send(users);
  }
});