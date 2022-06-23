/* eslint-disable @typescript-eslint/no-explicit-any*/
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import swal from "sweetalert";

import ImageIcon from "components/atoms/button/imageIcon/ImageIcon";
import useChangeImage from "hooks/components/changeImage/useChangeImage";
import styles from "./ArticlePost.module.scss";
import sweetAlertOfError from "utils/sweetAlert/sweetAlertOfError";
import sweetAlertOfSuccess from "utils/sweetAlert/sweetAlertOfSuccess";
import Error403 from "components/pages/error/error403/Error403";
import TimestampProcessing from "components/atoms/time/timestampProcessing/TimestampProcessing";
import { DRAFT_ARTICLES_DATA } from "types/articles/articles";

type FormData = {
  title: string;
  text: string;
  category: string;
};

const ArticlesPost = () => {
  // const [draftBlogData, setDraftBlogData] = useState<DRAFT_ARTICLES_DATA>({
  //   data: {
  //     article_photo_url: "",
  //     category_name: "",
  //     created_at: "",
  //     letter_body: "",
  //     title: "",
  //     user_id: null,
  //     user_photo_url: "",
  //     username: "",
  //   },
  // });
  const { image, setImage, changeImageHandler } = useChangeImage();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ criteriaMode: "all", shouldFocusError: false });

  // React-Hook-Formのライブラリを利用してデータをfirestoreに送信。
  const onSubmit = (data: FormData) => {
    swal({
      text: "下書き内容は以上で宜しいですか？",
      icon: "warning",
      buttons: ["キャンセル", "OK"],
      dangerMode: true,
    }).then((willDelete) => {
      if (!willDelete) {
        return;
      }
      // if (draftBlogData.imageDbUrls.length === 0) {
      //   sweetAlertOfError(
      //     `下書き保存の際は画像を1枚以上アップロードしてください。`
      //   );
      //   return;
      // }

      // try {
      //   useDraftBlogOverwrite(
      //     data.text,
      //     data.title,
      //     data.category,
      //     blankRemovalName,
      //     id.id
      //   );
      // } catch (err) {
      //   sweetAlertOfError(
      //     `エラーが発生して下書きが保存されませんでした。エラー内容: ${err}`
      //   );
      // }
      // sweetAlertOfSuccess("下書きが保存されました!");
      // history.push(`/blogList/${blankRemovalName}`);
    });
  };

  return (
    <>
      {/* {draftBlogData.draftState ? (
        <div className={styles.container}>
          <div className={styles.container_box}>
            <main>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.container_main}>
                  <ImageIcon image={image} onChange={changeImageHandler} />
                  <p className={styles.error_code}>
                    {draftBlogData.imageDbUrls?.length !== 0
                      ? "※上記画像ファイルは日記公開の際に、スライダーとしてレンダリングされます。"
                      : null}
                  </p>
                  <TextField
                    variant="outlined"
                    fullWidth
                    required
                    multiline={true}
                    label="タイトル(必須)"
                    defaultValue={draftBlogData.title}
                    {...register("title", { required: true })}
                  />
                  <p className={styles.error_code}>
                    {errors.title?.types?.required &&
                      "タイトル欄をクリックし、タイトルを変更しない場合は一文字削除しその後元に戻してください。"}
                  </p>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    multiline={true}
                    rows={10}
                    label="本文(必須)"
                    autoFocus
                    defaultValue={draftBlogData.textArea}
                    {...register("text")}
                  />
                  <div className={styles.radio_category}>
                    <FormControl>
                      <FormLabel>カテゴリー(必須)</FormLabel>
                      {draftBlogData.category ? (
                        <RadioGroup
                          defaultValue={draftBlogData.category}
                          defaultChecked={true}
                        >
                          <FormControlLabel
                            value="PvE"
                            control={<Radio />}
                            label="PvE"
                            {...register("category", { required: true })}
                          />
                          <FormControlLabel
                            value="PvP"
                            control={<Radio />}
                            label="PvP"
                            {...register("category", { required: true })}
                          />
                          <FormControlLabel
                            value="交流"
                            control={<Radio />}
                            label="交流"
                            {...register("category", { required: true })}
                          />
                          <FormControlLabel
                            value="雑記"
                            control={<Radio />}
                            label="雑記"
                            {...register("category", { required: true })}
                          />
                          <FormControlLabel
                            value="その他"
                            control={<Radio />}
                            label="その他"
                            {...register("category", { required: true })}
                          />
                        </RadioGroup>
                      ) : (
                        <>
                          <RadioGroup>
                            <FormControlLabel
                              value="PvE"
                              control={<Radio />}
                              label="PvE"
                              {...register("category", { required: true })}
                            />
                            <FormControlLabel
                              value="PvP"
                              control={<Radio />}
                              label="PvP"
                              {...register("category", { required: true })}
                            />
                            <FormControlLabel
                              value="交流"
                              control={<Radio />}
                              label="交流"
                              {...register("category", { required: true })}
                            />
                            <FormControlLabel
                              value="雑記"
                              control={<Radio />}
                              label="雑記"
                              {...register("category", { required: true })}
                            />
                            <FormControlLabel
                              value="その他"
                              control={<Radio />}
                              label="その他"
                              {...register("category", { required: true })}
                            />
                          </RadioGroup>
                        </>
                      )}
                    </FormControl>
                  </div>
                  <p className={styles.error_code}>
                    {errors.category?.types?.required &&
                      "カテゴリーを必ず1つ選択してください。"}
                  </p>
                  <div className={styles.create_date}>
                    <div className={styles.timestamp}>
                      作成日 &nbsp;
                      <TimestampProcessing
                        timestamp={draftBlogData.timestamp}
                      />
                    </div>
                    作成者 &nbsp;{draftBlogData.createName}
                  </div>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    disabled={errors.title && true}
                    className={
                      errors.title && true
                        ? styles.sendDisableBtn
                        : styles.sendBtn
                    }
                  >
                    下書き保存
                  </Button>
                </div>
              </form>
            </main>
          </div>
        </div>
      ) : (
        <Error403 />
      )} */}
    </>
  );
};

export default ArticlesPost;
