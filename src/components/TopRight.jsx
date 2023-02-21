import React, { useEffect } from 'react';
import './TopRight.scss';

import { useDispatch, useSelector } from 'react-redux';

function TopRight() {
  const verticalSize = useSelector((state) => state.split.verCurrent);
  const horizontal1Size = useSelector((state) => state.split.hor1Current);
  const horizontal2Size = useSelector((state) => state.split.hor2Current);

  return (
    <div className="TopRight">
      <div className="TopRight__modal">
        <span className="TopRight__modal--heading">Ayarlar</span>
        <span className="TopRight__modal--heading">
          Yatay Pencere Değerleri :
        </span>
        <span className="TopRight__modal--values">
          %{verticalSize.start} %{verticalSize.end}
        </span>
        <span className="TopRight__modal--heading">
          Üst Dikey Pencere Değerleri :
        </span>
        <span className="TopRight__modal--values">
          %{horizontal1Size.start} %{horizontal1Size.end}
        </span>
        <span className="TopRight__modal--heading">
          Alt Dikey Pencere Değerleri :
        </span>
        <span className="TopRight__modal--values">
          %{horizontal2Size.start} %{horizontal2Size.end}
        </span>
      </div>
    </div>
  );
}

export default TopRight;
