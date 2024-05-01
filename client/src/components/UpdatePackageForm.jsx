import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import { CheckCircleOutline as CheckCircleOutlineIcon } from '@mui/icons-material';

const UpdatePackageForm = ({ packageId, initialPackageData, open, handleClose, handleUpdate }) => {
  const [updatedPackageData, setUpdatedPackageData] = useState(initialPackageData);
  const [packageUpdated, setPackageUpdated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPackageData({ ...updatedPackageData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await handleUpdate(packageId, updatedPackageData);
      setPackageUpdated(true);
      setTimeout(() => {
        setPackageUpdated(false);
        handleClose();
      }, 2000);
    } catch (error) {
      console.error("Error updating package:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="update-package-modal-title"
      aria-describedby="update-package-modal-description"
    >
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "white", padding: "2rem", borderRadius: "8px" }}>
        <h2 id="update-package-modal-title">Update Package</h2>
        <TextField name="name" label="Name" value={updatedPackageData.name} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="description" label="Description" value={updatedPackageData.description} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="price" label="Price" value={updatedPackageData.price} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="days" label="Days" value={updatedPackageData.days} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="nights" label="Nights" value={updatedPackageData.nights} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="destination" label="Destination" value={updatedPackageData.destination} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="itn" label="Itinerary" value={updatedPackageData.itn} onChange={handleChange} fullWidth margin="normal" />

        {packageUpdated && (
          <div style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
            <CheckCircleOutlineIcon style={{ color: "green", marginRight: "0.5rem" }} />
            <span style={{ color: "green" }}>Package updated successfully!</span>
          </div>
        )}

        <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: "1rem" }}>Update</Button>
      </div>
    </Modal>
  );
};

export default UpdatePackageForm;
