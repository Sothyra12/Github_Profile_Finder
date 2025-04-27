## ⚡Vite + TypeScript + Vanilla Setup 
# Create a Vite + Vanilla TypeScript project
npm create vite@latest github-profile-finder -- --template vanilla-ts

# Go into the project folder
cd github-profile-finder

# Install dependencies
npm install

# Start the development server
npm run dev

## 📦 Local Setup (This Project) 
git clone https://github.com/Sothyra12/Github_Profile_Finder.git
cd Github_Profile_Finder

npm install
npm run dev


## Tailwindcss config
In the project folder run: npm install -D @tailwindcss/cli   

After: @import "tailwindcss to the main.css file; 

then run:  npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch      


## Error I encountered
User with this username not found. TypeError: Cannot set properties of null (setting 'textContent')
at displayUserInfo (main.ts:68:14)
at searchUserName (main.ts:85:9)

## How I fixed it
Null checks for all the DOM elements

if (avatarUrl) avatarUrl.src = avatar_url;
if (names) names.textContent = name ?? "No name found";
if (bioDesc) bioDesc.textContent = bio ?? "No bio yet!";
if (locationInfo) locationInfo.textContent = location ?? "Unknown location";
if (pubRepos) pubRepos.textContent = public_repos.toString() ?? "0";
if (follower) follower.textContent = followers.toString() ?? "0;
if (followings) followings.textContent = following.toString() ?? "0";
if (profileUrlBtn) {
    profileUrlBtn.onclick = () => window.open(html_url, "_blank");
}