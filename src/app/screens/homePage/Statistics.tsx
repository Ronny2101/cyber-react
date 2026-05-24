import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Divider from "../../components/divider";

// export default function Statistics() {
//     return (
//         <div className={"static-frame"}>
//             <Container>
//                 <Stack className="info">
//                     <Stack className="static-box">
//                         <Box className="static-num">12</Box>
//                         <Box className="static-text">Restaurants</Box>
//                     </Stack>

//                     <Divider height="64" width="2" bg="#f3f0ec"/>

//                     <Stack className="static-box">
//                         <Box className="static-num">8</Box>
//                         <Box className="static-text">Experience</Box>
//                     </Stack>

//                     <Divider height="64" width="2" bg="#f3f0ec"/>

//                     <Stack className="static-box">
//                         <Box className="static-num">50+</Box>
//                         <Box className="static-text">Menu</Box>
//                     </Stack>

//                     <Divider height="64" width="2" bg="#f3f0ec"/>

//                     <Stack className="static-box">
//                         <Box className="static-num">200+</Box>
//                         <Box className="static-text">Clients</Box>
//                     </Stack>

//                 </Stack>
//             </Container>
//         </div>
//     );
// }

// const stats = [
//   { number: "12", label: "Restaurants" },
//   { number: "8", label: "Experience" },
//   { number: "50+", label: "Menu" },
//   { number: "200+", label: "Clients" },
// ];

// const StatsSection: React.FC = () => {
//   return (
//     <section className="stats-section">
//       <div className="stats-container">
//         {stats.map((item, index) => (
//           <div className="stat-item" key={index}>
//             <h2 className="stat-number">{item.number}</h2>
//             <p className="stat-label">{item.label}</p>
//             {index !== stats.length - 1 && <div className="divider" />}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default StatsSection;


import { useEffect, useRef } from 'react';

interface StatItem {
    label: string;
    value: number;
  }
  
  const stats: StatItem[] = [
    { label: 'Happy Customers', value: 12765 },
    { label: 'Products Sold', value: 8579 },
    { label: 'Brands Available', value: 42 },
    { label: 'Stores Worldwide', value: 12 },
  ];
  
  const Statistics: React.FC = () => {
    const refs = useRef<(HTMLDivElement | null)[]>([]);
  
    useEffect(() => {
      const easeOutQuad = (t: number) => t * (2 - t);
  
      const animateNumber = (
        el: HTMLDivElement,
        start: number,
        end: number,
        duration: number
      ) => {
        let startTime: number | null = null;
        const frame = (time: number) => {
          if (!startTime) startTime = time;
          const progress = Math.min((time - startTime) / duration, 1);
          const eased = easeOutQuad(progress);
          const value = Math.floor(start + (end - start) * eased);
          el.textContent = value.toLocaleString();
          if (progress < 1) requestAnimationFrame(frame);
          else el.textContent = end.toLocaleString();
        };
        requestAnimationFrame(frame);
      };
  
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLDivElement;
              const finalValue = Number(target.dataset.target || 0);
              const duration = Math.min(2000, 400 + finalValue * 0.3);
              animateNumber(target, 0, finalValue, duration);
              obs.unobserve(target);
            }
          });
        },
        { threshold: 0.5 }
      );
  
      refs.current.forEach((el) => el && observer.observe(el));
  
      return () => observer.disconnect();
    }, []);
  
    return (
      <section className="stats-panel cyber-shop">
        <div className="container">
          {stats.map((stat, i) => (
            <div key={i} className="stat">
              <div
                className="num"
                ref={(el) => (refs.current[i] = el)}
                data-target={stat.value}
              >
                0
              </div>
              <div className="label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default Statistics;