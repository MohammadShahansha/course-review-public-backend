export type TErrorSource = {
  path: string | number;
  message: string;
}[];

export type TErrorRespons = {
  statusCode: number;
  message: string;
  errorSources: TErrorSource;
};
