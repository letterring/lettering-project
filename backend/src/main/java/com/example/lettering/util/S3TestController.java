package com.example.lettering.util;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/image/test")
@RequiredArgsConstructor
public class S3TestController {

    private final S3ImageUtil s3ImageUtil;

    /**
     * 고화질 이미지 업로드 테스트 엔드포인트
     * 폴더명은 기본적으로 "test"로 사용하고, 필요에 따라 요청 파라미터로 전달 가능
     */
    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("image") MultipartFile file,
                                                           @RequestParam(value = "folder", defaultValue = "test") String folder) {
        try {
            // 각각의 방식으로 업로드한 URL을 받아옴
            String highUrl = s3ImageUtil.uploadHighQualityImage(file, folder);
            String lowUrl = s3ImageUtil.uploadLowQualityImage(file, folder);

            // 결과를 Map으로 구성하여 반환
            Map<String, String> result = new HashMap<>();
            result.put("high", highUrl);
            result.put("low", lowUrl);

            return ResponseEntity.ok(result);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Upload failed: " + e.getMessage()));
        }
    }
}
