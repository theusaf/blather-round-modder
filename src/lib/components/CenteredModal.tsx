import { Modal } from "@mui/material";

/**
 * A modal with a centered content area.
 *
 * @param open Whether the modal is open.
 * @param onClose The function to call when the modal is closed.
 * @param children The content of the modal.
 * @param className Additional classes to apply to the modal content.
 */
export default function CenteredModal({
  open,
  onClose,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="h-full pointer-events-none flex items-center">
        <div className="flex flex-col items-center flex-1">
          <div
            className={`bg-slate-300 p-4 rounded-md pointer-events-auto w-full md:w-4/5 min-h-[80vh] max-h-screen md:max-h-[90vh] overflow-y-auto ${className ?? ""}`}
          >
            {children}
          </div>
        </div>
      </div>
    </Modal>
  );
}
