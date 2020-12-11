import { LoginView } from "components/Auth";
import Modal from "components/Modal";
import { useModal } from "contexts";

const ModalManager = () => {
  const { type, isVisible, closeModal } = useModal();

  const renderModal = () => {
    switch (type) {
      case "LOGIN_VIEW":
        return <LoginView />;
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
