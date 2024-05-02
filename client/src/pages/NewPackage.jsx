import { IconButton, Typography, Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UpdatePackageForm from "../components/UpdatePackageForm";
import baseurl from '../api/baseurl';

const PackageCard = ({ packageDetails, isPackageChanged, setIsPackageChanged, isPackage }) => {
    const [openUpdateModal, setOpenUpdateModal] = useState(false);

    const handleUpdate = async (id, updatedPackageData) => {
        try {
          await axios.put(baseurl + `/api/admin/${isPackage ? "packages" : "destinations"}/${id}`, updatedPackageData);
          setIsPackageChanged(!isPackageChanged);
        } catch (error) {
          console.error("Error updating package:", error);
        }
    };

  return (
    <Typography fontSize="1rem">
        <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] cursor-pointer'>
      <Link to={`/map/${packageDetails.name}`} className='flex flex-col h-full'>
        <img
          src={`${packageDetails.imageUrls[0]}`}
          alt='packageDetails cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full flex-grow'>
          <p className='truncate text-lg font-semibold text-slate-700 text-center'>
            {packageDetails.name}
          </p>
          <p className='text-base text-gray-600 line-clamp-3 text-center'>
            {packageDetails.description}
          </p>
        </div>
      </Link>
      <IconButton
            color="primary"
            aria-label="delete packageDetails"
            onClick={() => {
                setOpenUpdateModal(true);
            }}
            sx={{float: "right"}}
          >
            <EditIcon sx={{ color: '#243e7d', fontSize: '2rem' }} />
      </IconButton>
    </div>
    <UpdatePackageForm
        packageId={packageDetails._id}
        initialPackageData={packageDetails}
        open={openUpdateModal}
        handleClose={() => setOpenUpdateModal(false)}
        handleUpdate={handleUpdate}/>
      
    </Typography>
  );
};

const PackageList = () => {

    const user = useSelector((state) => state.user.currentUser);
    const guideId = user ? user._id : null;
    console.log("Guide ID:", guideId);
    const [packages, setPackages] = useState([]);
    const [isPackageChanged, setIsPackageChanged] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
          try {
            let url = `/api/admin/packages`;
            if (user && guideId) {
              url += `/${guideId}`;
            }
            console.log("URL:", url); 
            const res = await axios.get(baseurl + url);
            console.log("Response:", res);
            if (res?.status === 200) {
              setPackages(res?.data);
            }
          } catch (error) {
            console.error("Error fetching packages:", error);
          }
        };
        fetchData();
      }, [isPackageChanged, guideId]);
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem"}}>
      {packages.map((packageDetails, id) => (
        <PackageCard packageDetails={packageDetails} isPackage={true} isPackageChanged={isPackageChanged} setIsPackageChanged={setIsPackageChanged} key={id} />
      ))}
    </div>
    )
}

const NewPackage = () => {
    const user = useSelector((state) => state.user.currentUser);

    return (
        <div className="my-10 " style={{ marginBottom: '1rem' }}>
            <div className="ml-8 flex justify-center">
                {user && (
                <>
                    <Link to="/guide/add-package" className="bg-sky-400 text-white py-2 px-4 rounded mr-4">
                    Add New Package
                    </Link>
                </>
                )}
            </div>
            <div>
                <Box sx={{ width: '100%', typography: 'h2', marginTop: "4.5rem" }}>
                    <Box
                        className='pl-8 pb-8'
                        style={{height: '100%' }}
                    >
                        <PackageList />
                    </Box>
                </Box>
            </div>
        </div>
    );
}

export default NewPackage;

