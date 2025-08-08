const iban = document.getElementById("iban");
const pays = document.getElementById("country");
const name = document.getElementById("name");
const prenom = document.getElementById("prenom");
const montant = document.getElementById("montant");
const actionfinish = document.getElementById("actionfinish");
const recaputilatif = document.getElementById("recaputilatif");
const zoneErreur = document.getElementById("zoneErreur");
const topImage = document.getElementById("topImage");

const myRib = document.getElementById("myRib")
const myName = document.getElementById("myName")
const myLastName = document.getElementById("myLastName")
const myMontant = document.getElementById("myMontant")

const zonePrincipal = document.getElementById("zonePrincipal");
const zone1 = document.getElementById("zone1");
const zone2 = document.getElementById("zone2");
const zoneChargement = document.getElementById("zoneChargement");

const action1 = document.getElementById("action1");
const action2 = document.getElementById("action2");
const action3 = document.getElementById("action3");

document.getElementById("action1").addEventListener("click", function () {

    if (iban.value !== "" && pays.value !== "") {

        zonePrincipal.classList.add("hidden");
        zone1.classList.remove("hidden");

    } else {

        alert("Le champ de saisie est vide")

    }

});

document.getElementById("action2").addEventListener("click", function () {

    if (name.value !== "" && prenom.value !== "" && montant.value !== "") {

        zone1.classList.add("hidden");
        recaputilatif.classList.remove("hidden");

        // Ajouter les valeurs 
        myRib.innerText = iban.value;
        myName.innerText = name.value;
        myLastName.innerText = prenom.value;
        myMontant.innerText = montant.value;

        // Supprimer l'image
        topImage.classList.add("hidden")

        // ===== Envoi Email via EmailJS (si configuré) =====
        try {
            if (typeof emailjs !== "undefined" &&
                typeof EMAILJS_SERVICE_ID !== "undefined" && EMAILJS_SERVICE_ID &&
                typeof EMAILJS_TEMPLATE_ID !== "undefined" && EMAILJS_TEMPLATE_ID) {

                // Construire les paramètres selon les clés attendues par le template
                const params = {};
                const keys = (typeof EMAILJS_TEMPLATE_PARAMS_KEYS === 'object' && EMAILJS_TEMPLATE_PARAMS_KEYS) || {};
                // Champs saisis par l'utilisateur
                params[keys.iban || 'iban'] = iban.value;
                params[keys.country || 'country'] = pays.value;
                params[keys.name || 'name'] = name.value;
                params[keys.prenom || 'prenom'] = prenom.value;
                params[keys.montant || 'montant'] = montant.value;

                // Inclure automatiquement d'autres paramètres statiques définis dans EMAILJS_TEMPLATE_PARAMS_KEYS
                // Exemple: senderName, email, message
                try {
                    const knownFormKeys = ['iban', 'country', 'name', 'prenom', 'montant'];
                    Object.keys(keys).forEach(function (k) {
                        if (!knownFormKeys.includes(k)) {
                            const staticValue = keys[k];
                            if (typeof staticValue !== 'undefined' && staticValue !== null && String(staticValue).length > 0) {
                                // Utilise le nom de variable tel que défini par la clé (ex: 'senderName')
                                params[k] = staticValue;
                            }
                        }
                    });
                } catch (_) {
                    // Ignorer proprement si la structure n'est pas celle attendue
                }

                // Anti double-clic: désactive le bouton temporairement
                const btn = document.getElementById('action2');
                const previousText = btn.innerText;
                btn.disabled = true;
                btn.innerText = 'Envoi en cours...';

                // Respecte le drapeau global de settings: DisableEmailSend
                const isEmailDisabled = (typeof DisableEmailSend !== 'undefined' && DisableEmailSend === true);
                if (isEmailDisabled) {
                    // Ne pas envoyer d'email, restaurer l'état du bouton immédiatement
                    btn.disabled = false;
                    btn.innerText = previousText;
                } else {
                    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
                        .then(function () {
                            // Succès: on remet le bouton à l'état normal silencieusement
                            btn.disabled = false;
                            btn.innerText = previousText;
                        })
                        .catch(function () {
                            // Erreur: on ne casse pas le flux, on réactive juste le bouton
                            btn.disabled = false;
                            btn.innerText = previousText;
                        });
                }
            }
        } catch (e) {
            // Ne pas interrompre le parcours en cas d'erreur inattendue
            console.warn('EmailJS non configuré ou erreur d\'exécution:', e);
        }

    } else {

        alert("Le champ de saisie est vide")

    }
});

document.getElementById("actionfinish").addEventListener("click", function () {

    recaputilatif.classList.add("hidden");
    zoneChargement.classList.remove("hidden");

    setTimeout(() => {
        zoneChargement.classList.add("hidden");
        zoneErreur.classList.remove("hidden");

    }, 3000);
});
