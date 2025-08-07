import { ACTION_STATUS } from "@/utils/constant";

import type { ActionStatus } from "@/interfaces";

export function useOrder(){
  // danh sách action dạng object
  const ACTION_STATUS_OBJ = convert(ACTION_STATUS);

  /** hàm chuyển đổi mảng action sang object */ 
  function convert(array: ActionStatus[]) {
    /** object của action */
    let obj: { [key: string]: ActionStatus } = {};

    /** duyệt qua mảng action tạo ra 1 object với key là value của action, 
    * giá trị là action đó */ 
    array.forEach((item) => {
      obj[item.value] = item;
    });

    // trả về dạng object
    return obj;
  }

  return {
    ACTION_STATUS_OBJ
  }
}