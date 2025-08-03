"use client";

import type React from "react";
import {
  // Grid,
  Card,
  CardContent,
  // Typography,
  // Box,
  // Chip,
  // Avatar,
  // List,
  // ListItem,
  // ListItemAvatar,
  // ListItemText,
  Button,
  // CardActions,
  // LinearProgress,
  Menu,
  Badge,
  // CardHeader,
} from "@mui/material";
import {
  TrendingUp,
  // TrendingDown,
  // Business,
  // Chat,
  // Speed,
  Person,
  // Add,
  // Edit,
  // Analytics,
  X,
  Chat as ChatIcon,
  Login as LogIn,
  Add as Plus,
} from "@mui/icons-material";
// import ChatIcon from '@mui/icons-material/Chat';
// import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface DashboardProps {
  onBusinessSelect: (businessId: string) => void;
}

// Mock data - replace with actual API calls
// const mockBusinesses = [
//   {
//     id: "1",
//     name: "Tech Solutions Inc",
//     whatsappNumber: "+1234567890",
//     status: "active",
//     conversations: 156,
//     responseRate: 94,
//     avgResponseTime: "2.3 min",
//     lastActivity: "5 minutes ago",
//   },
//   {
//     id: "2",
//     name: "E-commerce Store",
//     whatsappNumber: "+1234567891",
//     status: "active",
//     conversations: 89,
//     responseRate: 87,
//     avgResponseTime: "3.1 min",
//     lastActivity: "12 minutes ago",
//   },
//   {
//     id: "3",
//     name: "Restaurant Chain",
//     whatsappNumber: "+1234567892",
//     status: "inactive",
//     conversations: 234,
//     responseRate: 91,
//     avgResponseTime: "1.8 min",
//     lastActivity: "2 hours ago",
//   },
// ];

// const recentActivities = [
//   {
//     business: "Tech Solutions Inc",
//     activity: "New conversation started",
//     time: "2 min ago",
//   },
//   {
//     business: "E-commerce Store",
//     activity: "Knowledge base updated",
//     time: "15 min ago",
//   },
//   {
//     business: "Restaurant Chain",
//     activity: "AI response sent",
//     time: "1 hour ago",
//   },
//   {
//     business: "Tech Solutions Inc",
//     activity: "Customer inquiry resolved",
//     time: "2 hours ago",
//   },
// ];

const Dashboard: React.FC<DashboardProps> = () => {
  // const totalConversations = mockBusinesses.reduce(
  //   (sum, b) => sum + b.conversations,
  //   0
  // );
  // const avgResponseRate = Math.round(
  //   mockBusinesses.reduce((sum, b) => sum + b.responseRate, 0) /
  //     mockBusinesses.length
  // );
  // const activeBusinesses = mockBusinesses.filter(
  //   (b) => b.status === "active"
  // ).length;

  // const navigate = useNavigate();

  // return (
  //   <div className=" mx-auto flex justify-center w-[90%]">
  //     <div className=" ">
  //       <Typography
  //         variant="h4"
  //         sx={{ mb: 3, fontWeight: "bold", color: "#333" }}
  //       >
  //         Dashboard
  //       </Typography>

  //       {/* Stats Cards */}
  //       <Grid container spacing={3} sx={{ mb: 4 }}>
  //         <Grid>
  //           <Card sx={{ height: "100%" }}>
  //             <CardContent>
  //               <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
  //                 <Business sx={{ color: "#25D366", mr: 1 }} />
  //                 <Typography variant="h6">Active Businesses</Typography>
  //               </Box>
  //               <Typography
  //                 variant="h3"
  //                 sx={{ fontWeight: "bold", color: "#25D366" }}
  //               >
  //                 {activeBusinesses}
  //               </Typography>
  //               <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
  //                 <TrendingUp
  //                   sx={{ color: "#4caf50", fontSize: 16, mr: 0.5 }}
  //                 />
  //                 <Typography variant="body2" color="success.main">
  //                   +2 this month
  //                 </Typography>
  //               </Box>
  //             </CardContent>
  //           </Card>
  //         </Grid>

  //         <Grid>
  //           <Card sx={{ height: "100%" }}>
  //             <CardContent>
  //               <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
  //                 <Chat sx={{ color: "#25D366", mr: 1 }} />
  //                 <Typography variant="h6">Total Conversations</Typography>
  //               </Box>
  //               <Typography
  //                 variant="h3"
  //                 sx={{ fontWeight: "bold", color: "#25D366" }}
  //               >
  //                 {totalConversations}
  //               </Typography>
  //               <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
  //                 <TrendingUp
  //                   sx={{ color: "#4caf50", fontSize: 16, mr: 0.5 }}
  //                 />
  //                 <Typography variant="body2" color="success.main">
  //                   +15% this week
  //                 </Typography>
  //               </Box>
  //             </CardContent>
  //           </Card>
  //         </Grid>

  //         <Grid>
  //           <Card sx={{ height: "100%" }}>
  //             <CardContent>
  //               <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
  //                 <Speed sx={{ color: "#25D366", mr: 1 }} />
  //                 <Typography variant="h6">Avg Response Rate</Typography>
  //               </Box>
  //               <Typography
  //                 variant="h3"
  //                 sx={{ fontWeight: "bold", color: "#25D366" }}
  //               >
  //                 {avgResponseRate}%
  //               </Typography>
  //               <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
  //                 <TrendingDown
  //                   sx={{ color: "#f44336", fontSize: 16, mr: 0.5 }}
  //                 />
  //                 <Typography variant="body2" color="error.main">
  //                   -2% this week
  //                 </Typography>
  //               </Box>
  //             </CardContent>
  //           </Card>
  //         </Grid>

  //         <Grid>
  //           <Card sx={{ height: "100%" }}>
  //             <CardContent>
  //               <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
  //                 <Person sx={{ color: "#25D366", mr: 1 }} />
  //                 <Typography variant="h6">Active Users</Typography>
  //               </Box>
  //               <Typography
  //                 variant="h3"
  //                 sx={{ fontWeight: "bold", color: "#25D366" }}
  //               >
  //                 1,234
  //               </Typography>
  //               <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
  //                 <TrendingUp
  //                   sx={{ color: "#4caf50", fontSize: 16, mr: 0.5 }}
  //                 />
  //                 <Typography variant="body2" color="success.main">
  //                   +8% this month
  //                 </Typography>
  //               </Box>
  //             </CardContent>
  //           </Card>
  //         </Grid>
  //       </Grid>

  //       <Grid container spacing={3}>
  //         {/* Business Cards */}
  //         <Grid>
  //           <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
  //             Your Businesses
  //           </Typography>
  //           <Grid container spacing={2}>
  //             {mockBusinesses.map((business) => (
  //               <Grid key={business.id}>
  //                 <Card
  //                   sx={{
  //                     cursor: "pointer",
  //                     transition: "all 0.2s",
  //                     "&:hover": {
  //                       transform: "translateY(-2px)",
  //                       boxShadow: 3,
  //                     },
  //                   }}
  //                   onClick={() => onBusinessSelect(business.id)}
  //                 >
  //                   <CardContent>
  //                     <Box
  //                       sx={{
  //                         display: "flex",
  //                         justifyContent: "space-between",
  //                         alignItems: "flex-start",
  //                         mb: 2,
  //                       }}
  //                     >
  //                       <Typography variant="h6" sx={{ fontWeight: "bold" }}>
  //                         {business.name}
  //                       </Typography>
  //                       <Chip
  //                         label={business.status}
  //                         color={
  //                           business.status === "active" ? "success" : "default"
  //                         }
  //                         size="small"
  //                       />
  //                     </Box>

  //                     <Typography
  //                       variant="body2"
  //                       color="text.secondary"
  //                       sx={{ mb: 2 }}
  //                     >
  //                       {business.whatsappNumber}
  //                     </Typography>

  //                     <Box sx={{ mb: 2 }}>
  //                       <Box
  //                         sx={{
  //                           display: "flex",
  //                           justifyContent: "space-between",
  //                           mb: 1,
  //                         }}
  //                       >
  //                         <Typography variant="body2">Response Rate</Typography>
  //                         <Typography
  //                           variant="body2"
  //                           sx={{ fontWeight: "bold" }}
  //                         >
  //                           {business.responseRate}%
  //                         </Typography>
  //                       </Box>
  //                       <LinearProgress
  //                         variant="determinate"
  //                         value={business.responseRate}
  //                         sx={{ height: 6, borderRadius: 3 }}
  //                       />
  //                     </Box>

  //                     <Grid container spacing={2} sx={{ mb: 2 }}>
  //                       <Grid>
  //                         <Typography variant="body2" color="text.secondary">
  //                           Conversations
  //                         </Typography>
  //                         <Typography variant="h6" sx={{ fontWeight: "bold" }}>
  //                           {business.conversations}
  //                         </Typography>
  //                       </Grid>
  //                       <Grid >
  //                         <Typography variant="body2" color="text.secondary">
  //                           Avg Response
  //                         </Typography>
  //                         <Typography variant="h6" sx={{ fontWeight: "bold" }}>
  //                           {business.avgResponseTime}
  //                         </Typography>
  //                       </Grid>
  //                     </Grid>

  //                     <Typography variant="body2" color="text.secondary">
  //                       Last activity: {business.lastActivity}
  //                     </Typography>
  //                   </CardContent>

  //                   <CardActions>
  //                     <Button size="small" startIcon={<Edit />}>
  //                       Edit
  //                     </Button>
  //                     <Button size="small" startIcon={<Analytics />}>
  //                       Analytics
  //                     </Button>
  //                   </CardActions>
  //                 </Card>
  //               </Grid>
  //             ))}
  //           </Grid>
  //         </Grid>

  //         {/* Recent Activity */}
  //         <Grid>
  //           <Card sx={{ height: "fit-content" }}>
  //             <CardContent>
  //               <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
  //                 Recent Activity
  //               </Typography>
  //               <List>
  //                 {recentActivities.map((activity, index) => (
  //                   <ListItem key={index} sx={{ px: 0 }}>
  //                     <ListItemAvatar>
  //                       <Avatar sx={{ bgcolor: "#E8F5E8", color: "#25D366" }}>
  //                         <Business />
  //                       </Avatar>
  //                     </ListItemAvatar>
  //                     <ListItemText
  //                       primary={activity.activity}
  //                       secondary={`${activity.business} • ${activity.time}`}
  //                     />
  //                   </ListItem>
  //                 ))}
  //               </List>
  //             </CardContent>
  //           </Card>

  //           {/* Quick Actions */}
  //           <Card sx={{ mt: 3 }}>
  //             <CardContent>
  //               <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
  //                 Quick Actions
  //               </Typography>
  //               <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
  //                 <Button
  //                   onClick={() => navigate("/kb-editor")}
  //                   variant="outlined"
  //                   startIcon={<Add />}
  //                   fullWidth
  //                   sx={{ justifyContent: "flex-start" }}
  //                 >
  //                   Add New Business
  //                 </Button>
  //                 <Button
  //                   variant="outlined"
  //                   startIcon={<Edit />}
  //                   fullWidth
  //                   sx={{ justifyContent: "flex-start" }}
  //                 >
  //                   Update Knowledge Base
  //                 </Button>
  //                 <Button
  //                   variant="outlined"
  //                   startIcon={<Analytics />}
  //                   fullWidth
  //                   sx={{ justifyContent: "flex-start" }}
  //                 >
  //                   View Analytics
  //                 </Button>
  //               </Box>
  //             </CardContent>
  //           </Card>
  //         </Grid>
  //       </Grid>
  //     </div>
  //   </div>
  // );

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Mock data
  const connectedBusinesses = 12
  // const totalConversations = 1847
  const responseRate = 94
  
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <ChatIcon className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">ReplyMate AI</span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4">
                <Button>Features</Button>
                <Button>Pricing</Button>
                <Button>About</Button>
                <Button className="flex items-center gap-2 bg-transparent"
                onClick={() => setIsLoggedIn(true)}>
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
                <Button className="flex items-center gap-2">
                  {/* <UserPlus className="h-4 w-4" /> */}
                  Sign Up
                </Button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" open={false} />}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Button className="w-full justify-start">
                  Features
                </Button>
                <Button className="w-full justify-start">
                  Pricing
                </Button>
                <Button className="w-full justify-start">
                  About
                </Button>
                <Button className="w-full justify-start gap-2 bg-transparent">
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
                <Button className="w-full justify-start gap-2">
                  <Person className="h-4 w-4" />
                  Sign Up
                </Button>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Connect Your Business with
              <span className="text-blue-600"> AI-Powered Bots</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Automate customer conversations, boost response rates, and grow your business with intelligent WhatsApp
              bots that understand your customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="text-lg px-8 py-3">
                Start Free Trial
              </Button>
              <Button className="text-lg px-8 py-3 bg-transparent">
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">10,000+</div>
              <div className="text-gray-600">Businesses Connected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">95%</div>
              <div className="text-gray-600">Average Response Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">24/7</div>
              <div className="text-gray-600">Automated Support</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isLoggedIn) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <ChatIcon className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">ReplyMate AI</span>
            </div>

            <div className="flex items-center space-x-4">
              {/* <Avatar> */}
                {/* <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback> */}
                <Person className="h-6 w-6 text-blue-600" />
              {/* </Avatar> */}
              <Button onClick={() => setIsLoggedIn(false)}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John! 👋</h1>
          <p className="text-gray-600">Here's what's happening with your connected businesses today.</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium text-gray-600">Connected Businesses</div>
              {/* <Building2 className="h-5 w-5 text-blue-600" /> */}
            </CardContent>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{connectedBusinesses}</div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">+2 this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium text-gray-600">Response Rate</div>
              {/* <Bot className="h-5 w-5 text-purple-600" /> */}
            </CardContent>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{responseRate}%</div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">+3% this week</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-gray-200 shadow-sm mb-12">
          {/* Create New Bot */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent>
              <div className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-600" />
                Create New Bot
              </div>
              <div className="text-sm text-gray-500">
                Connect a new business and set up an AI-powered WhatsApp bot in minutes.
              </div>
            </CardContent>
            <CardContent className="space-y-4">
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add New Business
              </Button>
              <div className="text-sm text-gray-500 text-center">Setup takes less than 5 minutes</div>
            </CardContent>
          </Card>
{/*  */}
        </div>

        {/* Your Businesses - Simplified */}
        <div className="mt-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent>
              <div>Your Connected Businesses</div>
              <div className="text-sm text-gray-500">Manage and monitor your AI-powered business bots.</div>
            </CardContent>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Tech Solutions Inc</h3>
                    <Badge className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">+1234567890</p>
                  <div className="text-sm">
                    <span className="font-medium">156</span> conversations
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">E-commerce Store</h3>
                    <Badge className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">+1234567891</p>
                  <div className="text-sm">
                    <span className="font-medium">89</span> conversations
                  </div>
                </div>

                <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <Button className="h-full w-full flex-col gap-2">
                    <Plus className="h-8 w-8 text-gray-400" />
                    <span className="text-gray-500">Add Business</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
};

export default Dashboard;
