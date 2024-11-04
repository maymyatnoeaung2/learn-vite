import {
  createRecordForm,
  recordGroup,
  recordNextTotal,
  recordRowTemplate,
  recordTotal,
} from "./selectors";
import { products } from "./states";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

export const createRecordFormHandler = (event) => {
  event.preventDefault();
  const formData = new FormData(createRecordForm);
  // console.log(formData.get("product-select"));

  const currentProduct = products.find(
    ({ id }) => id == formData.get("product_select")
  );

  const isExitedRecord = document.querySelector(
    `[product-id='${currentProduct.id}']`
  );

  if (isExitedRecord === null) {
    recordGroup.append(
      createRecordTemplate(currentProduct, formData.get("quantity"))
    );
  } else {
    Swal.fire({
      title: `Are you sure to add quantity to ${currentProduct.name}?`,
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // const currentRecordRow = document.querySelector(".record-row");
        //   const rowId = currentRecordRow.getAttribute("row-id");
        //   const quantity = parseInt(formData.get("quantity"));
        //     updateRecordQuantity(rowId, quantity)

        updateRecordQuantity(
          isExitedRecord.getAttribute("row-id"),
          parseInt(formData.get("quantity"))
        );
      }
    });
  }

  createRecordForm.reset();
};

const createRecordTemplate = ({ id, name, price }, quantity) => {
  const recordRow = recordRowTemplate.content.cloneNode(true);
  const recordProductName = recordRow.querySelector(".record-product-name");
  const recordProductPrice = recordRow.querySelector(".record-product-price");
  const recordQuantity = recordRow.querySelector(".record-quantity");
  const recordConst = recordRow.querySelector(".record-cost");
  const currentRecordRow = recordRow.querySelector(".record-row");

  currentRecordRow.setAttribute("product-id", id);
  currentRecordRow.setAttribute("row-id", uuidv4());

  // console.log(currentRecordRow.getAttribute("product-id"));

  recordProductName.innerText = name;
  recordProductPrice.innerText = price;
  recordQuantity.innerText = quantity;
  recordConst.innerText = price * quantity;

  return recordRow;
};

export const calculateRecordConstTotal = () => {
  let total = 0;
  recordGroup.querySelectorAll(".record-cost").forEach((el) => {
    total += parseFloat(el.innerText);
  });
  return total;
};

export const calculateTex = (total, percentage = 5) => {
  return (total / 100) * percentage;
};

export const recordRemove = (rowId) => {
  Swal.fire({
    title: "Are you sure to Delete?",
    text: "You won't be able to revert this!",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });

      const toRemove = recordGroup.querySelector(`[row-id='${rowId}']`);
      toRemove.remove();
    }
  });
};

// export const quantityAdd = (rowId) => {
//   const currentRecordRow = recordGroup.querySelector(`[row-id='${rowId}']`);
//   const recordProductPrice = currentRecordRow.querySelector(
//     ".record-product-price"
//   );
//   const recordQuantity = currentRecordRow.querySelector(".record-quantity");
//   const recordConst = currentRecordRow.querySelector(".record-cost");

//   const addQuantity = parseInt(recordQuantity.innerText) + 1;
//   recordQuantity.innerText = addQuantity;
//   recordConst.innerText = parseInt(recordProductPrice.innerText) * addQuantity;
// };

// const quantitySubtract = (rowId) => {
//   const currentRecordRow = recordGroup.querySelector(`[row-id='${rowId}']`);
//   const recordProductPrice = currentRecordRow.querySelector(
//     ".record-product-price"
//   );
//   const recordQuantity = currentRecordRow.querySelector(".record-quantity");
//   const recordConst = currentRecordRow.querySelector(".record-cost");

//   if(recordQuantity.innerText>1){
//   const addQuantity = parseInt(recordQuantity.innerText) - 1;
//     recordQuantity.innerText = addQuantity;
//     recordConst.innerText = parseInt(recordProductPrice.innerText) * addQuantity;
//   }
// };

export const updateRecordQuantity = (rowId, newQuantity) => {
  const currentRecordRow = recordGroup.querySelector(`[row-id='${rowId}']`);
  const recordProductPrice = currentRecordRow.querySelector(
    ".record-product-price"
  );
  const recordQuantity = currentRecordRow.querySelector(".record-quantity");
  const recordConst = currentRecordRow.querySelector(".record-cost");
  if (recordQuantity.innerText > 1 || newQuantity > 0) {
    const addQuantity = parseInt(recordQuantity.innerText) + newQuantity;
    recordQuantity.innerText = addQuantity;
    recordConst.innerText =
      parseInt(recordProductPrice.innerText) * addQuantity;
  }
};

export const recordGroupHandler = (event) => {
  if (event.target.classList.contains("record-remove")) {
    const currentRecordRow = event.target.closest(".record-row");
    const rowId = currentRecordRow.getAttribute("row-id");
    recordRemove(rowId);
  } else if (event.target.classList.contains("quantity-add")) {
    const currentRecordRow = event.target.closest(".record-row");
    const rowId = currentRecordRow.getAttribute("row-id");
    updateRecordQuantity(rowId, +1);
  } else if (event.target.classList.contains("quantity-subtract")) {
    const currentRecordRow = event.target.closest(".record-row");
    const rowId = currentRecordRow.getAttribute("row-id");
    updateRecordQuantity(rowId, -1);
  }
};

export const recordGroupObserver = () => {
  const observerOptions = {
    childList: true,
    subtree: true,
  };
  const updateTotal = () => {
    const total = (recordTotal.innerText = calculateRecordConstTotal());
    const tex = (recordTax.innerText = calculateTex(total));
    recordNextTotal.innerText = total + tex;
  };

  const observer = new MutationObserver(updateTotal);
  observer.observe(recordGroup, observerOptions);
};
