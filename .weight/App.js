import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Header from "./components/Header";

function reload() {
  window.location.reload();
}

function App() {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newTime, setNewTime] = useState(0);
  const [newDate, setNewDate] = useState(0);

  const [note, setUsers] = useState([]);
  const noteCollectionRef = collection(db, "note");

  const createUser = async () => {
    await addDoc(noteCollectionRef, {
      title: newTitle,
      content: newContent,
      time: newTime,
      date: newDate,
    });
    reload();
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "note", id);
    await deleteDoc(userDoc);
    reload();
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(noteCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers(); // eslint-disable-next-line
  }, []);

  return (
    <div classTitle='App' className="noSelect">
      <Header />
      <div className='App'>
        {/* The Modal */}
        <div className='modal fade' tabIndex={-1} id='myModal1'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              {/* Modal Header */}
              <div className='modal-header'>
                <h4 className='modal-title'>Create a new note</h4>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                />
              </div>
              {/* Modal body */}
              <div className='modal-body'>
                <input
                  placeholder='Title...'
                  id='formTitle'
                  className='formContent'
                  onChange={(event) => {
                    setNewTitle(event.target.value);
                  }}
                />{" "}
                <br />
                <input
                  type='date'
                  className='formContent'
                  placeholder='Date...'
                  onChange={(event) => {
                    setNewDate(event.target.value);
                  }}
                />
                <input
                  type='time'
                  className='formContent'
                  placeholder='Time...'
                  onChange={(event) => {
                    setNewTime(event.target.value);
                  }}
                />{" "}
                <br />
                <textarea
                  rows={5}
                  id='formContent'
                  className='formContent'
                  placeholder='Content...'
                  onChange={(event) => {
                    setNewContent(event.target.value);
                  }}
                />{" "}
                <br />
              </div>
              {/* Modal footer */}
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-outline-dark'
                  data-bs-dismiss='modal'>
                  Cancel
                </button>
                <button className='btn btn-primary' onClick={createUser}>
                  {" "}
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>

        {note.map((user) => {
          return (
            <div className='Paper'>
              {" "}
              <h2 className="h3Title">
                {user.title}
              </h2>
              <h5 className="h5Time">
                <span>Dated</span> {user.date}<br/>
                <span> at </span> {user.time}
              </h5>
              <h3 className="h3Content">
                {user.content}
              </h3>
              <button
                className='btn btn-danger'
                onClick={() => {
                  deleteUser(user.id);
                }}>
                {" "}
                Delete
              </button>
            </div>
          );
        })}
      </div>
      <div className='footer'>
        <button
          type='button'
          className='btn btn-outline-primary'
          id='createBtn'
          data-bs-toggle='modal'
          data-bs-target='#myModal1'>
          Add a note
        </button>
      </div>
    </div>
  );
}

export default App;
