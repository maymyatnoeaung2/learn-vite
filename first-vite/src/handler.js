import { listGroup, taskInput } from "./selector";
import Swal from 'sweetalert2'


export const addBtnHandler = () => {
  const list = document.createElement("li") ;
  list.innerText += taskInput.value;
  listGroup.append(list)

    taskInput.value="";
};

export const alertTestBtnHandler = () => {
  Swal.fire({
    title: "Custom width, padding, color, background.",
    width: 600,
    padding: "3em",
    color: "#716add",
    // background: "#fff center no-repeat url(https://banner2.cleanpng.com/20180228/gaq/kisspng-generative-adversarial-networks-computer-network-c-blue-node-technology-background-5a96efc7ecf1c0.4889505615198412239705.jpg)",
    backdrop: `
      rgba(0,0,123,0.4)
      url("https://i.pinimg.com/originals/55/5e/31/555e317859bca07530e4e188178210f8.gif")
      left top
      no-repeat
    `
  });
    // const Toast = Swal.mixin({
    //     toast: true,
    //     position: "top-end",
    //     showConfirmButton: false,
    //     timer: 3000,
    //     timerProgressBar: true,
    //     didOpen: (toast) => {
    //       toast.onmouseenter = Swal.stopTimer;
    //       toast.onmouseleave = Swal.resumeTimer;
    //     }
    //   });
    //   Toast.fire({
    //     icon: "success",
    //     title: "Signed in successfully"
    //   });
      
    // Swal.fire({
    //     title:"Hello",
    //     text:"Syn kyi tar",
    //     icon:"success",
    // })
//    Swal.fire("Welcome")
// Swal.fire({
//     title: "Are you sure?",
//     text: "You won't be able to revert this!",
//     icon: "warning",
//     showCancelButton: true,
//     // confirmButtonColor: "#3085d6",
//     // cancelButtonColor: "#d33",
//     confirmButtonText: "Yes, delete it!"
//   }).then((result) => {
//     if (result.isConfirmed) {
//       Swal.fire({
//         title: "Deleted!",
//         text: "Your file has been deleted.",
//         icon: "success"
//       });
//     }else{
//         console.log("Ok");
//     }
//   });
}