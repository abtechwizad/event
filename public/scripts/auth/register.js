import ToastBar from "../lib/snackBar.js";
    const Snackbar = new ToastBar({
  duration: 3500,
  position: 'bottom-center'   // ya 'top-center', 'bottom-left', etc.
});


document.addEventListener("DOMContentLoaded",async() => {

Snackbar.error("hello")
})