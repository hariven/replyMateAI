// "use client";

// import type React from "react";
// import {
//   // Grid,
//   Card,
//   CardContent,
//   // Typography,
//   // Box,
//   // Chip,
//   // Avatar,
//   // List,
//   // ListItem,
//   // ListItemAvatar,
//   // ListItemText,
//   Button,
//   // CardActions,
//   // LinearProgress,
//   Menu,
//   Badge,
//   // CardHeader,
// } from "@mui/material";
// import {
//   TrendingUp,
//   // TrendingDown,
//   // Business,
//   // Chat,
//   // Speed,
//   Person,
//   // Add,
//   // Edit,
//   // Analytics,
//   X,
//   Chat as ChatIcon,
//   Login as LogIn,
//   Add as Plus,
// } from "@mui/icons-material";
// // import ChatIcon from '@mui/icons-material/Chat';
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// interface DashboardProps {
//   onBusinessSelect: (businessId: string) => void;
// }

// // Mock data - replace with actual API calls
// // const mockBusinesses = [
// //   {
// //     id: "1",
// //     name: "Tech Solutions Inc",
// //     whatsappNumber: "+1234567890",
// //     status: "active",
// //     conversations: 156,
// //     responseRate: 94,
// //     avgResponseTime: "2.3 min",
// //     lastActivity: "5 minutes ago",
// //   },
// //   {
// //     id: "2",
// //     name: "E-commerce Store",
// //     whatsappNumber: "+1234567891",
// //     status: "active",
// //     conversations: 89,
// //     responseRate: 87,
// //     avgResponseTime: "3.1 min",
// //     lastActivity: "12 minutes ago",
// //   },
// //   {
// //     id: "3",
// //     name: "Restaurant Chain",
// //     whatsappNumber: "+1234567892",
// //     status: "inactive",
// //     conversations: 234,
// //     responseRate: 91,
// //     avgResponseTime: "1.8 min",
// //     lastActivity: "2 hours ago",
// //   },
// // ];

// // const recentActivities = [
// //   {
// //     business: "Tech Solutions Inc",
// //     activity: "New conversation started",
// //     time: "2 min ago",
// //   },
// //   {
// //     business: "E-commerce Store",
// //     activity: "Knowledge base updated",
// //     time: "15 min ago",
// //   },
// //   {
// //     business: "Restaurant Chain",
// //     activity: "AI response sent",
// //     time: "1 hour ago",
// //   },
// //   {
// //     business: "Tech Solutions Inc",
// //     activity: "Customer inquiry resolved",
// //     time: "2 hours ago",
// //   },
// // ];

// const Dashboard: React.FC<DashboardProps> = () => {
//   // const totalConversations = mockBusinesses.reduce(
//   //   (sum, b) => sum + b.conversations,
//   //   0
//   // );
//   // const avgResponseRate = Math.round(
//   //   mockBusinesses.reduce((sum, b) => sum + b.responseRate, 0) /
//   //     mockBusinesses.length
//   // );
//   // const activeBusinesses = mockBusinesses.filter(
//   //   (b) => b.status === "active"
//   // ).length;

//   const navigate = useNavigate();

//   // return (
//   //   <div className=" mx-auto flex justify-center w-[90%]">
//   //     <div className=" ">
//   //       <Typography
//   //         variant="h4"
//   //         sx={{ mb: 3, fontWeight: "bold", color: "#333" }}
//   //       >
//   //         Dashboard
//   //       </Typography>

//   //       {/* Stats Cards */}
//   //       <Grid container spacing={3} sx={{ mb: 4 }}>
//   //         <Grid>
//   //           <Card sx={{ height: "100%" }}>
//   //             <CardContent>
//   //               <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//   //                 <Business sx={{ color: "#25D366", mr: 1 }} />
//   //                 <Typography variant="h6">Active Businesses</Typography>
//   //               </Box>
//   //               <Typography
//   //                 variant="h3"
//   //                 sx={{ fontWeight: "bold", color: "#25D366" }}
//   //               >
//   //                 {activeBusinesses}
//   //               </Typography>
//   //               <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
//   //                 <TrendingUp
//   //                   sx={{ color: "#4caf50", fontSize: 16, mr: 0.5 }}
//   //                 />
//   //                 <Typography variant="body2" color="success.main">
//   //                   +2 this month
//   //                 </Typography>
//   //               </Box>
//   //             </CardContent>
//   //           </Card>
//   //         </Grid>

//   //         <Grid>
//   //           <Card sx={{ height: "100%" }}>
//   //             <CardContent>
//   //               <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//   //                 <Chat sx={{ color: "#25D366", mr: 1 }} />
//   //                 <Typography variant="h6">Total Conversations</Typography>
//   //               </Box>
//   //               <Typography
//   //                 variant="h3"
//   //                 sx={{ fontWeight: "bold", color: "#25D366" }}
//   //               >
//   //                 {totalConversations}
//   //               </Typography>
//   //               <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
//   //                 <TrendingUp
//   //                   sx={{ color: "#4caf50", fontSize: 16, mr: 0.5 }}
//   //                 />
//   //                 <Typography variant="body2" color="success.main">
//   //                   +15% this week
//   //                 </Typography>
//   //               </Box>
//   //             </CardContent>
//   //           </Card>
//   //         </Grid>

//   //         <Grid>
//   //           <Card sx={{ height: "100%" }}>
//   //             <CardContent>
//   //               <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//   //                 <Speed sx={{ color: "#25D366", mr: 1 }} />
//   //                 <Typography variant="h6">Avg Response Rate</Typography>
//   //               </Box>
//   //               <Typography
//   //                 variant="h3"
//   //                 sx={{ fontWeight: "bold", color: "#25D366" }}
//   //               >
//   //                 {avgResponseRate}%
//   //               </Typography>
//   //               <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
//   //                 <TrendingDown
//   //                   sx={{ color: "#f44336", fontSize: 16, mr: 0.5 }}
//   //                 />
//   //                 <Typography variant="body2" color="error.main">
//   //                   -2% this week
//   //                 </Typography>
//   //               </Box>
//   //             </CardContent>
//   //           </Card>
//   //         </Grid>

//   //         <Grid>
//   //           <Card sx={{ height: "100%" }}>
//   //             <CardContent>
//   //               <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//   //                 <Person sx={{ color: "#25D366", mr: 1 }} />
//   //                 <Typography variant="h6">Active Users</Typography>
//   //               </Box>
//   //               <Typography
//   //                 variant="h3"
//   //                 sx={{ fontWeight: "bold", color: "#25D366" }}
//   //               >
//   //                 1,234
//   //               </Typography>
//   //               <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
//   //                 <TrendingUp
//   //                   sx={{ color: "#4caf50", fontSize: 16, mr: 0.5 }}
//   //                 />
//   //                 <Typography variant="body2" color="success.main">
//   //                   +8% this month
//   //                 </Typography>
//   //               </Box>
//   //             </CardContent>
//   //           </Card>
//   //         </Grid>
//   //       </Grid>

//   //       <Grid container spacing={3}>
//   //         {/* Business Cards */}
//   //         <Grid>
//   //           <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
//   //             Your Businesses
//   //           </Typography>
//   //           <Grid container spacing={2}>
//   //             {mockBusinesses.map((business) => (
//   //               <Grid key={business.id}>
//   //                 <Card
//   //                   sx={{
//   //                     cursor: "pointer",
//   //                     transition: "all 0.2s",
//   //                     "&:hover": {
//   //                       transform: "translateY(-2px)",
//   //                       boxShadow: 3,
//   //                     },
//   //                   }}
//   //                   onClick={() => onBusinessSelect(business.id)}
//   //                 >
//   //                   <CardContent>
//   //                     <Box
//   //                       sx={{
//   //                         display: "flex",
//   //                         justifyContent: "space-between",
//   //                         alignItems: "flex-start",
//   //                         mb: 2,
//   //                       }}
//   //                     >
//   //                       <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//   //                         {business.name}
//   //                       </Typography>
//   //                       <Chip
//   //                         label={business.status}
//   //                         color={
//   //                           business.status === "active" ? "success" : "default"
//   //                         }
//   //                         size="small"
//   //                       />
//   //                     </Box>

//   //                     <Typography
//   //                       variant="body2"
//   //                       color="text.secondary"
//   //                       sx={{ mb: 2 }}
//   //                     >
//   //                       {business.whatsappNumber}
//   //                     </Typography>

//   //                     <Box sx={{ mb: 2 }}>
//   //                       <Box
//   //                         sx={{
//   //                           display: "flex",
//   //                           justifyContent: "space-between",
//   //                           mb: 1,
//   //                         }}
//   //                       >
//   //                         <Typography variant="body2">Response Rate</Typography>
//   //                         <Typography
//   //                           variant="body2"
//   //                           sx={{ fontWeight: "bold" }}
//   //                         >
//   //                           {business.responseRate}%
//   //                         </Typography>
//   //                       </Box>
//   //                       <LinearProgress
//   //                         variant="determinate"
//   //                         value={business.responseRate}
//   //                         sx={{ height: 6, borderRadius: 3 }}
//   //                       />
//   //                     </Box>

//   //                     <Grid container spacing={2} sx={{ mb: 2 }}>
//   //                       <Grid>
//   //                         <Typography variant="body2" color="text.secondary">
//   //                           Conversations
//   //                         </Typography>
//   //                         <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//   //                           {business.conversations}
//   //                         </Typography>
//   //                       </Grid>
//   //                       <Grid >
//   //                         <Typography variant="body2" color="text.secondary">
//   //                           Avg Response
//   //                         </Typography>
//   //                         <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//   //                           {business.avgResponseTime}
//   //                         </Typography>
//   //                       </Grid>
//   //                     </Grid>

//   //                     <Typography variant="body2" color="text.secondary">
//   //                       Last activity: {business.lastActivity}
//   //                     </Typography>
//   //                   </CardContent>

//   //                   <CardActions>
//   //                     <Button size="small" startIcon={<Edit />}>
//   //                       Edit
//   //                     </Button>
//   //                     <Button size="small" startIcon={<Analytics />}>
//   //                       Analytics
//   //                     </Button>
//   //                   </CardActions>
//   //                 </Card>
//   //               </Grid>
//   //             ))}
//   //           </Grid>
//   //         </Grid>

//   //         {/* Recent Activity */}
//   //         <Grid>
//   //           <Card sx={{ height: "fit-content" }}>
//   //             <CardContent>
//   //               <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
//   //                 Recent Activity
//   //               </Typography>
//   //               <List>
//   //                 {recentActivities.map((activity, index) => (
//   //                   <ListItem key={index} sx={{ px: 0 }}>
//   //                     <ListItemAvatar>
//   //                       <Avatar sx={{ bgcolor: "#E8F5E8", color: "#25D366" }}>
//   //                         <Business />
//   //                       </Avatar>
//   //                     </ListItemAvatar>
//   //                     <ListItemText
//   //                       primary={activity.activity}
//   //                       secondary={`${activity.business} • ${activity.time}`}
//   //                     />
//   //                   </ListItem>
//   //                 ))}
//   //               </List>
//   //             </CardContent>
//   //           </Card>

//   //           {/* Quick Actions */}
//   //           <Card sx={{ mt: 3 }}>
//   //             <CardContent>
//   //               <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
//   //                 Quick Actions
//   //               </Typography>
//   //               <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//   //                 <Button
//   //                   onClick={() => navigate("/kb-editor")}
//   //                   variant="outlined"
//   //                   startIcon={<Add />}
//   //                   fullWidth
//   //                   sx={{ justifyContent: "flex-start" }}
//   //                 >
//   //                   Add New Business
//   //                 </Button>
//   //                 <Button
//   //                   variant="outlined"
//   //                   startIcon={<Edit />}
//   //                   fullWidth
//   //                   sx={{ justifyContent: "flex-start" }}
//   //                 >
//   //                   Update Knowledge Base
//   //                 </Button>
//   //                 <Button
//   //                   variant="outlined"
//   //                   startIcon={<Analytics />}
//   //                   fullWidth
//   //                   sx={{ justifyContent: "flex-start" }}
//   //                 >
//   //                   View Analytics
//   //                 </Button>
//   //               </Box>
//   //             </CardContent>
//   //           </Card>
//   //         </Grid>
//   //       </Grid>
//   //     </div>
//   //   </div>
//   // );

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Mock data
//   const connectedBusinesses = 12;
//   // const totalConversations = 1847
//   const responseRate = 94;

//   if (!isLoggedIn) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//         {/* Navigation */}
//         <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center h-16">
//               <div className="flex items-center space-x-2">
//                 <ChatIcon className="h-8 w-8 text-blue-600" />
//                 <span className="text-xl font-bold text-gray-900">
//                   ReplyMate AI
//                 </span>
//               </div>

//               {/* Desktop Navigation */}
//               <div className="hidden md:flex items-center space-x-4">
//                 <Button>Features</Button>
//                 <Button>Pricing</Button>
//                 <Button>About</Button>
//                 <Button
//                   className="flex items-center gap-2 bg-transparent"
//                   onClick={() => setIsLoggedIn(true)}
//                 >
//                   <LogIn className="h-4 w-4" />
//                   Login
//                 </Button>
//                 <Button className="flex items-center gap-2">
//                   {/* <UserPlus className="h-4 w-4" /> */}
//                   Sign Up
//                 </Button>
//               </div>

//               {/* Mobile menu button */}
//               <div className="md:hidden">
//                 <Button onClick={() => setIsMenuOpen(!isMenuOpen)}>
//                   {isMenuOpen ? (
//                     <X className="h-6 w-6" />
//                   ) : (
//                     <Menu className="h-6 w-6" open={false} />
//                   )}
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Mobile Navigation */}
//           {isMenuOpen && (
//             <div className="md:hidden bg-white border-t border-gray-200">
//               <div className="px-2 pt-2 pb-3 space-y-1">
//                 <Button className="w-full justify-start">Features</Button>
//                 <Button className="w-full justify-start">Pricing</Button>
//                 <Button className="w-full justify-start">About</Button>
//                 <Button className="w-full justify-start gap-2 bg-transparent">
//                   <LogIn className="h-4 w-4" />
//                   Login
//                 </Button>
//                 <Button className="w-full justify-start gap-2">
//                   <Person className="h-4 w-4" />
//                   Sign Up
//                 </Button>
//               </div>
//             </div>
//           )}
//         </nav>

//         {/* Hero Section */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//           <div className="text-center">
//             <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
//               Connect Your Business with
//               <span className="text-blue-600"> AI-Powered Bots</span>
//             </h1>
//             <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
//               Automate customer conversations, boost response rates, and grow
//               your business with intelligent WhatsApp bots that understand your
//               customers.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Button className="text-lg px-8 py-3">Start Free Trial</Button>
//               <Button className="text-lg px-8 py-3 bg-transparent">
//                 Watch Demo
//               </Button>
//             </div>
//           </div>

//           {/* Stats */}
//           <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="text-center">
//               <div className="text-3xl font-bold text-blue-600">10,000+</div>
//               <div className="text-gray-600">Businesses Connected</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-green-600">95%</div>
//               <div className="text-gray-600">Average Response Rate</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-purple-600">24/7</div>
//               <div className="text-gray-600">Automated Support</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (isLoggedIn) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//         {/* Navigation */}
//         <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center h-16">
//               <div className="flex items-center space-x-2">
//                 <ChatIcon className="h-8 w-8 text-blue-600" />
//                 <span className="text-xl font-bold text-gray-900">
//                   ReplyMate AI
//                 </span>
//               </div>

//               <div className="flex items-center space-x-4">
//                 {/* <Avatar> */}
//                 {/* <AvatarImage src="/placeholder-user.jpg" />
//                 <AvatarFallback>JD</AvatarFallback> */}
//                 <Person className="h-6 w-6 text-blue-600" />
//                 {/* </Avatar> */}
//                 <Button onClick={() => setIsLoggedIn(false)}>Logout</Button>
//               </div>
//             </div>
//           </div>
//         </nav>

//         {/* Dashboard Content */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           {/* Welcome Section */}
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               Welcome back, John! 👋
//             </h1>
//             <p className="text-gray-600">
//               Here's what's happening with your connected businesses today.
//             </p>
//           </div>

//           {/* Key Metrics */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
//             <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
//               <CardContent className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <div className="text-sm font-medium text-gray-600">
//                   Connected Businesses
//                 </div>
//                 {/* <Building2 className="h-5 w-5 text-blue-600" /> */}
//               </CardContent>
//               <CardContent>
//                 <div className="text-3xl font-bold text-gray-900">
//                   {connectedBusinesses}
//                 </div>
//                 <div className="flex items-center mt-2">
//                   <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
//                   <span className="text-sm text-green-600">+2 this month</span>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
//               <CardContent className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <div className="text-sm font-medium text-gray-600">
//                   Response Rate
//                 </div>
//                 {/* <Bot className="h-5 w-5 text-purple-600" /> */}
//               </CardContent>
//               <CardContent>
//                 <div className="text-3xl font-bold text-gray-900">
//                   {responseRate}%
//                 </div>
//                 <div className="flex items-center mt-2">
//                   <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
//                   <span className="text-sm text-green-600">+3% this week</span>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Quick Actions */}
//           <div className="bg-white border border-gray-200 shadow-sm mb-12">
//             {/* Create New Bot */}
//             <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
//               <CardContent onClick={() => navigate("/kb-editor")}>
//                 <div className="flex items-center gap-2">
//                   <Plus className="h-5 w-5 text-blue-600" />
//                   Create New Bot
//                 </div>
//                 <div className="text-sm text-gray-500">
//                   Connect a new business and set up an AI-powered WhatsApp bot
//                   in minutes.
//                 </div>
//               </CardContent>
//               <CardContent className="space-y-4">
//                 <Button
//                   className="w-full"
//                   onClick={() => navigate("/kb-editor")}
//                 >
//                   <Plus className="h-4 w-4 mr-2" />
//                   Add New Business
//                 </Button>
//                 <div className="text-sm text-gray-500 text-center">
//                   Setup takes less than 5 minutes
//                 </div>
//               </CardContent>
//             </Card>
//             {/*  */}
//           </div>

//           {/* Your Businesses - Simplified */}
//           <div className="mt-8">
//             <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
//               <CardContent>
//                 <div>Your Connected Businesses</div>
//                 <div className="text-sm text-gray-500">
//                   Manage and monitor your AI-powered business bots.
//                 </div>
//               </CardContent>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   <div className="p-4 border rounded-lg bg-gray-50">
//                     <div className="flex items-center justify-between mb-2">
//                       <h3 className="font-medium">Tech Solutions Inc</h3>
//                       <Badge className="bg-green-100 text-green-800">
//                         Active
//                       </Badge>
//                     </div>
//                     <p className="text-sm text-gray-600 mb-2">+1234567890</p>
//                     <div className="text-sm">
//                       <span className="font-medium">156</span> conversations
//                     </div>
//                   </div>

//                   <div className="p-4 border rounded-lg bg-gray-50">
//                     <div className="flex items-center justify-between mb-2">
//                       <h3 className="font-medium">E-commerce Store</h3>
//                       <Badge className="bg-green-100 text-green-800">
//                         Active
//                       </Badge>
//                     </div>
//                     <p className="text-sm text-gray-600 mb-2">+1234567891</p>
//                     <div className="text-sm">
//                       <span className="font-medium">89</span> conversations
//                     </div>
//                   </div>

//                   <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
//                     <Button
//                       className="h-full w-full flex-col gap-2"
//                       onClick={() => navigate("/kb-editor")}
//                     >
//                       <Plus className="h-8 w-8 text-gray-400" />
//                       <span className="text-gray-500">Add Business</span>
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     );
//   }
// };

// export default Dashboard;



// "use client";

// import type React from "react";
// import {
//   Card,
//   CardContent,
//   Button,
//   Badge,
// } from "@mui/material";
// import {
//   TrendingUp,
//   Person,
//   X,
//   Chat as ChatIcon,
//   Login as LogIn,
//   Add as Plus,
//   Menu,
//   WhatsApp,
// } from "@mui/icons-material";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import "../App.css"; // <-- for WhatsApp pattern background

// interface DashboardProps {
//   onBusinessSelect?: (businessId: string) => void;
// }

// interface Business {
//   id: string;
//   name: string;
//   whatsapp_number: string;
// }

// const FloatingWhatsAppIcons = () => {
//   return (
//     <>
//       <WhatsApp
//         className="fixed bottom-4 right-4 text-[#25D366] bg-white rounded-full p-2 shadow-lg cursor-pointer"
//         style={{ fontSize: 48 }}
//       />
//       <WhatsApp
//         className="fixed top-24 right-12 text-[#25D366] bg-white rounded-full p-2 shadow-lg cursor-pointer animate-bounce"
//         style={{ fontSize: 32 }}
//       />
//       <WhatsApp
//         className="fixed bottom-24 left-10 text-[#25D366] bg-white rounded-full p-2 shadow-lg cursor-pointer"
//         style={{ fontSize: 40 }}
//       />
//     </>
//   );
// };

// const Dashboard: React.FC<DashboardProps> = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [businesses, setBusinesses] = useState<Business[]>([]);

//   const navigate = useNavigate();
//   const location = useLocation();

//   const connectedBusinesses = businesses.length;
//   const responseRate = 94;

  // useEffect(() => {
  //   fetch("/api/businesses")
  //     .then((res) => res.json())
  //     .then((data) => setBusinesses(data))
  //     .catch((err) => console.error("Failed to fetch businesses:", err));
  // }, []);

  // useEffect(() => {
  //   if (location.state?.newBusiness) {
  //     setBusinesses((prev) => [...prev, location.state.newBusiness]);
  //   }
  // }, [location.state]);

//   const handleAddBusiness = () => {
//     navigate("/kb-editor");
//   };

//   if (!isLoggedIn) {
//     return (
//       <div className="min-h-screen whatsapp-bg relative">
//         <FloatingWhatsAppIcons />

//         {/* Navigation */}
//         <nav className="bg-[#075E54] text-white border-b border-green-700">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center h-16">
//               <div className="flex items-center space-x-2">
//                 <ChatIcon className="h-8 w-8 text-[#25D366]" />
//                 <span className="text-xl font-bold">ReplyMate AI</span>
//               </div>
//               <div className="hidden md:flex items-center space-x-4">
//                 <Button className="text-white">Features</Button>
//                 <Button className="text-white">Pricing</Button>
//                 <Button className="text-white">About</Button>
//                 <Button
//                   className="flex items-center gap-2 text-[#25D366] border border-[#25D366]"
//                   onClick={() => setIsLoggedIn(true)}
//                 >
//                   <LogIn className="h-4 w-4" />
//                   Login
//                 </Button>
//                 <Button className="flex items-center gap-2 bg-[#25D366] text-white">
//                   Sign Up
//                 </Button>
//               </div>
//               <div className="md:hidden">
//                 <Button onClick={() => setIsMenuOpen(!isMenuOpen)}>
//                   {isMenuOpen ? (
//                     <X className="h-6 w-6 text-white" />
//                   ) : (
//                     <Menu className="h-6 w-6 text-white" />
//                   )}
//                 </Button>
//               </div>
//             </div>
//           </div>
//           {isMenuOpen && (
//             <div className="md:hidden bg-[#075E54] border-t border-green-700">
//               <div className="px-2 pt-2 pb-3 space-y-1 text-white">
//                 <Button className="w-full justify-start">Features</Button>
//                 <Button className="w-full justify-start">Pricing</Button>
//                 <Button className="w-full justify-start">About</Button>
//                 <Button className="w-full justify-start gap-2 text-[#25D366]">
//                   <LogIn className="h-4 w-4" />
//                   Login
//                 </Button>
//                 <Button className="w-full justify-start gap-2 text-[#25D366]">
//                   <Person className="h-4 w-4" />
//                   Sign Up
//                 </Button>
//               </div>
//             </div>
//           )}
//         </nav>

//         {/* Hero Section */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
//           <h1 className="text-4xl md:text-6xl font-bold text-[#075E54] mb-6">
//             Connect Your Business with
//             <span className="text-[#25D366]"> AI-Powered Bots</span>
//           </h1>
//           <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
//             Automate customer conversations, boost response rates, and grow your
//             business with intelligent WhatsApp bots.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button className="text-lg px-8 py-3 bg-[#25D366] text-white">
//               Start Free Trial
//             </Button>
//             <Button className="text-lg px-8 py-3 border border-[#25D366] text-[#25D366]">
//               Watch Demo
//             </Button>
//           </div>

  //         <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
  //           <div className="text-center">
  //             <div className="text-3xl font-bold text-[#25D366]">10,000+</div>
  //             <div className="text-gray-600">Businesses Connected</div>
  //           </div>
  //           <div className="text-center">
  //             <div className="text-3xl font-bold text-green-700">95%</div>
  //             <div className="text-gray-600">Average Response Rate</div>
  //           </div>
  //           <div className="text-center">
  //             <div className="text-3xl font-bold text-green-700">24/7</div>
  //             <div className="text-gray-600">Automated Support</div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

//   // Logged in dashboard
//   return (
//     <div className="min-h-screen whatsapp-bg relative">
//       <FloatingWhatsAppIcons />
//       <nav className="bg-[#075E54] text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
//           <div className="flex items-center space-x-2">
//             <ChatIcon className="h-8 w-8 text-[#25D366]" />
//             <span className="text-xl font-bold">ReplyMate AI</span>
//           </div>
//           <div className="flex items-center space-x-4">
//             <Person className="h-6 w-6 text-[#25D366]" />
//             <Button
//               onClick={() => setIsLoggedIn(false)}
//               className="text-[#25D366] border border-[#25D366]"
//             >
//               Logout
//             </Button>
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <h1 className="text-3xl font-bold text-[#075E54] mb-2">
//           Welcome back, John! 👋
//         </h1>
//         <p className="text-gray-700 mb-8">
//           Here's what's happening with your connected businesses today.
//         </p>

//         {/* Key Metrics */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
//           <Card className="bg-white shadow-lg border-l-4 border-[#25D366]">
//             <CardContent className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <div className="text-sm font-medium text-gray-600">
//                 Connected Businesses
//               </div>
//             </CardContent>
//             <CardContent>
//               <div className="text-3xl font-bold text-[#075E54]">
//                 {connectedBusinesses}
//               </div>
//               <div className="flex items-center mt-2 text-[#25D366]">
//                 <TrendingUp className="h-4 w-4 mr-1" />
//                 <span className="text-sm">+1 this month</span>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-white shadow-lg border-l-4 border-[#25D366]">
//             <CardContent className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <div className="text-sm font-medium text-gray-600">
//                 Response Rate
//               </div>
//             </CardContent>
//             <CardContent>
//               <div className="text-3xl font-bold text-[#075E54]">
//                 {responseRate}%
//               </div>
//               <div className="flex items-center mt-2 text-[#25D366]">
//                 <TrendingUp className="h-4 w-4 mr-1" />
//                 <span className="text-sm">+3% this week</span>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Your Businesses */}
//         <Card className="bg-white shadow-lg">
//           <CardContent>
//             <div className="font-medium text-lg text-[#075E54]">
//               Your Connected Businesses
//             </div>
//             <div className="text-sm text-gray-500 mb-4">
//               Manage and monitor your AI-powered business bots.
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {businesses.map((biz, i) => (
//                 <div
//                   key={`${biz.id}-${i}`}
//                   className="p-4 border rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition"
//                 >
//                   <div className="flex items-center justify-between mb-2">
//                     <h3 className="font-medium text-[#075E54]">{biz.name}</h3>
//                     <Badge className="bg-[#25D366] text-white">Active</Badge>
//                   </div>
//                   <p className="text-sm text-gray-600 mb-2">
//                     {biz.whatsapp_number}
//                   </p>
//                   <div className="text-sm text-gray-700">
//                     <span className="font-medium">0</span> conversations
//                   </div>
//                 </div>
//               ))}
//               <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
//                 <Button
//                   className="h-full w-full flex-col gap-2 text-[#25D366]"
//                   onClick={handleAddBusiness}
//                 >
//                   <Plus className="h-8 w-8" />
//                   <span>Add Business</span>
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { Card, CardContent, Badge } from "@mui/material"
// import {
//   TrendingUp,
//   Person,
//   X,
//   Chat as ChatIcon,
//   Login as LogIn,
//   Add as Plus,
//   Menu,
//   Phone,
//   Message,
//   Analytics,
//   Settings,
//   CheckCircle,
//   Schedule,
// } from "@mui/icons-material"
// import { useLocation, useNavigate } from "react-router-dom"
// import Signup from "./Signup"
// import Login from "./Login"
// import KnowledgeEditor from "./kb"

// interface DashboardProps {
//   // onBusinessSelect: (businessId: string) => void
//   // onNavigate: (page: "dashboard" | "kb-editor", data?: any) => void
//   newBusiness?: Business
// }

// interface Business {
//   id: string
//   name: string
//   whatsapp_number: string
// }

// type Page = "login" | "signup" | "dashboard" | "kb-editor"

// const Dashboard: React.FC<DashboardProps> = () => {

//   const location = useLocation();
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [businesses, setBusinesses] = useState<Business[]>([])
//   const [currentPage, setCurrentPage] = useState<Page>("dashboard")
//   const [editingBusiness, setEditingBusiness] = useState<any>(null);

//   const connectedBusinesses = businesses.length
//   const responseRate = 94

//   const navigateTo = (page: Page, data?: any) => {
//     console.log("Navigating to:", page, "with data:", data)
//     setCurrentPage(page)
//     if (page === "kb-editor" && data) {
//       setEditingBusiness(data); // Set business for editing
//     } else {
//       setEditingBusiness(null); // Clear editing state if not editing
//     }

//     if (page === "dashboard" && data) {
//       setBusinesses(data) // This data could be a new or updated business
//     } else {
//       setBusinesses([]); // Clear new business state if not coming from KB editor
//     }
//   }

//   useEffect(() => {
//     fetch("/api/businesses")
//       .then((res) => res.json())
//       .then((data) => setBusinesses(data))
//       .catch((err) => console.error("Failed to fetch businesses:", err));
//   }, []);

//   useEffect(() => {
//     if (location.state?.newBusiness) {
//       setBusinesses((prev) => [...prev, location.state.newBusiness]);
//     }
//   }, [location.state]);

//   const navigate = useNavigate();

//   const handleAddBusiness = () => {
//     console.log("Add business clicked")
//     // if kb saved successfully
//     navigate("/kb-editor")
//   }

//   const handleLogin = () => {
//     // setIsLoggedIn(true)
//     setCurrentPage("login")
//     if (currentPage === "login") {
//       setIsLoggedIn(true)
//     }
//   }

//   const handleSignup = () => {
//     setIsLoggedIn(true)
//     setCurrentPage("dashboard")
//   }

//   const handleLogout = () => {
//     // if (!isLoggedIn) return;
//     // if (currentPage === "dashboard" && isLoggedIn) {
//       setIsLoggedIn(false)
//       setCurrentPage("dashboard")
//     // }
//     // setBusinesses([])
//     // setEditingBusiness(null)
//   }

//   // Floating WhatsApp Icons Animation
//   const FloatingIcons = () => (
//     <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
//       {[...Array(15)].map((_, i) => (
//         <div
//           key={i}
//           className="absolute animate-float opacity-10"
//           style={{
//             top: `${Math.random() * 100}%`,
//             left: `${Math.random() * 100}%`,
//             animationDelay: `${i * 0.8}s`,
//             animationDuration: `${4 + Math.random() * 2}s`,
//           }}
//         >
//           <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center">
//             <ChatIcon className="w-5 h-5 text-white" />
//           </div>
//         </div>
//       ))}
//     </div>
//   )

//   if (!isLoggedIn) {
//     return (
//       <div className="relative min-h-screen bg-gradient-to-br from-[#075E54] via-[#128C7E] to-[#25D366] overflow-hidden">
//         <FloatingIcons />

//         {currentPage === "login" && (
//         <Login 
//           onNavigate={navigateTo} 
//           onLogin={handleLogin}
//         />
//       )}
      
//       {currentPage === "signup" && (
//         <Signup 
//           // onNavigate={navigateTo} 
//           // onSignup={handleSignup}
//         />
//       )}

// {currentPage === "kb-editor" && isLoggedIn && (
//         <KnowledgeEditor 
//           // onNavigate={navigateTo} 
//           initialBusinessData={editingBusiness} // Pass the business data for editing
//         />
//       )}

//        {currentPage === "dashboard"  && (
//         <div>
//          {/* Navigation */}
//          <nav className="relative z-20 bg-white/95 backdrop-blur-lg border-b border-white/20 shadow-lg">
//          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
//            <div className="flex justify-between items-center h-14 sm:h-16">
//              <div className="flex items-center space-x-2 sm:space-x-3">
//                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg">
//                  <ChatIcon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
//                </div>
//                <div>
//                  <span className="text-lg sm:text-xl font-bold text-[#075E54]">ReplyMate AI</span>
//                  <div className="text-xs text-gray-500 hidden sm:block">WhatsApp Business Integration</div>
//                </div>
//              </div>

//              <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
//                <button className="text-[#075E54] hover:text-[#25D366] font-medium px-3 py-2 text-sm xl:text-base">
//                  Features
//                </button>
//                <button className="text-[#075E54] hover:text-[#25D366] font-medium px-3 py-2 text-sm xl:text-base">
//                  Pricing
//                </button>
//                <button className="text-[#075E54] hover:text-[#25D366] font-medium px-3 py-2 text-sm xl:text-base">
//                  About
//                </button>
//                <button
//                  className="flex items-center gap-2 text-[#075E54] border border-[#25D366] rounded-full px-3 py-2 xl:px-4 hover:bg-[#25D366] hover:text-white transition-all text-sm xl:text-base"
//                  onClick={handleLogin}
//                >
//                  <LogIn className="h-3 w-3 xl:h-4 xl:w-4" />
//                  Login
//                </button>
//                <button className="flex items-center gap-2 bg-[#25D366] text-white rounded-full px-4 py-2 xl:px-6 hover:bg-[#128C7E] transition-all shadow-lg text-sm xl:text-base">
//                  Get Started Free
//                </button>
//              </div>

//              <div className="lg:hidden">
//                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 touch-manipulation">
//                  {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
//                </button>
//              </div>
//            </div>
//          </div>

//          {isMenuOpen && (
//            <div className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-white/20">
//              <div className="px-3 sm:px-4 py-4 space-y-2">
//                <button className="w-full text-left text-[#075E54] py-3 px-4 rounded-lg hover:bg-gray-50 touch-manipulation">
//                  Features
//                </button>
//                <button className="w-full text-left text-[#075E54] py-3 px-4 rounded-lg hover:bg-gray-50 touch-manipulation">
//                  Pricing
//                </button>
//                <button className="w-full text-left text-[#075E54] py-3 px-4 rounded-lg hover:bg-gray-50 touch-manipulation">
//                  About
//                </button>
//                <button
//                  className="w-full text-left gap-2 border border-[#25D366] rounded-full py-3 px-4 flex items-center touch-manipulation"
//                  onClick={handleLogin}
//                >
//                  <LogIn className="h-4 w-4" /> Login
//                </button>
//                <button className="w-full text-left gap-2 bg-[#25D366] text-white rounded-full py-3 px-4 flex items-center touch-manipulation">
//                  Get Started Free
//                </button>
//              </div>
//            </div>
//          )}
//        </nav>

//        {/* Hero Section */}
//        <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-10 sm:py-16 lg:py-20 text-center">
//          <div className="mb-6 sm:mb-8">
//            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-2 sm:px-4 text-white mb-4 sm:mb-6">
//              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#25D366]" />
//              <span className="text-xs sm:text-sm font-medium">Trusted by 10,000+ businesses</span>
//            </div>
//          </div>

//          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
//            Transform Your
//            <span className="block text-[#25D366] drop-shadow-lg">WhatsApp Business</span>
//            <span className="block">with AI Power</span>
//          </h1>

//          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-10 lg:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
//            Automate customer conversations, boost response rates by 300%, and grow your business with intelligent
//            WhatsApp bots that understand your customers perfectly.
//          </p>

//          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-10 sm:mb-12 lg:mb-16 px-4">
//            <button
//              className="text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-4 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#128C7E] transition-all transform hover:scale-105 flex items-center gap-3 justify-center touch-manipulation"
//              onClick={handleLogin}
//            >
//              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center">
//                <ChatIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[#25D366]" />
//              </div>
//              <span className="whitespace-nowrap">Start Free Trial - No Credit Card</span>
//            </button>
//            <button className="text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-4 border-2 border-white text-white rounded-full hover:bg-white hover:text-[#075E54] transition-all touch-manipulation">
//              Watch 2-Min Demo
//            </button>
//          </div>

//          {/* Stats Cards */}
//          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto px-4">
//            <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
//              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">10,000+</div>
//              <div className="text-sm sm:text-base text-white/80">Businesses Connected</div>
//              <div className="text-[#25D366] text-xs sm:text-sm mt-1 sm:mt-2">↗ Growing daily</div>
//            </div>
//            <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
//              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">95%</div>
//              <div className="text-sm sm:text-base text-white/80">Average Response Rate</div>
//              <div className="text-[#25D366] text-xs sm:text-sm mt-1 sm:mt-2">↗ 3x industry average</div>
//            </div>
//            <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 sm:col-span-2 lg:col-span-1">
//              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">24/7</div>
//              <div className="text-sm sm:text-base text-white/80">Automated Support</div>
//              <div className="text-[#25D366] text-xs sm:text-sm mt-1 sm:mt-2">↗ Never miss a customer</div>
//            </div>
//          </div>
//        </div>

//        {/* Features Preview */}
//        <div className="relative z-10 bg-white/5 backdrop-blur-sm py-12 sm:py-16 lg:py-20">
//          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
//            <div className="text-center mb-10 sm:mb-12 lg:mb-16">
//              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
//                Why Choose ReplyMate AI?
//              </h2>
//              <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto px-4">
//                Built specifically for WhatsApp Business with enterprise-grade AI
//              </p>
//            </div>

//            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//              {[
//                { icon: ChatIcon, title: "Smart Conversations", desc: "AI understands context and intent" },
//                { icon: Schedule, title: "24/7 Availability", desc: "Never miss a customer inquiry" },
//                { icon: Analytics, title: "Deep Analytics", desc: "Track performance and optimize" },
//                { icon: Settings, title: "Easy Setup", desc: "Connect in under 5 minutes" },
//              ].map((feature, i) => (
//                <div
//                  key={i}
//                  className="bg-white/10 backdrop-blur-lg rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all"
//                >
//                  <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#25D366] mb-3 sm:mb-4" />
//                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">{feature.title}</h3>
//                  <p className="text-white/70 text-xs sm:text-sm">{feature.desc}</p>
//                </div>
//              ))}
//            </div>
//          </div>
//        </div>
//        </div>
//        )}
//       </div>
//     )
//   }

//   // Logged-in Dashboard
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#075E54] via-[#128C7E] to-[#25D366]">
//       <FloatingIcons />

//       {/* Navigation */}
//       <nav className="relative z-20 bg-white/95 backdrop-blur-lg border-b border-white/20 shadow-lg">
//         <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 flex justify-between items-center h-14 sm:h-16">
//           <div className="flex items-center space-x-2 sm:space-x-3">
//             <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg">
//               <ChatIcon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
//             </div>
//             <div>
//               <span className="text-lg sm:text-xl font-bold text-[#075E54]">ReplyMate AI</span>
//               <div className="text-xs text-gray-500 hidden sm:block">Dashboard</div>
//             </div>
//           </div>
//           <div className="flex items-center space-x-2 sm:space-x-4">
//             <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#25D366] rounded-full flex items-center justify-center">
//               <Person className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
//             </div>
//             <button
//               onClick={handleLogout}
//               className="text-[#075E54] hover:text-[#25D366] font-medium px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-base touch-manipulation"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </nav>

//       <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
//         {/* Welcome Section */}
//         <div className="mb-6 sm:mb-8">
//           <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20">
//             <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">
//               Welcome back, John! 👋
//             </h1>
//             <p className="text-white/80 text-sm sm:text-base lg:text-lg">
//               Your WhatsApp AI assistants are working hard. Here's today's overview.
//             </p>
//           </div>
//         </div>

//         {/* Key Metrics */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-12">
//           <Card className="bg-white/95 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all">
//             <CardContent className="p-4 sm:p-6">
//               <div className="flex items-center justify-between mb-3 sm:mb-4">
//                 <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#25D366]/10 rounded-full flex items-center justify-center">
//                   <ChatIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#25D366]" />
//                 </div>
//                 <Badge className="bg-green-100 text-green-800 text-xs">Active</Badge>
//               </div>
//               <div className="text-2xl sm:text-3xl font-bold text-[#075E54] mb-1">{connectedBusinesses}</div>
//               <div className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">Connected Businesses</div>
//               <div className="flex items-center">
//                 <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-[#25D366] mr-1" />
//                 <span className="text-xs sm:text-sm text-[#25D366] font-medium">+1 this month</span>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-white/95 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all">
//             <CardContent className="p-4 sm:p-6">
//               <div className="flex items-center justify-between mb-3 sm:mb-4">
//                 <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                   <Analytics className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
//                 </div>
//                 <Badge className="bg-blue-100 text-blue-800 text-xs">Excellent</Badge>
//               </div>
//               <div className="text-2xl sm:text-3xl font-bold text-[#075E54] mb-1">{responseRate}%</div>
//               <div className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">Response Rate</div>
//               <div className="flex items-center">
//                 <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-[#25D366] mr-1" />
//                 <span className="text-xs sm:text-sm text-[#25D366] font-medium">+3% this week</span>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-white/95 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all">
//             <CardContent className="p-4 sm:p-6">
//               <div className="flex items-center justify-between mb-3 sm:mb-4">
//                 <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center">
//                   <Message className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
//                 </div>
//                 <Badge className="bg-purple-100 text-purple-800 text-xs">Today</Badge>
//               </div>
//               <div className="text-2xl sm:text-3xl font-bold text-[#075E54] mb-1">247</div>
//               <div className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">Messages Handled</div>
//               <div className="flex items-center">
//                 <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-[#25D366] mr-1" />
//                 <span className="text-xs sm:text-sm text-[#25D366] font-medium">+15% vs yesterday</span>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-white/95 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all">
//             <CardContent className="p-4 sm:p-6">
//               <div className="flex items-center justify-between mb-3 sm:mb-4">
//                 <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center">
//                   <Schedule className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
//                 </div>
//                 <Badge className="bg-orange-100 text-orange-800 text-xs">Avg</Badge>
//               </div>
//               <div className="text-2xl sm:text-3xl font-bold text-[#075E54] mb-1">1.2s</div>
//               <div className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">Response Time</div>
//               <div className="flex items-center">
//                 <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-[#25D366] mr-1" />
//                 <span className="text-xs sm:text-sm text-[#25D366] font-medium">Lightning fast</span>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Your Businesses */}
//         <Card className="bg-white/95 backdrop-blur-lg border-0 shadow-xl">
//           <CardContent className="p-4 sm:p-6 lg:p-8">
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
//               <div>
//                 <h2 className="text-xl sm:text-2xl font-bold text-[#075E54] mb-1 sm:mb-2">Your WhatsApp Businesses</h2>
//                 <p className="text-gray-600 text-sm sm:text-base">Manage and monitor your AI-powered business bots</p>
//               </div>
//               <button
//                 onClick={handleAddBusiness}
//                 className="bg-[#25D366] text-white rounded-full px-4 py-2 sm:px-6 sm:py-3 hover:bg-[#128C7E] transition-all shadow-lg flex items-center gap-2 justify-center sm:justify-start touch-manipulation text-sm sm:text-base"
//               >
//                 <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
//                 Add Business
//               </button>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//               {businesses.map((biz, i) => (
//                 <div
//                   key={`${biz.id}-${i}`}
//                   className="group p-4 sm:p-6 border-2 border-gray-100 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white to-gray-50 hover:border-[#25D366] hover:shadow-xl transition-all duration-300 cursor-pointer touch-manipulation"
//                 >
//                   <div className="flex items-center justify-between mb-3 sm:mb-4">
//                     <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
//                       <ChatIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//                     </div>
//                     <Badge className="bg-green-100 text-green-800 border border-green-200 text-xs">
//                       <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
//                       Active
//                     </Badge>
//                   </div>

//                   <h3 className="text-base sm:text-lg font-bold text-[#075E54] mb-2 group-hover:text-[#25D366] transition-colors">
//                     {biz.name}
//                   </h3>

//                   <div className="flex items-center gap-2 text-gray-600 mb-3 sm:mb-4">
//                     <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
//                     <span className="text-xs sm:text-sm">{biz.whatsapp_number}</span>
//                   </div>

//                   <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
//                     <div className="bg-blue-50 rounded-lg p-2 sm:p-3">
//                       <div className="text-lg sm:text-xl font-bold text-blue-600">0</div>
//                       <div className="text-xs text-gray-600">Conversations</div>
//                     </div>
//                     <div className="bg-green-50 rounded-lg p-2 sm:p-3">
//                       <div className="text-lg sm:text-xl font-bold text-green-600">100%</div>
//                       <div className="text-xs text-gray-600">Uptime</div>
//                     </div>
//                   </div>

//                   <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
//                     <div className="flex items-center justify-between text-xs sm:text-sm">
//                       <span className="text-gray-500">Last active:</span>
//                       <span className="text-[#25D366] font-medium">Just now</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}

//               {/* Add Business Card */}
//               <div
//                 onClick={handleAddBusiness}
//                 className="group p-4 sm:p-6 border-2 border-dashed border-gray-300 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center text-center hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all duration-300 cursor-pointer min-h-[200px] sm:min-h-[280px] touch-manipulation"
//               >
//                 <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#25D366] group-hover:scale-110 transition-all">
//                   <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 group-hover:text-white" />
//                 </div>
//                 <h3 className="text-base sm:text-lg font-semibold text-gray-600 group-hover:text-[#25D366] mb-1 sm:mb-2">
//                   Connect New Business
//                 </h3>
//                 <p className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-600">
//                   Set up WhatsApp AI in under 5 minutes
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

// export default Dashboard









"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Badge } from "@mui/material";
import {
  // TrendingUp,
  Person,
  X,
  Chat as ChatIcon,
  Login as LogIn,
  Add as Plus,
  Menu,
  Phone,
  // Message,
  Analytics,
  Settings,
  CheckCircle,
  Schedule,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface Business {
  id: string;
  name: string;
  whatsapp_number: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [businesses, setBusinesses] = useState<Business[]>([]);

  const API_BASE =
    import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL !== ""
      ? import.meta.env.VITE_API_URL
      : "/api"; // fallback to vite proxy in dev

  useEffect(() => {
    fetch(`${API_BASE}/businesses`)
      .then((res) => res.json())
      .then((data) => setBusinesses(data))
      .catch((err) => console.error("Failed to fetch businesses:", err));
  }, [API_BASE]);

  const handleLoginClick = () => navigate("/login");
  const handleSignupClick = () => navigate("/signup");
  const handleAddBusiness = () => navigate("/kb-editor");
  const handleLogout = () => setIsLoggedIn(false);

  const FloatingIcons = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-10"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${4 + Math.random() * 2}s`,
          }}
        >
          <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center">
            <ChatIcon className="w-5 h-5 text-white" />
          </div>
        </div>
      ))}
    </div>
  );

  if (!isLoggedIn) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-[#075E54] via-[#128C7E] to-[#25D366] overflow-hidden">
        <FloatingIcons />

        {/* Navigation */}
        <nav className="relative z-20 bg-white/95 backdrop-blur-lg border-b border-white/20 shadow-lg">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
            <div className="flex justify-between items-center h-14 sm:h-16">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg">
                  <ChatIcon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-bold text-[#075E54]">ReplyMate AI</span>
                  <div className="text-xs text-gray-500 hidden sm:block">
                    WhatsApp Business Integration
                  </div>
                </div>
              </div>

              <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
                <button className="text-[#075E54] hover:text-[#25D366] font-medium px-3 py-2">
                  Features
                </button>
                <button className="text-[#075E54] hover:text-[#25D366] font-medium px-3 py-2">
                  Pricing
                </button>
                <button className="text-[#075E54] hover:text-[#25D366] font-medium px-3 py-2">
                  About
                </button>
                <button
                  className="flex items-center gap-2 text-[#075E54] border border-[#25D366] rounded-full px-3 py-2 hover:bg-[#25D366] hover:text-white transition-all"
                  onClick={handleLoginClick}
                >
                  <LogIn className="h-3 w-3" />
                  Login
                </button>
                <button
                  className="flex items-center gap-2 bg-[#25D366] text-white rounded-full px-4 py-2 hover:bg-[#128C7E] transition-all shadow-lg"
                  onClick={handleSignupClick}
                >
                  Get Started Free
                </button>
              </div>

              <div className="lg:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 touch-manipulation"
                >
                  {isMenuOpen ? (
                    <X className="h-5 w-5 sm:h-6 sm:w-6" />
                  ) : (
                    <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-white/20">
              <div className="px-3 sm:px-4 py-4 space-y-2">
                <button className="w-full text-left text-[#075E54] py-3 px-4 rounded-lg hover:bg-gray-50">
                  Features
                </button>
                <button className="w-full text-left text-[#075E54] py-3 px-4 rounded-lg hover:bg-gray-50">
                  Pricing
                </button>
                <button className="w-full text-left text-[#075E54] py-3 px-4 rounded-lg hover:bg-gray-50">
                  About
                </button>
                <button
                  className="w-full text-left gap-2 border border-[#25D366] rounded-full py-3 px-4 flex items-center"
                  onClick={handleLoginClick}
                >
                  <LogIn className="h-4 w-4" /> Login
                </button>
                <button
                  className="w-full text-left gap-2 bg-[#25D366] text-white rounded-full py-3 px-4 flex items-center"
                  onClick={handleSignupClick}
                >
                  Get Started Free
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-10 sm:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Transform Your <span className="text-[#25D366]">WhatsApp Business</span> with AI Power
          </h1>
          <p className="text-lg text-white/80 max-w-3xl mx-auto mb-6">
            Automate customer conversations, boost response rates, and grow your business with intelligent WhatsApp bots.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="bg-[#25D366] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#128C7E] transition"
              onClick={handleLoginClick}
            >
              Start Free Trial
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-[#075E54] transition">
              Watch Demo
            </button>
          </div>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#25D366]">10,000+</div>
              <div className="text-gray-600">Businesses Connected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-700">95%</div>
              <div className="text-gray-600">Average Response Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-700">24/7</div>
              <div className="text-gray-600">Automated Support</div>
            </div>
          </div>
        </div>


        {/* Features Preview */}
       <div className="relative z-10 bg-white/5 backdrop-blur-sm py-12 sm:py-16 lg:py-20">
         <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
           <div className="text-center mb-10 sm:mb-12 lg:mb-16">
             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
               Why Choose ReplyMate AI?
             </h2>
             <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto px-4">
               Built specifically for WhatsApp Business with enterprise-grade AI
             </p>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
             {[
               { icon: ChatIcon, title: "Smart Conversations", desc: "AI understands context and intent" },
               { icon: Schedule, title: "24/7 Availability", desc: "Never miss a customer inquiry" },
               { icon: Analytics, title: "Deep Analytics", desc: "Track performance and optimize" },
               { icon: Settings, title: "Easy Setup", desc: "Connect in under 5 minutes" },
             ].map((feature, i) => (
               <div
                 key={i}
                 className="bg-white/10 backdrop-blur-lg rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all"
               >
                 <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#25D366] mb-3 sm:mb-4" />
                 <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">{feature.title}</h3>
                 <p className="text-white/70 text-xs sm:text-sm">{feature.desc}</p>
               </div>
             ))}
           </div>
         </div>
       </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#075E54] via-[#128C7E] to-[#25D366]">
      <FloatingIcons />

      {/* Nav */}
      <nav className="relative z-20 bg-white/95 backdrop-blur-lg border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg">
              <ChatIcon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold text-[#075E54]">ReplyMate AI</span>
              <div className="text-xs text-gray-500 hidden sm:block">Dashboard</div>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#25D366] rounded-full flex items-center justify-center">
              <Person className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
            </div>
            <button
              onClick={handleLogout}
              className="text-[#075E54] hover:text-[#25D366] font-medium px-2 py-1 sm:px-4 sm:py-2"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Businesses */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-white mb-6">Your WhatsApp Businesses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {businesses.map((biz, i) => (
            <div
              key={`${biz.id}-${i}`}
              className="group p-4 sm:p-6 border-2 border-gray-100 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white to-gray-50 hover:border-[#25D366] hover:shadow-xl transition-all duration-300 touch-manipulation"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <ChatIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <Badge className="bg-green-100 text-green-800 border border-green-200 text-xs">
                  <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                  Active
                </Badge>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#075E54] mb-2 group-hover:text-[#25D366] transition-colors">
                {biz.name}
              </h3>

              <div className="flex items-center gap-2 text-gray-600 mb-3 sm:mb-4">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">{biz.whatsapp_number}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
                <div className="bg-blue-50 rounded-lg p-2 sm:p-3">
                  <div className="text-lg sm:text-xl font-bold text-blue-600">0</div>
                  <div className="text-xs text-gray-600">Conversations</div>
                </div>
                <div className="bg-green-50 rounded-lg p-2 sm:p-3">
                  <div className="text-lg sm:text-xl font-bold text-green-600">100%</div>
                  <div className="text-xs text-gray-600">Uptime</div>
                </div>
              </div>

              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 flex justify-between items-center">
                <div className="flex flex-col text-xs sm:text-sm">
                  <span className="text-gray-500">Last active:</span>
                  <span className="text-[#25D366] font-medium">Just now</span>
                </div>
                <button
                  onClick={() => navigate(`/kb-editor/${biz.id}`, { state: { business: biz } })}
                  className="px-3 py-1 bg-[#25D366] text-white rounded-full text-xs sm:text-sm hover:bg-[#128C7E] transition"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}

          {/* Add Business Card */}
          <div
            onClick={handleAddBusiness}
            className="group p-4 sm:p-6 border-2 border-dashed border-gray-300 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center text-center hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all duration-300 cursor-pointer min-h-[200px] sm:min-h-[280px] touch-manipulation"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#25D366] group-hover:scale-110 transition-all">
              <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 group-hover:text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-600 group-hover:text-[#25D366] mb-1 sm:mb-2">
              Connect New Business
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-600">
              Set up WhatsApp AI in under 5 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
