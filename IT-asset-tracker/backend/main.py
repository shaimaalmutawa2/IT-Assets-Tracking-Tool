from fastapi import FastAPI
from .database import client, assets_collection
from .models import Device
from datetime import datetime, time
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId
from fastapi import HTTPException

app = FastAPI()

app.add_middleware(
        CORSMiddleware, allow_origins=[
            "http://127.0.0.1:5500",
            "http://localhost:5500"
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],  
)

@app.get("/")
def home():
    return {"message": "IT Assets Tracking API is running"}

@app.get("/test-db")
def test_database():
    try:
        client.admin.command("ping")
        return {"message": "Connected to MongoDB successfully!"}
    except Exception as e:
        return {"error": str(e)}
    
@app.post("/devices")
def add_device(device: Device):
    device_data = device.model_dump()
    
    device_data["purchaseDate"] = datetime.combine(device_data["purchaseDate"], time.min)
    
    result = assets_collection.insert_one(device_data)
    return {"message": "Device added successfully", "device_id": str(result.inserted_id)}

@app.get("/devices")
def get_devices():
    devices = []
    
    for device in assets_collection.find():
        device["_id"] = str(device["_id"])
        
        if isinstance(device.get("purchaseDate"), datetime):
            device["purchaseDate"] = device["purchaseDate"].date().isoformat()
            
        devices.append(device)
        
    return devices


@app.put("/devices/{device_id}")
def update_device(device_id: str, device: Device):
    if not ObjectId.is_valid(device_id):
        raise HTTPException(status_code=400, detail="Invalid device ID")

    device_data = device.model_dump()

    device_data["purchaseDate"] = datetime.combine(
        device_data["purchaseDate"], time.min
    )

    result = assets_collection.update_one(
        {"_id": ObjectId(device_id)},
        {"$set": device_data}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Device not found")

    return {"message": "Device updated successfully"}

        

@app.delete("/devices/{device_id}")
def delete_device(device_id: str):
    if not ObjectId.is_valid(device_id):
        raise HTTPException(status_code=400, detail="Invalid device ID")

    result = assets_collection.delete_one(
        {"_id": ObjectId(device_id)}
    )

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Device not found")

    return {"message": "Device deleted successfully"}



