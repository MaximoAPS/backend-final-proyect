//Controladores de productos
import * as ProductService from "../services/products.service.js";


export const getAllProducts = async (req, res) => {
    try {
        const products = await ProductService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductService.getProductById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await ProductService.createProduct(product);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await ProductService.deleteProduct(id);
        res.status(200).json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchProduct = async (req, res) => {
    try {
        const { name } = req.params;
        const products = await ProductService.searchProduct(name);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};