import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const EditNoteModal = (props) => {

    const context = useContext(noteContext);
    const { enote, seteNote } = props;

    const onChange =(e) =>{
        seteNote({...enote, [e.target.name]: e.target.value});
    };

    const handleUpdateNote = ()=>{
        context.editNote(enote.eid, enote.etitle, enote.edescription, enote.etag);
    };

    return (
        <div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h2 className='font-heading text-light mt-3 text-end'>Edit <span style={{ color: "#04a8e7bf", fontFamily: "headingFont" }}>N</span><span style={{ color: "#fef586", fontFamily: "headingFont" }}>o</span><span style={{ color: "#5ab10bbf", fontFamily: "headingFont" }}>t</span><span style={{ color: "#ff5e1e", fontFamily: "headingFont" }}>e</span></h2>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3 addNoteTitle rounded-1">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="etitle" name="etitle" value={enote.etitle} placeholder="Enter a title for your note" onChange={onChange} required minLength={3} maxLength={34}/>
                            </div>

                            <div className="mb-3 addNoteDescription rounded-1">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input type="text" className="form-control" id="edescription" name="edescription" value={enote.edescription} placeholder="Enter a description for your note" onChange={onChange} required minLength={5} maxLength={175}/>
                            </div>

                            <div className="mb-3 addNoteTag rounded-1">
                                <label htmlFor="tag" className="form-label">Tag</label>
                                <input type="text" className="form-control" id="etag" name="etag" value={enote.etag} placeholder="Enter a tag for your note" onChange={onChange} required minLength={3} maxLength={20}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="addnote-btn form-control btn btn-info text-white w-50" data-bs-dismiss="modal" onClick={handleUpdateNote}>Update Note </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditNoteModal
