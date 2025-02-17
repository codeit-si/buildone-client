export interface MemberInformation {
  id: number;
  email: string;
  name: string;
}

interface Credentials {
  accessToken: string;
  accessTokenExpiredTime: string;
  refreshToken: string;
}

export interface LoginResponse {
  memberInformation: MemberInformation;
  credentials: Credentials;
}
