import { Box, Stack } from "@mui/material";
import React from "react";

export default function Statistic() {
    return (
            <div className="static-frames" >
                <Box className={"about-us"}>About Us</Box>
                <Stack className="infos">
                    <Stack className="info-left">
                        <Stack className="info-top">
                                <Box className="static-num1">
                                    <img src="/img/ps5.webp" alt=""/>
                                </Box>
                                <Box className='static-box1-2'>
                                    <Box className="static-text1">Playstation 5</Box>
                                    <Box className="static-text1-2">Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.</Box>
                                </Box>
                            </Stack>
                            <Stack className="info-bottom">
                            <Stack className="static-box2">
                                <Box className="static-num2">
                                        <img src="/img/airpods.webp" alt=""/>
                                </Box>
                                    <Box className='static-box2-1'>
                                        <Box className="static-text2">Apple AirPods Max</Box>
                                        <Box className="static-text2-1">Computational audio. 
                                            Listen, It's powerful 
                                        </Box>
                                    </Box>
                            </Stack>

                            <Stack className="static-box3">
                                <Box className="static-num3">
                                        <img src="/img/vss.png" alt=""/>
                                </Box>
                                <Box className='static-box3-1'>
                                        <Box className="static-text3">Apple Vision Pro</Box>
                                        <Box className="static-text3-1">An immersive way to experience entertainment</Box>
                                    </Box>
                            </Stack>
                        </Stack>
                        </Stack>
                    <Stack className="info-right">
                        <Box className='static-box4-1'>
                            <Box className="static-text4">Macbook Pro</Box>
                            <Box className="static-text4-1">The new 15 - inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.</Box>
                        </Box>
                        <Box className="static-num4">
                            <img src="/img/macc.png" alt=""/>
                        </Box>
                        
                    </Stack>
                </Stack>
            </div>
    );
}





