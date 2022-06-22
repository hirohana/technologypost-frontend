import { useForm } from "react-hook-form";
import {
  Button,
  Select,
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import swal from "sweetalert";

import styles from "./Contact.module.scss";

type FormData = {
  username: string;
  email: string;
  menuItem: string;
  inquiry: string;
};

const ContactOfReactHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ criteriaMode: "all", shouldFocusError: false });

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

      const username = data.username;
      const userEmail = data.email;
      const menuItem = data.menuItem;
      const inquiry = data.inquiry;

      const payload = {
        text:
          "お問い合わせがありました\n" +
          "お名前: " +
          username +
          "\n" +
          "Email: " +
          userEmail +
          "\n" +
          "お問い合わせ項目: " +
          menuItem +
          "\n" +
          "問い合わせ内容: \n" +
          inquiry,
      };
      reset();
      const url = process.env.ADMIN_URL || "";

      fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
      })
        .then(() => {
          swal(
            "Success",
            "送信が完了しました!追って連絡いたします!",
            "success"
          );
        })
        .catch((err) => {
          swal(
            "Error",
            "何らかのエラーが発生して送信できませんでした。",
            "error"
          );
        });
    });
  };

  return (
    <>
      <div className={styles.global_container}>
        <div className={styles.container}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="お名前(必須)"
              autoFocus
              {...register("username", {
                required: true,
                minLength: 4,
                maxLength: 20,
              })}
            />
            <p className={styles.error_code}>
              {errors.username?.types?.required && "文字が入力されていません。"}
            </p>
            <p className={styles.error_code}>
              {errors.username?.types?.minLength &&
                "お名前は4文字以上記入してください。"}
            </p>
            <p className={styles.error_code}>
              {errors.username?.types?.maxLength &&
                "お名前は20文字以内で記入してください。"}
            </p>

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="メールアドレス(任意)"
              {...register("email", {})}
            />

            <FormControl className={styles.formControl}>
              <InputLabel>お問い合わせ項目(必須)</InputLabel>
              <Select required {...register("menuItem", {})} defaultValue="">
                <MenuItem value="Webサイトについて">Webサイトについて</MenuItem>
                <MenuItem value="アカウント登録について">
                  アカウント登録について
                </MenuItem>
                <MenuItem value="管理人について">管理人について</MenuItem>
                <MenuItem value="その他">その他</MenuItem>
              </Select>
            </FormControl>

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              required
              multiline={true}
              rows={10}
              label="お問い合わせ内容(必須)"
              {...register("inquiry", { required: true, minLength: 10 })}
            />
            <p className={styles.error_code}>
              {errors.inquiry?.types?.required && "文字が入力されていません。"}
            </p>
            <p className={styles.error_code}>
              {errors.inquiry?.types?.minLength &&
                "お問い合わせ内容は10文字以上記入してください。"}
            </p>

            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={(errors.username && true) || (errors.inquiry && true)}
              className={
                (errors.username && true) || (errors.inquiry && true)
                  ? styles.sendDisableBtn
                  : styles.sendBtn
              }
            >
              送信内容を確認する
            </Button>
          </form>
        </div>
        <div className={styles.background_image}></div>
      </div>
    </>
  );
};

export default ContactOfReactHookForm;
