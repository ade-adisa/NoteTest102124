import React from 'react'

export const NoteForm = (props) => {
    // const { note = { title: '', text: '' } } = props
    const { note = { title: '', text: '' }, onSave, onCancel, onChange } = props

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onChange({ ...note, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(note);
    };

    return <form onSubmit={handleSubmit} onReset={onCancel}>
        <div className="form-group">
            <label>Title:</label>
            <input
                className="form-control"
                data-testid="input-title"
                name="title"
                value={note.title}
                onChange={handleInputChange}
            />
        </div>
        <div className="form-group">
            <label>Note:</label>
            <textarea
                className="form-control"
                data-testid="input-text"
                name="text"
                value={note.text}
                onChange={handleInputChange}
            />
        </div>
        <div className="form-group">
            <input
                type="reset"
                data-testid="cancel-note"
                className="btn btn-default pull-right"
                value="Cancel"
                disabled={!note.title}
            />
            <input
                type="submit"
                data-testid="save-note"
                className="btn btn-default pull-right"
                value="Save"
                disabled={!note.title}
            />
        </div>
    </form>
}
