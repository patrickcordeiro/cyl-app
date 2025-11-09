export type ErrorResponse = {
  message: string;
  cause: string | null;
  details: string[] | [];
};
