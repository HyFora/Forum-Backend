### Willkommen zum Forum-Backend! 

Dieses Projekt bietet eine hervorragende Gelegenheit, Backend-Entwicklungsfähigkeiten zu entwickeln und zu präsentieren. Es umfasst wesentliche Funktionen wie:

👥 Benutzerverwaltung: Registrierung und sichere Anmeldung
📝 Beitragserstellung: Nutzer können Beiträge verfassen, bearbeiten und löschen.
💬 Kommentarverwaltung: Hinzufügen, Bearbeiten und Löschen von Kommentaren zu Beiträgen.
--

#### Technologien 🛠️
Dieses Projekt wurde unter Verwendung moderner Technologien entwickelt:

Programmiersprache: JavaScript, Node.js mit Express.js
Datenbank: MongoDB
Authentifizierung: JWT (JSON Web Tokens)
API: RESTful Endpoints

Installation 🚧 
Folgen Sie diesen Schritten im Virtual Studio Code, um das Projekt lokal zu installieren:
1. Repository klonen
````bash
git clone https://github.com/HyFora/Forum-Backend.git
````
3. In das Projektverzeichnis wecheln
````bash
cd Forum-Backend
````
4. Abhängigkeiten installieren
````bash
npm install
````
5. Umgebungsvariablen konfigurieren
````bash
APP_ENV=development
APP_PORT=8000
DB_DRIVER=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USER=IhrBenutzername
DB_PASSWORD=IhrPasswort
DB_NAME=IhrDatenbankname
JWT_SECRET=IhrGeheimerSchlüssel
JWT_EXPIRATION=3600
````

6. Projekt starten
````bash
npm start
````

