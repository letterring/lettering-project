package com.example.lettering.controller;

import com.example.lettering.util.S3ImageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/s3")
@RequiredArgsConstructor
public class S3Controller {

    private final S3ImageUtil s3ImageUtil;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file,
                                              @RequestParam("folderName") String folderName) {
        try {
            String imageUrl = s3ImageUtil.uploadImage(file, folderName);
            return ResponseEntity.ok(imageUrl);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("S3 upload failed");
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteImage(@RequestParam("imageUrl") String imageUrl) {
        try {
            s3ImageUtil.deleteImageByUrl(imageUrl);
            return ResponseEntity.ok("success delete image");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("S3 delete failed");
        }
    }
}
