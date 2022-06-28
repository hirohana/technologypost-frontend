import React, { useState } from "react";
import swal from "sweetalert";

const useChangeImageHandler = () => {
  const [image, setImage] = useState<File | null>(null);

  const changeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    swal({
      text: "ファイルが一時的に保存されました。",
      icon: "warning",
      buttons: ["キャンセル", "OK"],
      dangerMode: true,
    }).then((willDelete) => {
      if (!willDelete) {
        return;
      }
      if (e.target.value![0]) {
        setImage(e.target.files![0]);
        e.target.value = "";
        swal("Success", "ファイルを送信する準備が出来ました!", "success");
      }
    });
  };

  return { image, setImage, changeImageHandler };
};

export { useChangeImageHandler };
