# Family Tree Frontend

 ![Family Tree](https://your-image-url.com)

## 🌳 Overview
**Family Tree** is a web application that allows users to create, manage, and explore family trees interactively. Users can add family members, assign roles, upload images, and control access permissions.

This project is built with **Next.js 15**, **React 19**, **Redux Toolkit**, **TailwindCSS**, and **MUI**.

---

## 🚀 Features
- **Create and Edit Trees**: Add, edit, delete, and reposition family members dynamically.
- **Role-based Access**: Assign roles to limit user actions.
- **Image Upload**: Upload images using Cloudinary.
- **Authentication**: Secure login and registration.
- **State Management**: Redux for efficient state handling.
- **Fast and Scalable**: Next.js with Turbopack for optimized performance.
- **Deployed on Vercel**: Hosted at [www.famtree.in](https://www.famtree.in).

---

## 🏗️ Tech Stack
- **Frontend**: Next.js 15, React 19, TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS, MUI
- **Backend**: Node.js, Express (deployed on Railway)
- **Database**: MongoDB
- **File Storage**: Cloudinary

---

## 📂 Project Structure
```
purpledrip-fam-tree-front/
├── public/
│   └── images/
├── src/
│   ├── api/            # API calls (auth, node, tree)
│   ├── app/            # Next.js pages and layouts
│   │   ├── (auth)/     # Login & Register
│   │   ├── tree/       # Tree management
│   ├── components/     # Reusable components
│   ├── lib/            # Utility functions
│   ├── redux/          # Redux store & slices
│   ├── services/       # Axios configurations
│   ├── types/          # TypeScript type definitions
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

---

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo/family-tree.git
cd family-tree
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env.local` file and add:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api  # Update with your backend URL
NEXT_PUBLIC_CLOUDINARY_URL=your_cloudinary_upload_url
```

### 4️⃣ Run the Development Server
```sh
npm run dev
```

The app should be running at `http://localhost:3000`

---

## 🏗️ Build & Deploy
### Build for Production
```sh
npm run build
```

### Start in Production Mode
```sh
npm start
```

### Deploy on Vercel
```sh
vercel deploy
```

## API Endpoints

### **🔑 Authentication** (`/api/auth/`)
- 🔹 `POST /register` - Register a new user
- 🔹 `POST /login` - Log in a user
- 🔹 `POST /logout` - Log out a user
- 🔹 `GET /session` - Validate user session

### **🌳 Family Tree Operations** (`/api/`)
- 🌱 `POST /addtree` - Create a new tree
- 📜 `GET /tree` - Get all trees
- 🔍 `GET /tree/:id` - Get tree data by ID
- 🔎 `GET /treebyname/:treeName` - Get tree data by name
- ✏️ `PUT /updatetree` - Update tree data

### **👨‍👩‍👧‍👦 Node Operations** (`/api/node/`)
- ➕ `POST /addnode` - Add a new member
- 🔄 `POST /updateposition` - Update node position
- ❌ `POST /deletenode` - Remove a member

### **🖼️ Image Uploads**
- 📤 `PUT /addimagestoid` - Upload images to a node
- 🖼️ `GET /getimagesbyid/:id` - Retrieve images for a node

### **🔗 Edge Management**
- ➕ `POST /addedge` - Add a relationship between nodes
- 🔄 `POST /updateedge` - Update existing edge


---

## 📌 Available Scripts
```json
"scripts": {
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "watch-build": "nodemon --watch src --ext js,jsx,ts,tsx,json --exec \"npm run build\"",
  "lint": "next lint"
}
```
- `npm run dev` → Start development server
- `npm run build` → Build project
- `npm start` → Start production server
- `npm run lint` → Lint project

---

## 🎨 UI Components
- **Local Components** (`src/components/local/`)
  - `AddImages.tsx` → Upload images
  - `AddNode.tsx` → Add a new family member
  - `ChangeRole.tsx` → Change user roles
  - `DeleteNode.tsx` → Delete a member
  - `EditNode.tsx` → Edit member details
  - `SearchTree.tsx` → Search for family members
- **UI Components** (`src/components/ui/`)
  - `button.tsx`, `card.tsx`, `dialog.tsx`, `input.tsx`, `label.tsx`, etc.

---

## 🛠️ Dependencies
- **Core**: `next`, `react`, `react-dom`, `typescript`
- **State Management**: `@reduxjs/toolkit`, `react-redux`
- **UI**: `tailwindcss`, `@mui/material`, `@radix-ui/react-dialog`
- **Utilities**: `axios`, `dayjs`, `clsx`
- **Notifications**: `sonner`
- **File Upload**: Cloudinary API

---

## 📢 Contributing
1. Fork the repo
2. Create a new branch (`git checkout -b feature-branch`)
3. Make changes & commit (`git commit -m "Added new feature"`)
4. Push to branch (`git push origin feature-branch`)
5. Open a Pull Request 🚀

---

## 📄 License
This project is licensed under the **MIT License**.

---

## 👥 Contributors
- [Your Name](https://github.com/your-profile)
- Open for contributions! 💡

