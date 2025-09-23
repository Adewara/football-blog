import Modal from "./Modal";
import PostForm from "./PostForm";

export default function DashboardModals({
  modal,
  activePost,
  dispatch,
  onCreate,
  onSave,
  onDelete,
  onLogout,
}) {
  const handleClose = () => dispatch({ type: "CLOSE_MODAL" });

  switch (modal) {
    case "delete":
      return <Modal isOpen onClose={handleClose} onConfirm={onDelete} />;

    case "edit":
      return (
        <Modal isOpen onClose={handleClose}>
          <PostForm
            mode="edit"
            post={activePost}
            onClose={handleClose} // keep consistent
            onSave={onSave} // only sends fields; ID handled in Dashboard
          />
        </Modal>
      );

    case "create":
      return (
        <Modal isOpen onClose={handleClose}>
          <PostForm mode="create" onClose={handleClose} onSave={onCreate} />
        </Modal>
      );

    case "logout":
      return (
        <Modal isOpen onClose={handleClose}>
          <p className="mb-4 text-gray-800">
            Are you sure you want to log out?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </Modal>
      );

    default:
      return null;
  }
}
