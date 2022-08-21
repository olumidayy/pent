interface ApiResponseProps {
  success: boolean;
  code: number;
  message: string;
  data?: object;
}

export default class ApiResponse {
  public success: boolean;

  public code: number;

  public message: string;

  public data?: object;

  constructor(props: ApiResponseProps) {
    this.success = props.success;
    this.code = props.code;
    this.message = props.message;
    this.data = props.data;
  }
}
