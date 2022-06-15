import swal from "sweetalert";

type ARGUMENTS = string;

const sweetAlertOfSuccess = (arg: ARGUMENTS): void => {
  swal("Success", arg, "success");
};

export default sweetAlertOfSuccess;
