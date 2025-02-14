import { Document } from "mongoose";
import { Query, Repository } from "./RepositoryTypes";
import { Customer } from "./CustomerTypes";

export interface Invoice extends Document {
  customer: Customer;
  amount: number;
  status: "paid" | "pending";
  date: Date;
}

export interface Totals {
  total_invoices: string;
  total_pending: string;
  total_paid: string;
}

export interface InvoiceCount {
  paid: number;
  pending: number;
}

export interface InvoicePaginated {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: "pending" | "paid";
}

export interface InvoicePageCount {
  totalCount: number;
}

export interface IInvoicesRepository extends Repository<Invoice> {
  invoicesStatusCount(): Promise<InvoiceCount>;
  invoicesCount(): Promise<number>;
  invoicePaginated(query: string, currentPage: number): Promise<InvoicePaginated[]>;
  invoicesPagesCount(query: string): Promise<InvoicePageCount>;
}

export interface IInvoicesService {
  createInvoice(invoice: Invoice): Promise<Invoice>;
  findInvoices(query?: Query, projection?: Record<string, unknown>, options?: Record<string, unknown>): Promise<Invoice[]>;
  findInvoiceById(id: string): Promise<Invoice | null>;
  updateInvoice(id: string, Invoices: Partial<Invoice>): Promise<Invoice | null>;
  deleteInvoice(id: string): Promise<boolean>;
  invoicesStatusCount(): Promise<InvoiceCount>;
  invoicesCount(): Promise<number>;
  invoicePaginated(query: string, currentPage: number): Promise<InvoicePaginated[]>;
  invoicesPagesCount(query: string): Promise<InvoicePageCount>;
}