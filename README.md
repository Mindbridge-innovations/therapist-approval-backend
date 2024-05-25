# Therapist Approval Backend

## Overview

This backend service is designed for a therapist approval system where therapists can upload their credentials for admin review and approval. Once approved, therapists can log in to the mobile app. The backend handles authentication, user management, and serves as an interface to a real-time database.

## Features

- **User Authentication**: Secure login for admins and therapists.
- **Credential Management**: Therapists can submit their credentials, which admins can review and approve.
- **Role-Based Access Control**: Ensures that only authenticated and authorized users can perform certain operations.

## Technology Stack

- **Node.js**: Server-side JavaScript runtime.
- **Express**: Web application framework for Node.js.
- **Firebase Realtime Database**: Database used for storing user data and other application data.
- **JWT (JSON Web Tokens)**: Used for secure transmission of information between parties as a JSON object.
- **Bcrypt.js**: Library to help you hash passwords.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)
- Access to Firebase project and credentials
