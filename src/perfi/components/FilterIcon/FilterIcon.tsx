import React from "react";

function FilterIcon({ click }: { click: () => void }, ref: any) {
  return (
    <div className="nav__item">
      <button className="icon-link" onClick={click}>
        <span className="icon icon--filter icon-link__icon" />
        Filtro por hub
      </button>
    </div>
  );
}

export default FilterIcon;
