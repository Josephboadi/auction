import React, { useEffect, useContext, useReducer, useState } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";
import { getRawProduct } from "../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: "price-lowest",
  filters: {
    text: "",
    // company: 'all',
    category: "all",
    // color: 'all',
    min_price: 0,
    max_price: 0,
    min_rate: 0,
    max_rate: 5,
    ratings: 0,
    price: 0,
    // shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  // const { products } = useProductsContext();
  const [products, setProducts] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);

  const dispatched = useDispatch();
  const { loading, error, allProducts } = useSelector(
    (state) => state.allProducts
  );

  // console.log(allProducts);
  // console.log(products);

  useEffect(() => {
    dispatched(getRawProduct());
    // setProducts([allProducts]);
  }, []);

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: allProducts });
  }, [allProducts]);

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [allProducts, state.sort, state.filters]);

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };
  const updateSort = (e) => {
    // for demonstration
    // const name = e.target.name
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };
  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "category") {
      value = e.target.textContent;
    }
    // if (name === 'color') {
    //   value = e.target.dataset.color;
    // }
    if (name === "price") {
      value = Number(value);
    }

    if (name === "ratings") {
      value = Number(value);
    }
    // if (name === 'shipping') {
    //   value = e.target.checked;
    // }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };
  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
