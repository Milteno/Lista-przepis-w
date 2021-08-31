
## Uruchamianie
1. Nalezy stworzyć plik .env
2. 
```
npm install
cd client
npm install
cd ..
mkdir uploads
npm run dev
```

3. Aplikacja powinna się uruchomić w przeglądarce

### Przykładowy plik .env

```
PORT = 3001
JWT_SECRET = "bd251231kx"
MONGO_URI = "mongodb://127.0.0.1:27017/"
```

JWT_SECRET - dowolny string
MONGO_URI - dane do mongo db

### Konto administratora
Żeby mieć konto z uprawnieniami administratora (usuwanie i edycja przepisów), trzeba zrobić konto na mail `admin@admin.pl`. Hasło dowolne.