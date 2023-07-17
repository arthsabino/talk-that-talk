import { MutableRefObject, useEffect, useRef, useState } from "react";

export function useClickOutside(ref: MutableRefObject<any>, fn: () => void) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        fn();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [fn, ref]);
}

export function useDropdownVisibility() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, () => setIsOpen(false));
  return { wrapperRef, isOpen, setIsOpen };
}
