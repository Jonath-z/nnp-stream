import { useEffect, useRef } from "react";

interface SearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
}

export default function SearchPopup({ isOpen, onClose, onSearch }: SearchPopupProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-3/4 max-w-md bg-nnp-primary/70 backdrop-blur-[80px] p-4 rounded-full shadow-lg z-50">
        <input
            id="search-input" 
            ref={inputRef}
            type="text"
            onChange={(e) => onSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-full border border-gray-300 bg-transparent text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-nnp-primary focus:border-transparent"
            placeholder="Search videos..."
        />
    </div>

  );
}