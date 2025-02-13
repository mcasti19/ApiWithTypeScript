import { InvoicesModel } from "../models";
import { Query } from "../types/RepositoryTypes";
import { IInvoicesRepository, Invoice, InvoiceCount, InvoicePageCount, InvoicePaginated } from "../types/InvoicesTypes";

export class InvoicesRepository implements IInvoicesRepository {
  async create(data: Invoice): Promise<Invoice> {
    const newInvoices = new InvoicesModel(data);
    return await newInvoices.save();
  }

  async find(query?: Query, projection?: Record<string, unknown>, options?: Record<string, unknown>): Promise<Invoice[]> {
    return await InvoicesModel.find(query || {}, projection, options).populate("customer");
  }

  async findById(id: string): Promise<Invoice | null> {
    return await InvoicesModel.findById(id).exec();
  }

  async update(id: string, data: Partial<Invoice>): Promise<Invoice | null> {
    return await InvoicesModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await InvoicesModel.findByIdAndDelete(id).exec();
    return deleted !== null;
  }

  async invoicesStatusCount(): Promise<InvoiceCount> {
    const getInvoiceCount = await InvoicesModel.aggregate([
      {
        $group: {
          _id: "$status",
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);

    const formattedResult = getInvoiceCount.reduce(
      (acc, item) => {
        acc[item._id] = item.totalAmount;
        return acc;
      },
      { paid: 0, pending: 0 }
    );

    return formattedResult as InvoiceCount;
  }

  async invoicesCount(): Promise<number> {
    return await InvoicesModel.countDocuments();
  }

  async invoicePaginated(query?: string, currentPage?: number): Promise<InvoicePaginated[]> {
    const ITEMS_PER_PAGE = 6;
    currentPage = currentPage || 1;
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const matchQuery = query
      ? {
          $or: [
            { "customerDetails.name": { $regex: query, $options: "i" } },
            { "customerDetails.email": { $regex: query, $options: "i" } },
            { amount: { $regex: query, $options: "i" } },
            { date: { $regex: query, $options: "i" } },
            { status: { $regex: query, $options: "i" } }
          ]
        }
      : {}; // Si no hay query, no aplicar filtro.

    const invoices = await InvoicesModel.aggregate([
      // "JOIN" entre `invoices` y `customers` usando $lookup
      {
        $lookup: {
          from: "customers",
          localField: "customer",
          foreignField: "_id",
          as: "customerDetails"
        }
      },
      // Descomponer el array `customerDetails` para simplificar el acceso a sus campos
      { $unwind: "$customerDetails" },
      // Aplicar el filtro de búsqueda si hay query
      { $match: matchQuery },
      // Proyectar los campos necesarios
      {
        $project: {
          id: "$_id",
          amount: 1,
          date: 1,
          status: 1,
          name: "$customerDetails.name",
          email: "$customerDetails.email",
          image_url: "$customerDetails.image_url"
        }
      },
      // Ordenar por fecha en orden descendente
      { $sort: { date: -1 } },
      // Saltar y limitar resultados para paginación
      { $skip: offset },
      { $limit: ITEMS_PER_PAGE }
    ]);

    return invoices;
  }

  async invoicesPagesCount(query: string): Promise<InvoicePageCount> {
    const countResult = await InvoicesModel.aggregate([
      // Realizar el "JOIN" entre `invoices` y `customers`
      {
        $lookup: {
          from: "customers",
          localField: "customer",
          foreignField: "_id",
          as: "customerDetails"
        }
      },
      // Descomponer el array `customerDetails` para simplificar el acceso a sus campos
      { $unwind: "$customerDetails" },
      // Aplicar el filtro de búsqueda
      {
        $match: {
          $or: [
            { "customerDetails.name": { $regex: query, $options: "i" } },
            { "customerDetails.email": { $regex: query, $options: "i" } },
            { amount: { $regex: query, $options: "i" } },
            { date: { $regex: query, $options: "i" } },
            { status: { $regex: query, $options: "i" } }
          ]
        }
      },
      // Contar el total de documentos que coinciden con el filtro
      {
        $count: "totalCount"
      }
    ]);

    return countResult[0] as InvoicePageCount;
  }
}