import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth/authController";
import { getPermission, verifyToken } from "../middlewares/auth";
import { checkRoles } from "../middlewares/roles";
import {
    createCustomer,
    createInvoices,
    createPosts,
    createUser,
    customerCount,
    deleteCustomer,
    deleteInvoices,
    deletePosts,
    deleteRoleById,
    deleteUserById,
    findCustomer,
    findCustomerById,
    findInvoices,
    findInvoicesById,
    findPosts,
    findPostsById,
    findRevenue,
    getInvoiceCount,
    getInvoicePageCount,
    getInvoicesPaginated,
    getInvoiceStatusCount,
    getRoleById,
    getRoles,
    getUserById,
    getUsers,
    registerRole,
    searchCustomer,
    updateCustomer,
    updateInvoices,
    updatePosts,
    updateRoleById,
    updateUserById
} from "@controllers";


const router = Router();

export default () => {
    router.get('/', (req, res) => {
        res.send("API is Healthy");
    });

    //******************************************************/AUTH ROUTES
    router.post('/auth/register', checkRoles, registerUser);
    router.post('/auth/login', loginUser);


    //***************************************************/ USERS ROUTES
    router.post('/users', verifyToken, getPermission, checkRoles, createUser);
    router.get('/users', verifyToken, getPermission, getUsers);
    router.route('/users/:id',)
        .get(verifyToken, getPermission, getUserById)
        .put(verifyToken, getPermission, updateUserById)
        .delete(verifyToken, getPermission, deleteUserById);

    //*****************************************************/ ROLES ROUTES
    router.post('/roles', verifyToken, getPermission, registerRole)
    router.get('/roles', verifyToken, getPermission, getRoles)
    router.route('/roles/:id')
        .get(verifyToken, getPermission, getRoleById)
        .put(verifyToken, getPermission, updateRoleById)
        .delete(verifyToken, getPermission, deleteRoleById);

    //****************************************************/ POSTS ROUTES
    // Posts Routes
    router.get("/posts", findPosts);
    router.get("/posts/:id", findPostsById);
    router.post("/posts", verifyToken, getPermission, createPosts);
    router.put("/posts/:id", verifyToken, getPermission, updatePosts);
    router.delete("/posts/:id", verifyToken, getPermission, deletePosts);


    // Customer Routes
    router.get("/customer", verifyToken, getPermission, findCustomer);
    router.get("/customer/search", verifyToken, getPermission, searchCustomer);
    router.get("/customer/count", verifyToken, getPermission, customerCount);
    router.get("/customer/:id", verifyToken, getPermission, findCustomerById);
    router.post("/customer", verifyToken, getPermission, createCustomer);
    router.put("/customer/:id", verifyToken, getPermission, updateCustomer);
    router.delete("/customer/:id", verifyToken, getPermission, deleteCustomer);

    // Invoices Routes
    router.get("/invoices", verifyToken, getPermission, findInvoices);
    router.get("/invoices/paginate", verifyToken, getPermission, getInvoicesPaginated);
    router.get("/invoices/status-count", verifyToken, getPermission, getInvoiceStatusCount);
    router.get("/invoices/page-count", verifyToken, getPermission, getInvoicePageCount);
    router.get("/invoices/count", verifyToken, getPermission, getInvoiceCount);
    router.get("/invoice/:id", verifyToken, getPermission, findInvoicesById);
    router.post("/invoices", verifyToken, getPermission, createInvoices);
    router.put("/invoices/:id", verifyToken, getPermission, updateInvoices);
    router.delete("/invoices/:id", verifyToken, getPermission, deleteInvoices);

    // Revenue Route
    router.get("/revenues", verifyToken, getPermission, findRevenue);


    return router
};