import { Modal } from "@mui/material";

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
