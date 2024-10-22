import React, { useState, useEffect } from 'react'

import { NotesList } from './NotesList'
import { NoteForm } from './NoteForm'

export const App = (props) => {
    const { service } = props

    const [notes, setNotes] = useState([])
    const [selected, setSelected] = useState()
    const [isLoading, setIsLoading] = useState(true);

    // (!) Get notes from service
    useEffect(() => {
        const fetchNotes = async () => {
          try {
            const fetchedNotes = await service.getNotes();
            setNotes(fetchedNotes);
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching notes:', error);
          }
        };
    
        fetchNotes();
      }, [service]);

    // Select new empty note
    function newNote(){
        setSelected({ id: '', title: '', text: '' });
    }

    // Set note as selected
    function onSelect(note){
        setSelected(note);
    }

    // Save note to service
    async function onSubmit(note){
        if (note.id) {
            await service.saveNote(note);
            setNotes((prevNotes) => prevNotes.map((n) => (n.id === note.id ? note : n)));
          } else {
            const newNote = await service.saveNote(note);
            setNotes((prevNotes) => [...prevNotes, newNote]);
          }
          setSelected();
    }

    // Unselect note
    function onCancel(){
        setSelected();
    }

    if (isLoading) {
        return <div>Loading React Notes...</div>;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>React notes</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <NotesList notes={notes} selected={selected} onSelect={onSelect}/>
                </div>
                <div className="col-md-8">
                    <NoteForm 
                        note={selected}
                        onSave={onSubmit}
                        onCancel={onCancel}
                        onChange={setSelected}
                    />
                    <div><button id="new-note" onClick={newNote}>New Note</button></div>
                </div>
            </div>
        </div>
    )
}
