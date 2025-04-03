from app.core.settings import settings
import os
from fastapi import UploadFile
from PIL import Image, ExifTags
import base64
import io
from uuid import uuid4

UPLOAD_DIR = settings.UPLOAD_DIR
os.makedirs(UPLOAD_DIR, exist_ok=True)

def extract_exif_data(image: Image.Image) -> dict:
    exif = image._getexif()
    if not exif:
        return {}
    exif_data = {}
    for tag_id, value in exif.items():
        tag = ExifTags.TAGS.get(tag_id, tag_id)
        try:
            exif_data[tag] = str(value)
        except Exception:
            exif_data[tag] = "unreadable"
    return exif_data

async def save_image(file: UploadFile) -> dict:
    ext = file.filename.split(".")[-1]
    filename = f"{uuid4()}.{ext}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    contents = await file.read()
    with open(file_path, "wb") as f:
        f.write(contents)

    image = Image.open(file_path)

    return {
        "filename": filename,
        "content_type": file.content_type,
        "width": image.width,
        "height": image.height,
        "path": file_path.replace("\\", "/"),
        "exif": extract_exif_data(image)
    }