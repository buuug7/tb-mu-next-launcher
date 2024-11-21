import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const customClass = {
  confirmButton: 'btn btn-primary',
  cancelButton: 'btn btn-outline-primary',
};

function confirm(text) {
  return MySwal.fire({
    title: '',
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    width: '20em',
    customClass,
  });
}

function message(text) {
  return MySwal.fire({
    position: 'bottom',
    // icon: 'info',
    text,
    showConfirmButton: false,
    timer: 2000,
    customClass,
  });
}

function alert(text, icon = 'success') {
  const confirmButton =
    icon === 'error' ? 'btn btn-outline-danger' : 'btn btn-outline-success';

  return MySwal.fire({
    title: '',
    text,
    icon,
    confirmButtonText: '确定',
    width: '20em',
    customClass: {
      ...customClass,
      confirmButton,
    },
  });
}

export default {
  confirm,
  message,
  alert,
};
