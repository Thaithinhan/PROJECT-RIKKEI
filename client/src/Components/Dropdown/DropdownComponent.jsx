import Dropdown from "react-bootstrap/Dropdown";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import "./DropdownComponent.css";

function DropdownComponent() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        ...
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">
          <EditIcon className="icon-drop" /> Edit
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2">
          <DeleteIcon className="icon-drop" /> Delete
        </Dropdown.Item>
        <Dropdown.Item href="#/action-3">
          <GroupAddIcon className="icon-drop" /> Follow
        </Dropdown.Item>
        <Dropdown.Item href="#/action-3">
          <GroupRemoveIcon className="icon-drop" /> Unfollow
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownComponent;
