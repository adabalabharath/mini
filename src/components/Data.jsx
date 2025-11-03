// import React, { useEffect, useState } from "react";
// import Table from '@mui/material/Table'
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import TableCell from "@mui/material/TableCell";
// import Paper from "@mui/material/Paper";
// import TableBody from "@mui/material/TableBody";
// import TableContainer from "@mui/material/TableContainer";
// import Button from "@mui/material/Button";
// const Data = () => {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState("");
//   const [paginated,setPaginated]=useState([])
//   const [page,setPage]=useState(1)
//   const fetchData = async () => {
//     try {
//       let response = await fetch("https://jsonplaceholder.typicode.com/users");
//       let data = await response.json();
//       setUsers(data)
//     } catch (error) {
//       setError("Failed to fetch data");
//     }
//   };

//    useEffect(() => {
//     let numberOfItems = 4;
//     let sliced = users.slice((page - 1) * numberOfItems, page * numberOfItems);
//     setPaginated(sliced);
//   }, [page,users]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   if (error) return <h3>{error}</h3>;
//   console.log(users,paginated);
//   return (
//     <>
//       <h1>Users list</h1>
//       <TableContainer component={Paper}>
//       <Table
//         //style={{ width: "100%", marginTop: "20px", border: "1px solid black" }}
//       >
//         <TableHead>
//           <TableRow sx={{ backgroundColor: "#f4f4f4" }}>
//             <TableCell sx={{fontWeight:'bold'}}>id</TableCell>
//             <TableCell sx={{fontWeight:'bold'}}>User Name</TableCell>
//             <TableCell sx={{fontWeight:'bold'}}>Email</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {paginated?.map((user) => (
//             <TableRow
//               key={user.id}
//               //style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}
//             >
//               <TableCell >{user.id}</TableCell>
//               <TableCell >{user.username}</TableCell>
//               <TableCell >{user.email}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       </TableContainer>
//       <Button onClick={() => setPage(page - 1)} disabled={page == 1} style={{marginLeft:'10px'}}>
//         Prev
//       </Button>
//       {[...Array(Math.ceil(users.length / 4))].map((x, i) => (
//         <Button onClick={() => setPage(i + 1)} style={{marginLeft:'10px'}}>{i + 1}</Button>
//       ))}
//       <Button
//         onClick={() => setPage(page + 1)}
//         disabled={page == Math.ceil(users.length / 4)}
//         style={{margin:'10px'}}
//       >
//         Next
//       </Button>
//     </>
//   );
// };

// const thStyle = {
//   border: "1px solid black",
//   padding: "8px",
//   fontWeight: "bold",
// };

// const tdStyle = {
//   border: "1px solid black",
//   padding: "8px",
// };

// export default Data;
