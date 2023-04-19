import styling from "./Modal.module.css";

const Background = () => {
  return (
    <>
      <div className={styling.modal_background}></div>
    </>
  );
};
const ModalBody = (props) => {
  return (
    <>
      <div className={styling.modal_main}>
        <header>
          <h3>{props.title}</h3>
        </header>
        <div>{props.children}</div>
      </div>
    </>
  );
};

const Modal = (props) => {
  return (
    <>
      <Background />
      <ModalBody title={props.title} message={props.message}>
        {props.children}
      </ModalBody>
    </>
  );
};

export default Modal;
