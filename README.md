# Online Ticketing System

A complete support ticket management system with Angular frontend and ASP.NET Core WebAPI backend, deployed on Azure cloud infrastructure.

**Status**: Production Ready  
**Frontend**: Angular  
**Backend**: ASP.NET Core  
**Database**: SQL Server  
**Deployment**: Azure  
**License**: [MIT License](LICENSE)

## 📋 Table of Contents
- [Features](#✨-features)
- [Tech Stack](#🛠️-tech-stack)
- [Project Structure](#📁-project-structure)
- [Quick Start](#⚡-quick-start)
- [Detailed Setup](#🔧-detailed-setup)
- [API Documentation](#📚-api-documentation)
- [Development](#💻-development)
- [Deployment](#☁️-deployment)
- [Contributing](#🤝-contributing)

## ✨ Features

### Frontend (Angular)
- **🔐 User Authentication & Authorization** - JWT-based login/register with role management (Admin, Support Agent, Customer)
- **🎫 Ticket Management** - Full CRUD operations for support tickets with advanced filtering and sorting
- **📱 Responsive Design** - Mobile-friendly interface with Angular Material and Bootstrap
- **🔔 Real-time Updates** - Live ticket status updates via SignalR/WebSocket notifications
- **📊 Dashboard & Analytics** - Visual reports and statistics for administrators with charts
- **💬 Ticket Comments** - Threaded conversations for each ticket with file attachments
- **📧 Email Notifications** - Automated email alerts for ticket updates and assignments
- **📄 Export Functionality** - Export tickets and reports to PDF/Excel formats

### Backend (ASP.NET Core WebAPI)
- **🛡️ Secure REST API** - JWT authentication with role-based authorization (RBAC)
- **🗄️ Entity Framework Core** - Database operations with code-first migrations and seed data
- **📦 Repository & Unit of Work Patterns** - Clean architecture with service layer and dependency injection
- **🧪 Unit & Integration Tests** - Comprehensive test coverage with xUnit and Moq
- **📄 Swagger/OpenAPI** - Interactive API documentation with authentication support
- **📈 Performance Monitoring** - Request logging, performance tracking, and health checks
- **🔍 Advanced Search** - Full-text search and filtering capabilities for tickets
- **📊 Reporting Endpoints** - RESTful endpoints for dashboard analytics and metrics

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | Angular 15+, TypeScript 5+, RxJS 7+, Angular Material, Bootstrap 5 |
| **Backend** | ASP.NET Core WebAPI 7/8, C# 11+, .NET 8 Runtime |
| **Database** | SQL Server 2022, Azure SQL Database |
| **ORM** | Entity Framework Core 7/8, Code-First Migrations |
| **Authentication** | JWT Bearer Tokens, BCrypt.NET, ASP.NET Core Identity |
| **Real-time** | SignalR for WebSocket communication |
| **Tools** | Git, Docker, Swagger/OpenAPI, Azure CLI |
| **Cloud Services** | Azure App Service, Azure SQL Database, Azure Storage, Azure Application Insights |
