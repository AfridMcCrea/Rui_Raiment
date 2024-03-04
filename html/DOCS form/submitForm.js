alert("test");
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Replace 'your_mongodb_connection_string' with your actual MongoDB connection string
const mongoURI = 'mongodb+srv://Cluster79048:<Cluster79048 >@ruiraiment.xcnjmdj.mongodb.net/?retryWrites=true&w=majority&appName=RuiRaiment';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  size: String,
});

const Form = mongoose.model('Form', formSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submitForm', (req, res) => {
  const formData = req.body;

  const newFormEntry = new Form({
    name: formData.name,
    email: formData.email,
    message: formData.message,
    size: formData.size,
  });

  newFormEntry.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving to MongoDB');
    } else {
      res.status(200).send('Form data saved to MongoDB');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});