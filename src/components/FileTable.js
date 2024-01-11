import React, { useState, useEffect } from "react";

const initialFiles = [
  {
    name: "smss.exe",
    device: "Stark",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
    status: "scheduled",
  },
  {
    name: "netsh.exe",
    device: "Targaryen",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe",
    status: "available",
  },
  {
    name: "uxtheme.dll",
    device: "Lannister",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll",
    status: "available",
  },
  {
    name: "cryptbase.dll",
    device: "Martell",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll",
    status: "scheduled",
  },
  {
    name: "7za.exe",
    device: "Baratheon",
    path: "\\Device\\HarddiskVolume1\\temp\\7za.exe",
    status: "scheduled",
  },
  {
    name: "7za.exe",
    device: "Baratheon",
    path: "\\Device\\HarddiskVolume1\\temp\\7za.exe",
    status: "scheduled",
  },
  {
    name: "7za.exe",
    device: "Baratheon",
    path: "\\Device\\HarddiskVolume1\\temp\\7za.exe",
    status: "available",
  },
  {
    name: "7za.exe",
    device: "Baratheon",
    path: "\\Device\\HarddiskVolume1\\temp\\7za.exe",
    status: "scheduled",
  },
  {
    name: "7za.exe",
    device: "Baratheon",
    path: "\\Device\\HarddiskVolume1\\temp\\7za.exe",
    status: "available",
  },
  {
    name: "7za.exe",
    device: "Baratheon",
    path: "\\Device\\HarddiskVolume1\\temp\\7za.exe",
    status: "available",
  },
];

const FileTable = () => {
  const [files, setFiles] = useState(initialFiles);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Determine the states for the select-all checkbox
  const isAllAvailableSelected = files.every(
    (file) => file.status !== "available" || selectedFiles.includes(file)
  );
  const isSomeAvailableSelected = files.some(
    (file) => file.status === "available" && selectedFiles.includes(file)
  );

  // Handle individual row selection toggle
  const handleToggle = (fileToToggle) => {
    if (fileToToggle.status !== "available") {
      // Ignore if the file is not available
      return;
    }

    const isSelected = selectedFiles.includes(fileToToggle);
    if (isSelected) {
      console.log(`Deselecting ${fileToToggle.name}`);
      setSelectedFiles(selectedFiles.filter((file) => file !== fileToToggle));
    } else {
      console.log(`Selecting ${fileToToggle.name}`);
      setSelectedFiles([...selectedFiles, fileToToggle]);
    }
  };

  // Handle select-all checkbox toggle
  const handleToggleAll = () => {
    if (isAllAvailableSelected) {
      console.log("Deselecting all files");
      setSelectedFiles([]);
    } else {
      console.log("Selecting all available files");
      const availableFiles = files.filter(
        (file) => file.status === "available"
      );
      setSelectedFiles(availableFiles);
    }
  };

  // Handle download button click
  const handleDownload = () => {
    if (selectedFiles.length === 0) {
      alert("No files selected.");
      return;
    }
    selectedFiles.forEach((file) => {
      alert(`Download Path: ${file.path}, Device: ${file.device}`);
    });
  };

  // Update the select-all checkbox indeterminate state
  useEffect(() => {
    const selectAllCheckbox = document.getElementById("select-all-checkbox");
    if (selectAllCheckbox) {
      selectAllCheckbox.indeterminate =
        isSomeAvailableSelected && !isAllAvailableSelected;
    }
  }, [selectedFiles, files]);

  return (
    <div>
      <div className="table-controls">
        <span className="selected-count">
          {selectedFiles.length > 0
            ? `Selected ${selectedFiles.length}`
            : "None Selected"}
        </span>
        <button className="download-button" onClick={handleDownload}>
          Download Selected
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                id="select-all-checkbox"
                aria-label="Select all files"
                checked={isAllAvailableSelected}
                onChange={handleToggleAll}
              />
            </th>
            <th scope="col">Name</th>
        <th scope="col">Device</th>
        <th scope="col">Path</th>
        <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <FileRow
              key={file.name}
              file={file}
              isSelected={selectedFiles.includes(file)}
              onToggle={handleToggle}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileTable;

const FileRow = ({ file, isSelected, onToggle }) => {
  const { name, device, path, status } = file;

  const statusClass =
    status === "available" ? "status-available" : "status-scheduled";

  return (
    <tr
    className={`file-row ${isSelected ? 'selected' : ''}`}
    tabIndex={0} // Make the row focusable
    aria-selected={isSelected}
    onClick={() => onToggle(file)}
    onKeyPress={(event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        onToggle(file);
      }
    }}
    role="row"
    >
      <td  role="cell">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggle(file)}
          aria-labelledby={`fileLabel}`}
        />
      </td>
      <td role="cell" >{name}</td>
      <td role="cell">{device}</td>
      <td role="cell">{path}</td>
      <td role="cell">
        <span className={statusClass}>{status}</span>
      </td>
    </tr>
  );
};
