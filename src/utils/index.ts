import { useEffect, useState } from "react";
import { navigate } from "gatsby";
import { useLocation } from "@reach/router";

export function useHashRouteToggle(
  hash: string
): [boolean, (bool: boolean) => void] {
  const location = useLocation();

  const [isActive, setIsActive] = useState(false);

  const toggleActive = (bool: boolean) => {
    if (bool !== isActive) {
      if (bool) {
        navigate(`${location.pathname}#${hash}`);
      } else {
        navigate(location.pathname); // Navigate to the same path without hash
      }
      setIsActive(bool);
    }
  };

  useEffect(() => {
    const handleOnHashChange = () => {
      setIsActive(window.location.hash === `#${hash}`);
    };

    window.addEventListener("hashchange", handleOnHashChange);

    // Check initial hash state
    handleOnHashChange();

    return () => window.removeEventListener("hashchange", handleOnHashChange);
  }, [hash]);

  return [isActive, toggleActive];
}

export const getMapUrl = (iFrame) => {
  const srcRegex = /src="([^"]+)"/;
  const src = srcRegex.exec(iFrame);
  const defaultUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1587818542745!5m2!1sen!2sin";

  return !!src?.length ? src[1] : defaultUrl;
};
