import React, { useMemo } from 'react';

const TopPackages = ({ packages }) => {
  const myPackage = useMemo(() => {
    const newPackages = [...packages];
    newPackages.sort((packageA, packageB) => packageB.count - packageA.count);
    return newPackages.slice(0, 10);
  }, [packages]);
  return (
    <div>
      <h1>
        <span className='badge badge-pill badge-secondary m-3'>
          Top 10 packages
        </span>
      </h1>
      <ul className='list-group'>
        <li className='list-group-item d-flex justify-content-between align-items-center'>
          Package Name
          <h4>
            <span className='badge badge-secondry'>Package Count</span>
          </h4>
        </li>
        {myPackage.map((pack) => (
          <li
            className='list-group-item d-flex justify-content-between align-items-center'
            id={pack.key}
          >
            {pack.key}
            <span className='badge badge-primary badge-pill'>{pack.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopPackages;
