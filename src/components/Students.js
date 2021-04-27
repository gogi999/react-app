import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { list } from '../services/apiService';

const Students = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        list('students', data => {
            setStudents(data);
        })
    }, []);

    return (
        <div className="container">
            <h1>Students</h1>
            <table>
                <thead>
                    <tr>
                        <th>Student first name</th>
                        <th>Student last name</th>
                        <th>Student year of birth</th>
                        <th>Student address</th>
                        <td><Link to="/students/0">Add new</Link></td>
                    </tr>
                </thead>
                <tbody>
                    {students.map(s => (
                        <tr key={s._id}>
                            <td>{s.firstName}</td>
                            <td>{s.lastName}</td>
                            <td>{s.yearOfBirth}</td>
                            <td>{s.address}</td>
                            <td>
                                <Link to={`/students/${s._id}`}>Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Students;
