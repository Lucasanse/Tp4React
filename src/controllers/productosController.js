const productosService = require("../services/productosService");
const { validateProduct } = require("../validations/entity.validation");


const getAll = async (req, res, next) => {
  try {
    const { page, limit, name } = req.query;
    const productos = await productosService.getProductos(page, limit, name);
    res.json(productos);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productId = parseInt(id, 10);
    
    if (isNaN(productId)) {
      const error = new Error("El ID proporcionado no es válido");
      error.status = 400; 
      return next(error); 
    }

    const producto = await productosService.getProductoById(productId);

    if (!producto) {
      const error = new Error("Juguete no encontrado");
      error.status = 404; 
      return next(error); 
    }

    res.json(producto);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const errors = validateProduct(req.body);
    
    if (errors.length > 0) {
      const error = new Error("Error de validación en los datos");
      error.status = 400;
      error.errors = errors; 
      return next(error); 
    }

    const newProduct = await productosService.createProducto(req.body);
    
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

const deleteProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await productosService.deleteProducto(id);
    res.json({ message: 'Eliminado correctamente', data: deleted });
  } catch (error) {
    next(error);
  }
};

const actualizarProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const errors = validateProduct(req.body)
    if(errors.length > 0){
      const error = new Error("Error de actualizacion de datos");
      error.status = 400;
      error.errors = errors; 
      return next(error); 
    }
    const updated = await productosService.actualizarProducto(id, req.body);
    res.json({ message: 'Actualizado correctamente', data: updated });
  } catch (error) {
    next(error);
  }
}



module.exports = {
  getAll,
  getById,
  create,
  deleteProducto,
  actualizarProducto
};