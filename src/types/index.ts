export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'automation' | 'irrigation' | 'monitoring';
  image: string;
  features: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
  company?: string;
  phone?: string;
}