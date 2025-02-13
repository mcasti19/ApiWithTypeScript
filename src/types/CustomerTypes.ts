import { Document } from "mongoose";
import { Query, Repository } from "./RepositoryTypes";
import { Totals } from "./InvoicesTypes";

export interface Customer extends Document {
  name: string;
  email: string;
  image_url: string;
}

export interface ICustomerRepository extends Repository<Customer> {
  customerCount(): Promise<number>;
  searchCustomer(query: string): Promise<SearchCustomers[]>;
}

export type SearchCustomers = Customer & Totals;

export interface ICustomerService {
  createCustomer(customer: Customer): Promise<Customer>;
  findCustomers(query?: Query): Promise<Customer[]>;
  findCustomerById(id: string): Promise<Customer | null>;
  updateCustomer(id: string, Customer: Partial<Customer>): Promise<Customer | null>;
  deleteCustomer(id: string): Promise<boolean>;
  customerCount(): Promise<number>;
  searchCustomer(query: string): Promise<SearchCustomers[]>;
}