import React from "react";

const Modal = () => {
  return (
    <div>
      <button
        type='button'
        className='btn btn-outline-danger'
        data-bs-toggle='modal'
        data-bs-target='#myModal2'>
        Delete
      </button>
      {/* The Modal */}
      <div className='modal fade' tabIndex={-1} id='myModal2'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            {/* Modal Header */}
            <div className='modal-header'>
              <h4 className='modal-title'>Do you want to delete it?</h4>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
              />
            </div>
            {/* Modal footer */}
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-outline-dark'
                data-bs-dismiss='modal'>
                Cancel
              </button>
              <button
                className='btn btn-danger'
                onClick={() => {
                  deleteUser(user.id);
                }}>
                {" "}
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
