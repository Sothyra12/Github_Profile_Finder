import "./style.css";

const SEARCH_URL = import.meta.env.APIURL;
const MY_PROFILE_URL = import.meta.env.MY_GITHUB_URL;

const searchInput = document.getElementById("search_input") as HTMLInputElement;
const searchBtn = document.getElementById("btn") as HTMLButtonElement;

const userContainer = document.getElementById("container") as HTMLDivElement;
const avatarUrl = document.getElementById("avatar") as HTMLImageElement;
const names = document.getElementById("name") as HTMLHeadElement;
const bioDesc = document.getElementById("bio") as HTMLHeadingElement;
const locationInfo = document.getElementById(
    "location",
) as HTMLParagraphElement;
const pubRepos = document.getElementById("public_repo") as HTMLParagraphElement;
const follower = document.getElementById("follower") as HTMLParagraphElement;
const followings = document.getElementById("following") as HTMLParagraphElement;
const profileUrlBtn = document.getElementById("url_btn") as HTMLButtonElement;

const fetchMyUrl = async () => {
    try {
        const res = await fetch(MY_PROFILE_URL);
        const myData = await res.json();

        if (!myData || myData.length === 0) {
            console.error("Sothyra12 not found!1");
            return;
        }

        displayUserInfo([myData]);
    } catch (err) {
        console.error("Error: ", err);
    }
};

type UserData = {
    avatar_url: string;
    html_url: string;
    name: string;
    location: string;
    bio: string;
    public_repos: number;
    followers: number;
    following: number;
};

const displayUserInfo = (userDataArr: UserData[]): void => {
    if (!userDataArr || userDataArr.length === 0) {
        userContainer.innerHTML = "";
        return;
    }

    const {
        avatar_url,
        html_url,
        name,
        location,
        bio,
        public_repos,
        followers,
        following,
    } = userDataArr[0];

    avatarUrl.src = avatar_url;
    names.textContent = name || "No name found";
    bioDesc.textContent = bio || "No bio yet!";
    locationInfo.textContent = location || "Unknown location";
    pubRepos.textContent = public_repos.toString();
    follower.textContent = followers.toString();
    followings.textContent = following.toString();
    profileUrlBtn.textContent = "View GitHub Profile";
    profileUrlBtn.onclick = () => window.open(html_url, "_blank");
};

const searchUserName = async () => {
    const searchInputValue = searchInput.value.trim().toLowerCase();
    if (!searchInputValue) return `Please enter a valid username!`;

    try {
        const res = await fetch(`${SEARCH_URL}/${searchInputValue}`);
        if (!res.ok) throw new Error("Cannot fetch this username!");

        const userData = await res.json();
        if (!userData) throw new Error("Invalid user data!");

        displayUserInfo([userData]);
    } catch (err) {
        alert("User with this username not found.");
    }
};

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") searchUserName();
});

window.addEventListener("DOMContentLoaded", fetchMyUrl);
