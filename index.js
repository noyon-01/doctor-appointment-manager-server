const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { createRemoteJWKSet, jwtVerify } = require("jose-cjs");
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

const JWKS = createRemoteJWKSet(new URL("http://localhost:3000/api/auth/jwks"));

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const { payload } = await jwtVerify(token, JWKS);
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbiddern" });
  }
};

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

    //Doctor Details
    app.get("/doctors/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id),
      };
      const result = await appointmentCollection.findOne(query);
      res.send(result);
    });

    //Create Booking
    app.post("/booking", verifyToken, async (req, res) => {
      const BookingData = req.body;
      const result = await bookingCollection.insertOne(BookingData);
      res.send(result);
    });

    //Get Booking
    app.get("/booking/:userId", verifyToken, async (req, res) => {
      const { userId } = req.params;
      const result = await bookingCollection.find({ userId }).toArray();
      res.send(result);
    });

    //update booking
    app.patch("/booking/:id",  async (req, res) => {
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

    //delete booking
    app.delete("/booking/:id",  async (req, res) => {
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
