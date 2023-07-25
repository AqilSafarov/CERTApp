from datetime import timedelta

SECRET_KEY = "85df9fb634f7041233ebd525d15996284e349bace91ef0e0c80fe55c860326d8"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = timedelta(minutes=30)
ORIGINS = [
    "*",
    # React default port
    # Add any other origins you need
]
