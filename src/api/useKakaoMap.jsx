import React, { useEffect } from "react";

const KakaoMap = ({ location }) => {
  useEffect(() => {
    // 카카오맵 API가 로드되었는지 확인
    if (!window.kakao || !window.kakao.maps) {
      console.error("카카오맵 API가 로드되지 않았습니다.");
      return;
    }

    // 지도 초기화
    const container = document.getElementById("map"); // 지도를 표시할 div
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.978), // 초기 좌표 (서울시청)
      level: 3, // 지도 확대 레벨
    };

    const map = new window.kakao.maps.Map(container, options);

    // 확대/축소 컨트롤 추가
    const zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

    // 마커 추가
    if (location) {
      const markerPosition = new window.kakao.maps.LatLng(
        location.lat,
        location.lng
      );
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);

      // 지도 중심을 마커 위치로 이동
      map.setCenter(markerPosition);
    }
  }, [location]);

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "400px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    ></div>
  );
};

export default KakaoMap;
