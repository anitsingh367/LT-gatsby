export interface EventModalProps {
  //=======================================
  // Component Specific props
  //=======================================
  heading?: string;
  description?: string;
  status?: "upcoming" | "live" | "finished" | ""; // Added empty string for warnings handling
  onClick?: () => void;
  isOpen?: boolean;
  type: string;
  onSubmit?: (bool: boolean) => void;
  mapUrl?: string;
  youtubeUrl?: string;
  onClose?: (value: boolean) => void;
}
