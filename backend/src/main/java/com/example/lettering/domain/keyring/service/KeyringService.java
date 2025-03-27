package com.example.lettering.domain.keyring.service;

import com.example.lettering.controller.request.OrderRequest;
import com.example.lettering.controller.response.KeyringDesignListResponse;
import com.example.lettering.controller.response.KeyringDesignResponse;
import com.example.lettering.controller.response.KeyringManageResponse;
import com.example.lettering.domain.keyring.entity.Order;
import com.example.lettering.domain.user.entity.User;

import java.util.List;

public interface KeyringService {
    KeyringDesignListResponse getAllKeyringDesigns();
    KeyringDesignResponse getKeyringDesignById(Long designId);
    Order processOrderAndReturnOrder(User user, OrderRequest request);
    void toggleFavorite(Long keyringId, Long userId);
    int registerKeyrings(List<String> tagCodes);
    List<KeyringManageResponse> getManageList(Long userId);
    void updateNfcName(Long keyringId, Long userId, String newName);
    void removeKeyringFromUser(Long keyringId, Long userId);
    KeyringManageResponse getKeyringById(Long keyringId, Long userId);
    void saveOrder(Order order);
    Long generateTempOrderNumber();
}
