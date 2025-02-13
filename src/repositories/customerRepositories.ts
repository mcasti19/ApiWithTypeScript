import { CustomerModel } from "../models";
import { Query } from "../types/RepositoryTypes";
import { ICustomerRepository, Customer, SearchCustomers } from "../types/CustomerTypes";

export class CustomerRepository implements ICustomerRepository {
  async create(data: Customer): Promise<Customer> {
    const newCustomer = new CustomerModel(data);
    return await newCustomer.save();
  }

  async find(query?: Query): Promise<Customer[]> {
    return await CustomerModel.find(query || {}).exec();
  }

  async findById(id: string): Promise<Customer | null> {
    return await CustomerModel.findById(id).exec();
  }

  async update(id: string, data: Partial<Customer>): Promise<Customer | null> {
    return await CustomerModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await CustomerModel.findByIdAndDelete(id).exec();
    return deleted !== null;
  }

  async customerCount(): Promise<number> {
    return await CustomerModel.countDocuments();
  }

  async searchCustomer(query: string): Promise<SearchCustomers[]> {
    const search = CustomerModel.aggregate([
      // Filtro por nombre o email, si se proporciona una consulta
      {
        $match: {
          $or: [{ name: { $regex: query, $options: "i" } }, { email: { $regex: query, $options: "i" } }]
        }
      },
      // Realizar el "JOIN" entre `customers` e `invoices`
      {
        $lookup: {
          from: "invoices",
          localField: "_id",
          foreignField: "customer", // campo en `invoices` que referencia a `customers`
          as: "invoices"
        }
      },
      // Agrupar y sumar los valores según el estado de cada factura
      {
        $project: {
          id: 1,
          name: 1,
          email: 1,
          image_url: 1,
          total_invoices: { $size: "$invoices" },
          total_pending: {
            $sum: {
              $map: {
                input: "$invoices",
                as: "invoice",
                in: { $cond: [{ $eq: ["$$invoice.status", "pending"] }, "$$invoice.amount", 0] }
              }
            }
          },
          total_paid: {
            $sum: {
              $map: {
                input: "$invoices",
                as: "invoice",
                in: { $cond: [{ $eq: ["$$invoice.status", "paid"] }, "$$invoice.amount", 0] }
              }
            }
          }
        }
      },
      // Ordenar por nombre de cliente en orden ascendente
      {
        $sort: { name: 1 }
      }
    ]);

    return search;
  }
}