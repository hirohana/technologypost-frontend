import swal from "sweetalert";

type ARGUMENTS = string;

const sweetAlertOfError = (arg: ARGUMENTS): void => {
  swal("Error", arg, "error");
};

export default sweetAlertOfError;
