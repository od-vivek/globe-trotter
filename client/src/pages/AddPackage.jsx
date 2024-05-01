import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Typography, TextField, Button, Grid } from "@mui/material";

const AddPackage = ({ isPackageChanged, setIsPackageChanged }) => {
  const user = useSelector((state) => state.user.currentUser);
  const guideId = user ? user._id : "";

  const [newPackageData, setNewPackageData] = useState({
    name: "",
    description: "",
    price: "",
    days: "",
    nights: "",
    destination: "",
    itn: "",
    guide: guideId,
    imageUrls: [],
    reviews: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPackageData({ ...newPackageData, [name]: value });
  };

  const handleImageUrlChange = (e, index) => {
    const newImageUrls = [...newPackageData.imageUrls];
    newImageUrls[index] = e.target.value;
    setNewPackageData({ ...newPackageData, imageUrls: newImageUrls });
  };

  const addImageUrlInput = () => {
    setNewPackageData({ ...newPackageData, imageUrls: [...newPackageData.imageUrls, ""] });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("/api/admin/packages", newPackageData);
      setIsPackageChanged(!isPackageChanged);
      setTimeout(() => {
        setNewPackageData({
          name: "",
          description: "",
          price: "",
          days: "",
          nights: "",
          destination: "",
          itn: "",
          guide: guideId,
          imageUrls: [],
          reviews: [],
        });
      }, 2000);
    } catch (error) {
      console.error("Error adding package:", error);
    }
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
        <Grid container spacing={3}>
        <Grid item xs={12}>
            <Typography variant="h4" gutterBottom style={{ marginTop: "1rem", padding: "1rem", 
            borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>Add New Package</Typography>
        </Grid>
        <Grid item xs={12}>
            <TextField name="name" label="Name" value={newPackageData.name} onChange={handleChange} fullWidth required />
        </Grid>
        <Grid item xs={12}>
            <TextField name="description" label="Description" value={newPackageData.description} onChange={handleChange} fullWidth required />
        </Grid>
        <Grid item xs={6}>
            <TextField name="price" label="Price" value={newPackageData.price} onChange={handleChange} fullWidth required />
        </Grid>
        <Grid item xs={6}>
            <TextField name="days" label="Days" value={newPackageData.days} onChange={handleChange} fullWidth required />
        </Grid>
        <Grid item xs={6}>
            <TextField name="nights" label="Nights" value={newPackageData.nights} onChange={handleChange} fullWidth required />
        </Grid>
        <Grid item xs={6}>
            <TextField name="destination" label="Destination" value={newPackageData.destination} onChange={handleChange} fullWidth required />
        </Grid>
        <Grid item xs={12}>
            <TextField name="itn" label="Itinerary" value={newPackageData.itn} onChange={handleChange} fullWidth required />
        </Grid>

        {newPackageData.imageUrls.map((url, index) => (
            <Grid item xs={12} key={index}>
            <TextField
                name={`imageUrl-${index}`}
                label={`Image URL ${index + 1}`}
                value={url}
                onChange={(e) => handleImageUrlChange(e, index)}
                fullWidth
            />
            </Grid>
        ))}
        <Grid item xs={12}>
            <Button style={{marginLeft: "1rem"}} variant="outlined" onClick={addImageUrlInput}>Add Image URL</Button>
        </Grid>

        <Grid item xs={12}>
            <Button style={{marginLeft: "1rem", marginRight: "1rem"}} variant="contained" color="primary" onClick={handleSubmit}>Add Package</Button>
            {user && (
            <>
                <Link to="/guide/packages" className="bg-sky-400 text-white py-2 px-4 rounded mr-4">Go to Packages</Link>
            </>
            )}
        </Grid>
        <Grid item xs={12}>

        </Grid>
        </Grid>
    </div>
  );
};

export default AddPackage;
