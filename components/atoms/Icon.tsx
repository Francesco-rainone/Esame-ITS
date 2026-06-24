import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getIcon, type IconName } from "@/utils/icons";

interface IconProps {
  name: IconName;
  className?: string;
  size?: "xs" | "sm" | "lg" | "xl" | "2x" | "1x";
}

const Icon = ({ name, className = "", size }: IconProps) => (
  <FontAwesomeIcon
    icon={getIcon(name)}
    className={className}
    size={size}
  />
);

export default Icon;