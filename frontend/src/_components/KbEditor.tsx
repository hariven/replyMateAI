import { type FC, useState, useEffect } from "react"
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Chip,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"
import {
  Save as SaveIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Search as SearchIcon,
} from "@mui/icons-material"

interface Business {
  id: string
  name: string
  whatsappNumber: string
}

interface KnowledgeEntry {
  id: string
  businessId: string
  title: string
  content: string
  tags: string[]
  lastUpdated: string
}

const KnowledgeEditor: FC = () => {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [selectedBusiness, setSelectedBusiness] = useState("")
  const [knowledgeEntries, setKnowledgeEntries] = useState<KnowledgeEntry[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [status, setStatus] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [editingEntry, setEditingEntry] = useState<KnowledgeEntry | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  })

  useEffect(() => {
    // Mock data for businesses
    setBusinesses([
      { id: "1", name: "Pizza Palace", whatsappNumber: "+1234567890" },
      { id: "2", name: "Tech Support Co", whatsappNumber: "+1234567891" },
      { id: "3", name: "Fashion Store", whatsappNumber: "+1234567892" },
    ])

    // Mock knowledge entries
    setKnowledgeEntries([
      {
        id: "1",
        businessId: "1",
        title: "Delivery Information",
        content: "We deliver within 30-45 minutes. Delivery is free for orders over $25.",
        tags: ["delivery", "timing", "free delivery"],
        lastUpdated: "2024-01-15",
      },
      {
        id: "2",
        businessId: "1",
        title: "Menu and Pricing",
        content: "Our pizzas range from $12-$25. We have vegetarian and vegan options available.",
        tags: ["menu", "pricing", "vegetarian", "vegan"],
        lastUpdated: "2024-01-14",
      },
    ])
  }, [])

  const filteredEntries = knowledgeEntries.filter((entry) => {
    const matchesBusiness = !selectedBusiness || entry.businessId === selectedBusiness
    const matchesSearch =
      !searchTerm ||
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesBusiness && matchesSearch
  })

  const handleOpenDialog = (entry?: KnowledgeEntry) => {
    if (entry) {
      setEditingEntry(entry)
      setFormData({
        title: entry.title,
        content: entry.content,
        tags: entry.tags.join(", "),
      })
    } else {
      setEditingEntry(null)
      setFormData({
        title: "",
        content: "",
        tags: "",
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingEntry(null)
    setFormData({
      title: "",
      content: "",
      tags: "",
    })
  }

  const handleSaveEntry = async () => {
    if (!selectedBusiness) {
      setStatus("❌ Please select a business first")
      return
    }

    setStatus("Saving...")
    try {
      const tags = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag)

      // API call to save knowledge entry
      const entryData = {
        businessId: selectedBusiness,
        title: formData.title,
        content: formData.content,
        tags,
      }

      console.log("Saving knowledge entry:", entryData)

      // Mock success
      setStatus("✅ Knowledge entry saved successfully")
      handleCloseDialog()

      // Refresh entries (in real app, refetch from API)
    } catch (error) {
      setStatus(`❌ Error: ${error}`)
    }
  }

  const handleDeleteEntry = async (entryId: string) => {
    if (window.confirm("Are you sure you want to delete this knowledge entry?")) {
      try {
        console.log("Deleting entry:", entryId)
        setKnowledgeEntries(knowledgeEntries.filter((entry) => entry.id !== entryId))
        setStatus("✅ Knowledge entry deleted successfully")
      } catch (error) {
        setStatus(`❌ Error: ${error}`)
      }
    }
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Knowledge Base Editor
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
        Manage the AI knowledge base for your businesses
      </Typography>

      <Grid columns={12} gap={3} sx={{ mb: 4 }}>
        <Grid span={3}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Business Selection
              </Typography>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Select Business</InputLabel>
                <Select
                  value={selectedBusiness}
                  onChange={(e) => setSelectedBusiness(e.target.value)}
                  label="Select Business"
                >
                  <MenuItem value="">All Businesses</MenuItem>
                  {businesses.map((business) => (
                    <MenuItem key={business.id} value={business.id}>
                      {business.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                placeholder="Search knowledge entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />,
                }}
                sx={{ mb: 3 }}
              />

              <Button
                fullWidth
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog()}
                disabled={!selectedBusiness}
              >
                Add Knowledge Entry
              </Button>

              {status && (
                <Alert
                  severity={status.includes("✅") ? "success" : status.includes("❌") ? "error" : "info"}
                  sx={{ mt: 2 }}
                >
                  {status}
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid span={9}>
          <Paper>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
              <Typography variant="h6">Knowledge Entries ({filteredEntries.length})</Typography>
            </Box>
            <List>
              {filteredEntries.length === 0 ? (
                <ListItem>
                  <ListItemText
                    primary="No knowledge entries found"
                    secondary={
                      selectedBusiness
                        ? "Add your first knowledge entry for this business"
                        : "Select a business to view its knowledge entries"
                    }
                  />
                </ListItem>
              ) : (
                filteredEntries.map((entry) => (
                  <ListItem key={entry.id} divider>
                    <ListItemText
                      primary={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                          <Typography variant="subtitle1" fontWeight="medium">
                            {entry.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {businesses.find((b) => b.id === entry.businessId)?.name}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {entry.content.length > 150 ? `${entry.content.substring(0, 150)}...` : entry.content}
                          </Typography>
                          <Box sx={{ display: "flex", gap: 0.5, mb: 1 }}>
                            {entry.tags.map((tag) => (
                              <Chip key={tag} label={tag} size="small" variant="outlined" />
                            ))}
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            Last updated: {entry.lastUpdated}
                          </Typography>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={() => handleOpenDialog(entry)} sx={{ mr: 1 }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" onClick={() => handleDeleteEntry(entry.id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{editingEntry ? "Edit Knowledge Entry" : "Add Knowledge Entry"}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 2 }}>
            <TextField
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              fullWidth
              required
              placeholder="e.g., Delivery Information"
            />
            <TextField
              label="Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              fullWidth
              required
              multiline
              rows={6}
              placeholder="Enter the detailed information that the AI should use to answer customer questions..."
            />
            <TextField
              label="Tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              fullWidth
              placeholder="delivery, timing, pricing (comma-separated)"
              helperText="Add relevant tags to help the AI find this information"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSaveEntry}
            variant="contained"
            startIcon={<SaveIcon />}
            disabled={!formData.title || !formData.content}
          >
            {editingEntry ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default KnowledgeEditor
