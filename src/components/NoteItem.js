import  { useContext, useState }  from 'react';
import noteContext from '../context/notes/noteContext';

function NoteItem(props) {
    const { title, description, tag, date} = props.note;
    const [hover, setHover] = useState(false);
    const context = useContext(noteContext);
    const { deleteNote } = context;

    return (
        <div>
            <div className="note-body font-cursive" onMouseOver={()=>(setHover(true))} onMouseOut={()=>(setHover(false))}>
                <h5 className="note-title font-cursive fw-bold ps-3 text-break">{title.slice(0, 34)}</h5>
                <div className="note-desc px-3 text-break"><p className="text-muted font-cursive">{description.slice(0,175)}</p></div>
                <div className="note-tag font-cursive text-end"><span className='text-muted font-cursive'>Tag: </span>{tag.slice(0, 20)}</div>
                <div className="note-date font-cursive text-muted text-end">{(new Date(date)).toGMTString().slice(0, 25)}</div>
                {/* note action */}
                {hover&&(
                <div className='note-action row d-flex justify-content-evenly mx-auto mb-3 mx-auto show'>
                    <button className="col-5 d-flex justify-content-center shadow text-muted btn-edit btn btn-light border-1 border-dark rounded-pill px-3 py-2 align-items-center" onClick={()=>(props.updateNote(props.note))} ><i className="fa-solid fa-pen-to-square fw-bold me-2"></i>Edit</button>
                    <button className="col-5 d-flex justify-content-center shadow text-muted btn-delete btn btn-light border-1 border-dark rounded-pill px-3 py-2 align-items-center" onClick={()=>(deleteNote(props.note._id))}><i className="fa-solid fa-trash-can fw-bold me-2"></i>Delete</button>
                </div>)}
            </div>
        </div>
    )
}

export default NoteItem
