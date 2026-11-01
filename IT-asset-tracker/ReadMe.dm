IT Assets Tracking Tool 

1. Project overview
    This project is an assets tracking tool that allows users to view, add, edit, delete, and search for IT assets while monitoring their status.
    the application uses FastAPI backend and mongoDB Atlas as its cloud database, with HTML, CSS, JavaScript frontend.

2. Features
    .Dashbaord: Displays the total number of devices, available devices, assigned devices, and under maintenance.
    .View Devices: Displays all registered IT assets in a grid.
    .Add Devices: Allows users to register a new assets.
    .Edit Devices: Allows users to update existing device information.
    .Delete Devices: Allows users to remove devices from the database.
    .Search: Allows users to search for devices.
    .Data Validation: Required fields and input validation help prevent incomplete records.

3. Technologies Used
    Frontend -- HTML, CSS, JavaScript
    Backend -- python, FastAPI
    Database -- mongoDB
    Database connection -- pymongo
    API Testing -- FastAPI Swagger UI
    Development Environment -- Visual studio

4. Database design
    The application uses MongoDB with the database name ITAssetsDB with the collection "assets" and each document represents one IT asset.
    the fields are:
    _id (objectId)
    deviceName (String)
    deviceType (String)
    user (String)
    department (String)
    purchaseDate (date)
    Status (String)

5. Installation and Setup
    Prerequisites:
    Python installed on your computer
    Visual Studio Code
    MongoDB Atlas account
    A modern web browser
    VS Code Live Server extension

    Step1: Downlaod the project
    Download or extract the project ZIP file and open the project folder in Visual Studio Code.

    Step2: Create a Virtual Environment
    Open the terminal in the project root folder and run:  " python -m venv .venv "
    Activate the environment on Windows:  " .venv\Scripts\Activate "

    Step3: Install Dependencies
    Run:  " pip install -r backend/requirements.txt "

    Step4: Configure MongoDB Atlas
    Create a .env file in the project root folder and add your MongoDB connection string:
    MONGO_URI=your_mongodb_connection_string

    Step5: Start the Backend
    in the terminal run:  " python -m uvicorn backend.main:app --reload "
    the backend will run at: http://127.0.0.1:8000

    Step6: Open the frontend
    Open Infopage.html using the VS Code Live Server extension.
    The frontend should be accessible at:  " http://127.0.0.1:5500 "
    The frontend communicates with the FastAPI backend through HTTP requests.

6. API Endpoint

    Methods          Endpoint                 Description
    GET              /                        Check wether the API is running
    GET              /test-db                 Test MongoDB connection 
    GET              /devices                 Retrieve all devices 
    POST             /devices                 Add a new device 
    PUT              /devices/{device_id}     Update an existing device 
    DELETE           /devices/{device_id}     Delete a device 

    FastAPI automatically provides interactive API documentation. After starting the backend, open: " http://127.0.0.1:8000/docs "

