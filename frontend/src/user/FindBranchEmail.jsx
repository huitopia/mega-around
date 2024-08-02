import { useNavigate } from "react-router-dom";
import { CustomToast } from "../component/CustomToast.jsx";
import axios from "axios";

export function FindBranchEmail() {
  const navigate = useNavigate();
  const { successToast, errorToast, infoToast } = CustomToast();
  function handleBranchPassword() {
    axios
      .put(`/api/user/branch/password`, { email, password })
      .then(() => {
        successToast(`비밀번호가 재설정 되었습니다`);
        navigate("/login");
        window.scrollTo({ top: 0, behavior: "auto" });
      })
      .catch((err) => {
        if (err.response.status === 400) {
          errorToast("비밀번호 패턴이 맞지 않습니다");
        } else if (err.response.status === 404) {
          errorToast("가입 한 이메일이 없습니다");
        } else errorToast("비밀번호 재설정에 실패하였습니다");
      });
  }

  return null;
}
