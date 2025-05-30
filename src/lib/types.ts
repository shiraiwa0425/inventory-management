export type User = {
  id: number;
  username: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Vendor = {
  id: number;
  name: string;
  address: string;
  contact: string;
  taxId: string;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  quantity: number;
  category: string | null;
  location: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PurchaseData = {
  id: number;
  vendor: Vendor;
  vendorId: number;
  purchaseDate: string;
  totalAmount: number;
  taxAmount: number;
  status: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PurchaseOrderItem = {
  id: number;
  purchaseOrderId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
};

export type PurchaseOrder = {
  id: number;
  orderNumber: string;
  supplier: string;
  orderDate: string;
  status: string;
  items: PurchaseOrderItem[];
  createdAt: string;
  updatedAt: string;
};

export type ApiResponse<T> = {
  data?: T;
  error?: string;
  message?: string;
};

export type LoadingState = {
  isLoading: boolean;
  error: string | null;
};