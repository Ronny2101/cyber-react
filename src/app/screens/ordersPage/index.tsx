import React from "react";
import { useState, SyntheticEvent } from "react";
import { Box, Container, Stack } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcressOrders";
import FinishedOrders from "./FinishedOrders";
import "../../../css/order.css";


export default function OrdersPage() {
  const [value, setValue] = useState("1");

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };


  return  (
      <div className={"order-page"}>
        <Container className={"order-container"}>
          <Stack className={"order-left"}>
            <TabContext  value={value}>
              <Box className={"order-nav-frame"}>
                <Box sx={{ borderBottom: 1, borderColor: "divider"}}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    className={"table_list"}
                  >
                    <Tab label="PAUSED ORDERS" value={"1"} />
                    <Tab label="PROCESS ORDERS" value={"2"} />
                    <Tab label="FINISHED ORDERS" value={"3"} />
                  </Tabs>
                </Box>
              </Box>
              <Stack className={"order-main-content"}>
                <PausedOrders />
                <ProcessOrders />
                <FinishedOrders />
              </Stack>
            </TabContext>
          </Stack>


          <Stack className={"order-right"}>
            <Box className={"order-info-box"}>
              <Box className={"member-box"}>
                <div className={"order-user-img"}>
                  <img 
                    src={"/icons/default-user.svg"}
                    className={"order-user-avatar"}
                  />
                  <div className={"order-user-icon-box"}>
                      <img 
                        src={"/icons/user-badge.svg"}
                        className={"order-user-prof-img"}
                  />
                  </div>
                </div>
                <span className={"order-user-name"}>RONNY</span>
                <span className={"order-user-prof"}>User</span>
              </Box>
              <Box className={"liner"}></Box>
              <Box className={"other-user-address"}>
                <div className={"address-txt"}>
                  <LocationOnIcon />
                  UZBEKSISTAN, SURKHANDARYA 
                </div>
              </Box>
            </Box>
            <Box className={"order-info-box"}>
              <Box className={"member-card-box"}>
                 <div>
                    <input type={"text"} placeholder={"Card number:**** 4090 2002 7495"}
                     className={"card-number-input"} />
                 </div>

                 <div>
                    <input type={"text"} placeholder={"Card Period Data"}
                     className={"card-info-input"} />
                    <input type={"text"} placeholder={"CVV : 010"}
                     className={"card-info-input"} />
                 </div>
                 <div >
                   <input type={"text"} placeholder={"Other Name"}
                    className={"card-number-input"} />
                 </div>
                 <div className={"card-image"}>
                   <img src={"icons/western-card.svg"}/>
                   <img src={"icons/master-card.svg"}/>
                   <img src={"icons/paypal-card.svg"}/>
                   <img src={"icons/visa-card.svg"}/>
                 </div>
              </Box>
            </Box>
          </Stack>
        </Container>
      </div>
    );
     
}