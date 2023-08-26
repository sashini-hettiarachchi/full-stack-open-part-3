const express = require("express");
const app = express();

app.use(express.json());

const data = [
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
