
---

# **Aesthetica Journal – AI-Powered Personal Mood Journal**

Live Frontend: **[https://myjournal-pslq.vercel.app/](https://myjournal-pslq.vercel.app/)**
Backend API: **[https://myjournal-pnlm.onrender.com](https://myjournal-pnlm.onrender.com)**

Aesthetica Journal is an AI-enhanced journaling web application that helps users record entries, visualize mood trends, create personal mood boards, and analyze emotional patterns using AI mood detection powered by Google Gemini.

---

## **Features**

### **1. Secure Authentication**

* User signup with name, email, password
* JWT-based login and session management
* Password hashing (bcrypt)

### **2. Journal Entries**

* Create, edit, delete, and view detailed journal entries
* Each entry is automatically analyzed by AI to detect mood
* Entries stored securely in MongoDB
* Rich UI with card layout and preview text

### **3. Mood Analytics Dashboard**

Provides deep emotional insights using:

* Mood Trend Line Chart (weekly / monthly / yearly)
* Mood Distribution Pie Chart
* Monthly Calendar Heatmap
* Year-wise Mood Summary Heatmap

### **4. Mood Board**

* Upload inspirational images (Base64)
* Save text notes and quotes
* Masonry-style grid layout
* Delete any item instantly

### **5. User Profile**

* Displays user info
* Editable fields (name, email)
* Clean UI with avatar

---

## **Technology Stack**

### **Frontend**

* React (Vite)
* React Router
* Chart.js + react-chartjs-2
* Axios
* Tailwind-style custom CSS

### **Backend**

* FastAPI (Python)
* MongoDB Atlas (Motor async driver)
* Google Gemini API (mood detection)
* JWT Authentication
* Uvicorn server

### **Hosting**

* Frontend → **Vercel**
* Backend → **Render**
* Database → **MongoDB Atlas**

---

## **Project Structure**

### **Frontend**

```
frontend/
 ├── src/
 │   ├── pages/
 │   ├── api/
 │   ├── components/
 │   ├── styles/
 │   └── main.jsx
 ├── index.html
 ├── package.json
 └── vite.config.js
```

### **Backend**

```
backend/
 ├── auth/
 ├── routes/
 ├── models/
 ├── moodboard/
 ├── ai/
 ├── utils/
 ├── main.py
 ├── database.py
 └── .env
```

---

## **Environment Variables**

### **Backend (.env)**

```
MONGO_URI=mongodb+srv://...
GEMINI_API_KEY=your_api_key_here
SECRET_KEY=your_jwt_secret_key
```

### **Frontend**

Inside Vercel Project Settings → Environment Variables:

```
VITE_API_URL=https://myjournal-pnlm.onrender.com
```

---

## **API Endpoints**

### **Authentication**

```
POST /auth/signup
POST /auth/login
```

### **Journal Entries**

```
GET /entries/
GET /entries/{id}
POST /entries/
DELETE /entries/{id}
```

### **Mood Detection (AI)**

```
POST /mood/mood-detect
```

### **Mood Board**

```
GET /board/
POST /board/
DELETE /board/{id}
```

---

## **Local Development Setup**

### **1. Clone the Repository**

```
git clone https://github.com/kuppireddybhageerathareddy1110/myjournal.git
```

---

### **Backend Setup**

```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

### **Frontend Setup**

```
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://127.0.0.1:5173
```

---

## **Deployment Instructions**

### **Frontend (Vercel)**

1. Go to [https://vercel.com](https://vercel.com)
2. Import GitHub repo
3. Set **root directory = frontend**
4. Build Command:

```
npm run build
```

5. Output Directory:

```
dist
```

6. Set environment variable:

```
VITE_API_URL=https://myjournal-pnlm.onrender.com
```

---

### **Backend (Render)**

1. Go to [https://dashboard.render.com](https://dashboard.render.com)
2. Create Web Service → Upload backend folder
3. Set Python version to 3.12+
4. Start command:

```
uvicorn main:app --host 0.0.0.0 --port 10000
```

5. Add environment variables from `.env`

---

## **Screenshots (Optional Section)**

You can paste screenshots of your UI, mood analytics, or dashboard here.

---

## **Future Enhancements**

* Dark mode
* Export journal as PDF
* AI auto-summarization of entries
* Voice-based journaling
* Mood forecasting

---

## **Author**

**Kuppireddy Bhageeratha Reddy**
Developer | CSE | AI/ML Enthusiast

GitHub Repo:
[https://github.com/kuppireddybhageerathareddy1110/myjournal](https://github.com/kuppireddybhageerathareddy1110/myjournal)

---
<img width="1875" height="913" alt="Screenshot 2025-12-12 185450" src="https://github.com/user-attachments/assets/f40b0e49-7bcd-4d24-9725-2135af017a5f" />
<img width="1915" height="830" alt="Screenshot 2025-12-12 185313" src="https://github.com/user-attachments/assets/f059c97f-576b-4df5-99ee-633d65c39b6c" />
<img width="1919" height="857" alt="Screenshot 2025-12-12 185333" src="https://github.com/user-attachments/assets/659a46cb-94fa-415f-8c9a-a15a66098c64" />
<img width="1897" height="662" alt="Screenshot 2025-12-12 185345" src="https://github.com/user-attachments/assets/b18aa1c5-6fbb-42a9-b327-c1cb3b3fcb13" />
<img width="1899" height="764" alt="Screenshot 2025-12-12 185409" src="https://github.com/user-attachments/assets/020dba40-c861-4971-b53f-f6e20448f853" />
<img width="1893" height="780" alt="Screenshot 2025-12-12 185433" src="https://github.com/user-attachments/assets/64b7dd77-46a5-41ec-8f7b-2f8fbf320236" />




