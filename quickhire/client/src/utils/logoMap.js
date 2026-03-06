import Revolut from "../assets/R.png";
import Dropbox from "../assets/Dropbox.png";
import Pitch from "../assets/Pitch.png";
import Blinkist from "../assets/Blinkist.png";
import ClassPass from "../assets/ClassPass.jpg";
import Canva from "../assets/Canva.png";
import GoDaddy from "../assets/GoDaddy.png";
import Twitter from "../assets/Twitter.jpg";
import Nomad from "../assets/Nomad.png";
import Netlify from "../assets/Netlify.png";
import Maze from "../assets/Maze.jpg";
import Terraform from "../assets/TerraForm.png";
import Udacity from "../assets/Udacity.png";
import Packer from "../assets/Packer.png";
import Webflow from "../assets/Webflow.png";

// Centralized logo mapping for companies
export const logoMap = {
  "Revolut": Revolut,
  "Dropbox": Dropbox,
  "Pitch": Pitch,
  "Blinkist": Blinkist,
  "ClassPass": ClassPass,
  "Canva": Canva,
  "GoDaddy": GoDaddy,
  "Twitter": Twitter,
  "Nomad": Nomad,
  "Netlify": Netlify,
  "Maze": Maze,
  "Terraform": Terraform,
  "Udacity": Udacity,
  "Packer": Packer,
  "Webflow": Webflow,
};

// Helper function to get company logo or fallback to UI Avatars
export function getCompanyLogo(companyName) {
  return logoMap[companyName] || null;
}
