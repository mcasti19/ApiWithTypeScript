import { Query } from "../types/RepositoryTypes";
import { ICustomerRepository, ICustomerService, Customer, SearchCustomers } from "../types/CustomerTypes";

export class CustomerService implements ICustomerService {
    private customerRepository: ICustomerRepository;

    constructor(customerRepository: ICustomerRepository) {
        this.customerRepository = customerRepository;
    }

    async createCustomer(customer: Customer): Promise<Customer> {
        return this.customerRepository.create(customer);
    }

    async findCustomers(query?: Query): Promise<Customer[]> {
        return this.customerRepository.find(query);
    }

    async findCustomerById(id: string): Promise<Customer | null> {
        return this.customerRepository.findById(id);
    }

    async updateCustomer(id: string, customer: Partial<Customer>): Promise<Customer | null> {
        return this.customerRepository.update(id, customer);
    }

    async deleteCustomer(id: string): Promise<boolean> {
        return this.customerRepository.delete(id);
    }

    async customerCount(): Promise<number> {
        return this.customerRepository.customerCount();
    }

    async searchCustomer(query: string): Promise<SearchCustomers[]> {
        return this.customerRepository.searchCustomer(query);
    }
}