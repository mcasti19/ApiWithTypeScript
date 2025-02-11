import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth/authController";

import { deleteUserById, getUserById, getUsers, createUser, updateUserById } from "../controllers/usersController";
import { deleteRoleById, getRoleById, getRoles, registerRole, updateRoleById } from "../controllers/rolesController";
import { createPosts, deletePosts, findPosts, findPostsById, updatePosts } from "../controllers/postsController";
import { getPermission, verifyToken } from "../middlewares/auth";
import { checkRoles } from "../middlewares/roles";
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

    return router
};