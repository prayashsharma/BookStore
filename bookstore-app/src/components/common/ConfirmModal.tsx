import React from "react";

interface ConfirmModalProps {
  id: string;
  title: string;
  bodyMessage: string;
  onConfirm: (id?: string) => void;
  onConfirmCancel: () => void;
}

function ConfirmModal({
  id,
  title,
  bodyMessage,
  onConfirm,
  onConfirmCancel,
}: ConfirmModalProps) {
  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {title}
            </h5>
          </div>
          <div className="modal-body">{bodyMessage}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => onConfirmCancel()}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onConfirm(id)}
            >
              Yes, Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
