ascii-conference
================

Fast and Simple html5 video conference over ASCII

DEMO
====
http://ascii-conference.herokuapp.com
Licensed under the MIT License.

**Notes**

Keine besonderen Hinweise.

**Summary**

Die Codebasis implementiert eine kleine Video-Chat-Anwendung, die Videobilder in ASCII-Zeichen umwandelt und zwischen den Teilnehmern austauscht. Die zentrale Idee wird bereits in der README erwähnt: „Fast and Simple html5 video conference over ASCII“.

**Backend**

- `index.js` startet einen Express-Webserver, der die Dateien aus `public/` bereitstellt und gleichzeitig einen WebSocket-Server öffnet.  
- Bei Verbindungen erhalten Clients eine ID, und eingehende Nachrichten werden an alle anderen Teilnehmer gesendet. Das geschieht in der WebSocket-Callback-Funktion, die Nachrichten weiterleitet und IDs aktualisiert.  
- Das Startkommando für Heroku (und lokal) steht in der `Procfile`: `web: node index.js`.  
- Die benötigten npm‑Abhängigkeiten sind `express`, `http` und `ws` (WebSocket-Server) laut `package.json`.

**Frontend**

- `public/index.html` ist die Startseite. Dort befinden sich Platzhalter `<pre>`‑Elemente für die ASCII-Bilder sowie ein Button zum Pausieren.  
- Die eingebundenen Skripte sind in `public/js/` abgelegt. Wichtig sind:
  - `camera.js`: Zugriff auf die Webcam via `navigator.getUserMedia` und periodisches Zeichnen in ein Canvas.
  - `ascii.js`: Liest die Bilddaten des Canvas aus und wandelt sie anhand eines Zeichensatzes in ASCII um.
  - `lz-string.js`: Bibliothek zum Komprimieren der übertragenen Daten.
  - `app.js`: Bindeglied zwischen Kamera, ASCII-Umwandlung und WebSocket-Verbindung. Es sendet die komprimierten ASCII-Daten an den Server und zeigt empfangene Daten in den jeweiligen `<pre>`-Feldern an.

**Wichtig zu wissen / zu erlernen**

Für ein Verständnis und eine mögliche Weiterentwicklung sind folgende Bereiche hilfreich:

1. **Node.js und Express**  
   Das Backend ist sehr kompakt und verwendet Express nur zum Servieren statischer Dateien. Kenntnisse zu Express-Middleware und WebSocket-Bibliotheken (hier `ws`) sind wichtig, um das Verhalten bei Verbindungen oder Fehlern anzupassen.

2. **WebSockets**  
   Die Kommunikation läuft komplett über WebSockets. Einsteiger sollten verstehen, wie Nachrichten im JSON-Format versendet und empfangen werden und wie Broadcasts an alle Clients erfolgen.

3. **HTML5 getUserMedia & Canvas**  
   `camera.js` greift auf die Webcam zu und zeichnet das Videobild auf ein `<canvas>`. Wer den Clientteil verändern will, sollte wissen, wie das Browser-API für Kamera und Canvas funktioniert.

4. **Bildverarbeitung in JavaScript**  
   `ascii.js` zeigt exemplarisch, wie man Bilddaten ausliest und manipuliert. Es werden Farbwerte verändert und Helligkeit berechnet, um daraus ASCII-Zeichen zu wählen.

5. **Datenkompression / Binärübertragung**  
   Durch `lz-string.js` werden die ASCII-Daten komprimiert, um Bandbreite zu sparen. In `string-utils.js` findet sich Hilfslogik, um Strings in ArrayBuffer zu wandeln. Grundwissen zu Base64, ArrayBuffer und Zeichencodierung erleichtert das Verständnis.

Wer die Codebasis nutzen oder erweitern möchte, sollte einen Blick auf die genannten Dateien werfen und schrittweise experimentieren: zuerst lokal den Server starten (`node index.js`), dann mit dem Browser verbinden und die Kamerafreigabe zulassen. Anschließend kann man sich Änderungen an der Bildaufbereitung oder am Messaging vornehmen, um neue Features zu testen.

