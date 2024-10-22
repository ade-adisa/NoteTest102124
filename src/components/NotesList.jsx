import React from 'react'

export const NotesList = (props) => {
    const { notes, selected, onSelect } = props
    return <div className="list-group">
        {notes.map(note => 
            <div data-testid="note-item" key={note.id} className={`list-group-item ${selected && selected.id === note.id ? 'active' : ''}`} onClick={() => onSelect(note)}>{note.title}</div>
        )}
        {/* <div data-testid="note-item" className="list-group-item active">Active note example</div>
        <div data-testid="note-item" className="list-group-item">Inactive note example</div> */}
    </div>
}
