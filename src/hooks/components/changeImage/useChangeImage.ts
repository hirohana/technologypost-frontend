import React, { useState } from 'react';
import swal from 'sweetalert';

const useChangeImageHandler = () => {
  const [image, setImage] = useState<File | null>(null);

  const changeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    swal({
      text: 'このファイルを保存して宜しいですか？',
      icon: 'warning',
      buttons: ['キャンセル', 'OK'],
      dangerMode: true,
    }).then((willDelete) => {
      if (!willDelete) {
        return;
      }
      if (e.target.value![0]) {
        setImage(e.target.files![0]);
        e.target.value = '';
      }
    });
  };

  return { image, setImage, changeImageHandler };
};

export { useChangeImageHandler };
