import { SvgIconComponent } from "@mui/icons-material";

// Sub-interface for the ChipTemplate
export interface ChipTemplate {
  icon?: SvgIconComponent;
  chipText: string;
  iconColor?: string;
  textColor?: string;
}

// Sub-interface for Secondary Button
export interface SecondaryButton {
  icon?: SvgIconComponent;
  btnText: string;
  onClick: () => void;
}

// Sub-interface for Primary Button
export interface PrimaryButton {
  btnIcon?: SvgIconComponent;
  btnText: string;
  onClick: () => void;
}

// Main Interface
export interface CustomCardProps {
  image?: string;
  heading?: string;
  description?: string;
  type?: string;
  hoverEffect?: boolean;
  chipTemplate?: ChipTemplate;
  secondaryBtns?: SecondaryButton[];
  primaryBtn?: PrimaryButton;
  actionIcon?: SvgIconComponent;
}
