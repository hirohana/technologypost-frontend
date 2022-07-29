import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { FormData } from 'components/pages/contact/Contact';
import { config } from 'config/applicationConfig';
import { isLoading } from 'reducks/loading/actionCreator';

const useContact = (reset: any) => {
  const dispatch = useDispatch();
  const onSubmit = (data: FormData) => {
    swal({
      text: '送信内容に問題はありませんか？',
      icon: 'warning',
      buttons: ['キャンセル', 'OK'],
      dangerMode: true,
    }).then((willDelete) => {
      if (!willDelete) {
        return;
      }

      dispatch(isLoading(true));
      const username = data.username;
      const userEmail = data.email;
      const menuItem = data.menuItem;
      const inquiry = data.inquiry;

      const payload = {
        text:
          'お問い合わせがありました\n' +
          'お名前: ' +
          username +
          '\n' +
          'Email: ' +
          userEmail +
          '\n' +
          'お問い合わせ項目: ' +
          menuItem +
          '\n' +
          '問い合わせ内容: \n' +
          inquiry,
      };
      reset();
      const url = config.SLACK_URL;

      fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
      })
        .then(() => {
          dispatch(isLoading(false));
          swal(
            'Success',
            '送信が完了しました!追って連絡いたします!',
            'success'
          );
        })
        .catch((err) => {
          dispatch(isLoading(false));
          swal(
            'Error',
            '何らかのエラーが発生して送信できませんでした。',
            'error'
          );
        });
    });
  };

  return { onSubmit };
};

export { useContact };
