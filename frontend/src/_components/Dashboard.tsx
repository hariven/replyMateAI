"use client";

import type React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  CardActions,
  LinearProgress,
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  Business,
  Chat,
  Speed,
  Person,
  Add,
  Edit,
  Analytics,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface DashboardProps {
  onBusinessSelect: (businessId: string) => void;
}

// Mock data - replace with actual API calls
const mockBusinesses = [
  {
    id: "1",
    name: "Tech Solutions Inc",
    whatsappNumber: "+1234567890",
    status: "active",
    conversations: 156,
    responseRate: 94,
    avgResponseTime: "2.3 min",
    lastActivity: "5 minutes ago",
  },
  {
    id: "2",
    name: "E-commerce Store",
    whatsappNumber: "+1234567891",
    status: "active",
    conversations: 89,
    responseRate: 87,
    avgResponseTime: "3.1 min",
    lastActivity: "12 minutes ago",
  },
  {
    id: "3",
    name: "Restaurant Chain",
    whatsappNumber: "+1234567892",
    status: "inactive",
    conversations: 234,
    responseRate: 91,
    avgResponseTime: "1.8 min",
    lastActivity: "2 hours ago",
  },
];

const recentActivities = [
  {
    business: "Tech Solutions Inc",
    activity: "New conversation started",
    time: "2 min ago",
  },
  {
    business: "E-commerce Store",
    activity: "Knowledge base updated",
    time: "15 min ago",
  },
  {
    business: "Restaurant Chain",
    activity: "AI response sent",
    time: "1 hour ago",
  },
  {
    business: "Tech Solutions Inc",
    activity: "Customer inquiry resolved",
    time: "2 hours ago",
  },
];

const Dashboard: React.FC<DashboardProps> = ({ onBusinessSelect }) => {
  const totalConversations = mockBusinesses.reduce(
    (sum, b) => sum + b.conversations,
    0
  );
  const avgResponseRate = Math.round(
    mockBusinesses.reduce((sum, b) => sum + b.responseRate, 0) /
      mockBusinesses.length
  );
  const activeBusinesses = mockBusinesses.filter(
    (b) => b.status === "active"
  ).length;

  const navigate = useNavigate();

  return (
    <div className=" mx-auto flex justify-center w-[90%]">
      <div className=" ">
        <Typography
          variant="h4"
          sx={{ mb: 3, fontWeight: "bold", color: "#333" }}
        >
          Dashboard
        </Typography>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Business sx={{ color: "#25D366", mr: 1 }} />
                  <Typography variant="h6">Active Businesses</Typography>
                </Box>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: "bold", color: "#25D366" }}
                >
                  {activeBusinesses}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <TrendingUp
                    sx={{ color: "#4caf50", fontSize: 16, mr: 0.5 }}
                  />
                  <Typography variant="body2" color="success.main">
                    +2 this month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Chat sx={{ color: "#25D366", mr: 1 }} />
                  <Typography variant="h6">Total Conversations</Typography>
                </Box>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: "bold", color: "#25D366" }}
                >
                  {totalConversations}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <TrendingUp
                    sx={{ color: "#4caf50", fontSize: 16, mr: 0.5 }}
                  />
                  <Typography variant="body2" color="success.main">
                    +15% this week
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Speed sx={{ color: "#25D366", mr: 1 }} />
                  <Typography variant="h6">Avg Response Rate</Typography>
                </Box>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: "bold", color: "#25D366" }}
                >
                  {avgResponseRate}%
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <TrendingDown
                    sx={{ color: "#f44336", fontSize: 16, mr: 0.5 }}
                  />
                  <Typography variant="body2" color="error.main">
                    -2% this week
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Person sx={{ color: "#25D366", mr: 1 }} />
                  <Typography variant="h6">Active Users</Typography>
                </Box>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: "bold", color: "#25D366" }}
                >
                  1,234
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <TrendingUp
                    sx={{ color: "#4caf50", fontSize: 16, mr: 0.5 }}
                  />
                  <Typography variant="body2" color="success.main">
                    +8% this month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {/* Business Cards */}
          <Grid>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
              Your Businesses
            </Typography>
            <Grid container spacing={2}>
              {mockBusinesses.map((business) => (
                <Grid key={business.id}>
                  <Card
                    sx={{
                      cursor: "pointer",
                      transition: "all 0.2s",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: 3,
                      },
                    }}
                    onClick={() => onBusinessSelect(business.id)}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 2,
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          {business.name}
                        </Typography>
                        <Chip
                          label={business.status}
                          color={
                            business.status === "active" ? "success" : "default"
                          }
                          size="small"
                        />
                      </Box>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {business.whatsappNumber}
                      </Typography>

                      <Box sx={{ mb: 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 1,
                          }}
                        >
                          <Typography variant="body2">Response Rate</Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "bold" }}
                          >
                            {business.responseRate}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={business.responseRate}
                          sx={{ height: 6, borderRadius: 3 }}
                        />
                      </Box>

                      <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid>
                          <Typography variant="body2" color="text.secondary">
                            Conversations
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            {business.conversations}
                          </Typography>
                        </Grid>
                        <Grid >
                          <Typography variant="body2" color="text.secondary">
                            Avg Response
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            {business.avgResponseTime}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Typography variant="body2" color="text.secondary">
                        Last activity: {business.lastActivity}
                      </Typography>
                    </CardContent>

                    <CardActions>
                      <Button size="small" startIcon={<Edit />}>
                        Edit
                      </Button>
                      <Button size="small" startIcon={<Analytics />}>
                        Analytics
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Recent Activity */}
          <Grid>
            <Card sx={{ height: "fit-content" }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                  Recent Activity
                </Typography>
                <List>
                  {recentActivities.map((activity, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "#E8F5E8", color: "#25D366" }}>
                          <Business />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={activity.activity}
                        secondary={`${activity.business} • ${activity.time}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                  Quick Actions
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Button
                    onClick={() => navigate("/kb-editor")}
                    variant="outlined"
                    startIcon={<Add />}
                    fullWidth
                    sx={{ justifyContent: "flex-start" }}
                  >
                    Add New Business
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    fullWidth
                    sx={{ justifyContent: "flex-start" }}
                  >
                    Update Knowledge Base
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Analytics />}
                    fullWidth
                    sx={{ justifyContent: "flex-start" }}
                  >
                    View Analytics
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Dashboard;
