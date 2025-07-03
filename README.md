# Music Library Micro Frontend

A React-based music library application demonstrating Micro Frontend Architecture with role-based authentication.


# deployment link:
 -✈️ https://friendly-blini-7eaa90.netlify.app

## Features

- 🎵 Music library with filtering, sorting, and grouping
- 🏗️ Micro Frontend architecture using Module Federation
- 🔒 Role-based authentication (admin/user)
- 🚀 Independently deployable components

## Demo Credentials

**Admin User**:
- Username: `admin`
- Password: `admin123`
- Permissions: Add, edit, and delete songs

**Regular User**:
- Username: `user`
- Password: `user123`
- Permissions: View and filter songs only

## 🛠 Local Development Setup

### Prerequisites
- Node.js v18+
- npm or yarn
- Git


### Main Pages :
![image alt](https://github.com/Aayushg2002/music-library-microfrontend/blob/91085155621328365e4543170ef29d6b3a831039/1.png)
### Admin Login Pages :
![image alt](https://github.com/Aayushg2002/music-library-microfrontend/blob/f774555cd8bcaf17e61ae4f8d2c010edf8f7f3ab/2.png)
### User Login Pages :
![image alt](https://github.com/Aayushg2002/music-library-microfrontend/blob/f32cc54bd471070ad19e42dfba8111ba79e55ab0/3.png)
### Music Library:
![image alt](https://github.com/Aayushg2002/music-library-microfrontend/blob/f32cc54bd471070ad19e42dfba8111ba79e55ab0/4.png)

###Architecture Overview:

-Micro Frontend Implementation
  The application uses Webpack Module Federation to implement the micro frontend architecture:
     1.Container App:
         -Acts as the host application
         -Dynamically loads the Music Library micro frontend
         -Manages authentication state via React Context
         -Provides the auth context to the micro frontend
     2.Music Library (Micro Frontend):
         -Exposes its components via Module Federation
         -Receives auth props from the container
         -Contains all music library functionality
         -Has no direct authentication logic
         
-Role-Based Authentication
  The authentication system works as follows:
    1.Mock JWT:
         -Tokens are stored in localStorage
         -Contains user role information
         -No actual backend validation (purely frontend mock)
    2.Role Handling:
         -Admin role sees all CRUD operations
         -User role only sees read-only views
         -UI elements are shown/hidden based on roles
    3.Protected Routes:
         -Unauthenticated users are redirected to login
         -Role-specific routes are enforced

 -Built With:
     React 18
     Vite
     Webpack Module Federation
     Tailwind CSS
     React Router
     JWT (mock implementation)
