import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import PackageCard from './PackageCard';
import baseurl from '../api/baseurl';

const PackageList = () => {

    const [packages, setPackages] = useState([]);
    const [isPackageChanged, setIsPackageChanged] = useState(false)
    useEffect(()=> {
        const fetchData = async()=>{
            const res = await axios.get(baseurl + "/api/admin/packages")
            if(res?.status === 200){
                setPackages(res?.data)
            }
        }
        fetchData();
    }, [isPackageChanged])
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem"}}>
      {packages.map((packageDetails, id) => (
        <PackageCard packageDetails={packageDetails} isPackage={true} isPackageChanged={isPackageChanged} setIsPackageChanged={setIsPackageChanged} key={id} />
      ))}
    </div>
    )
}

export default PackageList