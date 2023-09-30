import { configureStore } from "@reduxjs/toolkit";
import ProductsSlice from "./Slices/ProductsSlice";
import FilterAndPageSlice from "./Slices/FilterAndPageSlice";
import CartSlice from "./Slices/CartSlice";
import AuthSlice from "./Slices/AuthSlice";
import FilterTypeSlice from "./Slices/FilterTypeSlice";
import OrderSlice from "./Slices/OrderSlice";
import WishlistSlice from "./Slices/WishlistSlice";

const store = configureStore({
  reducer: {
    product: ProductsSlice,
    FilterAndPage: FilterAndPageSlice,
    cart: CartSlice,
    wishlist: WishlistSlice,
    auth: AuthSlice,
    order: OrderSlice,
    filterType: FilterTypeSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
  }),
});

export default store;
