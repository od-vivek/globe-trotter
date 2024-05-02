import axios from 'axios'
import React, { useState, useEffect } from 'react'
import GuideCard from './GuideCard';
import baseurl from '../api/baseurl';

const GuidesList = () => {

    const [guides, setGuides] = useState([]);
    const [isGuideChanged, setIsGuideChanged] = useState(false)
    useEffect(()=> {
        const fetchData = async()=>{
            const res = await axios.get(baseurl + "/api/admin/guides")
            if(res?.status === 200){
                setGuides(res?.data)
            }
        }
        fetchData();
    }, [isGuideChanged])
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem"}}>
      {guides.map((guideDetails, id) => (
        <GuideCard guideDetails={guideDetails} isGuideChanged={isGuideChanged} setIsGuideChanged={setIsGuideChanged} key={id} />
      ))}
    </div>
    )
}

export default GuidesList