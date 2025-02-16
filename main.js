 // Warenkorb initialisieren als Array von Objekten
 let warenkorb = [];

 // Funktion zum Hinzufügen von Artikeln zum Warenkorb
 function artikelHinzufuegen(artikel) {
        //const menge = parseInt(document.getElementById('ProduktMenge'+ artikel).value); generische form mittels artikel einrichten 
        const menge = parseInt(document.getElementById('ProduktMenge' + artikel).value);
        const max = parseInt(document.getElementById('ProduktMenge' + artiekl).max);


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
     }
     else {
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
     warenkorb.forEach(function(item) {
         const li = document.createElement('li');
         li.textContent = `${item.name} - Stückzahl: ${item.stueckzahl}`;
         liste.appendChild(li);
     });

     // Warenkorb-Daten als JSON in das versteckte Textfeld setzen
     document.getElementById('modelle').value = JSON.stringify(warenkorb);
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