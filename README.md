# 📚 P2P Book Exchange Portal

A mini full-stack web application that connects **Book Owners** (who list books to give/rent) and **Book Seekers** (who browse or request books). Built as a part of a full-stack internship assignment.

## ✨ Features

### 👤 User Profiles

- Register as a Book **Owner** or **Seeker**
- Simple email + password mock authentication
- Data stored in flat-file JSON

### 📘 Book Listings

- Owners can:
  - Add book listings with title, author, genre, location, contact info, and cover image
  - Mark listings as _Rented_ or _Available_
  - Edit or delete their own listings
- Seekers can:
  - Browse listings
  - Filter/search by **title**, **location**, and **genre**

### 📤 Image Upload

- Owners can upload a book cover image
- Images are stored on the backend and served via `/uploads/`

### ✍️ User Reviews

- Visitors can leave a review for any book
- Review includes:
  - ⭐ Star rating (1 to 5)
  - 📝 Optional written comment
- Users can choose to post **as Anonymous** or with their **display name**
- All reviews are shown publicly under the book's review section

---

## 🧱 Tech Stack

| Layer        | Technology                          |
| ------------ | ----------------------------------- |
| Frontend     | Vite (TypeScript)                   |
| Backend      | Node.js                             |
| Storage      | File-based JSON (users + books)     |
| Image Upload | Multer + Express static             |
| Deployment   | Vercel (Frontend), Render (Backend) |

---

## 🚀 Live Demo

- **Frontend**: [https://peer-to-peer-book-exchange-portal.vercel.app/](#)
- **Backend API**: [https://peer-to-peer-book-exchange-portal.onrender.com/api](#) (Due to I host in free tier it's may be dalay upto 1 min.)

---

---

## ⚙️ Setup Instructions

### Backend

```bash
cd backend
npm install
node server.js
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 📁 Folder Structure

```
book-exchange-app/
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── data/
│   ├── uploads/
│   └── utils/
├── frontend/
│   ├── src/
│   |   ├── components/
│   |   |   ├── ui/
|   |   |   ├── BookCard.tsx
|   |   |   ├── BookForm.tsx
|   |   |   ├── Footer.tsx
|   |   |   ├── Header.tsx
|   |   |   └── Layout.tsx
│   |   ├── hooks/
│   |   ├── lib/
│   |   ├── pages/
│   |   |   ├── AboutPage.tsx
│   |   |   ├── ....
│   |   |   ├── ....
│   |   └── types/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
```

---

## ⚙️ Setup Instructions

### Backend

```bash
cd backend
npm install
node server.js
```

- Runs on `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
npm run dev

Note:- Make sure change backend url path to actual local host backend url. you found variable named "BACKEND_URL" in below file where you need to modify.
\frontend\src\lib\store.ts
```

- Runs on `http://localhost:3000`

---

## 🧪 Test Users

| Email            | Password | Role   |
| ---------------- | -------- | ------ |
| john@example.com | pass123  | owner  |
| jane@example.com | pass456  | seeker |

---

## ✅ What's Working

- Registration + Login
- File-based storage for users and books
- Seeker/public dashboards with filters
- Filter listings by Genre/Location
- Edit/delete your own book listings
- “Mark as Rented/Exchanged” status toggle
- Deployed backend + frontend

---
