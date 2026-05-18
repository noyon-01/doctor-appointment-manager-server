const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
const app = express();
const port = 5000;

// app.use(cors);
// app.use(express.json());

const users = [
  {
    id: "d1",
    name: "Dr. Ayesha Rahman",
    specialty: "Cardiologist",
    image: "https://i.ibb.co/doctor-demo1.jpg",
    experience: "10 years",
    availability: ["09:00 AM - 12:00 PM", "04:00 PM - 07:00 PM"],
    description:
      "Highly experienced cardiologist specializing in heart diseases, preventive care, and patient-centered treatment.",
    hospital: "",
    location: "",
    fee: 800,
    rating: 4.9,
  },
  {
    id: "d2",
    name: "Dr. Mahmud Hasan",
    specialty: "Dermatologist",
    image: "https://i.ibb.co/doctor-demo2.jpg",
    experience: "8 years",
    availability: ["10:00 AM - 01:00 PM", "06:00 PM - 09:00 PM"],
    description:
      "Expert dermatologist focused on skin care, acne treatment, and advanced cosmetic dermatology.",
    hospital: "",
    location: "",
    fee: 700,
    rating: 4.7,
  },
  {
    id: "d3",
    name: "Dr. Nusrat Jahan",
    specialty: "Gynecologist",
    image: "https://i.ibb.co/doctor-demo3.jpg",
    experience: "12 years",
    availability: ["08:00 AM - 11:00 AM", "03:00 PM - 06:00 PM"],
    description:
      "Dedicated gynecologist providing expert care in women’s health, pregnancy, and reproductive medicine.",
    hospital: "",
    location: "",
    fee: 1000,
    rating: 4.8,
  },
  {
    id: "d4",
    name: "Dr. Farhan Ahmed",
    specialty: "Neurologist",
    image: "https://i.ibb.co/doctor-demo4.jpg",
    experience: "15 years",
    availability: ["11:00 AM - 02:00 PM", "05:00 PM - 08:00 PM"],
    description:
      "Specialist in diagnosing and treating neurological disorders with advanced modern techniques.",
    hospital: "",
    location: "",
    fee: 1200,
    rating: 4.9,
  },
  {
    id: "d5",
    name: "Dr. Samira Kabir",
    specialty: "Pediatrician",
    image: "https://i.ibb.co/doctor-demo5.jpg",
    experience: "7 years",
    availability: ["09:30 AM - 12:30 PM", "04:30 PM - 07:30 PM"],
    description:
      "Compassionate pediatrician specializing in child health, vaccinations, and developmental care.",
    hospital: "",
    location: "",
    fee: 600,
    rating: 4.6,
  },
  {
    id: "d6",
    name: "Dr. Tanvir Islam",
    specialty: "Orthopedic Surgeon",
    image: "https://i.ibb.co/doctor-demo6.jpg",
    experience: "14 years",
    availability: ["08:00 AM - 10:00 AM", "06:00 PM - 09:00 PM"],
    description:
      "Experienced orthopedic surgeon focusing on bone, joint, and sports injury treatments.",
    hospital: "",
    location: "",
    fee: 900,
    rating: 4.8,
  },
  {
    id: "d7",
    name: "Dr. Rubaiyat Karim",
    specialty: "ENT Specialist",
    image: "https://i.ibb.co/doctor-demo7.jpg",
    experience: "9 years",
    availability: ["10:00 AM - 01:00 PM", "03:00 PM - 06:00 PM"],
    description:
      "ENT specialist providing treatment for ear, nose, throat, and sinus-related disorders.",
    hospital: "",
    location: "",
    fee: 650,
    rating: 4.5,
  },
  {
    id: "d8",
    name: "Dr. Sharmeen Akter",
    specialty: "Psychiatrist",
    image: "https://i.ibb.co/doctor-demo8.jpg",
    experience: "11 years",
    availability: ["09:00 AM - 11:00 AM", "05:00 PM - 08:00 PM"],
    description:
      "Mental health specialist dedicated to counseling, therapy, and psychiatric treatment.",
    hospital: "",
    location: "",
    fee: 850,
    rating: 4.7,
  },
  {
    id: "d9",
    name: "Dr. Imran Chowdhury",
    specialty: "General Physician",
    image: "https://i.ibb.co/doctor-demo9.jpg",
    experience: "6 years",
    availability: ["08:30 AM - 11:30 AM", "04:00 PM - 07:00 PM"],
    description:
      "Trusted general physician offering diagnosis, preventive care, and treatment for common illnesses.",
    hospital: "",
    location: "",
    fee: 500,
    rating: 4.4,
  },
];

app.get("/", (req, res) => {
  res.send("This is Doctor Appointment Manager Server!");
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
