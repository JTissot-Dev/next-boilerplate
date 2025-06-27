const accounts = [
  // email/password account for John
  {
    id: "account_1_john_email",
    accountId: "john.doe@example.com",
    providerId: "credential",
    userId: "user_1_john_doe",
    password: "$2a$12$4z3F6N9mKL8jQ2wE5rT7yOe8pUvBxC1nD6gS9hI2aF5bK0lM3pO7q", // "Password2025*" hashé
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T10:00:00Z')
  },
  // Google account for John
  {
    id: "account_2_john_google",
    accountId: "google_123456789",
    providerId: "google",
    userId: "user_1_john_doe",
    accessToken: "ya29.a0AfH6SMC...",
    refreshToken: "1//04...",
    idToken: "eyJhbGciOiJSUzI1NiIs...",
    accessTokenExpiresAt: new Date('2024-06-27T15:00:00Z'),
    refreshTokenExpiresAt: new Date('2024-12-27T10:00:00Z'),
    scope: "openid email profile",
    createdAt: new Date('2024-01-15T10:05:00Z'),
    updatedAt: new Date('2024-01-15T10:05:00Z')
  },
  // email/password account for Jane
  {
    id: "account_3_jane_email",
    accountId: "jane.smith@example.com",
    providerId: "credential",
    userId: "user_2_jane_smith",
    password: "$2a$12$9X8VqZ2mN5HgK8LdRtY3WuE7FsA1BcD2EfG3HiJ4KlM5NoP6QrS7T", // "mypassword456" hashé
    createdAt: new Date('2024-01-20T14:30:00Z'),
    updatedAt: new Date('2024-01-20T14:30:00Z')
  }
];

export default accounts;