// Handle Quick View Modal Data
document.addEventListener("DOMContentLoaded", () => {
  const quickViewModal = document.getElementById("quickViewModal");
  quickViewModal.addEventListener("show.bs.modal", event => {
    const button = event.relatedTarget;

    document.getElementById("quickViewName").innerText = button.getAttribute("data-name");
    document.getElementById("quickViewCategory").innerText = "Category: " + button.getAttribute("data-category");
    document.getElementById("quickViewDescription").innerText = button.getAttribute("data-description");
    document.getElementById("quickViewPrice").innerText = button.getAttribute("data-price");
    document.getElementById("quickViewImage").src = button.getAttribute("data-image");
  });
});
