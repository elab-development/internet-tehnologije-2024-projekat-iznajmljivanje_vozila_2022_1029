Iznajmljivanje Vozila
=====================

**Full-stack web aplikacija za upravljanje najmom automobila**Backend: Laravel (PHP 8) • Frontend: React (JSX + Hooks) • Baza: MySQL + phpMyAdmin • Autentifikacija: Sanctum • REST API • OpenStreetMap + Leaflet • Recharts • api.exchangerate.host & Alpha Vantage

🚀 Pregled
----------

Aplikacija „Iznajmljivanje Vozila“ pruža najmodernije iskustvo rezervacije automobila:

*   **Neulogovani korisnik** može da se registruje ili prijavi.
    
*   **Obični korisnik**: pregleda vozila, kreira/menja/otkazuje rezervacije, konvertuje cene u više valuta.
    
*   **Administrator**: upravlja korisnicima, automobilima i pristupa detaljnoj statistici (rezervacije, prihodi, popularnost, cene akcija).
    

Kompletna arhitektura prati **MVC** pattern:

1.  **Model**: Eloquent entiteti (User, Auto, Rezervacija, Kategorija) sa definisanim vezama.
    
2.  **Controller**: REST kontroleri (AuthController, AutoController …) koji obrađuju zahteve, validaciju i vraćaju JSON resurse.
    
3.  **View**:
    
    *   _Backend_: AutoResource, RezervacijaResource itd.
        
    *   _Frontend_: React komponente (Cars.jsx, Rezervacije.jsx, AdministratorDashboard.jsx …).
        

📦 Struktura repozitorijuma
---------------------------

Plain 
```bash
.
├── vozila_backend/               # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/
│   │   ├── Http/Resources/
│   │   └── Models/
│   ├── database/
│   │   ├── migrations/
│   │   ├── seeders/
│   │   └── factories/
│   ├── routes/api.php
│   └── .env                       # DB & API keys (SANCTUM_SECRET, ALPHA_VANTAGE_KEY)
└── vozila_frontend/              # React SPA
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── cars/
    │   │   ├── administrator-…/
    │   │   ├── autentifikacija/
    │   │   ├── mapa/
    │   │   ├── carousel/
    │   │   └── …
    │   ├── hooks/                 # useAuta, useAuto, useDevonice…
    │   ├── images/                # logo, marker.png, screenshot-i
    │   ├── App.jsx                # BrowserRouter + ProtectedRoutes
    │   └── index.js               # ReactDOM.render
    └── package.json
```

⚙️ Instalacija i pokretanje
---------------------------

1.  bashCopyEditgit clone https://github.com/elab-development/internet-tehnologije-2024-projekat-iznajmljivanje\_vozila\_2022\_1029.git
    
2.  bashCopyEditcd vozila\_backendcomposer installcp .env.example .env# Podesite DB\_\* i REACT\_APP\_ALPHA\_VANTAGE\_KEY u .envphp artisan key:generatephp artisan migrate:fresh --seedphp artisan serve
    
3.  bashCopyEditcd ../vozila\_frontendnpm installnpm start
    
4.  Frontend: [http://localhost:3000](http://localhost:3000)Backend API: [http://127.0.0.1:8000/api](http://127.0.0.1:8000/api)
    

🎯 Ključne funkcionalnosti
--------------------------

### Autentifikacija & autorizacija

*   **AuthController** (register, login, logout)
    
*   JWT tokeni preko Sanctum
    
*   ProtectedRoute komponente sprečavaju neautorizovan pristup
    

### Upravljanje automobilima

*   Pregled, filtriranje i sortiranje liste vozila
    
*   Detalji i konverzija cena u USD, CAD, RSD… (api.exchangerate.host)
    
*   Administrator: CRUD nad oglasima i kategorijama
    

### Rezervacije

*   Kreiranje sa upload-om vozačke dozvole
    
*   Pregled, izmena i brisanje sopstvenih rezervacija
    
*   Administrator: kompletno upravljanje rezervacijama + REST statistika
    

### Administratorski dashboard

*   Ukupan broj rezervacija, ukupan prihod, prosečna dužina najma
    
*   Recharts grafikoni (rezervacije i prihodi po modelu)
    
*   Top 5 popularnih vozila i top 5 cena akcija (Alpha Vantage)
    

### Mapa poslovnica

*   OpenStreetMap + React-Leaflet
    
*   Marker iz components/images/marker.png
    
*   13 lokacija širom Srbije: Beograd (7), Novi Sad (3), Kragujevac, Kruševac, Kraljevo
    
*   Pop-up sa nazivom rent-a-car, adresom i gradom
    

🛠️ Integracije & eksterni servisi
----------------------------------

ServisNamena**api.exchangerate.host**Besplatna konverzija valuta (EUR ↔ USD, CAD, RSD…)**Alpha Vantage**Cene deonica Tesla, BMW, Mercedes, VW, Toyota**OpenStreetMap + Leaflet**Prikaz mape Srbije sa markerima**Recharts**Grafički prikaz statistike**React-Toastify**Obaveštenja o uspehu i grešci

📖 Dokumentacija
----------------

Detaljna dokumentacija je dostupna u **Aleksa\_Kovacevic\_2022\_1029\_projekat.docx** (poglavlja 3.1–3.4):

*   **3.1** Use-case analize i dijagrami
    
*   **3.2** Sekvencijalni dijagrami i struktura sistema
    
*   **3.3** Projektovanje UI, aplikacione logike, migracije i modeli
    
*   **3.4** Dizajn baze podataka i ER model
    

🤝 Autori & licence
-------------------

*   **Autori**: Aleksa Kovačević (2022/1029), Nemanja Ilić (2022/1049)
    
*   **Mentor**: prof. dr Petar Lukovac
    
*   **GitHub**: [https://github.com/elab-development/internet-tehnologije-2024-projekat-iznajmljivanje\_vozila\_2022\_1029](https://github.com/elab-development/internet-tehnologije-2024-projekat-iznajmljivanje_vozila_2022_1029)
    
*   **Licence**: MIT
    

Hvala što ste pogledali ovaj projekat!Slobodno pokrenite demo, istražite kod i ostavite zvezdicu ako vam se sviđa ⭐