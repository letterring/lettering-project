package com.example.lettering.domain.user.service;

import com.example.lettering.domain.user.entity.User;
import com.example.lettering.domain.user.enums.Provider;
import com.example.lettering.domain.user.repository.UserRepository;
import com.example.lettering.exception.ExceptionCode;
import com.example.lettering.exception.type.BusinessException;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserRepository userRepository;
    private final HttpSession session;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauth2User = new DefaultOAuth2UserService().loadUser(userRequest);

        Provider provider = Provider.valueOf(userRequest.getClientRegistration().getRegistrationId().toUpperCase());
        String email = extractEmail(provider.name(), oauth2User);
        String nickname = extractNickname(provider.name(), oauth2User);

        if (email == null) {
            throw new BusinessException(ExceptionCode.OAUTH_EMAIL_NOT_FOUND);
        }

        // ✅ 사용자 정보 조회 및 저장
        User user = userRepository.findByEmailAndProvider(email, provider).orElseGet(() ->
                new User(email, nickname, provider)
        );

        user.updateNickname(nickname); // 닉네임이 변경될 수도 있으므로 업데이트
        User savedUser = userRepository.save(user);

        System.out.println("✅ 사용자 저장 완료: " + savedUser.getEmail() + " (ID: " + savedUser.getId() + ")");

        // ✅ 세션에 사용자 정보 저장
        session.setAttribute("userId", user.getId());
        session.setAttribute("userNickname", user.getUserNickname());

        // ✅ OAuth2User를 생성할 때 email을 attributes에 추가
        Map<String, Object> attributes = new HashMap<>(oauth2User.getAttributes());
        attributes.put("email", email);

        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
                attributes,
                "email"  // ✅ Spring Security에서 사용할 key (email 기준)
        );
    }

    private String extractEmail(String provider, OAuth2User oauth2User) {
        if ("KAKAO".equalsIgnoreCase(provider)) {
            Map<String, Object> kakaoAccount = oauth2User.getAttribute("kakao_account");
            if (kakaoAccount == null || !kakaoAccount.containsKey("email")) {
                throw new BusinessException(ExceptionCode.OAUTH_EMAIL_NOT_FOUND);
            }
            return (String) kakaoAccount.get("email");
        }
        return oauth2User.getAttribute("email");
    }

    private String extractNickname(String provider, OAuth2User oauth2User) {
        if ("KAKAO".equalsIgnoreCase(provider)) {
            Map<String, Object> kakaoAccount = oauth2User.getAttribute("kakao_account");
            if (kakaoAccount != null) {
                Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
                if (profile != null && profile.containsKey("nickname")) {
                    return (String) profile.get("nickname");
                }
            }
        }
        return oauth2User.getAttribute("name");
    }
}
