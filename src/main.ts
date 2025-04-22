import "./style.css";

const SEARCH_URL = "https://api.github.com/users"; //import.meta.env.APIURL;
const MY_PROFILE_URL = "https://api.github.com/users/Sothyra12"; // import.meta.env.MY_GITHUB_URL;

const searchInput = document.getElementById("search_input") as HTMLInputElement;
const searchBtn = document.getElementById("btn") as HTMLButtonElement;

const userContainer = document.getElementById("container") as HTMLDivElement;
const avatarUrl = document.getElementById("avatar") as HTMLImageElement;
const names = document.getElementById("name") as HTMLHeadingElement;
const bioDesc = document.getElementById("bio") as HTMLHeadingElement;
const locationInfo = document.getElementById("location") as HTMLParagraphElement;
const pubRepos = document.getElementById("public_repo") as HTMLParagraphElement;
const follower = document.getElementById("follower") as HTMLParagraphElement;
const followings = document.getElementById("following") as HTMLParagraphElement;
const profileUrlBtn = document.getElementById("url_btn") as HTMLButtonElement;

const fetchMyUrl = async () => {
    try {
        const res = await fetch(MY_PROFILE_URL);
        const myData = await res.json();

        if (!myData || myData.length === 0) {
            console.error("Sothyra12 not found!");
            return;
        }

        displayUserInfo([myData]);
    } catch (err) {
        console.log("Error: ", err);
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
        userContainer.innerHTML = " ";
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
    profileUrlBtn.onclick = () => window.open(html_url, "_blank");
};

const searchUserName = async () => {
    
    const searchInputValue = searchInput.value.trim().toLowerCase();
    if (!searchInputValue) return `Please enter a valid username!`;

    try {
        const res = await fetch(`${SEARCH_URL}/${searchInputValue}`);
        if (!res.ok) throw new Error("Cannot fetch this username!");

        const userData = await res.json();
        if (!res.ok || "message" in userData) throw new Error(userData.message || "Unknown error msg.");

        displayUserInfo([userData]);
    } catch (err) {
        console.log("User with this username not found.", err);
    }
};

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") searchUserName();
});

searchBtn.addEventListener("click", searchUserName);

window.addEventListener("DOMContentLoaded", fetchMyUrl);
