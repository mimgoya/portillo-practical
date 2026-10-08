import axios from "axios";
import { useEffect, useState } from "react";

function App(){

  const [students,setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const [editId, setEditId] = useState(null);
  
  
  useEffect(() =>{
    axios
        .get("http://localhost:5000/students")
        .then((response) =>{
          setStudents(response.data);
        });
  }, []);

  // CREATE 
 const addStudent = () => {
  if (editId !== null) {
    axios
    .put(`http://localhost:5000/students/${editId}`, {
      name,
      course,
      age
    })
      .then((response) => {
        setStudents((currentStudents) =>
          currentStudents.map((student) =>
            student._id === editId ? response.data : student));
        setEditId(null);
        setName("");
        setCourse("");
        setAge("");
      });
  } else {
    axios
      .post("http://localhost:5000/students", {
        name,
        course,
        age
      })
      .then((response) => {
        setStudents((currentStudents) => [
          ...currentStudents,
          response.data
        ]);
        setName("");
        setCourse("");
        setAge("");
      });}
};

      // EDIT
      const editStudent = (student) => {
        setEditId(student._id);
        setName(student.name);
        setCourse(student.course);
        setAge(student.age);
};
 
// DELETE
const deleteStudent  =  (id) => {
   axios 
     .delete(`http://localhost:5000/students/${id}`)
     .then(() => {
    setStudents((currentStudents) =>
      currentStudents.filter((student) => student._id !== id)
       );
     });
}; 
 
  return(
    <div>

      <h1>Student Management System</h1>

      <form>
        
      <input
      type="text"
      placeholder="Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      />

       <input
      type="text"
      placeholder="Course"
      value={course}
      onChange={(e) => setCourse(e.target.value)}
      />

       <input
      type="text"
      placeholder="Age"
      value={age}
      onChange={(e) => setAge(e.target.value)}
      />

    <button onClick={addStudent}>
      {editId ? "Update Student" : "Add Student"}
    </button>

      </form>
       
      <h2>Students</h2>

      {students.map((student) => (
        <div key={student._id}>
        <p>Name: {student.name}</p>
        <p>Course: {student.course}</p>
        <p>Age: {student.age}</p>

      
      <button onClick={() => editStudent(student)}>Edit</button>

       <button onClick={() => deleteStudent(student._id)}>Delete</button>

     
          </div>
      ))}
    
    </div>

  )
}

export default App;