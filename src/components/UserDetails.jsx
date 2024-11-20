import React, { useEffect, useState } from "react";
import UserHome from "./userHome";

export default function UserDetails() {
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


    // useEffect(() => {
    //     fetch("localhost:3000/change here", {
    //         method: "POST",
    //         crossDomain: true,
    //         headers: {
    //             "Content-Type": "application/json",
    //             Accept: "application/json",
    //             "Access-Control-Allow-Origin": "*",
    //         },
    //         body: JSON.stringify({
    //             token: window.localStorage.getItem("token"),
    //         }),
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log(data, "userData");

    //             setUserData(data.data);

    //             if (data.data === "token expired") {
    //                 alert("Token expired login again");
    //                 window.localStorage.clear();
    //                 window.location.href = "./sign-in";
    //             }
    //         });
    // }, []);

    return <UserHome userData={userData} />;
}