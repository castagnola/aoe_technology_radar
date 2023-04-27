import "./ModalCheckbox.scss";
import ReactModal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "var(--color-gray-dark)",
    color: "var(--color-white)",
    padding: 0,
    borderRadius: "20px",
  },
  overlay: {
    zIndex: 999,
    backgroundColor: "rgba(71, 81, 87, 0.6)",
  },
};

export type CheckBoxItem = {
  name: string;
  value: string
  checked: boolean;
}

type FilterProps = {
  items: CheckBoxItem[];
  handleChange: (item: CheckBoxItem) => void;
  isOpen: boolean;
  closeModal: () => void
};

function ModalCheckbox({ items, isOpen, handleChange, closeModal }: FilterProps, ref: any) {

  const handleChangeModal = (item: CheckBoxItem) => {
    handleChange(item);
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Filters Modal"
      closeTimeoutMS={300}
    >
      <div className="tags-modal">
        <button
          onClick={closeModal}
          className="tags-modal__close-button link-button"
        >
          <span className="icon icon--close" />
        </button>
        <h4 className="headline tags-modal__title">Seleccionar hubs</h4>
        <ul
          className="tags-modal__list"
          style={{ height: "auto" }}
        >
          {items.map((item, index) => (
            <li key={index} className="tags-modal__list-item">
              <input
                type="checkbox"
                id={`tag-checkbox-${index}`}
                className="tags-modal__list-item-checkbox"
                name={item.name}
                value={item.value}
                checked={item.checked}
                onChange={() => handleChangeModal(item)}
              />
              <label htmlFor={`tag-checkbox-${index}`}>{item.value}</label>
            </li>
          ))}
        </ul>
      </div>
    </ReactModal>
  );
}

export default ModalCheckbox;