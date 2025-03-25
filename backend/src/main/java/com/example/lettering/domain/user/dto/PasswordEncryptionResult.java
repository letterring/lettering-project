package com.example.lettering.domain.user.dto;

public class PasswordEncryptionResult {
    private final String hashedPassword;
    private final String salt;

    public PasswordEncryptionResult(String hashedPassword, String salt) {
        this.hashedPassword = hashedPassword;
        this.salt = salt;
    }

    public String getHashedPassword() {
        return hashedPassword;
    }

    public String getSalt() {
        return salt;
    }
}
