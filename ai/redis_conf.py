from redis.asyncio import Redis
import os
from dotenv import load_dotenv

load_dotenv()

redis = Redis(
    host=os.getenv("REDIS_HOST", "localhost"),
    port=int(os.getenv("REDIS_PORT", 6379)),
    db=int(os.getenv("REDIS_DB", 0)),
    decode_responses=True
)

REDIS_PREFIX = os.getenv("REDIS_PREFIX", "lettering")