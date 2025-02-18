// Warenkorb initialisieren als Array von Objekten
let warenkorb = [];

// Funktion zum Hinzufügen von Artikeln zum Warenkorb
function artikelHinzufuegen(artikel) {
    const menge = parseInt(document.getElementById('ProduktMenge' + artikel).value);
    const max = parseInt(document.getElementById('ProduktMenge' + artikel).max);

    // Prüfen, ob der Artikel bereits im Warenkorb ist
    const index = warenkorb.findIndex(item => item.name === artikel);

    if (index !== -1) {
        const neueStueckzahl = warenkorb[index].stueckzahl + menge;
        if (neueStueckzahl > max) {
            alert('Maximale Stückzahl erreicht!');
            return;
        }
        // Wenn der Artikel schon im Warenkorb ist, Stückzahl erhöhen
        warenkorb[index].stueckzahl = neueStueckzahl;
    } else {
        // Ansonsten neuen Artikel mit der angegebenen Stückzahl hinzufügen
        warenkorb.push({ name: artikel, stueckzahl: menge });
    }

    // Warenkorb-Liste im HTML aktualisieren
    updateWarenkorb();
}

// Funktion zum Aktualisieren der Warenkorb-Anzeige
function updateWarenkorb() {
    const liste = document.getElementById('warenkorbListe');
    liste.innerHTML = ''; // Liste leeren

    // Durch das Warenkorb-Array iterieren und Artikel mit Stückzahl anzeigen
    warenkorb.forEach(function (item, index) {
        const li = document.createElement('li');
        li.textContent = `${item.name} - Stückzahl: ${item.stueckzahl}`;

        // Entfernen-Button erstellen
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Entfernen';
        removeButton.classList.add('remove-btn');
        removeButton.onclick = function () {
            // Artikel aus dem Warenkorb entfernen
            warenkorb.splice(index, 1);
            updateWarenkorb(); // Warenkorb nach Entfernen aktualisieren
        };

        // Entfernen-Button zum li-Element hinzufügen
        li.appendChild(removeButton);
        liste.appendChild(li);
    });

    // Warenkorb-Daten als JSON in das versteckte Textfeld setzen
    document.getElementById('modelle').value = JSON.stringify(warenkorb);

    // Anzahl der Artikel im Warenkorb berechnen und im Badge anzeigen
    const anzahl = warenkorb.reduce((summe, item) => summe + item.stueckzahl, 0);
    const badge = document.getElementById('warenkorbBadge');
    badge.textContent = anzahl;

    // Badge anzeigen, wenn Artikel im Warenkorb sind, andernfalls ausblenden
    if (anzahl > 0) {
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}


(function(){
    emailjs.init("SCybvvddIN-VCwUvr");  // Ersetzen Sie "YOUR_USER_ID" durch Ihre EmailJS-Benutzer-ID
})();

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    emailjs.sendForm('service_xr6188j', 'template_yp73g3e', this)
        .then(function() {
            alert('E-Mail erfolgreich gesendet!');
            document.getElementById('contact-form').reset();
        }, function(error) {
            alert('Fehler beim Senden der E-Mail. Fehler: ' + JSON.stringify(error));
        });
});

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".NavigationLinks");

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
});

// Menü ein- und ausblenden
function toggleMenu() {
    const menu = document.querySelector('.menu-options');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

// Springt zur gewählten Sektion
function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'instant' });
    toggleMenu(); // Menü schließen nach Auswahl
}

// Funktion zum Hinzufügen eines Artikels zum Warenkorb und Springen zum Warenkorb
function artikelHinzufuegenUndSpringen(artikel) {
    // Zuerst Artikel zum Warenkorb hinzufügen
    artikelHinzufuegen(artikel);

    // Dann zum Warenkorb-Bereich scrollen
    const warenkorbSection = document.getElementById('Kontakt'); // Hier den richtigen ID des Warenkorb-Sections anpassen
    if(warenkorbSection) {
        // Scrollt zur Warenkorb-Section
        warenkorbSection.scrollIntoView({ behavior: 'instant' });
    }
}
