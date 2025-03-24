package com.example.lettering.domain.keyring.service;

import com.example.lettering.controller.request.OrderRequest;
import com.example.lettering.controller.response.KeyringDesignResponse;
import com.example.lettering.domain.keyring.entity.KeyringDesign;
import com.example.lettering.domain.user.entity.User;

import java.util.List;

public interface KeyringService {
    List<KeyringDesignResponse> getAllKeyringDesigns();
    Long processOrder(User user, OrderRequest request);
}
