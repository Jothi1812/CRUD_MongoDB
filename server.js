const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./db');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));  // Serve static files from the "public" directory

// Create
app.post('/api/students', (req, res) => {
    const { student_name, roll_no, department_name, section, cgpa, email, contact_number } = req.body;
    const query = 'INSERT INTO students (student_name, roll_no, department_name, section, cgpa, email, contact_number) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [student_name, roll_no, department_name, section, cgpa, email, contact_number], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('Student added successfully');
    });
});

// Read
app.get('/api/students', (req, res) => {
    const query = 'SELECT * FROM students';
    connection.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results);
    });
});

// Update
app.put('/api/students/:id', (req, res) => {
    const { id } = req.params;
    const { student_name, roll_no, department_name, section, cgpa, email, contact_number } = req.body;
    const query = 'UPDATE students SET student_name = ?, roll_no = ?, department_name = ?, section = ?, cgpa = ?, email = ?, contact_number = ? WHERE id = ?';
    connection.query(query, [student_name, roll_no, department_name, section, cgpa, email, contact_number, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send('Student updated successfully');
    });
});

// Delete
app.delete('/api/students/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM students WHERE id = ?';
    connection.query(query, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send('Student deleted successfully');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
