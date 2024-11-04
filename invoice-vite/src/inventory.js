import {
  newProductName,
  newProductPrice,
  productCardTemplate,
  productGroup,
  productSelect,
} from "./selectors";

import { v4 as uuidv4 } from "uuid";
import { products } from "./states";
import Swal from 'sweetalert2'

const createId = uuidv4();
export const addNewProductBtnHandler = () => {

  productGroup.append(
    createProductCard(
      createId,
      newProductName.value,
      newProductPrice.valueAsNumber
    )
  );

  productSelect.append(
    new Option(
      `${newProductName.value} - ${newProductPrice.valueAsNumber} $`,
      createId
    )
  );

  // console.log(productSelect);

  products.push({
    id: createId,
    name: newProductName.value,
    price: newProductPrice.valueAsNumber,
  });
  // console.log(products);

  newProductName.value = "";
  newProductPrice.value = "";
};

export const productRender = (products) => {
  products.forEach(({ id, name, price }) => {
    productGroup.append(createProductCard(id, name, price));
    productSelect.append(new Option(`${name} - ${price} $`, id));
  });
};

export const createProductCard = (id, name, price) => {
  // Create New Product Card
  const productCard = productCardTemplate.content.cloneNode(true);
  const currentProductCard = productCard.querySelector(".product-card");
  currentProductCard.id = id;
  const productName = productCard.querySelector(".product-name");
  const productPrice = productCard.querySelector(".product-price");
  // const productRemove = productCard.querySelector(".product-remove");

  // console.log(currentProductCard.id);

  productName.innerText = name;
  productPrice.innerText = price;

  return productCard;
};


export const removeProductCard = (getId) => {

  const removeCard = document.querySelector(`[remove-id='${getId}']`);

  Swal.fire({
    title: "Are you sure you want to remove this?",
    text: "You won't be able to revert this!",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
removeCard.remove()

  });


}

export const removeProductCardHandler = (event) => {
  if(event.target.classList.contains("product-remove")){
const currentProductCard= event.target.closest(".product-card")

currentProductCard.setAttribute("remove-id", createId);
const removeId = currentProductCard.getAttribute("remove-id");

removeProductCard(removeId)

  }
}