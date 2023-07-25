from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import config, routes

app = FastAPI(debug=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routes.router)
