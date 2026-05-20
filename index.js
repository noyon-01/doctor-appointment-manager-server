const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
dotenv.config();
const port = process.env.PORT;

const uri = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const db = client.db("doctor-appointment");
    const appointmentCollection = db.collection("appointment-collecton");
    const bookingCollection = db.collection("booking-collection");

    app.get("/", (req, res) => {
      res.send("This is Doctor Appointment Manager Server!");
    });

    app.get("/doctors", async (req, res) => {
      const result = await appointmentCollection.find().toArray();
      res.send(result);
    });

    app.get("/doctors/:id", async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id),
      };
      const result = await appointmentCollection.findOne(query);
      res.send(result);
    });

    app.post("/booking", async (req, res) => {
      const BookingData = req.body;
      const result = await bookingCollection.insertOne(BookingData);
      res.send(result);
    });

    app.get("/booking/:userId", async (req, res) => {
      const { userId } = req.params;
      const result = await bookingCollection.find({ userId }).toArray();
      res.send(result);
    });

    app.patch("/booking/:id", async (req, res) => {
      const id = req.params.id;
      const filter = {
        _id: new ObjectId(id),
      };

      const updatedBook = req.body;
      const bookDocument = {
        $set: {
          patientName: updatedBook.patientName,
          phone: updatedBook.phone,
          appointmentDate: updatedBook.appointmentDate,
          appointmentTime: updatedBook.appointmentTime,
        },
      };
      const result = await bookingCollection.updateOne(filter, bookDocument);
      res.send(result);
    });

    app.delete("/booking/:id", async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id),
      };
      const result = await bookingCollection.deleteOne(query);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
