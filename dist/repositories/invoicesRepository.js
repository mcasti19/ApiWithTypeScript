"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoicesRepository = void 0;
const models_1 = require("../models");
class InvoicesRepository {
    async create(data) {
        const newInvoices = new models_1.InvoicesModel(data);
        return await newInvoices.save();
    }
    async find(query, projection, options) {
        return await models_1.InvoicesModel.find(query || {}, projection, options).populate("customer");
    }
    async findById(id) {
        return await models_1.InvoicesModel.findById(id).exec();
    }
    async update(id, data) {
        return await models_1.InvoicesModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async delete(id) {
        const deleted = await models_1.InvoicesModel.findByIdAndDelete(id).exec();
        return deleted !== null;
    }
    async invoicesStatusCount() {
        const getInvoiceCount = await models_1.InvoicesModel.aggregate([
            {
                $group: {
                    _id: "$status",
                    totalAmount: { $sum: "$amount" }
                }
            }
        ]);
        const formattedResult = getInvoiceCount.reduce((acc, item) => {
            acc[item._id] = item.totalAmount;
            return acc;
        }, { paid: 0, pending: 0 });
        return formattedResult;
    }
    async invoicesCount() {
        return await models_1.InvoicesModel.countDocuments();
    }
    async invoicePaginated(query, currentPage) {
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
        const invoices = await models_1.InvoicesModel.aggregate([
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
    async invoicesPagesCount(query) {
        const countResult = await models_1.InvoicesModel.aggregate([
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
        return countResult[0];
    }
}
exports.InvoicesRepository = InvoicesRepository;
