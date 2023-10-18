import { useState, useEffect } from 'react';
import { db } from './firebaseInit';
import { doc, setDoc, getDocs, collection, deleteDoc, onSnapshot } from 'firebase/firestore';
function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", age: "", gender: "", city: "" });

  // fetch user data from firebase database
  useEffect(() => {
    async function fetchUser() {
      const unsub = onSnapshot(collection(db, 'Frontend Assignment'), (snapShot) => {
        const users = snapShot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        })
        setUsers(users);
      })
    }

    fetchUser();

  }, []);

  // edit user by id
  async function editUser(id, data) {
    const docRef = doc(db, 'Frontend Assignment', id);
    await setDoc(docRef, data);
    alert('Document edited successfully');
  }

  // delete user by id
  async function deleteUser(id) {
    const docRef = doc(db, 'Frontend Assignment', id);
    await deleteDoc(docRef);
    alert('Document deleted successfully');
  }

  // add user to firebase databse
  async function addUser() {
    const docRef = doc(collection(db, 'Frontend Assignment'));
    await setDoc(docRef, {
      name: newUser.name,
      email: newUser.email,
      age: newUser.age,
      gender: newUser.gender,
      city: newUser.city
    })
    alert('Document added successfully');

  }


  return (
    <div className='table-container'>
      <h1 style={{ textAlign: 'center' }}>User Table</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody className='table-data'>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.city}</td>
              <td>
                <button className='edit-btn' onClick={() => editUser(user.id, { name: "NewName", email: "NewEmail", age: "NewAge", gender: "NewGender", city: "NewCity" })}>Edit</button>
                <button className='delete-btn' onClick={() => deleteUser(user.id)}>Delete</button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      <div className='user-form'>
        <h2 style={{ textAlign: 'center' }}>Add User Data</h2>
        <input type="text" placeholder='Name' value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
        <input type="text" placeholder='Email' value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
        <input type="text" placeholder='Age' value={newUser.age} onChange={(e) => setNewUser({ ...newUser, age: e.target.value })} />
        <input type="text" placeholder='Gender' value={newUser.gender} onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })} />
        <input type="text" placeholder='City' value={newUser.city} onChange={(e) => setNewUser({ ...newUser, city: e.target.value })} />
        <button onClick={addUser}>Add User</button>
      </div>
    </div>
  );
}

export default App;
