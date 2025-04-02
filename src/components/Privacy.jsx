import React from "react";
import { useNavigate } from "react-router-dom"; // React Router 사용
import "../styles/Privacy.css"; // CSS 파일을 import

const Privacy = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

  const handleConfirm = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <>
      <div className="outlet-container">
        <div className="inner">
          <div className="privacy-policy-container">
            <h1 className="privacy-policy-title">서비스 이용약관</h1>
            <h2 className="privacy-policy-subtitle">
              개인정보 수집 및 이용 동의서
            </h2>
            <ol className="privacy-policy-list">
              <li>
                <strong>목적 및 범위</strong>
                <p>
                  본 동의서는 [조직/회사 이름]에서 제공하는 서비스를 이용하기
                  위해 필요한 개인정보의 수집 및 이용에 대한 동의를 받기 위한
                  것입니다. 본 동의서에 동의함으로써, 귀하는 아래와 같은
                  개인정보의 수집 및 이용에 동의하는 것으로 간주됩니다.
                </p>
              </li>
              <li>
                <strong>수집하는 개인정보</strong>
                <ul>
                  <li>아이디(이메일)</li>
                  <li>비밀번호(암호화 저장)</li>
                </ul>
              </li>
              <li>
                <strong>개인정보의 이용 목적</strong>
                <p>
                  수집된 개인정보는 서비스 제공, 고객 관리, 마케팅 및 통계
                  분석을 위해 사용됩니다.
                </p>
              </li>
              <li>
                <strong>개인정보의 보유 및 파기 기간</strong>
                <p>
                  수집된 개인정보는 서비스 제공 목적 달성 후 [보유 기간, 예:
                  회원 탈퇴 시까지] 동안 보유되며, 이후 파기됩니다.
                </p>
              </li>
              <li>
                <strong>동의의 철회</strong>
                <p>
                  귀하는 언제든지 본 동의를 철회할 수 있으며, 동의 철회 시
                  서비스 이용이 제한될 수 있습니다.
                </p>
              </li>
              <li>
                <strong>동의서 제출</strong>
                <p>본 동의서는 서면 또는 전자적 방법으로 제출할 수 있습니다.</p>
              </li>
            </ol>

            {/* 확인 버튼 */}
            <div className="privacy-policy-footer">
              <button onClick={handleConfirm} className="confirm-button">
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
