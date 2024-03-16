import { useEffect, useState } from "react";
import "./ScrollTopButton.css";

// Defines a button component that allows users to scroll back to the top of the page.
const ScrollTopButton = () => {
  // State to track whether the button is visible.
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Function to toggle the visibility of the scroll-to-top button based on the scroll position.
    const toggleVisibility = () => {
      // Make the button visible if the page is scrolled beyond 300 pixels from the top.
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add the scroll event listener to the window object.
    window.addEventListener("scroll", toggleVisibility);

    // Cleanup function to remove the event listener when the component unmounts.
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Function to scroll the window back to the top when the button is clicked.

  const scrollToTop = () => {
    window.scrollTo({
      top: 0, // Scroll to the very top of the window.
      behavior: "smooth",
    });
  };

  // Render the button only if isVisible state is true.
  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`scroll-top ${isVisible ? "visible" : ""}`}
        >
          ↑ Top
        </button>
      )}
    </>
  );
};

export default ScrollTopButton;
