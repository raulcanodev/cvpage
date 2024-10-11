export interface Service {
  _id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  category?: string;
  price?: string;
  imageUrl?: string;
  link?: string;
  active?: boolean;
  image?: string;
  location?: string;
  date?: string;
  dateEnd?: string;
  serviceId: string;
  service?: Service;
}