# Contributors

1. Pranav Ajith
2. Kancharla Kiranmai
3. B Niranjan (bn-nb)
4. Anish Dixit
5. Ishika Saini
6. Aditya Abhiram Uppuluri

# Prerequisites

Before running the project, make sure the following are installed:

1. **Go** - For the backend
2. **React** - For the frontend
3. **Node Package Manager (npm)** - For managing React dependencies
4. **Make Command** (Optional) - Useful for running many executables in a single command

# To Setup and Run the Project

You have two options for running the project:

## Option 1: Run Backend and Frontend Together (Locally)

Open Command Prompt / PowerShell and run:

```bash
git clone https://github.com/pranavajith/SIH-Samvidha
cd SIH-Samvidha
make run
```

## Option 2: Run Backend and Frontend Independently (Locally) - {Ideal for Development}

1. Clone the monorepo

```bash
git clone https://github.com/pranavajith/SIH-Samvidha
```

2. Create 2 Command Prompt / PowerShell instances inside 'SIH-Samvidha' folder. (Optional: Rename them to 'Backend Local Deployment' and 'Frontend Local Deployment' for reference) Run these independently in each.

```bash
make run-backend
```

```bash
make run-frontend
```

## If 'make' commands are not working

1. Open a Command Prompt instance at Project Root and run:

```bash
cd backend && go mod tidy && go run main.go types.go server.go userHandler.go lobbyHandler.go
```

2. Open another Command Prompt instance at Project Root and run:

```bash
cd frontend && npm install && npm start
```
