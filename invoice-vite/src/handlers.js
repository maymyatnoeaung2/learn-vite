import { manageInventoryBtn, productSideBar } from "./selectors"

export const manageInventoryBtnHandler = () => {
     productSideBar.classList.remove("translate-x-full")
     productSideBar.classList.add("duration-300","ease-in-out")
}

export const closeSidebarBtnHandler = () => {
    productSideBar.classList.add("translate-x-full")
}

export const checkoutHandler = () => {
    
   if(document.querySelector(".record-row").classList.contains === null){
    Swal.fire({
        title: "You can't checkout.Please,buy something",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
   }else{
      window.print()
   }
}

// console.log(document.querySelector(".record-row").classList.contains);

