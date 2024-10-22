import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function confirm({
  title = '',
  text,
  confirmButtonText = '确定',
  cancelButtonText = '取消',
}) {
  return MySwal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText,
    cancelButtonText,
    width: '18em',
  });
}

function message(text) {
  return MySwal.fire({
    position: 'bottom',
    icon: 'info',
    text,
    showConfirmButton: false,
    timer: 1500,
  });
}

export default {
  confirm,
  message,
};
