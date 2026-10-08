import {
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

const cornerSx = {
  position: "absolute",
  width: 14,
  height: 14,
  borderColor: "rgba(212, 212, 216, 0.4)",
  pointerEvents: "none",
};

function CornerFrame({ children, sx = {} }) {
  return (
    <Box sx={{ position: "relative", ...sx }}>
      <Box sx={{ ...cornerSx, top: -1, left: -1, borderTop: "2px solid", borderLeft: "2px solid" }} />
      <Box sx={{ ...cornerSx, top: -1, right: -1, borderTop: "2px solid", borderRight: "2px solid" }} />
      <Box sx={{ ...cornerSx, bottom: -1, left: -1, borderBottom: "2px solid", borderLeft: "2px solid" }} />
      <Box sx={{ ...cornerSx, bottom: -1, right: -1, borderBottom: "2px solid", borderRight: "2px solid" }} />
      {children}
    </Box>
  );
}

function App() {
  const [formData, setFormData] = useState({
    gadgetName: "",
    category: "",
    manufacturer: "",
    healthRating: "",
    techBrandName: "",
    userRole: "",
  });

  const [gadgets, setGadgets] = useState([]);
  const [errors, setErrors] = useState({});
  const [selectedGadget, setSelectedGadget] = useState(null);
  const [activeGadget, setActiveGadget] = useState(null);
  const [showHealthyOnly, setShowHealthyOnly] = useState(false);

  useEffect(() => {
    if (selectedGadget) {
      setActiveGadget(selectedGadget);
    }
  }, [selectedGadget]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.gadgetName.trim()) {
      newErrors.gadgetName = "Gadget name is required.";
    } else if (formData.gadgetName.trim().length < 3) {
      newErrors.gadgetName =
        "Gadget name must be at least 3 characters.";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category.";
    }

    if (!formData.manufacturer.trim()) {
      newErrors.manufacturer = "Manufacturer is required.";
    }

    if (!formData.healthRating) {
      newErrors.healthRating = "Health rating is required.";
    } else if (
      Number(formData.healthRating) < 1 ||
      Number(formData.healthRating) > 100
    ) {
      newErrors.healthRating =
        "Health rating must be between 1 and 100.";
    }

    if (!formData.techBrandName.trim()) {
      newErrors.techBrandName = "Tech brand name is required.";
    }

    if (!formData.userRole) {
      newErrors.userRole = "Please select a user role.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newGadget = {
      id: Date.now(),
      ...formData,
    };

    setGadgets([...gadgets, newGadget]);

    setFormData({
      gadgetName: "",
      category: "",
      manufacturer: "",
      healthRating: "",
      techBrandName: "",
      userRole: "",
    });

    console.log("Gadget registered:", newGadget);
  };

  const filteredGadgets = showHealthyOnly
    ? gadgets.filter((gadget) => Number(gadget.healthRating) >= 80)
    : gadgets;

  const columns = [
    {
      accessorKey: "gadgetName",
      header: "Gadget Name",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "manufacturer",
      header: "Manufacturer",
    },
    {
      accessorKey: "healthRating",
      header: "Health Rating",
    },
    {
      accessorKey: "techBrandName",
      header: "Tech Brand",
    },
    {
      accessorKey: "userRole",
      header: "User Role",
    },
  ];

  const table = useReactTable({
    data: filteredGadgets,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 3,
      },
    },
  });

  const activeGadgetFields = activeGadget
    ? [
        ["Gadget Name", activeGadget.gadgetName],
        ["Category", activeGadget.category],
        ["Manufacturer", activeGadget.manufacturer],
        ["Health Rating", activeGadget.healthRating],
        ["Tech Brand", activeGadget.techBrandName],
        ["User Role", activeGadget.userRole],
      ]
    : [];

  return (
    <Box sx={{ maxWidth: 1180, mx: "auto", px: 3, pb: 8 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ sm: "center" }}
        spacing={1}
        sx={{ py: 3.5, borderBottom: "1px solid", borderColor: "divider", mb: 4 }}
      >
        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
          <CornerFrame sx={{ display: "inline-block", px: { xs: 2.5, sm: 4 }, py: 1.5 }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                letterSpacing: "-0.03em",
                fontSize: { xs: "2rem", sm: "2.75rem" },
                lineHeight: 1.1,
              }}
            >
              TechVault
            </Typography>
          </CornerFrame>

          <Typography
            variant="body2"
            sx={{
              mt: 0.75,
              color: "text.secondary",
              letterSpacing: "0.02em",
            }}
          >
            Powered by Portillo
          </Typography>
        </Box>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              bgcolor: "text.secondary",
              animation: "pulse-dot 1.8s ease-in-out infinite",
            }}
          />
          <Chip
            label={`${gadgets.length} registered`}
            variant="outlined"
            sx={{ borderColor: "divider", fontFamily: "inherit" }}
          />
        </Stack>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "320px 1fr" },
          gap: 3,
          alignItems: "start",
        }}
      >
        <Paper variant="outlined">
          <Box
            sx={{ px: 2.25, py: 1.75, borderBottom: "1px solid", borderColor: "divider" }}
          >
            <Typography variant="overline" sx={{ color: "text.secondary" }}>
              Register Gadget
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ p: 2.25, display: "flex", flexDirection: "column", gap: 2.25 }}
          >
            <TextField
              id="gadgetName"
              name="gadgetName"
              label="Gadget Name"
              size="small"
              value={formData.gadgetName}
              onChange={handleChange}
              error={!!errors.gadgetName}
              helperText={errors.gadgetName}
              placeholder="e.g. Pixel Fold"
            />

            <FormControl size="small" error={!!errors.category}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                label="Category"
                value={formData.category}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>Select category</em>
                </MenuItem>
                <MenuItem value="Smartphone">Smartphone</MenuItem>
                <MenuItem value="Laptop">Laptop</MenuItem>
                <MenuItem value="Wearable">Wearable</MenuItem>
                <MenuItem value="Audio">Audio</MenuItem>
              </Select>
              {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
            </FormControl>

            <TextField
              id="manufacturer"
              name="manufacturer"
              label="Manufacturer"
              size="small"
              value={formData.manufacturer}
              onChange={handleChange}
              error={!!errors.manufacturer}
              helperText={errors.manufacturer}
              placeholder="e.g. Google"
            />

            <TextField
              id="healthRating"
              name="healthRating"
              label="Health Rating"
              type="number"
              size="small"
              value={formData.healthRating}
              onChange={handleChange}
              error={!!errors.healthRating}
              helperText={errors.healthRating}
              placeholder="1-100"
            />

            <TextField
              id="techBrandName"
              name="techBrandName"
              label="Tech Brand Name"
              size="small"
              value={formData.techBrandName}
              onChange={handleChange}
              error={!!errors.techBrandName}
              helperText={errors.techBrandName}
              placeholder="e.g. Nest"
            />

            <FormControl error={!!errors.userRole}>
              <Typography variant="caption" sx={{ color: "text.secondary", mb: 0.5 }}>
                User Role
              </Typography>
              <RadioGroup
                row
                name="userRole"
                value={formData.userRole}
                onChange={handleChange}
              >
                <FormControlLabel value="Engineer" control={<Radio size="small" />} label="Engineer" />
                <FormControlLabel value="Tester" control={<Radio size="small" />} label="Tester" />
              </RadioGroup>
              {errors.userRole && <FormHelperText>{errors.userRole}</FormHelperText>}
            </FormControl>

            <Button type="submit" variant="contained" color="primary">
              Register Gadget
            </Button>
          </Box>
        </Paper>

        <Paper variant="outlined">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            sx={{ px: 2.25, py: 1.75, borderBottom: "1px solid", borderColor: "divider" }}
          >
            <Typography variant="overline" sx={{ color: "text.secondary" }}>
              Registered Gadgets
            </Typography>

            <Button
              size="small"
              variant="outlined"
              onClick={() => setShowHealthyOnly(!showHealthyOnly)}
            >
              {showHealthyOnly ? "Show All Gadgets" : "Show Healthy Gadgets"}
            </Button>
          </Stack>

          <TableContainer>
            <Table size="small">
              <TableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableCell
                        key={header.id}
                        sx={{
                          bgcolor: "#1a1a1d",
                          color: "text.secondary",
                          textTransform: "uppercase",
                          fontSize: 11,
                          letterSpacing: "0.05em",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>

              <TableBody>
                {table.getRowModel().rows.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      align="center"
                      sx={{ color: "text.disabled", py: 5 }}
                    >
                      No gadgets registered yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      hover
                      selected={selectedGadget?.id === row.original.id}
                      onClick={() => setSelectedGadget(row.original)}
                      sx={{ cursor: "pointer" }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} sx={{ whiteSpace: "nowrap" }}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            sx={{ px: 2.25, py: 1.5, borderTop: "1px solid", borderColor: "divider", width: "100%" }}
          >
            <Button
              size="small"
              variant="outlined"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>

            <Typography
              variant="caption"
              sx={{ color: "text.secondary", flexShrink: 0, userSelect: "none" }}
            >
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {Math.max(table.getPageCount(), 1)}
            </Typography>

            <Button
              size="small"
              variant="outlined"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </Stack>

          {activeGadget && (
            <Box sx={{ borderTop: "1px solid", borderColor: "divider", px: 2.25, py: 2 }}>
              <Typography
                variant="caption"
                sx={{ color: "text.disabled", textTransform: "uppercase", letterSpacing: "0.08em" }}
              >
                Active Gadget
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "max-content 1fr",
                  gap: "6px 16px",
                  mt: 1.5,
                }}
              >
                {activeGadgetFields.map(([label, value]) => (
                  <Box key={label} sx={{ display: "contents" }}>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {label}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.primary" }}>
                      {value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Paper>
      </Box>

      <Typography
        sx={{
          position: "fixed",
          bottom: 12,
          right: 16,
          fontSize: 11,
          letterSpacing: "0.08em",
          color: "text.disabled",
          opacity: 0.5,
          pointerEvents: "none",
        }}
      >
        Portillo
      </Typography>
    </Box>
  );
}

export default App;
