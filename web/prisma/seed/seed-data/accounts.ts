const accounts = [
  // email/password account for John
  {
    id: "account_1_john_email",
    accountId: "john.doe@example.com",
    providerId: "credential",
    userId: "user_1_john_doe",
    password: "06523554e04b2a003a402e299389618b:dae281984aac2074cd5ded5ef07716bd52718c7557fd2d9f963b844c7f2bc5c9589744367926efd2f8090b90b819d9e5974cb4a069b0ddf5b8cb49ebf8151402", // "Password2025*" hashé
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
    password: "3a97966e11753e02c6e36d9d150e87f9:c8ffb417b02cbbe6add93fde18a19b5e1c193ce65f75e8a097b348bbb0f9e0a571a66a7619cc9baa358868fbcbb1c3fc6f63bf0cad64118f52e6828dca0104f4", // "Password2026*" hashé
    createdAt: new Date('2024-01-20T14:30:00Z'),
    updatedAt: new Date('2024-01-20T14:30:00Z')
  }
];

export default accounts;