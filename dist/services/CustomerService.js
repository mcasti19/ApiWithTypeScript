"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
class CustomerService {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async createCustomer(customer) {
        return this.customerRepository.create(customer);
    }
    async findCustomers(query) {
        return this.customerRepository.find(query);
    }
    async findCustomerById(id) {
        return this.customerRepository.findById(id);
    }
    async updateCustomer(id, customer) {
        return this.customerRepository.update(id, customer);
    }
    async deleteCustomer(id) {
        return this.customerRepository.delete(id);
    }
    async customerCount() {
        return this.customerRepository.customerCount();
    }
    async searchCustomer(query) {
        return this.customerRepository.searchCustomer(query);
    }
}
exports.CustomerService = CustomerService;
