
# 📬 MERN Stack Posts Manager

A full-stack MERN application where users can:

🔍 View posts (fetched from MongoDB)

➕ Create new posts

📝 Edit existing posts

❌ Delete posts

All operations are performed via RESTful APIs, with a clean and responsive UI.
## 🚀 Tech Stack

**Client:** React.js (Vite), TailwindCSS

**Server:** Node.js, Express.js, MongoDB (with Mongoose ODM), RESTful API

## 📱 Features

- Retrieve and display posts from MongoDB
-  Create, edit, and delete posts
- Real-time user feedback with toasts
- Fully responsive design
- Built with MVC Architecture in backend
-  JSON-only request validation via middleware



## Screenshots

![Home Page](https://ik.imagekit.io/harishcloudstorage/GitHub%20Repositories/Posts%20Manager/Home%20Page.png?updatedAt=1750021842640)

![Posts Page](https://ik.imagekit.io/harishcloudstorage/GitHub%20Repositories/Posts%20Manager/Posts%20Page.png?updatedAt=1750021842649)

![Create/Update Posts](https://ik.imagekit.io/harishcloudstorage/GitHub%20Repositories/Posts%20Manager/Create%20or%20Update%20Post.png?updatedAt=1750021842646)


## Run Locally

Clone the project

```bash
git clone https://link-to-project
```
### Setup BackEnd

Go to the Backend directory

```bash
cd backend
npm install
```
Start the server app

```bash
  npm run dev
```

### Setup FrontEnd

Go to the FrontEnd directory

```bash
cd frontend
npm install
```
Start the client app

```bash
  npm run dev
```




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### backend/.env

`PORT`

`MONGODB_URI`

### frontend/.env

`VITE_BASEURI`

## 📦 Libraries Used

- Frontend: React, Tailwind, Axios, Sonner
- Backend: Express, Mongoose, CORS, dotenv, nodemon
