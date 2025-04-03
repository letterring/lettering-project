package com.example.lettering.util;

import net.coobird.thumbnailator.Thumbnails;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class ImageProcessingUtils {

    public static byte[] compressImage(InputStream originalInputStream, String contentType) throws IOException {
        BufferedImage originalImage = ImageIO.read(originalInputStream);
        BufferedImage resizedImage = Thumbnails.of(originalImage)
                .scale(0.4)
                .asBufferedImage();

        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        String lowerContentType = contentType.toLowerCase();
        String formatName;
        if (lowerContentType.contains("heic") || lowerContentType.contains("heif")) {
            formatName = "jpg"; // HEIC/HEIF는 JPEG로 변환
        } else if (lowerContentType.contains("png")) {
            formatName = "png";
        } else {
            formatName = "jpg";
        }

        ImageIO.write(resizedImage, formatName, baos);
        return baos.toByteArray();
    }
}
