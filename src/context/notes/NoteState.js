import NoteContext from "./noteContext";
import { useState } from "react";

//Eta Just akta NoteState namer arrow function 
const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)


    //Get all Note
    const getNotes = async () => {
        //API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET', 
        
            headers: {
              "Content-Type": "application/json",
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwZTZmYzUxZmIyNjAyYjY3ZGRjZDc0In0sImlhdCI6MTY0NTYxOTg4OH0.kIlhXIspMiaDoyG0Vu3qIKuf5koA_FCRiK7bnGMaOIY"
            },
          });
          
        
        const json = await response.json();
        // console.log(json);
        setNotes(json);

    }

    //Add a Note
    const addNote = async (title, description, tag) => {
        //TODO: API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST', 
        
            headers: {
              "Content-Type": "application/json",
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwZTZmYzUxZmIyNjAyYjY3ZGRjZDc0In0sImlhdCI6MTY0NTYxOTg4OH0.kIlhXIspMiaDoyG0Vu3qIKuf5koA_FCRiK7bnGMaOIY"
            },
            body: JSON.stringify({title, description, tag}) 
          });
          
          const note = await response.json();
          setNotes(notes.concat(note))
    }

    //Delete a Note
    const deleteNote = async (id) => {
        // API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE', 
        
            headers: {
              'Content-Type': 'application/json',
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwZTZmYzUxZmIyNjAyYjY3ZGRjZDc0In0sImlhdCI6MTY0NTYxOTg4OH0.kIlhXIspMiaDoyG0Vu3qIKuf5koA_FCRiK7bnGMaOIY"
            }, 
          });
          const json = await response.json();
        //   console.log(json);


        // console.log("Delete the note with id" + id);
        const newNotes = notes.filter((note)=>{return note._id !== id})
        setNotes(newNotes)
    }

    //Edit a Note
    const editNote = async (id, title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT', 
        
            headers: {
              'Content-Type': 'application/json',
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwZTZmYzUxZmIyNjAyYjY3ZGRjZDc0In0sImlhdCI6MTY0NTYxOTg4OH0.kIlhXIspMiaDoyG0Vu3qIKuf5koA_FCRiK7bnGMaOIY"
            },
            body: JSON.stringify({title, description, tag}) 
          });
          const json = response.json();
        //   console.log(json);


          let newNotes = JSON.parse(JSON.stringify(notes))
        
        //Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id === id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {/* etakey erom vabeo use kora jaay <NoteContext.Provider value={{state, update}}> */}
            {props.children}
        </NoteContext.Provider>
    )

}


export default NoteState; 