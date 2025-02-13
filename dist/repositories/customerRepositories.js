"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRepository = void 0;
const _models_1 = require("@models");
class CustomerRepository {
    async create(data) {
        const newCustomer = new _models_1.CustomerModel(data);
        return await newCustomer.save();
    }
    async find(query) {
        return await _models_1.CustomerModel.find(query || {}).exec();
    }
    async findById(id) {
        return await _models_1.CustomerModel.findById(id).exec();
    }
    async update(id, data) {
        return await _models_1.CustomerModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async delete(id) {
        const deleted = await _models_1.CustomerModel.findByIdAndDelete(id).exec();
        return deleted !== null;
    }
    async customerCount() {
        return await _models_1.CustomerModel.countDocuments();
    }
    async searchCustomer(query) {
        const search = _models_1.CustomerModel.aggregate([
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
exports.CustomerRepository = CustomerRepository;
