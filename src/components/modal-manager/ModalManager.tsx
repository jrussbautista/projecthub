import { LoginView, SignUpView } from "components/auth";
import Modal from "components/modal";
import { useModal } from "contexts";

const ModalManager = () => {
  const { type, isVisible, closeModal } = useModal();

  const renderModal = () => {
    switch (type) {
      case "LOGIN_VIEW":
        return <LoginView />;
      case "SIGN_UP_VIEW":
        return <SignUpView />;
      default:
        break;
    }
  };

  return (
    <Modal onClose={closeModal} open={isVisible}>
      {renderModal()}
    </Modal>
  );
};

export default ModalManager;
