# Task Management App – Practical Assignment

This repository contains the completed practical assignment for the recruitment process. It includes a basic Task Management API built with ASP.NET Core and a SQL Server database script.

🔗 **Repository URL**: [https://github.com/Dilshanushara/TaskManagementApp](https://github.com/Dilshanushara/TaskManagementApp)

---

## 🔧 Technologies Used

- ASP.NET Core Web API
- SQL Server
- C#
- Angular
- Entity Framework Core


---

## 📁 Project Structure
TaskManagementApp/
│
├── BackEnd/
│ └── TaskManagementApi/ # ASP.NET Core Web API project
├── FrontEnd/
│ └── task-management-app/ # Angular FrontEnd app
├── Database/
│ └── TaskManagementDb_Create.sql # SQL script to create DB and tables
│
└── README.md # Project overview and usage instructions




---

## 🚀 Getting Started

### 🔹 Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- Node
- Angular CLI
- SQL Server (e.g., SSMS)
- Visual Studio or VS Code

### 🔹 Running the API

1. Open `TaskManagementApi` in Visual Studio or VS Code.
2. Build and run the project.

---

## 🛡️ Authentication

This project uses **Basic Authentication**.

- **Username**: `admin`  
- **Password**: `password`

You must provide the `Authorization` header in Base64 format.  
Example using `curl`:



