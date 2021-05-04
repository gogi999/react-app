import { useEffect, useState } from 'react';
import { insert, update, read, remove } from '../services/apiService';

const Student = ({ match, history }) => {
    const [id] = useState(match.params.id);
    const [student, setStudent] = useState({
        _id: '0',
        firstName: '',
        lastName: '',
        yearOfBirth: 0,
        address: ''
    });

    useEffect(() => {
        if (id !== '0') {
            read('students', id, data => {
                if (data) setStudent(data);
            });
        }
    }, [id]);
    const [firstNameEmpty, setFirstNameEmpty] = useState(false);
    const [lastNameEmpty, setLastNameEmpty] = useState(false);
    const [yearEmpty, setYearEmpty] = useState(false);

    function changeHandler(e) {
        if (e.target.value && e.target.name === 'firstName') {
            setFirstNameEmpty(false);
        }

        if (e.target.value && e.target.name === 'lastName') {
            setLastNameEmpty(false);
        }

        if (e.target.value && e.target.name === 'yearOfBirth') {
            setYearEmpty(false);
        }

        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    }

    const back = () => {
        history.push('/students');
    }

    const save = () => {
        if (id === '0') {
            if (!student.firstName && !student.lastName && !student.yearOfBirth) {
                setFirstNameEmpty(true);
                setLastNameEmpty(true);
                setYearEmpty(true);
                return;
            }
            if (!student.firstName && !student.lastName) {
                setFirstNameEmpty(true);
                setLastNameEmpty(true);
                return;
            }
            if (!student.firstName && !student.yearOfBirth) {
                setFirstNameEmpty(true);
                setYearEmpty(true);
                return;
            }
            if (!student.lastName && !student.yearOfBirth) {
                setLastNameEmpty(true);
                setYearEmpty(true);
                return;
            }
            if (!student.firstName) {
                setFirstNameEmpty(true);
                return;
            }
            if (!student.lastName) {
                setLastNameEmpty(true);
                return;
            }
            if (!student.yearOfBirth) {
                setYearEmpty(true);
                return;
            }
            student._id = undefined;
            insert('students', student, data => {
                if (data) return history.push('/students');
                console.log('There was error during save data!!!');
            });
        } else {
            if (!student.firstName && !student.lastName && !student.yearOfBirth) {
                setFirstNameEmpty(true);
                setLastNameEmpty(true);
                setYearEmpty(true);
                return;
            }
            if (!student.firstName && !student.lastName) {
                setFirstNameEmpty(true);
                setLastNameEmpty(true);
                return;
            }
            if (!student.firstName && !student.yearOfBirth) {
                setFirstNameEmpty(true);
                setYearEmpty(true);
                return;
            }
            if (!student.lastName && !student.yearOfBirth) {
                setLastNameEmpty(true);
                setYearEmpty(true);
                return;
            }
            if (!student.firstName) {
                setFirstNameEmpty(true);
                return;
            }
            if (!student.lastName) {
                setLastNameEmpty(true);
                return;
            }
            if (!student.yearOfBirth) {
                setYearEmpty(true);
                return;
            }
            update('students', id, student, data => {
                if (data) return history.push('/students');
                console.log('There was error during save data!!!');
            });
        }
    }

    const del = () => {
        remove('students', id, data => {
            history.push('/students');
        });
    }

    return (
        <div className="container">
            <h2>Students</h2>
            <form className="input-form">
                <div style={{ margin: "12px 0" }}>
                    <label htmlFor="firstName">First name: </label>
                    <input
                        type="text"
                        name="firstName"
                        value={student.firstName}
                        onChange={changeHandler}
                        required
                    />
                    {firstNameEmpty && <p>This field is required</p>}
                </div>
                <div style={{ margin: "12px 0" }}>
                    <label htmlFor="lastName">Last name: </label>
                    <input
                        type="text"
                        name="lastName"
                        value={student.lastName}
                        onChange={changeHandler}
                        required
                    />
                    {lastNameEmpty && <p>This field is required</p>}
                </div>
                <div style={{ margin: "12px 0" }}>
                    <label htmlFor="yearOfBirth">Year of Birth: </label>
                    <input
                        type="number"
                        name="yearOfBirth"
                        value={student.yearOfBirth}
                        onChange={changeHandler}
                        required
                    />
                    {yearEmpty && <p>This field is required</p>}
                </div>
                <div style={{ margin: "12px 0" }}>
                    <label htmlFor="address">Address: </label>
                    <input
                        type="text"
                        name="address"
                        value={student.address}
                        onChange={changeHandler}
                    />
                </div>
                <hr />
                {id !== "0" && (
                    <div className="left">
                        <button type="button" onClick={del}>DELETE</button>
                    </div>
                )}
                <div className="right">
                    <button type="button" onClick={back}>BACK</button>
                    &nbsp;&nbsp;
                    <button type="button" onClick={save}>SAVE</button>
                </div>
            </form>
        </div>
    );
}

export default Student;
