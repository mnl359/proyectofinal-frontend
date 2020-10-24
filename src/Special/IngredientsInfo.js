//The images
import coldCutsImage from './../images/coldCuts.jpg';
import fetaCheeseImage from './../images/fetaCheese.jpg';
import mozzarellaImage from './../images/mozarella.jpg';
import pepperoniImage from './../images/pepperoni.jpg';
import pizzaCrust from './../images/pizzaCrust.jpg';
import spicesImage from './../images/spices.jpg';
import swissCheeseImage from './../images/swissCheese.jpg';
import vegetablesImage from './../images/vegetables.jpg';

let ingredientsInfo = {
  coldCuts: {
    price: 5,
    image: coldCutsImage,
    display: "Cold cuts",
  },
  pepperoni: {
    price: 3.5,
    image: pepperoniImage,
    display: "Pepperoni",
  },
  fetaCheese: {
    price: 2.5,
    image: fetaCheeseImage,
    display: "Feta",
  },
  mozzarella: {
    price: 1.5,
    image: mozzarellaImage,
    display: "Mozzarella",
  },
  swissCheese: {
    price: 3,
    image: swissCheeseImage,
    display: "Swiss cheese",
  },
  spices: {
    price: 0.5,
    image: spicesImage,
    display: "Spices",
  },
  vegetables: {
    price: 1.25,
    image: vegetablesImage,
    display: "Vegetables",
  },
};

export const ingredientsInfoStatic = ingredientsInfo;
export const pizzaCrustImage = pizzaCrust;
