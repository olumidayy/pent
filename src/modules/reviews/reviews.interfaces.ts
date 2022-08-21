export interface NewReview {
  apartmentId: number;
  userId: number;
  description: string;
  landlord: number;
  environment: number;
  quality: number;
  media: Array<string>;
}
