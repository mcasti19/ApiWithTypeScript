"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceService = void 0;
class InvoiceService {
    constructor(invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }
    async createInvoice(invoice) {
        return this.invoiceRepository.create(invoice);
    }
    async findInvoices(query, projection, options) {
        return this.invoiceRepository.find(query, projection, options);
    }
    async findInvoiceById(id) {
        return this.invoiceRepository.findById(id);
    }
    async updateInvoice(id, Invoice) {
        return this.invoiceRepository.update(id, Invoice);
    }
    async deleteInvoice(id) {
        return this.invoiceRepository.delete(id);
    }
    async invoicesCount() {
        return this.invoiceRepository.invoicesCount();
    }
    async invoicesStatusCount() {
        return this.invoiceRepository.invoicesStatusCount();
    }
    async invoicePaginated(query, currentPage) {
        return this.invoiceRepository.invoicePaginated(query, currentPage);
    }
    async invoicesPagesCount(query) {
        return this.invoiceRepository.invoicesPagesCount(query);
    }
}
exports.InvoiceService = InvoiceService;
