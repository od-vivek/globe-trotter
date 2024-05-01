import { TabPanel } from "@mui/lab"
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { Box, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BlogsList from "./BlogsList";
import PackageList from "./PackageList";
import DestinationList from "./DestinationList";
import UserList from "./UserList";
import GuidesList from "./GuidesList";

const panels = {
    "Manage Packages": <PackageList></PackageList>,
    "Manage Blogs": <BlogsList></BlogsList>,
    "Manage Destination": <DestinationList></DestinationList>,
    "Manage Users": <UserList></UserList>,
    "Manage Guides": <GuidesList></GuidesList>,
}

export default function AdminDashboard() {
    const user = useSelector((state) => state.user.currentUser);
    const [value, setValue] = useState(Object.keys(panels)[0])
    const handleChangeValue = (_, _new) => setValue(_new)
    // const user = useSelector(selectLoggedInUser)
    const navigate = useNavigate()

    useEffect(() => {
        if (user.role !== "admin") {
            navigate("/")
        }
    }, [user, navigate])

    return (
        <Box sx={{ width: '100%', typography: 'h2', marginTop: "4.5rem" }}>
            {/* <Paper 
                sx={{
                    width: "100%", 
                    typography: 'h2', 
                    padding: "1rem"
                }}
            >
                <Typography variant="h4">Admin Dashboard</Typography>
            </Paper> */}
            <TabContext value={value}>
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        display: 'flex',
                        justifyContent: "center",
                    }}
                >
                    <TabList
                        onChange={handleChangeValue}
                        sx={{
                            gap: "1rem",
                            display: "flex",
                            flexDirection: "row",
                            columnGap: "1rem"
                        }}
                    >
                        {Object.keys(panels).map(e => (
                            <Tab key={e} label={e} value={e} />
                        ))}
                    </TabList>
                </Box>
                {Object.keys(panels).map(e => (
                    <TabPanel
                        key={e}
                        value={e}

                    >
                        {panels[e]}
                    </TabPanel>
                ))}
            </TabContext>
        </Box>
    )
}

// export const layout = {
//     hasFooter: false,
//     hasHeader: false
// }