import { useEffect } from "react"

interface UseEscapeKey {
  onEscapePress: () => void
}

const useEscapeKey = ({onEscapePress}: UseEscapeKey) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onEscapePress();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {document.removeEventListener("keydown", handleKeyDown)};
  }, [])

}

export default useEscapeKey; 