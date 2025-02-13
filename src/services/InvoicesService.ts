import { Query } from "types/RepositoryTypes";
import { IInvoicesRepository, IInvoicesService, Invoice, InvoiceCount, InvoicePageCount, InvoicePaginated } from "types/InvoicesTypes";

export class InvoiceService implements IInvoicesService {
    private invoiceRepository: IInvoicesRepository;

    constructor(invoiceRepository: IInvoicesRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    async createInvoice(invoice: Invoice): Promise<Invoice> {
        return this.invoiceRepository.create(invoice);
    }

    async findInvoices(query?: Query, projection?: Record<string, unknown>, options?: Record<string, unknown>): Promise<Invoice[]> {
        return this.invoiceRepository.find(query, projection, options);
    }

    async findInvoiceById(id: string): Promise<Invoice | null> {
        return this.invoiceRepository.findById(id);
    }

    async updateInvoice(id: string, Invoice: Partial<Invoice>): Promise<Invoice | null> {
        return this.invoiceRepository.update(id, Invoice);
    }

    async deleteInvoice(id: string): Promise<boolean> {
        return this.invoiceRepository.delete(id);
    }

    async invoicesCount(): Promise<number> {
        return this.invoiceRepository.invoicesCount();
    }

    async invoicesStatusCount(): Promise<InvoiceCount> {
        return this.invoiceRepository.invoicesStatusCount();
    }

    async invoicePaginated(query: string, currentPage: number): Promise<InvoicePaginated[]> {
        return this.invoiceRepository.invoicePaginated(query, currentPage);
    }

    async invoicesPagesCount(query: string): Promise<InvoicePageCount> {
        return this.invoiceRepository.invoicesPagesCount(query);
    }
}