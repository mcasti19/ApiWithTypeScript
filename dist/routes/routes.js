"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("@controllers/auth/authController");
const usersController_1 = require("@controllers/usersController");
const rolesController_1 = require("@controllers/rolesController");
const postsController_1 = require("@controllers/postsController");
const auth_1 = require("@middlewares/auth");
const roles_1 = require("@middlewares/roles");
const router = (0, express_1.Router)();
exports.default = () => {
    router.get('/health', (req, res) => {
        res.send("API is Healthy");
    });
    //******************************************************/AUTH ROUTES
    router.post('/auth/register', roles_1.checkRoles, authController_1.registerUser);
    router.post('/auth/login', authController_1.loginUser);
    //***************************************************/ USERS ROUTES
    router.post('/users', auth_1.verifyToken, auth_1.getPermission, roles_1.checkRoles, usersController_1.createUser);
    router.get('/users', auth_1.verifyToken, auth_1.getPermission, usersController_1.getUsers);
    router.route('/users/:id')
        .get(auth_1.verifyToken, auth_1.getPermission, usersController_1.getUserById)
        .put(auth_1.verifyToken, auth_1.getPermission, usersController_1.updateUserById)
        .delete(auth_1.verifyToken, auth_1.getPermission, usersController_1.deleteUserById);
    //*****************************************************/ ROLES ROUTES
    router.post('/roles', auth_1.verifyToken, auth_1.getPermission, rolesController_1.registerRole);
    router.get('/roles', auth_1.verifyToken, auth_1.getPermission, rolesController_1.getRoles);
    router.route('/roles/:id')
        .get(auth_1.verifyToken, auth_1.getPermission, rolesController_1.getRoleById)
        .put(auth_1.verifyToken, auth_1.getPermission, rolesController_1.updateRoleById)
        .delete(auth_1.verifyToken, auth_1.getPermission, rolesController_1.deleteRoleById);
    //****************************************************/ POSTS ROUTES
    // Posts Routes
    router.get("/posts", postsController_1.findPosts);
    router.get("/posts/:id", postsController_1.findPostsById);
    router.post("/posts", auth_1.verifyToken, auth_1.getPermission, postsController_1.createPosts);
    router.put("/posts/:id", auth_1.verifyToken, auth_1.getPermission, postsController_1.updatePosts);
    router.delete("/posts/:id", auth_1.verifyToken, auth_1.getPermission, postsController_1.deletePosts);
    return router;
};
