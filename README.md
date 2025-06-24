
# 📝 Taskify – Smart Task Scheduler

The Taskify project follows a modular and scalable full-stack web development approach using the MERN-like stack (excluding React for now). The backend is implemented using Node.js and Express.js, providing RESTful API endpoints to handle all task-related operations, including task creation, deletion, updating, and retrieval. These APIs ensure clean communication between the frontend and the server,MongoDB database connected through Mongoose, is used to store task data persistently. The web application that lets users manage their tasks efficiently with time-based alerts, priority levels, and real-time notifications.

## 🚀 Features

- ✅ Add Task with Title, Description, Priority, Deadline, and Time
- 🔔 Notification 10 minutes before deadline
- ⏰ Red border for overdue tasks
- ✅ Completion popup on task mark
- 🗑️ Delete task permanently from database
- 📊 "View All Tasks" table page (MongoDB data)
- ⚙️ Backend: Node.js + Express + MongoDB
- 🎨 Frontend: HTML + CSS + JavaScript

-------------------------------------------------------------------------------------

## 🔧 Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Other:** Notifications API, Custom Icons

-------------------------------------------------------------------------------------

## 📁 Folder Structure

```
Taskify/
│
├── index.html # Main page to add tasks
├── all-tasks.html # View all tasks from database
├── script.js # Frontend logic (UI + fetch + notifications)
├── server.js # Express server + API routes
├── style.css # Styling
│
├── bell.png # Notification icon
├── bin.gif # Delete icon
├── calendar.jpg # Calendar icon
├── clock.jpg # Clock icon
└── README.md

-----------------------------------------------------------------------------------

## 📷 Screenshots


### 🏠 Home Page
![Home Page](screenshots/Screenshot1.png)

### 📋 Added Tasks & 🔔 Notification Popup
![All Tasks](screenshots/Screenshot2.png)

###  View Database
![Popup](screenshots/Screenshot4.png)


------------------------------------------------------------------------------------

## ▶️ How to Run Locally

1. Clone the repo
2. Make sure MongoDB URI is set inside `server.js`
3. Run backend:
```bash
node server.js
```bash
4. Open `index.html` in your browse

-------------------------------------------------------------------------------------

## 👨‍💻 Team Members

- **Varun Rana** – Backend (Node.js + API) + DB (MongoDB)
- **Siddhant Rawat / Rishabh Devshali** – Frontend UI & CSS
- **Varun Rana** – Notification system & Enhancements

-------------------------------------------------------------------------------------

## 📄 License

This project is for educational purposes only.
