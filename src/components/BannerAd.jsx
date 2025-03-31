
import React from 'react';
import useFetchAdvertisements from '../api/useFetchAdvertisements';


function AdBanner() {
  const { ads, loading, error } = useFetchAdvertisements();
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>광고 로딩 중 에러가 발생했습니다.</div>;
  if (!ads || ads.length === 0) {
    return <div>표시할 광고가 없습니다.</div>;
  }

  const firstAd = ads[0];

  return (

    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      {/* 광고 이미지와 링크를 표시 */}
      {firstAd.image_url && (
        <a href={firstAd.link_url} target="_blank" rel="noopener noreferrer">
          <img 
            src={firstAd.image_url} 
            alt={firstAd.advertisement_type + ' 광고'} 
            style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
          />
        </a>
      )}

    </div>
  );
}

export default AdBanner;