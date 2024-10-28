type UserSetting = {
  muFolder?: string;
  ipAndPort?: string;
  version?: number;
  regedit?: object;
  server?: {
    name: string;
    key: string;
  };
};

type UpdateData = {
  server: string;
  version: number;
  apiVersion: number;
  baseUrl: string;
  items: string[];
};
