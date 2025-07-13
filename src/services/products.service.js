//Servicios de productos
import * as ProductModel from "../models/Product.js";

export const getAllProducts = async () => {
    try {
        const products = await ProductModel.getAllProducts();
        if (products.length === 0) {
            throw new Error("No hay productos");
        }
        return products;
    } catch (error) {
        console.error("[Service] Error in getAllProducts:", error.message);
        throw new Error(`[Service] Error al obtener los productos: ${error.message}`);
    }
};

export const getProductById = async (id) => {
    try {
        const product = await ProductModel.getProductById(id);
        if (!product) {
            throw new Error("Producto no encontrado");
        }
        return product;
    } catch (error) {
        console.error("[Service] Error in getProductById:", error.message);
        throw new Error(`[Service] Error al obtener el producto: ${error.message}`);
    }
};

export const createProduct = async (product) => {
    try {
        if (typeof product !== "object") {
            throw new Error("El producto debe ser un objeto");
        }
        const newProduct = await ProductModel.createProduct(product);
        return newProduct;
    } catch (error) {
        console.error("[Service] Error in createProduct:", error.message);
        throw new Error(`[Service] Error al crear el producto: ${error.message}`);
    }
};

export const deleteProduct = async (id) => {
    try {
        const product = await ProductModel.getProductById(id);
        if (!product) {
            throw new Error("Producto no encontrado");
        }
        await ProductModel.deleteProduct(id);
        return { message: "Producto eliminado correctamente" };
    } catch (error) {
        console.error("[Service] Error in deleteProduct:", error.message);
        throw new Error(`[Service] Error al eliminar el producto: ${error.message}`);
    }
};

export const searchProduct = async (name) => {
    try {
        // Validate that name is provided and is a string
        if (!name || typeof name !== 'string' || name.trim() === '') {
            throw new Error("El nombre de búsqueda es requerido y debe ser una cadena válida");
        }

        const searchTerm = name.trim().toLowerCase().replace("_", " ");

        const products = await ProductModel.getAllProducts()
        const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm));
        
        return filteredProducts;
    } catch (error) {
        console.error("[Service] Error in searchProduct:", error.message);
        throw new Error(`[Service] Error al buscar el producto: ${error.message}`);
    }
};

