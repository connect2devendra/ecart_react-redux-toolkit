import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: 'cart',
    initialState: {cartItems:[],totalQnty:0},
    reducers: {
        addToCart(state, action) {
            //Check product already exist in card or not
            const check_index = state.cartItems?.findIndex(x => x.id === action.payload.id);
            if (check_index !== -1) {
                //update quantity if product already in cart
                state.cartItems[check_index].qty++;
                state.totalQnty++; 
                // state.totalPrice = state.cartItems?.reduce((total, item) => total + item.price, action.payload.price); 
                // console.log("Quantity updated:", state);
              } else {
                //add new product to cart  
                state.totalQnty++;  
                // state.totalPrice = state.cartItems?.reduce((total, item) => total + item.price, action.payload.price);           
                state.cartItems = [...state.cartItems,{...action.payload, qty:1}];
            }       
        },
        removeFromCart(state, action) {
            //remove matched product from current state
            // return state.filter((item) => item.product.id !== action.payload);
            const check_index = state.cartItems?.findIndex(x => x.id === action.payload);
            if (check_index !== -1) {

                //Remove from cartItem if quantity becomes zero
                if((state.cartItems[check_index].qty -1) <= 0){
                    state.totalQnty--; 
                    state.cartItems.splice(
                        state.cartItems.findIndex((item) => item.id === action.payload),
                        1
                      );
                }else{

                    //update quantity if product already in cart
                    state.cartItems[check_index].qty--;
                    state.totalQnty--; 
                    // console.log("Quantity updated:", state); 
                }                               
            }
        },
        removeFromCart(state, action) {
            //remove matched product from current state
            // return state.filter((item) => item.product.id !== action.payload);
            const check_index = state.cartItems?.findIndex(x => x.id === action.payload);
            if (check_index !== -1) {

                //Remove from cartItem if quantity becomes zero
                if((state.cartItems[check_index].qty -1) <= 0){
                    state.totalQnty--; 
                    state.cartItems.splice(
                        state.cartItems.findIndex((item) => item.id === action.payload),
                        1
                      );
                }else{

                    //update quantity if product already in cart
                    state.cartItems[check_index].qty--;
                    state.totalQnty--; 
                    // console.log("Quantity updated:", state); 
                }                               
            }
        },
    },
});

export const { addToCart, removeFromCart, getCartTotalProductQnty } = cartSlice.actions;

export default cartSlice.reducer;