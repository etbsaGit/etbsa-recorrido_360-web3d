import { configureStore } from "@reduxjs/toolkit";
import { isActiveSlice } from "./slices/example/example";

export const store = configureStore({
	// todas los reducers de los slices
	// exampleName es la forma en la cual se llamaran dentro de los componentes
	reducer: {
		exampleName: isActiveSlice.reducer,
	},
});
