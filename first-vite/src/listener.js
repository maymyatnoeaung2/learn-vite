import { addBtnHandler, alertTestBtnHandler } from "./handler";
import { addBtn, alertTestBtn } from "./selector";

const listener = () => {
addBtn.addEventListener("click",addBtnHandler)
alertTestBtn.addEventListener("click",alertTestBtnHandler)
}

export default listener