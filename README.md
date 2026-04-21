# Backend Examen — Ivan Garcia

API REST amb Express per gestionar varietats de bacallà.

## Requisits

- Node.js 18+

## Instal·lació

```bash
npm install
```

## Variables d'entorn

Crea un fitxer `.env` a l'arrel del projecte:

```env
PORT=3001
FRONTEND_URL=https://el-teu-frontend.vercel.app
```

## Execució

```bash
# Desenvolupament (amb hot-reload)
npm run dev

# Producció
npm start
```

## Endpoints

Base URL: `http://localhost:3001`

### GET `/api/bacalla`

Retorna totes les varietats de bacallà.

**Resposta 200:**
```json
[
  {
    "id": 1,
    "nom": "Bacallà de l'Atlàntic",
    "descripcio": "El més comú al mercat...",
    "origen": "Atlàntic Nord",
    "temporada": "Tot l'any",
    "textura": "Ferma"
  },
  ...
]
```

---

### GET `/api/bacalla/:id`

Retorna el detall d'una varietat per `id`.

**Paràmetres:**
- `id` (number) — identificador de la varietat

**Resposta 200:**
```json
{
  "id": 1,
  "nom": "Bacallà de l'Atlàntic",
  "descripcio": "El més comú al mercat...",
  "origen": "Atlàntic Nord",
  "temporada": "Tot l'any",
  "textura": "Ferma"
}
```

**Resposta 404** (si no existeix):
```json
{ "error": "No s'ha trobat cap varietat amb id 99" }
```

---

### GET `/`

Health check.

**Resposta 200:**
```json
{ "status": "ok", "message": "API Bacallà funcionant" }
```
