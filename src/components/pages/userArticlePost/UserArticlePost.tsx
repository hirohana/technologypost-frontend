import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, FormControl, FormLabel } from "@mui/material";
import swal from "sweetalert";

import { SaveTemporarilyImageToFireStorage } from "components/molecules/saveTemporarilyImageToFireStorage/SaveTemporarilyImageToFireStorage";
import { useChangeImageHandler } from "hooks/components/useChangeImage/useChangeImage";
import Error403 from "../error/error403/Error403";
import ImageIcon from "components/atoms/button/imageIcon/ImageIcon";
import TimestampProcessing from "components/atoms/timestampProcessing/TimestampProcessing";
import styles from "./UserArticlePost.module.scss";

type FormData = {
  title: string;
  text: string;
  category: string;
};

const UserArticlePost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ criteriaMode: "all", shouldFocusError: false });
  const { image, setImage, changeImageHandler } = useChangeImageHandler();

  const onSubmit = (data: FormData) => {
    swal({
      text: "送信内容に問題はありませんか？",
      icon: "warning",
      buttons: ["キャンセル", "OK"],
      dangerMode: true,
    }).then((willDelete) => {
      if (!willDelete) {
        return;
      }
      const text = data.text;
      const title = data.title;
      const category = data.category;
      // const username = blankRemovalName;
      // const userUd = id.id;
    });
  };

  return <div>UserArticlePost</div>;
  // return (
  //   <main>
  //     {draftBlogData.draftState ? (
  //       <div className={styles.container}>
  //         <div className={styles.container_box}>
  //           {draftBlogData.imageDbUrls !== undefined &&
  //           draftBlogData.imageDbUrls.length !== 0 ? (
  //             <SaveTemporarilyImageToFireStorage
  //               blankRemovalName={blankRemovalName}
  //               fileNames={draftBlogData.fileNames}
  //               id={id.id}
  //               imageDbUrls={draftBlogData.imageDbUrls}
  //             />
  //           ) : null}
  //           <form onSubmit={handleSubmit(onSubmit)}>
  //             <div className={styles.container_main}>
  //               <ImageIcon image={image} onChange={changeImageHandler} />
  //               <p className={styles.error_code}>
  //                 {draftBlogData.imageDbUrls?.length !== 0
  //                   ? "※上記画像ファイルは日記公開の際に、スライダーとしてレンダリングされます。"
  //                   : null}
  //               </p>
  //               <TextField
  //                 variant="outlined"
  //                 fullWidth
  //                 required
  //                 multiline={true}
  //                 label="タイトル(必須)"
  //                 // defaultValue={draftBlogData.title}
  //                 // className={classes.textfiled}
  //                 {...register("title", { required: true })}
  //               />
  //               {/* <p className={styles.error_code}>
  //                   {errors.title?.types?.required &&
  //                     "タイトル欄をクリックし、タイトルを変更しない場合は一文字削除しその後元に戻してください。"}
  //                 </p> */}
  //               <TextField
  //                 variant="outlined"
  //                 margin="normal"
  //                 fullWidth
  //                 required
  //                 multiline={true}
  //                 rows={10}
  //                 label="本文(必須)"
  //                 autoFocus
  //                 // defaultValue={draftBlogData.textArea}
  //                 // className={classes.textfiled}
  //                 {...register("text")}
  //               />
  //               <div className={styles.radio_category}>
  //                 <FormControl>
  //                   <FormLabel>カテゴリー(必須)</FormLabel>
  //                   {/* {draftBlogData.category ? (
  //                       <RadioGroup
  //                         defaultValue={draftBlogData.category}
  //                         defaultChecked={true}
  //                       >
  //                         <FormControlLabel
  //                           value="PvE"
  //                           control={<Radio />}
  //                           label="PvE"
  //                           {...register("category", { required: true })}
  //                         />
  //                         <FormControlLabel
  //                           value="PvP"
  //                           control={<Radio />}
  //                           label="PvP"
  //                           {...register("category", { required: true })}
  //                         />
  //                         <FormControlLabel
  //                           value="交流"
  //                           control={<Radio />}
  //                           label="交流"
  //                           {...register("category", { required: true })}
  //                         />
  //                         <FormControlLabel
  //                           value="雑記"
  //                           control={<Radio />}
  //                           label="雑記"
  //                           {...register("category", { required: true })}
  //                         />
  //                         <FormControlLabel
  //                           value="その他"
  //                           control={<Radio />}
  //                           label="その他"
  //                           {...register("category", { required: true })}
  //                         />
  //                       </RadioGroup>
  //                     ) : (
  //                       <>
  //                         <RadioGroup>
  //                           <FormControlLabel
  //                             value="PvE"
  //                             control={<Radio />}
  //                             label="PvE"
  //                             {...register("category", { required: true })}
  //                           />
  //                           <FormControlLabel
  //                             value="PvP"
  //                             control={<Radio />}
  //                             label="PvP"
  //                             {...register("category", { required: true })}
  //                           />
  //                           <FormControlLabel
  //                             value="交流"
  //                             control={<Radio />}
  //                             label="交流"
  //                             {...register("category", { required: true })}
  //                           />
  //                           <FormControlLabel
  //                             value="雑記"
  //                             control={<Radio />}
  //                             label="雑記"
  //                             {...register("category", { required: true })}
  //                           />
  //                           <FormControlLabel
  //                             value="その他"
  //                             control={<Radio />}
  //                             label="その他"
  //                             {...register("category", { required: true })}
  //                           />
  //                         </RadioGroup>
  //                       </>
  //                     )} */}
  //                 </FormControl>
  //               </div>
  //               <p className={styles.error_code}>
  //                 {errors.category?.types?.required &&
  //                   "カテゴリーを必ず1つ選択してください。"}
  //               </p>
  //               <div className={styles.create_date}>
  //                 <div className={styles.timestamp}>
  //                   作成日 &nbsp;
  //                   <TimestampProcessing timestamp={draftBlogData.timestamp} />
  //                 </div>
  //                 作成者 &nbsp;{draftBlogData.createName}
  //               </div>
  //               <Button
  //                 // startIcon={<EmailIcon />}
  //                 fullWidth
  //                 variant="contained"
  //                 type="submit"
  //                 disabled={errors.title && true}
  //                 className={
  //                   errors.title && true
  //                     ? styles.sendDisableBtn
  //                     : styles.sendBtn
  //                 }
  //               >
  //                 下書き保存
  //               </Button>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     ) : (
  //       <Error403 />
  //     )}
  //   </main>
  // );
};

export default UserArticlePost;
