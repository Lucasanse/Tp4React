import React, { useEffect, useState, useRef } from 'react';
import { getProducts } from '../../services/api.js';
import { ItemCard } from '../ItemCard/ItemCard.jsx';
import Spinner from '../Spinner/Spinner.jsx';
import ErrorComponent from '../Error/ErrorComponent.jsx';
import { getLocalStorage } from "../../services/localStorage";

const ItemLoader = ({ searchQuery, favorites, setFavorites }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const cantProductos = 6;

  console.log(getLocalStorage("favorites"));
  


  // Referencia al div que estará al final de la lista
  const loaderRef = useRef(null);

  // Effect para resetear la paginación cuando el usuario hace una nueva búsqueda
  useEffect(() => {
    setPage(1);
    setProducts([]);
    setHasMore(true);
  }, [searchQuery]);

  // Effect para buscar productos cuando cambia la query o la página
  useEffect(() => {
    setLoading(true);
    setError(null);
    if(favorites){
      setProducts(favorites);
      setHasMore(false);
      setLoading(false);
      return;
    }
      getProducts(searchQuery, page, cantProductos)
      .then(data => {
        if (Array.isArray(data)) {
          if (page === 1) {
            setProducts(data);
          } else {
            setProducts(prevProducts => [...prevProducts, ...data]);
          }
          if (data.length < cantProductos) {
            setHasMore(false);
          }
        } else {
          if (page === 1) setProducts([]);
          setHasMore(false);
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      })
    
  }, [searchQuery, page, favorites]);

  // Effect para el intersection observer (scroll infinito)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      // Si el div es visible, hay más elementos, y no está cargando actualmente: sumamos una página
      if (target.isIntersecting && hasMore && !loading) {
        setPage(prevPage => prevPage + 1);
      }
    }, {
      // rootMargin hace que detecte el div 100px antes de llegar
      rootMargin: "100px" 
    });

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [hasMore, loading]);

  // Solo mostramos el "Cargando" global en la primera página
  if (loading && page === 1) {
    return( 
      <div className="flex flex-col justify-center items-center w-full">
        <Spinner/>
      </div>
    )
  }

  if (error) {
    return <ErrorComponent message={error} type="error" />
  }
  return (
    <div className="flex flex-col items-center w-full">
      <div className='grid place-items-center grid-cols-1 md:grid-cols-3 gap-4 m-4 w-full'>
        {products.length > 0
          ? products.map((item) => (
            <div key={item.id}>
              <ItemCard {...item} setFavorites={setFavorites} />
            </div>
          ))
          : !loading && (
            <ErrorComponent message={searchQuery}/>
          )
        }
      </div>

      {/*este es el elemento que el observer está vigilando. */}
      {hasMore && (
        <div ref={loaderRef} className="h-10 w-full flex justify-center items-center my-4">
          {loading && page > 1 && <Spinner/>}
        </div>
      )}
    </div>
  );
};

export default ItemLoader;