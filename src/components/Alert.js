import React from 'react'

const Alert = (props) => {

  return (
    <>
      <div className={`alert alert-${props.alert.type} font-monospace ${props.alert.isAlert?"":"d-none"}`} role="alert">
          {props.alert.type==="success"?<i className="fa-solid fa-circle-check me-2"></i>:props.alert.type==="danger"?<i className="fa-solid fa-triangle-exclamation me-2"></i>:props.alert.type==="warning"?<i className="fa-solid fa-triangle-exclamation me-2"></i>:""}{props.alert.msg}
      </div>
    </>
  )
}

export default Alert
