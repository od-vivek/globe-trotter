import React, {useState, useEffect} from 'react'
import PackageCard from './PackageCard';
import axios from 'axios';

const DestinationList = () => {
  const [packages, setPackages] = useState([]);
    const [isPackageChanged, setIsPackageChanged] = useState(false)
    useEffect(()=> {
        const fetchData = async()=>{
            const res = await axios.get("/api/admin/destinations")
            if(res?.status === 200){
                setPackages(res?.data)
            }
        }
        fetchData();
    }, [isPackageChanged])
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem"}}>
      {packages.map((packageDetails, id) => (
        <PackageCard packageDetails={packageDetails} isPackageChanged={isPackageChanged} setIsPackageChanged={setIsPackageChanged} key={id} />
      ))}
    </div>
    )
}

export default DestinationList