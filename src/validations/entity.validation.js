const validateProperties = (data) => {
  let properties = []
  let invalidProperties = []
  for (const [key, value] of Object.entries(data)) {
    properties.push(key)
  }
  for (let index = 0; index < properties.length; index++) {
    if(!["id", "name", "avatar", "description", "price", "stock", "createdAt", "updatedAt"].includes(properties[index])){
      invalidProperties.push(properties[index])
    }    
  }
  return invalidProperties
}

const validateProduct = (data) => {
  const errors = [];
  const invalidProperties = validateProperties(data)

  if(invalidProperties.length > 0){
    errors.push("Campos inválidos: " + invalidProperties);
  }

  // Validar name
  if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
    errors.push("El campo 'name' es requerido y no puede estar vacío.");
  }

  // Validar description
  if (!data.description || typeof data.description !== 'string' || data.description.trim() === '') {
    errors.push("El campo 'description' es requerido y no puede estar vacío.");
  }

  // Validar el precio que debe ser un número mayor o igual a cero
  if (data.price === undefined || typeof data.price !== 'number' || data.price < 0) {
    errors.push("El campo 'price' es requerido y debe ser un número mayor o igual a cero.");
  }

  // Validar stock el cual va a ser un número entero mayor o igual a cero
  if (data.stock === undefined || typeof data.stock !== 'number' || data.stock < 0 || !Number.isInteger(data.stock)) {
    errors.push("El campo 'stock' es requerido y debe ser un número entero mayor o igual a cero.");
  }

  // Validar avatar la cual debe ser una URL válida
  const urlRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
  if (!data.avatar || typeof data.avatar !== 'string' || !urlRegex.test(data.avatar)) {
    errors.push("El campo 'avatar' es requerido y debe ser una URL válida.");
  }

  return errors;
};

module.exports = { validateProduct };