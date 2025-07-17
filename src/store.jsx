import { configureStore, createSlice } from "@reduxjs/toolkit";
import Cart from "./Cart";
import Orders from "./Orders";

   // local cart from local storage//
      const savedCart = localStorage.getItem("Cart");
      const localStorageCart = savedCart? JSON.parse(savedCart):[];
     

//product slice//
const productSlice = createSlice({
  name: 'products',
  initialState: {
    Veg: [
       { name: "Tomato", price: 200.5, image: "tomato.jpg" },
       { name: "Potato", price: 100.5, image: "potato.jpg" },
       { name: "Carrot", price: 150.0, image: "carrot.jpg" },
       { name: "Onion", price: 180.25, image: "onion.jpg" },
       { name: "Cabbage", price: 120.0, image: "cabbage.jpg" },
       { name: "Brinjal", price: 160.75, image: "brinjal.jpg" },
       { name: "Spinach", price: 90.0, image: "spinach.jpg" },
       { name: "Lady Finger", price: 130.5, image: "ladyfinger.jpg" },
       { name: "Cauliflower", price: 170.0, image: "cauliflower.jpg" },
       { name: "Beetroot", price: 110.0, image: "beetroot.jpg" }

    ],
    NonVeg: [
       { name: "Chicken", price: 800.0, image: "chicken.jpg" },
       { name: "Fish", price: 1000.0, image: "fish.jpg" },
       { name: "Mutton", price: 1200.0, image: "mutton.jpg" },
       { name: "Prawns", price: 950.0, image: "prawns.jpg" },
       { name: "Eggs (Dozen)", price: 120.0, image: "eggs.jpg" },
      { name: "Crab", price: 1100.0, image: "crab.jpg" },
      { name: "Turkey", price: 1400.0, image: "turkey.jpg" },
      { name: "Quail", price: 900.0, image: "quail.jpg" },
      { name: "Liver", price: 600.0, image: "liver.jpg" },
      { name: "Duck Meat", price: 1000.0, image: "duck.jpg" }

    ],

    Milk: [
  { name: "Milk", price: 50, image: "milk.jpg" },
{ name: "Curd", price: 40, image: "curd.jpg" },
{ name: "Butter", price: 150, image: "butter.jpg" },
{ name: "Paneer", price: 200, image: "paneer.jpg" },
{ name: "Cheese", price: 250, image: "cheese.jpg" },
{ name: "Ghee", price: 300, image: "ghee.jpg" },
{ name: "Lassi", price: 30, image: "lassi.jpg" },
{ name: "Flavored Milk", price: 60, image: "flavoredmilk.jpg" },
{ name: "MilkPowder", price: 280, image: "milkpowder.jpg" },
{ name: "Khoa (Khoya)", price: 220, image: "khoa.jpg" }


    ],

    Chocolates: [
      { name: '5Star', price: 20.0, image: '5star.jpg'},
      { name: 'DairyMilk', price: 25.0, image: 'dairymilk.jpg'},
      { name: 'DarkChoco', price: 40.0, image: 'darkchoco.jpg'},
      { name: 'Ferrero', price: 250.0, image: 'ferrero.jpg'},
      { name: 'KinderJoy', price: 45.0, image: 'kinder.jpg'},
      { name: 'Jelly', price: 15.0, image: 'jelly.jpg'},
      { name: 'KitKat', price: 20.0, image: 'kitkat.jpg'},
      { name: 'Munch', price: 10.0, image: 'munch.jpg' },
      { name: 'Perk', price: 10.0, image: 'perk.jpg' },
      { name: 'MilkBar', price: 30.0, image: 'milkybar.jpg'}
    ]
  },
  reducers: {}
});

//Cart slice//

const cartSlice = createSlice ({

    name:'cart',
    initialState:localStorageCart, //cartslice make the initialstate localstorage data//
    reducers:{

        AddToCart:(state,inputItem) => {
            const item = state.find(item=>item.name === inputItem.payload.name);

            if(item){
                item.quantity +=1;
            }
            else {
                state.push({...inputItem.payload,quantity:1});
            }
        },

        IncrementItem :(state,inputItem) => {

            let item = state.find(item => item.name === inputItem.payload.name);

            if(item){
                item.quantity +=1;
            }
            
        },

        DecrementItem :(state,inputItem) => {

            let item = state.find(item => item.name === inputItem.payload.name);

            if(item && item.quantity){
                item.quantity -=1;
            }
            else if(item && item.quantity ===1){

              return state.filter(i => i.name !== item.name)
            }
            
        },

        RemoveFromCart: (state, action) => {
          return state.filter(item => item.name !== action.payload.name);
        },

       clearCart: () => []

    }
}
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: [],
  reducers: {
    addOrder: (state, action) => {
      state.push(action.payload);
    }
  }
});

let userSlice=createSlice({
    name:'users',
    initialState:{
        users:[],
        isAuthenticated:false,
        currentUser:null,
    },
    reducers:{
        registerUser:(state,action)=>{
            state.users.push(action.payload);
        },
        loginUser:(state,inputData)=>{
            const foundUser=state.users.find(user=>user.username===inputData.payload.username &&
                user.password===inputData.payload.password
            );
            if(foundUser){
                state.isAuthenticated=true;
                state.currentUser=foundUser;
            }
            else{
                alert('Invalid Credential');
            }
            
        },
        logOut:(state)=>{
            state.isAuthenticated=false;
            state.currentUser=null
        }
    }
  })


const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    cart : cartSlice.reducer,
    orders:orderSlice.reducer,
    users:userSlice.reducer
  }
});

//save the cart data to localstorage//

store.subscribe(() =>{
  const state = store.getState();
  localStorage.setItem("Cart",JSON.stringify(state.cart));
  
});

//export actions//
export const { addOrder } = orderSlice.actions;  //  from orderSlice//

export let {AddToCart ,IncrementItem, DecrementItem,RemoveFromCart,clearCart} =cartSlice.actions;
export let{registerUser,loginUser,logOut} = userSlice.actions;
export default store;