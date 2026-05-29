export const url = "https://69f018fd112e1b968e252e01.mockapi.io/api/v1/Productos";


export async function getProducts(searchQuery = "", page = 1, limit) {
  
  const fetchUrl = new URL(url);

  fetchUrl.searchParams.append("page", page);
  fetchUrl.searchParams.append("limit", limit);

  // Si hay una búsqueda, le agregamos el filtro de MockAPI a la URL
  //la searchQuery va a ser por el nombre del producto
  if (searchQuery) {
    fetchUrl.searchParams.append("name", searchQuery); 
  }

  //aca se une todo automáticamente (ej: https://.../Productos?page=1&limit=6&name=muñeca)
  const response = await fetch(fetchUrl.toString(), {
    method: 'GET',
    headers: {'content-type':'application/json'}
  });

  // Si MockAPI no encuentra coincidencias o se pasa de página, devuelve string vacio
  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error(`Error de HTTP: ${response.status}`);
  }

  return response.json();
}

export async function getDetails(id) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error de HTTP: ${response.status}`);
  }

  const data = await response.json(); 

  if (id) {
    return data.filter((item) => item.id === id); 
  }

  return data;
}

