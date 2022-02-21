export type ModalProps = {
  trigger?: string;
  showing: boolean;
  toggle: (open: boolean | null) => void;
};
