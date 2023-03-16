import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import EditNoteModal from './EditNoteModal';
import NoteItem from './NoteItem';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, fetchAllNotes } = context;
    const [enote, seteNote] = useState({ eid: "", etitle: "", edescription: "", etag: "" });

    // api call
    useEffect(() => {
        if (localStorage.getItem("token")) {
            fetchAllNotes();
        }
        // eslint-disable-next-line
    }, [])

    // ref
    const ref = useRef(null);
    // use of ref
    const updateNote = (currentNote) => {
        ref.current.click();
        seteNote({ eid: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    return (


        <div className='notes container'>

            {/* <!-- Button trigger modal --> */}
            <button type="button" ref={ref} className="btn btn-primary" hidden={true} data-bs-toggle="modal" data-bs-target="#exampleModal"></button>

            {/* modal */}
            <div className="container my-5">
                <EditNoteModal enote={enote} seteNote={seteNote} />
            </div>

            <hr />
            {/* // notes */}
            <div className="container my-5">
                <h1 className='font-heading text-start mt-3 text-white'>Your Notes:</h1>
                <div className="underline p-bg-color me-auto"></div>
                <div className="d-flex justify-content-evenly">

                    {!localStorage.getItem("token")
                    ? (<div className='text-center'><p className='t-lable'>You are not authorize to view notes, Please login first!</p></div>)
                    : notes.length === 0
                    ? (<div className='text-center'><div>
                        <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_ycdtcb3u.json" background="transparent" speed="1" style={{ width: "300px", height: "300px" }} loop autoplay></lottie-player></div>
                        <p className='t-lable'>No notes to display, Please add a note first!</p>
                     </div>)
                    : notes.map((note) => {
                        return (
                            <div className={`note note${note.date.charAt(18)} col-md-3 mx-2 my-3`} key={note._id} style={{ width: '16rem' }}>
                                <div className="col-md3 mx-2 my-3"></div>
                                <NoteItem note={note} updateNote={updateNote} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Notes
