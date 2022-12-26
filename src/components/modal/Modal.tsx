import ReactDOM from "react-dom";
import Button from "../ui/Button/Button";
import { Title } from "../ui/Typography/Typography";
import "./Modal.css";

export type ModalProps = {
  show: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onBack: () => void;
  showBackBtn: boolean;
};

const Modal = ({
  show,
  title,
  showBackBtn,
  children,
  onClose,
  onBack,
}: ModalProps) => {
  return ReactDOM.createPortal(
    <div className={`modal ${show ? "show" : ""}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <Title text={title} level={4} />

          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={onClose}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          {showBackBtn && (
            <Button type="primary" onClick={onBack}>
              Back
            </Button>
          )}

          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
