
export default class BaseError extends Error {
    public name: string;
    public message: string;
    public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
  }
}
