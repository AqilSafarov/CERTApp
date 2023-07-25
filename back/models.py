from pydantic import BaseModel, Field
from bson import ObjectId
from typing import Annotated
from typing import Optional
from datetime import datetime

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str | None = None

class User(BaseModel):
    email: str | None = None
    organization: str | None = None
    phone: str | None = None
    first_name: str | None = None
    last_name:  str | None = None
    disabled: bool | None = None

class UserInDB(User):
    _id: Optional[str] = Field(alias="_id")  # Assumes that '_id' is of type str
    hashed_password: str
    
class UserRegister(BaseModel):
    email: str | None = None
    phone: str | None = None
    organization: str | None = None
    first_name: str | None = None
    last_name:  str | None = None
    password: str | None = None

class Message(BaseModel):
    content: str
    sender: str

class UserUpdate(BaseModel):
    email: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    organization: Optional[str] = None
    hashed_password: Optional[str] = None



class Report(BaseModel):
    user: Optional[str] = None
    main_report_category: str
    sub_report_category: str
    report_text: str
    report_create_time: Optional[datetime] = None
    report_status: Optional[str]
    status_update_time: Optional[datetime] = None

    
