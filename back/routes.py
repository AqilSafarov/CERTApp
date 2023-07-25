from fastapi import APIRouter, Depends, HTTPException, status
from . import auth, models, database, config
from fastapi.security import OAuth2PasswordRequestForm
from bson import ObjectId
from fastapi import UploadFile, File
from typing import Optional
import json
from fastapi import Form

router = APIRouter()


@router.post("/token", response_model=models.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    # Add print statement
    print(f"Form data: {form_data.username}, {form_data.password}")
    user = auth.authenticate_user(form_data.username, form_data.password)
    print(f"User: {user}")  # Add print statement
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = config.ACCESS_TOKEN_EXPIRE_MINUTES
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    print(f"Access token: {access_token}")  # Add print statement
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/register", response_model=models.User)
async def register_new_user(user: models.UserRegister):
    # Update the argument to use `user.email`
    existing_user = auth.get_user(user.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already in use"
        )
    hashed_password = auth.get_password_hash(user.password)
    database.db["users"].insert_one(
        {"email": user.email, "first_name": user.first_name, "last_name": user.last_name, "phone": user.phone, "organization": user.organization,
         "disabled": False, "hashed_password": hashed_password}
    )
    return models.User(email=user.email, last_name=user.last_name, first_name=user.first_name, phone=user.phone, organization=user.organization, disabled=False)


@router.get("/users/me", response_model=models.User)
async def read_users_me(
    current_user: models.User = Depends(auth.get_current_active_user)
):
    return current_user


@router.patch("/users/me", response_model=models.User)
async def update_user(user: models.UserUpdate, current_user: models.User = Depends(auth.get_current_active_user)):
    update_query = {"$set": user.dict(exclude_unset=True)}
    database.db["users"].update_one(
        {"email": current_user.email}, update_query)
    updated_user = auth.get_user(current_user.email)
    return updated_user


@router.patch("/users/me/password", response_model=models.User)
async def update_user(user: models.UserRegister, current_user: models.User = Depends(auth.get_current_active_user)):
    hashed_password = auth.get_password_hash(user.password)
    update_query = {"$set": {"hashed_password": hashed_password}}
    database.db["users"].update_one(
        {"email": current_user.email}, update_query)
    updated_user = auth.get_user(current_user.email)
    return updated_user


@router.post("/message")
async def create_message(message: models.Message):
    print(f"Received message from {message.sender}: {message.content}")
    return {"detail": "Message received"}


@router.get("/users/me/items")
async def read_own_items(
    current_user: models.User = Depends(auth.get_current_active_user)
):
    return [{"item_id": "Foo", "owner": current_user.username}]


@router.get("/report-types")
async def get_report_types():
    report_types = database.db["report_types"].find()
    serialized_report_types = []
    for report_type in report_types:
        report_type["_id"] = str(report_type["_id"])
        serialized_report_types.append(report_type)
    main_categories = []
    report_types = serialized_report_types[0]
    for report_type in report_types.keys():
        if report_type != "_id":
            main_categories.append(report_type)
    print(main_categories)
    return (main_categories)


@router.get("/report-types/{category_name}")
async def get_report_subtypes(category_name: str):
    # Normalize the category name to match the database format
    category_name = category_name.replace("-", " ")
    report_types = database.db["report_types"].find_one()
    if not report_types or category_name not in report_types:
        raise HTTPException(status_code=404, detail="Category not found")
    sub_categories = report_types[category_name]
    return sub_categories




@router.post("/reports",response_model=models.Report)
async def create_report(report: models.Report, current_user: models.User = Depends(auth.get_current_active_user)):
    report.user = current_user.email
    database.db["reports"].insert_one(report.dict())
    return report