const express = require("express");
const app = express();

app.use(express.json());

let data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.send(data).status(200);
});

app.get("/api/persons/:id", (req, res) => {
  const person = data.find((d) => d.id.toString() === req.params.id);
  if (person) {
    res.send(person).status(200);
  } else {
    res.send("Resource Not Found").status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  data = data.filter((d) => d.id.toString() !== req.params.id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      error: "Name is missing",
    });
  }
  if (!req.body.number) {
    return res.status(400).json({
      error: "Number is missing",
    });
  }

  const isNameExists = data.findIndex((d) => d.name === req.body.name) >= 0;

  if (isNameExists) {
    return res.status(400).json({
      error: "Name should be unique",
    });
  }
  const person = { ...req.body, id: Math.floor(Math.random() * 1000) };

  data.push(person);

  res.send(person).status(201);
});

app.get("/info", (req, res) => {
  const numberOfEntries = data.length;
  const date = new Date().toString();
  res
    .send(
      `<p>Phonebook has info for ${numberOfEntries} people </br> ${date}<p>`
    )
    .end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
