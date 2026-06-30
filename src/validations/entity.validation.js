const validateProperties = (data) => {
  let properties = []
  let invalidProperties = []
  for (const [key, value] of Object.entries(data)) {
    properties.push(key)
  }
  for (let index = 0; index < properties.length; index++) {
    if(!["id", 
      "name", 
      "avatar", 
      "description", 
      "price", 
      "stock", 
      "createdAt", 
      "updatedAt"].includes(properties[index])){
      invalidProperties.push(properties[index])
    }    
  }
  return invalidProperties
}

const validateUserProperties = (data) => {
  let properties = []
  let invalidProperties = []
  for (const [key, value] of Object.entries(data)) {
    properties.push(key)
  }
  for (let index = 0; index < properties.length; index++) {
    if(![
      "rol",
      "id",
      "email",
      "password",
      "createdAt", 
      "updatedAt"].includes(properties[index])){
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

const validateUser = (data) => {
  const errors = [];
  const invalidProperties = validateUserProperties(data)

  if(invalidProperties.length > 0){
    errors.push("Campos inválidos: " + invalidProperties);
  }

  console.log(data)

  // Validar name
  if (!data.email || typeof data.email !== 'string' || data.email.trim() === '') {
    errors.push("El campo 'email' es requerido y no puede estar vacío.");
  }

  // Validar description
  if (!data.password || typeof data.password !== 'string' || data.password.trim() === '') {
    errors.push("El campo 'password' es requerido y no puede estar vacío.");
  }

  return errors
}

const validateAuth = (data) => {
  const errors = [];

  // Expresión regular para validar el formato de un email (ej. texto@texto.com)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!data.email || typeof data.email !== 'string' || !emailRegex.test(data.email)) {
    errors.push("El campo 'email' es requerido y debe tener un formato de correo válido.");
  }

  // Validar también que la contraseña exista y no esté vacía
  if (!data.password || typeof data.password !== 'string' || data.password.trim() === '') {
    errors.push("El campo 'password' es requerido y no puede estar vacío.");
  }

  return errors;
};

module.exports = { validateProduct, validateUser , validateAuth};