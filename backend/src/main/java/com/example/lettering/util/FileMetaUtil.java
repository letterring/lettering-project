package com.example.lettering.util;

import org.springframework.http.MediaType;

public class FileMetaUtil {
    public static MediaType resolveContentType(String url) {
        String ext = extractExtension(url);
        return switch (ext) {
            case "png" -> MediaType.IMAGE_PNG;
            case "gif" -> MediaType.IMAGE_GIF;
            case "jpg", "jpeg" -> MediaType.IMAGE_JPEG;
            default -> MediaType.APPLICATION_OCTET_STREAM;
        };
    }

    public static String extractExtension(String url) {
        return url.substring(url.lastIndexOf('.') + 1).toLowerCase();
    }

    public static String generateFileName(String prefix, String url) {
        return prefix + "." + extractExtension(url);
    }
}
