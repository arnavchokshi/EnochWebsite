# Law Office of Enoch P. Hicks - Website

A modern, professional law firm website built with React, Magic UI, and ReactBits components. Features a complete admin panel for easy content management.

## Features

- **Modern UI**: Built with Magic UI and ReactBits animated components
- **Responsive Design**: Works on all devices
- **Admin Panel**: Easy-to-use content management system
- **Real-time Editing**: Edit all website content without coding
- **Image Upload**: Drag-and-drop image management

## Tech Stack

- **Frontend**: React 18 + Vite + TypeScript
- **UI Components**: Magic UI + ReactBits + Tailwind CSS
- **Backend**: Express.js
- **Authentication**: JWT
- **Data Storage**: Local JSON files

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Install all dependencies:
```bash
npm run install-all
```

Or install separately:
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
```

### Running the Application

Run both client and server:
```bash
npm run dev
```

Or run separately:
```bash
# Terminal 1 - Start the server (runs on port 3001)
cd server && npm start

# Terminal 2 - Start the client (runs on port 5173)
cd client && npm run dev
```

### Accessing the Application

- **Website**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin/login

### Admin Login

Default admin credentials:
- **Email**: admin@ephfirm.com
- **Password**: Set your password on first login

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/        # Magic UI + ReactBits components
│   │   │   ├── sections/  # Page sections (Hero, Contact, etc.)
│   │   │   └── admin/     # Admin panel editors
│   │   ├── pages/         # Route pages
│   │   ├── hooks/         # React hooks (auth, etc.)
│   │   └── lib/           # API utilities
│   └── package.json
├── server/                 # Express backend
│   ├── data/              # JSON content files
│   ├── uploads/           # Uploaded images
│   └── index.js           # Server entry point
└── package.json
```

## Editing Content

1. Go to http://localhost:5173/admin/login
2. Login with your credentials
3. Use the tabbed interface to edit:
   - **Hero**: Main banner heading and CTA
   - **Practice Areas**: Legal services offered
   - **How It Works**: Process steps
   - **Blog**: Blog posts and case studies
   - **Quote**: Featured attorney quote
   - **Team**: Team member profiles
   - **Contact**: Phone, email, address, hours
   - **Settings**: Site name, meta description

## Magic UI Components Used

- **Blur Fade**: Animated entrance effects
- **Text Animate**: Animated text reveals
- **Shimmer Button**: Glowing CTA buttons
- **Shine Border**: Glowing borders
- **Magic Card**: Interactive hover cards
- **Marquee**: Auto-scrolling content
- **Avatar Circles**: Overlapping team avatars
- **Dot Pattern**: Background patterns
- **Animated Beam**: Connecting line animations
- **Grid Pattern**: Footer background

## ReactBits Components Used

- **Waves**: Interactive wave animation for hero background

## License

Copyright 2025 Law Office of Enoch P. Hicks
