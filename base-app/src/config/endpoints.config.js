"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
  PassPhrase: process.env.PASSPHRASE,
  SSLCertPath: process.env.CERT_PATH,
  SSLKeyPath: process.env.KEY_PATH,
  DownPath: process.env.DOWN_PATH,
  APICScope: process.env.SCOPE,
  APICClientId: process.env.CLIENT_ID,
  APICClientSecret: process.env.CLIENT_SECRET,
  APICTokenURL:
    process.env.BASE_URL + process.env.VERSION + "/access/oauth2/token",
  UserAgentProfileURL:
    process.env.BASE_URL +
    "api/v1/users/agents/profiles/application-navigations",
  BookmarkListURL:
    process.env.BASE_URL + "api/v1/business-connect/users/bookmarks",
  XClientId: "x-client-id",
  XAccountNumber: "x-account-number",
  ClientCredentials: "client_credentials",
  CompanyId: "company_id",
  SPUserName: process.env.SP_USER_NAME,
  SPPassword: process.env.SP_PASSWORD,
  SPDomain: process.env.SP_DOMAIN,
  Videos_Ext: process.env.VIDEOS_EXT,
  Audio_Ext: process.env.AUDIO_EXT,
  Text_Ext: process.env.TEXT_EXT,
  Images_Ext: process.env.IMAGS_EXT,
  SP_Folder: process.env.SP_FOLDER,
  IS_Magnolia: process.env.IS_MAGNOLIA,
};
//# sourceMappingURL=endpoints.config.js.map
