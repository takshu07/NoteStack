Note Stack is a backend application built with **TypeScript, Express, and MongoDB**.  
It implements full **CRUD operations for notes** with a clean REST architecture.  
User authentication is implemented using **JWT** for stateless sessions and **bcrypt** for secure password hashing.  
Each user is assigned a **public userUUID** to safely identify users outside the database layer.  
MongoDB ObjectIds are used internally for relations and data integrity.  
The project emphasizes security, scalability, and production-ready patterns.