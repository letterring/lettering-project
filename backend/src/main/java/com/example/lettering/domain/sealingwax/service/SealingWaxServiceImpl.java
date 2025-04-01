package com.example.lettering.domain.sealingwax.service;

import com.example.lettering.controller.request.sender.CreateSealingWaxRequest;
import com.example.lettering.controller.response.sender.SealingWaxResponse;
import com.example.lettering.domain.sealingwax.entity.SealingWax;
import com.example.lettering.domain.sealingwax.repository.SealingWaxRepository;
import com.example.lettering.util.S3ImageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class SealingWaxServiceImpl implements SealingWaxService {

    private final SealingWaxRepository sealingWaxRepository;
    private final S3ImageUtil s3ImageUtil;

    @Override
    public SealingWaxResponse createSealingWax(CreateSealingWaxRequest request, MultipartFile imageFile) throws IOException {
        String imageUrl = s3ImageUtil.uploadImage(imageFile, "wax_images");
        SealingWax sealingWax = SealingWax.fromDto(request, imageUrl);
        return SealingWaxResponse.fromEntity(sealingWaxRepository.save(sealingWax));
    }

    @Override
    @Transactional(readOnly = true)
    public List<SealingWaxResponse> getAllSealingWaxes() {
        return sealingWaxRepository.findAll().stream()
                .map(SealingWaxResponse::fromEntity)
                .collect(Collectors.toList());
    }
}
