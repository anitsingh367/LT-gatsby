export interface EventModalProps {
  //=======================================
  // Component Specific props
  //=======================================
  heading?: string;
  description?: string;
  status?: "Upcoming" | "Live" | "Finished" | ""; // Added empty string for warnings handling
  onClick?: () => void;
  isOpen?: boolean;
  type: string;
  onSubmit?: (bool: boolean) => void;
  mapUrl?: string;
  youtubeUrl?: string;
  onClose?: (value: boolean) => void;
}
