import { Button, Link, Stack, Typography } from "@mui/material";
import React,{useEffect,useState} from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function UserHome() {
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    mobile: "",
});

useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log(storedUser, "storedUser");
    if (storedUser) {
        try {
            const parsedUser = JSON.parse(storedUser);
            setUserData({
                email: parsedUser.email || "",
                name: parsedUser.name || "",
                mobile: parsedUser.mobile || "",
            });
        } catch (error) {
            console.error("Error parsing user data from localStorage:", error);
        }
    }
}, []);

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };
  return (
    
   <div className="topmar">

   <Stack
      sx={{
        width: "100%",
        height: "fit-content",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#021E30",
      }}
    >
      <Stack
        sx={{
          width: { xs: "100%", sm: "85%", md: "80%" },
          height: { xs: "fitcontent", sm: "85dvh", md: "90dvh" },
          display: "flex",
          flexDirection: "row",
          
          justifyContent: "center",
          alignItems: "center",
          boxShadow: ".0625rem .0625rem .625rem .5rem #00000048",
          borderRadius: ".75rem",
          border: { xs: "2px solid white", sm: "none" },
        }}
      >
        <Stack
          sx={{
            background: `url(https://newdemo.rreda.in/wp-content/uploads/2023/04/cropped-Untitled-design-1.png)`,
            height: "100%",
            display: "flex",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            zIndex: "1",
            width: "100%",
            flex: "1",
            opacity: { xs: "0.1", md: "1" },
            borderRight: { xs: "0px", md: ".25rem solid #021621" },
            position: { xs: "absolute", md: "relative" },
          }}
        ></Stack>
        <Stack
          gap={3}
          sx={{
            color: "whitesmoke",
            flex: "2",
            
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: ".9375rem .625rem",
            zIndex: "2",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bolder",
              borderBottom: ".1875rem solid white",
              paddingBottom: ".125rem",
              fontSize: { xs: "2.8125rem", md: "2.5rem" },
            }}
          >
            Booking Dashboard
          </Typography>
          <Stack
            gap={4}
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              padding: ".625rem .625rem",
              justifyContent: "space-evenly",
              alignItems: "center",
              boxShadow: "1px 1px 8px 4px #00000048",
              borderRadius: ".75rem",
            }}
          >
            <AccountCircleIcon sx={{ fontSize: "4.5rem" }} />
            <Stack
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "auto",
                justifyContent: "center",
                alignItems: "flex-start",
                borderRadius: ".75rem",
                padding: ".625rem .625rem",
                textAlign: "start",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" } }}
              >
                Name : {userData.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
              >
                Email : {userData.email}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
              >
                Phone number : {userData.mobile}
              </Typography>
              
            </Stack>
          </Stack>
          {userData.dpone === "graphics" ||
          userData.dpone === "content-writing" ||
          userData.dpone === "video-editing" ? (
            <Link sx={{ color: "#00CED1" }}>Link will be updated soon.</Link>
          ) : (
            <Stack sx={{ width: "100%" }}>
              <Stack
                gap={1}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: ".75rem",
                  padding: ".625rem .625rem",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "start",
                  boxShadow: "1px 1px 8px 4px #00000048",
                }}
              >
                <Stack
                  gap={4}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0rem .625rem",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontSize: { xs: "1.5rem", md: "1.25rem" } }}
                  >
                    booking 1
                  </Typography>
                  <Button
                   variant="contained"
                    sx={{
                      
                      background: "#00CED1",
                      color: "#021E30",
                      padding: { xs: ".145rem .395rem", md: "6px 12px" },
                      borderRadius: ".75rem",
                      fontSize: { xs: "0.85rem", md: "0.75rem" },
                      textDecoration: "none"
                    }}
                  >
                   Date
                  </Button>
                </Stack>
                
              </Stack>
            </Stack>
          )}
          <Button
            variant="contained"
            sx={{
              background: "#00CED1",
              color: "#021E30",
              padding: ".25rem .5rem",
              borderRadius: ".75rem",
              fontSize: { xs: "1.125rem", md: "1rem" },
            }}
            onClick={logOut}
          >
            Log out
          </Button>
        </Stack>
      </Stack>
    </Stack>
    </div>
  );
}
