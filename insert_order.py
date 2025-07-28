
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins, including null
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)

db_params = {
    'dbname': 'wymi_db',
    'user': 'postgres',
    'password': 'wymi1234',
    'host': 'localhost',
    'port': '5432'
}

@app.post("/insert_order")
async def insert_order(data: dict):
    try:
        conn = psycopg2.connect(**db_params)
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO order_item (id, user_id, product_id, price) VALUES (gen_random_uuid(), %s, %s, %s);",
            (data['user_id'], data['product_id'], data['price'])
        )
        conn.commit()
        logger.info(f"Order inserted for user {data['user_id']} on product {data['product_id']}")
        return {"status": "Order inserted"}
    except Exception as e:
        logger.error(f"Error inserting order: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@app.get("/health")
async def health_check():
    return {"status": "Order API running"}

if __name__ == '__main__':
    logger.info("Starting order server: http://localhost:8001")
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
