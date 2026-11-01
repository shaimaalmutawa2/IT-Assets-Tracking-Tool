from pydantic import BaseModel, Field
from datetime import date
from typing import Literal

class Device(BaseModel):
    deviceName: str = Field(..., main_length=1)
    deviceType: str
    user: str = ""
    department: str
    purchaseDate: date
    status: Literal["Available", "Assigned", "Maintenance", "Retired", "available", "assigned", "maintenance", "retired"] 
    
