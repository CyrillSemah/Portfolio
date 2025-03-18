document.addEventListener('DOMContentLoaded', function() {
  // Formulaire (s'il existe sur la page contact)
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const formDataObj = {};
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });
      
      if (!validateForm(formDataObj)) {
        return;
      }
      
      formStatus.textContent = "Envoi en cours...";
      formStatus.className = "form-status";
      
      // Correction de l'envoi des données au serveur Node.js
      fetch('/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObj)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          formStatus.textContent = "Votre message a été envoyé avec succès!";
          formStatus.className = "form-status success";
          contactForm.reset();
          
          // Redirection vers l'accueil après 3 secondes
          setTimeout(() => {
            window.location.href = "index.html";
          }, 3000);
        } else {
          showError(data.message || "Une erreur s'est produite lors de l'envoi.");
        }
      })
      .catch(error => {
        showError("Une erreur s'est produite lors de l'envoi. Veuillez réessayer.");
        console.error('Error:', error);
      });
    });
  }
  
  function validateForm(data) {
    if (!data.civilite) {
      showError("Veuillez sélectionner une civilité.");
      return false;
    }
    if (!data.nom || data.nom.trim() === '') {
      showError("Le nom est requis.");
      return false;
    }
    if (!data.email || !isValidEmail(data.email)) {
      showError("Veuillez entrer une adresse email valide.");
      return false;
    }
    if (!data.message || data.message.trim() === '') {
      showError("Le message est requis.");
      return false;
    }
    return true;
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function showError(message) {
    formStatus.textContent = message;
    formStatus.className = "form-status error";
  }
  
  // Machine à écrire pour typewriter-text-1 et typewriter-text-2
  const text1Element = document.getElementById('typewriter-text-1');
  const text2Element = document.getElementById('typewriter-text-2');
  
  if (text1Element && text2Element) {
    // Sauvegarder le contenu original
    const originalText1 = text1Element.innerHTML;
    const originalText2 = text2Element.innerHTML;
    
    // Appliquer un style simple sans animation
    const style = document.createElement('style');
    style.textContent = `
      .static-text {
        position: relative;
        text-align: center;
        width: 100%;
      }
    `;
    document.head.appendChild(style);
    
    // Afficher le texte directement sans animation
    text1Element.className = 'static-text';
    text2Element.className = 'static-text';
  }
});