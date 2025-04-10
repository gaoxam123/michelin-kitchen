import API from "./api";

export function getProfilePictureURL(id) {
  return `${API}/profile-picture/${id}`;
}
