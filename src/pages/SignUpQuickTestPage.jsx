import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../components/SocialLogin";
import "../styles/SignupForm.css";

import AWS from "aws-sdk";
import * as config from "../config/config";

function SignUpQuickTestPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [image_url, setImage_url] = useState(null);
  const [errors, setErrors] = useState({});

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [files, setFiles] = useState("");

  AWS.config.update({
    region: config.awsRegion, // 버킷이 존재하는 리전을 문자열로 입력합니다. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: config.awsIdentityPoolId, // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
    }),
  });

  // function saveEventhandler() {
  //   if (files && files[0].size > 10 * 1024 * 1024) {
  //     alert("10mb 이하의 파일만 업로드할 수 있습니다.");
  //   } else {
  //     const uploadFiles = files[0];
  //     const keyname = files[0].name;

  //     // Todo S3에 파일 저장 후 response로 파일 링크 받아오기
  //     const upload = new AWS.S3.ManagedUpload({
  //       params: {
  //         Bucket: "bbangu", // 업로드할 대상 버킷명
  //         Key: keyname, //파일명+확장자
  //         Body: uploadFiles, // 업로드할 파일 객체
  //       },
  //     });

  //     const promise = upload.promise();

  //     promise.then(
  //       function (data) {
  //         alert("이미지 업로드에 성공했습니다.");
  //         console.log("이미지 업로드에 성공했습니다.", data.Location);
  //         console.log("이미지 업로드에 성공했습니다. data", data);
  //         setImage(data.Location);
  //       },
  //       function (err) {
  //         return alert("오류가 발생했습니다: ", err.message);
  //       }
  //     );
  //   }
  // }

  // const validateForm = () => {
  //   const newErrors = {};
  //   if (!isValidEmail(email)) {
  //     newErrors.email = "올바른 이메일 형식인지 확인해주세요.";
  //   }
  //   if (!isValidPassword(password)) {
  //     newErrors.password = "비밀번호는 8자이상으로 설정해주세요";
  //   }
  //   if (password !== confirmPassword) {
  //     newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
  //   }
  //   if (!nickname) {
  //     newErrors.nickname = "닉네임을 입력해주세요.";
  //   }
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files && files[0].size > 10 * 1024 * 1024) {
      alert("10mb 이하의 파일만 업로드할 수 있습니다.");
    } else {
      setEmail("testemail@gggg.com");
      setPassword("abcd12345678");
      setConfirmPassword("abcd12345678");
      setNickname("sashatest");
      setGender("female");
      setAge("1956");
      setImage_url(files);
      // const uploadFiles = files[0];
      // const keyname = files[0].name;
      // // Todo S3에 파일 저장 후 response로 파일 링크 받아오기
      // const upload = new AWS.S3.ManagedUpload({
      //   params: {
      //     Bucket: "bbangu", // 업로드할 대상 버킷명
      //     Key: keyname, //파일명+확장자
      //     Body: uploadFiles, // 업로드할 파일 객체
      //   },
      // });
      // const promise = upload.promise();
      // promise.then(
      //   function (data) {
      //     alert("이미지 업로드에 성공했습니다.");
      //     console.log("이미지 업로드에 성공했습니다.", data.Location);
      //     setImage_url(data.Location);
      //   },
      //   function (err) {
      //     return alert("오류가 발생했습니다: ", err.message);
      //   }
      // );
    }
    // let formData = new FormData();
    // formData.append("email", email);
    // formData.append("password", password);
    // formData.append("nickname", nickname);
    // formData.append("image_url", image_url);
    // formData.append("age", age);
    // formData.append("gentder", gender);

    if (validateForm()) {
      const userData = {
        email,
        password,
        nickname,
        gender,
        age, // 수정
        image_url, // 수정
      };

      console.log("회원가입 요청 데이터:", formData);

      try {
        const response = await signupUser(formData);
        console.log("회원가입 응답 데이터:", response);

        navigate("/signup-completed", {
          state: { nickname, email, image_url },
        });
      } catch (error) {
        console.error("회원가입 실패:", error.message);
      }
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setFiles(e.target.files);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage_url(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h1>회원가입</h1>

      <div className="form-group">
        <label>프로필 업로드 (선택)</label>
        <div className="profile-upload">
          {image_url ? (
            <img
              src={image_url}
              alt="프로필 미리보기"
              className="profile-preview"
            />
          ) : (
            <div className="default-profile-icon">📷</div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          className="profile-upload-input"
          onChange={handleProfileImageChange}
        />
        {/* <button onClick={saveEventhandler}>upload</button> */}
      </div>

      {/* <div className="form-group">
        <input
          type="email"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div> */}
      <div>
        <label>
          <input type="checkbox" required />{" "}
          <Link to="/privacy" className="terms-link">
            이용약관, 개인정보처리방침
          </Link>
          에 동의
        </label>
      </div>

      <button type="submit" className="submit-button">
        회원가입
      </button>

      <SocialLogin />
    </form>
  );
}

export default SignUpQuickTestPage;
