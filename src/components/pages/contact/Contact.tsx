import { useForm } from 'react-hook-form';
import {
  Button,
  Select,
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';

import styles from './Contact.module.scss';
import DefaultLayout from 'components/templates/defaultLayout/DefaultLayout';
import { useContact } from 'hooks/components/contact/useContact';

export type FormData = {
  username: string;
  email: string;
  menuItem: string;
  inquiry: string;
};

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ criteriaMode: 'all', shouldFocusError: false });
  const { onSubmit } = useContact(reset);

  return (
    <>
      <DefaultLayout>
        <div className={styles.global_container}>
          <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="お名前(必須)"
                autoFocus
                {...register('username', {
                  required: true,
                  minLength: 4,
                  maxLength: 20,
                })}
              />
              <p className={styles.error_code}>
                {errors.username?.types?.required &&
                  '文字が入力されていません。'}
              </p>
              <p className={styles.error_code}>
                {errors.username?.types?.minLength &&
                  'お名前は4文字以上記入してください。'}
              </p>
              <p className={styles.error_code}>
                {errors.username?.types?.maxLength &&
                  'お名前は20文字以内で記入してください。'}
              </p>

              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="メールアドレス(任意)"
                {...register('email', {})}
              />

              <FormControl className={styles.formControl}>
                <InputLabel>お問い合わせ項目(必須)</InputLabel>
                <Select required {...register('menuItem', {})} defaultValue="">
                  <MenuItem value="Webサイトについて">
                    Webサイトについて
                  </MenuItem>
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
                {...register('inquiry', { required: true, minLength: 10 })}
              />
              <p className={styles.error_code}>
                {errors.inquiry?.types?.required &&
                  '文字が入力されていません。'}
              </p>
              <p className={styles.error_code}>
                {errors.inquiry?.types?.minLength &&
                  'お問い合わせ内容は10文字以上記入してください。'}
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
      </DefaultLayout>
    </>
  );
};

export default Contact;
