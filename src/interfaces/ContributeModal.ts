export interface ContributeModalInterface {
  isNavbar?: boolean;
  projectHeading?: string;
  isOpen?: boolean;
  onClose?: (value: boolean) => void;
}

interface PaymentInformation {
  name: string;
  email: string;
  payer_id: string;
  payment_time: string;
  payment_status: string;
}

interface ProjectDetails {
  projectName: string;
  projectId: string;
}

interface InitialFormState {
  amount: string;
  currency: string;
  name: string;
  mob: string;
  email: string;
  paymentInformation: PaymentInformation;
  projectDetails: ProjectDetails;
}

// Example of how to use the interface
export const initialFormState: InitialFormState = {
  amount: "",
  currency: "",
  name: "",
  mob: "",
  email: "",
  paymentInformation: {
    name: "",
    email: "",
    payer_id: "",
    payment_time: "",
    payment_status: "",
  },
  projectDetails: {
    projectName: "",
    projectId: "",
  },
};
