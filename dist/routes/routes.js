"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/auth/authController");
const auth_1 = require("../middlewares/auth");
const roles_1 = require("../middlewares/roles");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
exports.default = () => {
    router.get('/', (req, res) => {
        res.send("API is Healthy");
    });
    //******************************************************/AUTH ROUTES
    router.post('/auth/register', roles_1.checkRoles, authController_1.registerUser);
    router.post('/auth/login', authController_1.loginUser);
    //***************************************************/ USERS ROUTES
    router.post('/users', auth_1.verifyToken, auth_1.getPermission, roles_1.checkRoles, controllers_1.createUser);
    router.get('/users', auth_1.verifyToken, auth_1.getPermission, controllers_1.getUsers);
    router.route('/users/:id')
        .get(auth_1.verifyToken, auth_1.getPermission, controllers_1.getUserById)
        .put(auth_1.verifyToken, auth_1.getPermission, controllers_1.updateUserById)
        .delete(auth_1.verifyToken, auth_1.getPermission, controllers_1.deleteUserById);
    //*****************************************************/ ROLES ROUTES
    router.post('/roles', auth_1.verifyToken, auth_1.getPermission, controllers_1.registerRole);
    router.get('/roles', auth_1.verifyToken, auth_1.getPermission, controllers_1.getRoles);
    router.route('/roles/:id')
        .get(auth_1.verifyToken, auth_1.getPermission, controllers_1.getRoleById)
        .put(auth_1.verifyToken, auth_1.getPermission, controllers_1.updateRoleById)
        .delete(auth_1.verifyToken, auth_1.getPermission, controllers_1.deleteRoleById);
    //****************************************************/ POSTS ROUTES
    // Posts Routes
    router.get("/posts", controllers_1.findPosts);
    router.get("/posts/:id", controllers_1.findPostsById);
    router.post("/posts", auth_1.verifyToken, auth_1.getPermission, controllers_1.createPosts);
    router.put("/posts/:id", auth_1.verifyToken, auth_1.getPermission, controllers_1.updatePosts);
    router.delete("/posts/:id", auth_1.verifyToken, auth_1.getPermission, controllers_1.deletePosts);
    // Customer Routes
    router.get("/customer", auth_1.verifyToken, auth_1.getPermission, controllers_1.findCustomer);
    router.get("/customer/search", auth_1.verifyToken, auth_1.getPermission, controllers_1.searchCustomer);
    router.get("/customer/count", auth_1.verifyToken, auth_1.getPermission, controllers_1.customerCount);
    router.get("/customer/:id", auth_1.verifyToken, auth_1.getPermission, controllers_1.findCustomerById);
    router.post("/customer", auth_1.verifyToken, auth_1.getPermission, controllers_1.createCustomer);
    router.put("/customer/:id", auth_1.verifyToken, auth_1.getPermission, controllers_1.updateCustomer);
    router.delete("/customer/:id", auth_1.verifyToken, auth_1.getPermission, controllers_1.deleteCustomer);
    // Invoices Routes
    router.get("/invoices", auth_1.verifyToken, auth_1.getPermission, controllers_1.findInvoices);
    router.get("/invoices/paginate", auth_1.verifyToken, auth_1.getPermission, controllers_1.getInvoicesPaginated);
    router.get("/invoices/status-count", auth_1.verifyToken, auth_1.getPermission, controllers_1.getInvoiceStatusCount);
    router.get("/invoices/page-count", auth_1.verifyToken, auth_1.getPermission, controllers_1.getInvoicePageCount);
    router.get("/invoices/count", auth_1.verifyToken, auth_1.getPermission, controllers_1.getInvoiceCount);
    router.get("/invoice/:id", auth_1.verifyToken, auth_1.getPermission, controllers_1.findInvoicesById);
    router.post("/invoices", auth_1.verifyToken, auth_1.getPermission, controllers_1.createInvoices);
    router.put("/invoices/:id", auth_1.verifyToken, auth_1.getPermission, controllers_1.updateInvoices);
    router.delete("/invoices/:id", auth_1.verifyToken, auth_1.getPermission, controllers_1.deleteInvoices);
    // Revenue Route
    router.get("/revenues", auth_1.verifyToken, auth_1.getPermission, controllers_1.findRevenue);
    return router;
};
