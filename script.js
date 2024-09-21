document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("documentForm");
    const documentList = document.getElementById("documentList");
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modalTitle");
    const modalBody = document.getElementById("modalBody");
    const modalTags = document.getElementById("modalTags");
    const closeModal = document.querySelector(".close");
  
    let documents = JSON.parse(localStorage.getItem("documents")) || [];  // Load documents from local storage
  
    // Populate document list from localStorage on page load
    updateDocumentList();
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      // Get form values
      const title = document.getElementById("title").value;
      const body = document.getElementById("body").value;
      const tags = document.getElementById("tags").value.split(",").map(tag => tag.trim());
  
      // Create a new document object
      const newDocument = { title, body, tags };
      documents.push(newDocument);
  
      // Save documents to local storage
      localStorage.setItem("documents", JSON.stringify(documents));
  
      // Reset form
      form.reset();
  
      // Update document list
      updateDocumentList();
    });
  
    function updateDocumentList() {
      documentList.innerHTML = "";  // Clear the list
  
      documents.forEach((doc, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <h3>${doc.title}</h3>
          <p>Tags: ${doc.tags.join(", ")}</p>
        `;
        card.addEventListener("click", () => openModal(doc));
        documentList.appendChild(card);
      });
    }
  
    function openModal(doc) {
      modal.style.display = "flex";
      modalTitle.textContent = doc.title;
      modalBody.textContent = doc.body;
      modalTags.textContent = doc.tags.join(", ");
    }
  
    closeModal.addEventListener("click", function () {
      modal.style.display = "none";
    });
  
    window.addEventListener("click", function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
  });
  
